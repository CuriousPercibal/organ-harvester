import {buildings} from '../data/buildings.mjs'
import {itemSet} from '../data/items.mjs'

export const items = {}

export async function loadAssets() {
    for (const tile of buildings) {
        tile.img = await loadImage(tile.src)
        buildings[tile.id] = tile
    }
    for (const item of itemSet) {
        item.img = await loadImage(item.src)
        items[item.id] = item
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