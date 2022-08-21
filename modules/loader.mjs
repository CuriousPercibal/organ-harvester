import {tileSet} from '../data/tiles.mjs'
import {itemSet} from '../data/items.mjs'

export const buildings = {}
export const items = {}

export async function loadAssets() {
    for (const tile of tileSet) {
        buildings[tile.id] = await loadImage(tile.src)
    }
    for (const item of itemSet) {
        items[item.id] = await loadImage(item.src)
    }
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    })
}