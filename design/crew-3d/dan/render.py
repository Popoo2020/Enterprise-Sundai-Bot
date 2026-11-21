"""Render Dan's fixed-camera, textured relief rig as the two website WebPs.

Run with Python, NumPy, Pillow, SciPy and Matplotlib installed:
  python design/crew-3d/dan/render.py
The silhouette, contact points and final gaze come from the approved commission.
This rig is designed for a front projection, with head and iris rotation about
separate depth pivots. The hand holding the photo stays in its rest pose.
"""

from pathlib import Path

import matplotlib.tri as mtri
import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates
from scipy.spatial.transform import Rotation

HERE = Path(__file__).resolve().parent
PUBLIC = HERE.parents[2] / "site/brand/crew/v2"
SIZE = (404, 576)
OUTPUT = (240, 342)
# Coordinates reference the original plate crop, offset from its texture.
OFFSET = np.array([32., 12.])
DURATION = 1.18
FRAMES = 22


def smooth(x):
    x = np.clip(x, 0, 1)
    return x*x*(3 - 2*x)


def radial(x, y, cx, cy, rx, ry):
    return np.exp(-((x - cx) / rx)**2 - ((y - cy) / ry)**2)


def surface(x, y):
    """Depth in texture pixels, positive toward the cinematic camera."""
    volumes = [
        (242, 214, 133, 144, 65),  # skull
        (229, 100, 102, 70, 18),   # curls
        (187, 253, 37, 30, 58),    # nose
        (135, 277, 47, 53, 22),    # near cheek
        (278, 283, 51, 53, 19),
        (157, 209, 30, 25, 19),    # round eyes
        (239, 242, 30, 25, 18),
        (354, 317, 55, 36, 17),    # outer ear
        (195, 449, 100, 68, 23),   # upper body
        (144, 484, 95, 41, 39),    # forearm
        (74, 471, 28, 52, 22),     # fingers
    ]
    z = np.zeros_like(x)
    for cx, cy, rx, ry, depth in volumes:
        z += depth * radial(x, y, cx, cy, rx, ry)
    return z


def make_mesh():
    # Vertices follow rows/columns on the photographic plate and are lifted
    # off it by the anatomical depth field. UVs preserve the signed-off fur.
    xx, yy = np.meshgrid(np.linspace(0,SIZE[0] - 1,102),
                         np.linspace(0,SIZE[1] - 1,145))
    u = xx.ravel()
    v = yy.ravel()
    x, y = u+OFFSET[0], v+OFFSET[1]
    xyz = np.column_stack((x, y, surface(x, y)))
    stride = xx.shape[1]
    tl = np.arange(xx.size).reshape(xx.shape)[:-1,:-1].reshape(-1)
    tri = np.concatenate([np.stack([tl, tl + 1, tl + stride],axis=1),
                          np.stack([tl+1, tl+stride+1, tl+stride],axis=1)])
    # Head feathered to fixed shoulder and rail; dark shirt, hand and sleeve
    # stay anchored. Eyes have their own pivot, limited by the sockets.
    head = (1-smooth((y-342)/56))*smooth((x-77)/34)
    eyes = [radial(x, y, 155, 208, 14, 14), radial(x, y, 238, 242, 14, 14)]
    rest = np.array([[225., 308., 10.],
                     [157., 210., surface(np.array(157.), np.array(210.))-17],
                     [239., 242., surface(np.array(239.), np.array(242.))-17]])
    return u, v, xyz, tri, head, eyes, rest


def angles(t):
    """Eyes find the clue first; the head follows, overshoots, then rests."""
    head_phase=smooth((t-.12)/.84)
    settle=np.sin(np.pi*np.clip((t-.78)/.40,0,1))
    turn=1-head_phase
    eye_turn=1-smooth((t-.04)/.34)
    return ([8*turn-1.1*settle, -4.3*turn+.6*settle, -1.9*turn+.3*settle],
            [17*eye_turn, 2.4*eye_turn, 0])


def rig(vertices, head, eyes, rest, t):
    head_angles, gaze_angles = angles(t)
    posed = vertices.copy()
    orientation = Rotation.from_euler('yxz', gaze_angles, degrees=True)
    for weight, pivot in zip(eyes,rest[1:]):
        local = vertices-pivot
        posed += weight[:,None]*(orientation.apply(local)-local)
    orientation = Rotation.from_euler('yxz',head_angles,degrees=True)
    local = posed-rest[0]
    return posed + head[:,None]*(orientation.apply(local)-local)


def render_frame(mesh, rgba_premult, t):
    u,v,vertices,faces,head,eyes,rest = mesh
    posed = rig(vertices, head, eyes, rest, t)
    # Orthographic camera looking along Z. Rasterize the projected triangles,
    # interpolating UVs barycentrically rather than moving a flattened bitmap.
    screen = posed[:,:2]-OFFSET
    ox,oy=screen.T
    triangles = mtri.Triangulation(ox,oy,faces)
    yy,xx=np.indices((SIZE[1],SIZE[0]))
    tri_index=triangles.get_trifinder()(xx,yy)
    visible = tri_index >= 0
    tri = faces[np.maximum(tri_index,0)]
    ix,iy=ox[tri],oy[tri]
    ax, ay = ix[...,1]-ix[...,0], iy[...,1]-iy[...,0]
    bx, by = ix[...,2]-ix[...,0], iy[...,2]-iy[...,0]
    mx, my = xx-ix[...,0], yy-iy[...,0]
    det=ax*by-bx*ay
    w1=(mx*by-my*bx)/det
    w2=(ax*my-ay*mx)/det
    weights=np.stack([1-w1-w2,w1,w2],axis=-1)
    src=np.stack([np.sum(weights*v[tri],axis=-1),np.sum(weights*u[tri],axis=-1)])
    channels = [map_coordinates(ch,src,order=1,mode='constant',cval=0)
                for ch in np.moveaxis(rgba_premult,2,0)]
    alpha = np.where(visible, channels[3],0)
    rgb=np.stack(channels[:3],axis=-1)/np.maximum(alpha[...,None],.00001)
    rgba=np.dstack((rgb,alpha))
    frame=Image.fromarray(np.uint8(rgba.clip(0,1)*255+.5))
    return frame.resize(OUTPUT,Image.Resampling.LANCZOS)


def main():
    texture = np.asarray(Image.open(HERE/'texture.webp').convert('RGBA'),
                         dtype=np.float32)/255.
    texture[:,:,:3] *= texture[:,:,3,None]
    mesh=make_mesh()
    frames=[render_frame(mesh,texture,t) for t in np.linspace(0,DURATION,FRAMES)]
    PUBLIC.mkdir(parents=True,exist_ok=True)
    # Use one identical codec family for the final static fallback and movie.
    frames[-1].save(PUBLIC/'dan.webp',quality=81,method=6)
    frames[0].save(PUBLIC/'dan-motion.webp',format='WEBP',save_all=True,
                   append_images=frames[1:],duration=round(DURATION*1000/FRAMES),
                   loop=1,quality=63,method=5,minimize_size=True)


if __name__=='__main__':
    main()
