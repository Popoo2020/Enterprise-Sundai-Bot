"""Bake the fixed-camera glance and nod used on the home and detail pages.

Run with Pillow, NumPy and SciPy. The original texture is the site's transparent
256 px portrait. The facial surface turns about the neck, the irises lead the
neck movement, and the resting hand stays planted. Export a WebP strip for the
detail pages and a one-shot animation for the homepage from the same frames.
"""
from pathlib import Path
import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

PUBLIC = Path(__file__).resolve().parents[3] / 'site/brand/crew/v2'
FRAMES, TILE = 15, 160
# Coordinates refer to the 256 px portraits, in the fixed view of each card.
ACTORS = {
    'mark': {'neck': (141, 182), 'nose': (117, 130), 'eye': [(103, 108), (140, 122)], 'hand': (31, 205)},
    'bot': {'neck': (131, 200), 'nose': (85, 146), 'eye': [(68, 126), (109, 139)], 'hand': (62, 190)},
}


def oval(x, y, cx, cy, rx, ry):
    return np.exp(-0.5 * (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2))


def impulse(progress, start, duration):
    t = np.clip((progress - start) / duration, 0, 1)
    return np.sin(np.pi * t) ** 2


def bake(name, rig):
    source = np.array(Image.open(PUBLIC / (name + '.webp')).convert('RGBA'), dtype=np.float32) / 255
    source[:, :, :3] *= source[:, :, 3:4]
    y, x = np.mgrid[:256, :256].astype(np.float32)
    neck_x, neck_y = rig['neck']
    nose_x, nose_y = rig['nose']
    head = np.clip((neck_y + 12 - y) / 37, 0, 1)
    # Raised nose, cheeks and forehead catch the largest amount of parallax.
    depth = (17 + 29 * oval(x, y, nose_x, nose_y, 17, 22) +
             19 * oval(x, y, nose_x + 16, nose_y - 19, 50, 59)) * head
    eyes = sum(oval(x, y, ex, ey, 4.9, 5.4) for ex, ey in rig['eye'])
    hand = oval(x, y, *rig['hand'], 18, 16)
    sheet = Image.new('RGBA', (FRAMES * TILE, TILE))
    frames = []
    for i in range(FRAMES):
        t = i / (FRAMES - 1)
        turn = impulse(t, .07, .93)
        look = impulse(t, 0, .85)
        rx, ry, rz = np.radians((-8 * turn, -6 * turn, -2.7 * turn))
        xx, yy = x - neck_x, y - neck_y
        # Rotating the reference-projected 3D relief leaves a thicker nose
        # moving more than the silhouette. Only inverse-map visible texels.
        vx = xx * np.cos(ry) + depth * np.sin(ry)
        zz = -xx * np.sin(ry) + depth * np.cos(ry)
        vy = yy * np.cos(rx) - zz * np.sin(rx)
        dx = head * (vx * np.cos(rz) - vy * np.sin(rz) - xx) - 2.1 * look * eyes
        dy = head * (vx * np.sin(rz) + vy * np.cos(rz) - yy) + 1.8 * look * eyes
        dx -= (1.6 if name == 'mark' else .45) * hand * look
        dy += (1.1 if name == 'mark' else .25) * hand * look
        warped = np.stack([map_coordinates(source[:, :, c], (y - dy, x - dx), order=1, mode='constant') for c in range(4)], axis=-1)
        alpha = warped[:, :, 3:4]
        warped[:, :, :3] = np.divide(warped[:, :, :3], alpha, out=np.zeros_like(warped[:, :, :3]), where=alpha > 1e-5)
        tile = Image.fromarray(np.uint8(np.clip(warped * 255 + .5, 0, 255))).resize((TILE, TILE), Image.Resampling.LANCZOS)
        sheet.paste(tile, (i * TILE, 0))
        frames.append(tile)
    sheet.save(PUBLIC / (name + '-cue.webp'), quality=74, method=6, exact=True)
    frames[0].save(PUBLIC / (name + '-motion.webp'), save_all=True,
                   append_images=frames[1:], duration=80, loop=1, quality=72,
                   method=6, minimize_size=True)


if __name__ == '__main__':
    for actor, rig in ACTORS.items():
        bake(actor, rig)
