import {BUILDINGS, buildings} from '../data/buildings.mjs'
import {itemSet} from '../data/items.mjs'
import {mergerTemplate} from "../buildings/merger.js";
import {beltTemplate} from "../buildings/belt.mjs";

export const items = {}

export async function loadAssets() {
    for (const tile of buildings) {
        if (tile.src) {
            tile.img = await loadImage(tile.src)
        }
        else {
            tile.img = await loadRotatable(tile.id, tile.state)
        }
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

function loadRotatable(id, facing) {
    let src;
    if ([BUILDINGS.MERGER_W, BUILDINGS.MERGER_S, BUILDINGS.MERGER_N, BUILDINGS.MERGER_E].some(value => value === id)) {
        src = fillImageTemplate(mergerTemplate, facing)
    }
    if ([BUILDINGS.BELT_W, BUILDINGS.BELT_S, BUILDINGS.BELT_N, BUILDINGS.BELT_E].some(value => value === id)) {
        src = fillImageTemplate(beltTemplate, facing)
    }
    console.log(src)
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(new Blob([src], {type: 'image/svg+xml'}));
    })
}

function fillImageTemplate(template, facing) {
    switch (facing) {
        case "NORTH":
            return replaceInTemplate(template, "0", "0", "0")
        case "EAST":
            return replaceInTemplate(template, "90", "0", "-64")
        case "SOUTH":
            return replaceInTemplate(template, "180", "-64", "-64")
        case "WEST":
            return replaceInTemplate(template, "-90", "-64", "0")
        default:
            return replaceInTemplate(template, "0", "0", "0")
    }
}

function replaceInTemplate(template, deg, t1, t2) {
    return template.replace('%deg', deg)
        .replace('%t1', t1)
        .replace('%t2', t2);
}