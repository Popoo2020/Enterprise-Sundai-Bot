"""Build Sunny's camera-facing 3D relief rig and one-shot performance.

Use Python 3 with numpy, Pillow and scipy. The source texture follows the approved
pose, including the occlusion along the two sides of the demo frame. Model units
below are image-plane pixels; the GLB is exported in metres, facing +Z.
"""
import argparse

import json
import struct
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

HERE = Path(__file__).resolve().parent
FRAME_COUNT = 18
FRAME_MS = 70
CROP_WIDTH, CROP_HEIGHT = 716, 846
PUBLIC_WIDTH, PUBLIC_HEIGHT = 350, 414


def model(texture):
    height, width = texture.shape[:2]
    # A regular quad patch keeps the photographed light and brush-fine fibres intact.
    u, v = np.meshgrid(np.linspace(0, 1, 101), np.linspace(0, 1, 117))
    x, y = 34 + u * CROP_WIDTH, -18 + v * CROP_HEIGHT

    def volume(cx, cy, rx, ry):
        distance = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2
        return np.exp(-1.4 * distance)

    skull = volume(346, 218, 212, 180)
    forehead = volume(414, 210, 118, 107)
    cheek = volume(421, 318, 125, 58)
    muzzle = volume(463, 305, 46, 40)
    upper_hand = volume(637, 366, 96, 65)
    left_hand = volume(195, 703, 80, 105)
    shoulder = volume(179, 443, 100, 141)
    depth = 25 + 122 * skull + 28 * forehead + 42 * cheek + 42 * muzzle
    depth += 72 * upper_hand + 66 * left_hand + 27 * shoulder
    rest = np.stack((x, y, depth), axis=-1)

    # Three independent shape controls. The neck falloff locks both hands to the frame.
    smooth = lambda a: np.clip(a, 0, 1) ** 2 * (3 - 2 * np.clip(a, 0, 1))
    neck = smooth((403 - y) / 68) * smooth((589 - x) / 60)
    neck *= 1 - .85 * smooth((x - 475) / 57) * smooth((y - 287) / 55)
    pivot = np.array([313., 368., 42.])
    yaw, incline, tilt = np.deg2rad([6.4, -4.6, 2.3])
    cx, sx, cy, sy = np.cos(incline), np.sin(incline), np.cos(yaw), np.sin(yaw)
    cz, sz = np.cos(tilt), np.sin(tilt)
    turn = (np.array([[cz,-sz,0],[sz,cz,0],[0,0,1]]) @
            np.array([[cy,0,sy],[0,1,0],[-sy,0,cy]]) @
            np.array([[1,0,0],[0,cx,-sx],[0,sx,cx]]))
    head = (((rest - pivot) @ turn.T) + pivot - rest) * neck[...,None]
    # A minute anticipatory tuck gives this short head turn weight.
    head[...,1] += 3.8 * neck
    gaze = np.zeros_like(rest)
    lid = np.zeros_like(rest)
    for ex, ey, rx, ry in [(399,290,23,21), (483,251,19,22)]:
        ocular = volume(ex, ey, rx, ry)
        gaze[...,0] += 4.0 * ocular
        gaze[...,1] += 3.0 * ocular
        gaze[...,2] += 1.0 * ocular
        socket = volume(ex - 3, ey - 2, rx * 1.46, ry * 1.45)
        lid[...,1] += -.91 * (y - ey - 2) * socket
        lid[...,2] += 2.3 * socket
        brow = volume(ex - 5, ey - 45, rx * 1.36, 17)
        gaze[...,1] -= 3.8 * brow
    shapes = [gaze, head, lid]
    alpha = texture[...,3] > .04
    # Trim transparent quads but retain an entire margin around silhouette for fine hair.
    from scipy.ndimage import maximum_filter
    expanded = maximum_filter(alpha,size=15)
    visible = expanded[np.rint(v*(height-1)).astype(int),np.rint(u*(width-1)).astype(int)]
    iy, ix = np.where(visible[:-1,:-1] | visible[:-1,1:] | visible[1:,:-1] | visible[1:,1:])
    left = iy * u.shape[1] + ix
    faces = np.concatenate((np.stack((left,left+u.shape[1],left+1),1),
                            np.stack((left+1,left+u.shape[1],left+u.shape[1]+1),1)))
    return rest, shapes, np.stack((u,v),axis=-1), faces


def performance(t):
    def smooth(start,end):
        k = np.clip((t-start)/(end-start),0,1)
        return k*k*(3-2*k)
    gaze = smooth(0,.21) * (1-smooth(.71,1))
    head = smooth(.07,.47) * (1-smooth(.55,1))
    lids = smooth(.32,.40) * (1-smooth(.40,.51))
    return np.array([gaze,head,lids], dtype='float32')


def write_glb(file, texture, rest, targets, uv, faces):
    positions = rest.copy()
    positions[...,0] -= 226
    positions[...,1] -= 392
    axis = np.array([.001,-.001,.001]) # one authored unit is one millimetre
    used, packed_faces = np.unique(faces,return_inverse=True)
    buffers, views, accessors = bytearray(), [], []
    def add_view(data,target=None):
        buffers.extend(b'\x00'*((-len(buffers))%4))
        item = {'buffer':0,'byteOffset':len(buffers),'byteLength':len(data)}
        if target:item['target']=target
        views.append(item);buffers.extend(data)
        return len(views)-1
    def accessor(array,component,kind,gpu=None,limits=False):
        index=add_view(array.tobytes(),gpu)
        item={'bufferView':index,'componentType':component,'count':len(array),'type':kind}
        if limits:
            item['min']=np.atleast_1d(np.min(array,axis=0)).tolist()
            item['max']=np.atleast_1d(np.max(array,axis=0)).tolist()
        accessors.append(item);return len(accessors)-1
    def vec3(grid):
        return (grid.reshape(-1,3)[used]*axis).astype('<f4')
    pos=accessor(vec3(positions),5126,'VEC3',34962,True)
    tex=accessor(uv.reshape(-1,2)[used].astype('<f4'),5126,'VEC2',34962)
    idx=accessor(packed_faces.reshape(-1).astype('<u2'),5123,'SCALAR',34963)
    morph=[{'POSITION':accessor(vec3(s),5126,'VEC3',34962,True)} for s in targets]
    ts=np.arange(FRAME_COUNT,dtype='<f4')*(FRAME_MS/1000)
    ti=accessor(ts,5126,'SCALAR',limits=True)
    wt=accessor(np.stack([performance(t) for t in np.linspace(0,1,FRAME_COUNT)]).reshape(-1).astype('<f4'),5126,'SCALAR')
    import io
    image_data=io.BytesIO()
    texture.save(image_data,format='PNG',optimize=True)
    image_view=add_view(image_data.getvalue())
    package={'asset':{'version':'2.0','generator':'SundAI Sunny fixed-camera relief rig'},
             'extensionsUsed':['KHR_materials_unlit'],
             'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'name':'Sunny','mesh':0}],
             'meshes':[{'name':'Sunny · frame grip','weights':[0,0,0],
                        'extras':{'targetNames':['Eye line and brows','Neck and head','Lids']},
                        'primitives':[{'attributes':{'POSITION':pos,'TEXCOORD_0':tex},'indices':idx,'material':0,'targets':morph}]}],
             'materials':[{'doubleSided':True,'alphaMode':'BLEND','pbrMetallicRoughness':{'baseColorTexture':{'index':0},'metallicFactor':0},'extensions':{'KHR_materials_unlit':{}}}],
             'textures':[{'source':0}],'images':[{'bufferView':image_view,'mimeType':'image/png'}],
             'animations':[{'name':'Look toward the photograph','samplers':[{'input':ti,'output':wt,'interpolation':'LINEAR'}],
                            'channels':[{'sampler':0,'target':{'node':0,'path':'weights'}}]}],
             'bufferViews':views,'accessors':accessors,'buffers':[{'byteLength':len(buffers)}]}
    j=json.dumps(package,separators=(',',':')).encode();j+=b' '*((-len(j))%4)
    buffers.extend(b'\0'*((-len(buffers))%4))
    file.write_bytes(struct.pack('<4sII',b'glTF',2,28+len(j)+len(buffers))+struct.pack('<I4s',len(j),b'JSON')+j+struct.pack('<I4s',len(buffers),b'BIN\0')+buffers)


def render(texture, shapes, weights, pix):
    # Orthographic camera. Invert the projected mesh deformation for every antialiased sample.
    # Every pose is a single-valued front surface at the small authored rotation.
    dx,dy=pix
    pos=np.stack((dx,dy))
    uv=pos.copy()
    motion=np.tensordot(weights,np.stack(shapes),axes=(0,0))
    gy,gx=motion.shape[:2]
    for _ in range(6):
        grid=[uv[1]*(gy-1),uv[0]*(gx-1)]
        uv=pos-np.stack((map_coordinates(motion[...,0],grid,order=1,mode='nearest')/CROP_WIDTH,
                         map_coordinates(motion[...,1],grid,order=1,mode='nearest')/CROP_HEIGHT))
    grid=[uv[1]*(texture.shape[0]-1),uv[0]*(texture.shape[1]-1)]
    rgba=np.stack([map_coordinates(channel,grid,order=1,mode='constant') for channel in texture.transpose(2,0,1)],-1)
    # Unpremultiply after interpolation so thin hair can be composited against any rail colour.
    alpha=rgba[...,3:4];rgba[...,:3]/=np.maximum(alpha,1e-6)
    img=Image.fromarray((rgba.clip(0,1)*255+.5).astype('uint8'),'RGBA')
    return img.resize((PUBLIC_WIDTH,PUBLIC_HEIGHT),Image.Resampling.LANCZOS)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,default=HERE.parents[2]/'site/brand/crew/v2')
    parser.add_argument('--model',type=Path,help='Optional editable animated .glb')
    args=parser.parse_args()
    tex=Image.open(HERE/'sunny-texture.webp').convert('RGBA')
    pixels=np.asarray(tex,dtype='float32')/255
    rest,targets,uv,triangles=model(pixels)
    if args.model: write_glb(args.model,tex,rest,targets,uv,triangles)
    pixels[...,:3]*=pixels[...,3:4]
    px,py=np.meshgrid(np.linspace(0,1,round(PUBLIC_WIDTH*1.2)),
                       np.linspace(0,1,round(PUBLIC_HEIGHT*1.2)))
    frames=[render(pixels,targets,performance(t),(px,py)) for t in np.linspace(0,1,FRAME_COUNT)]
    args.output.mkdir(parents=True,exist_ok=True)
    frames[-1].save(args.output/'sunny.webp',quality=86,method=6)
    frames[0].save(args.output/'sunny-motion.webp',save_all=True,append_images=frames[1:],
                   duration=FRAME_MS,loop=1,quality=71,method=6,minimize_size=True,allow_mixed=True)
    print(f'Rendered {len(triangles):,} triangles, {len(targets)} controls and {len(frames)} frames.')
