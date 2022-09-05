import {BUILDING_ID, buildings} from '../data/buildings.mjs'
import {itemSet} from '../data/items.mjs'
import {mergerTemplate} from "../buildings/merger.js";
import {beltTemplate} from "../buildings/belt.mjs";
import {filterTemplate} from "../buildings/filter.mjs";

export const items = {}

export async function loadAssets() {
    for (const tile of buildings) {
        console.log(tile.id)
        if (tile.src) {
            tile.img = await loadImage(tile.src)
        } else {
            tile.img = await loadRotatable(tile.id, tile.state)
        }
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
    if (id >= BUILDING_ID.MERGER_N && id <= BUILDING_ID.MERGER_W) {
        src = fillImageTemplate(mergerTemplate, facing)
    }
    if (id >= BUILDING_ID.BELT_N && id <= BUILDING_ID.BELT_W) {
        src = fillImageTemplate(beltTemplate, facing)
    }
    if (id >= BUILDING_ID.FILTER_N && id <= BUILDING_ID.FILTER_W) {
        src = fillImageTemplate(filterTemplate, facing)
    }
    return loadImage(URL.createObjectURL(new Blob([src], {type: 'image/svg+xml'})))
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