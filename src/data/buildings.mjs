import {EAST, NORTH, SOUTH, WEST} from "./directions.js";
import {mergerTemplate} from "../buildings/merger.js";
import {beltTemplate} from "../buildings/belt.mjs";
import {filterTemplate} from "../buildings/filter.mjs";
import {loadImage, objectUrlFromTemplate} from "../modules/loader.mjs";

export const BUILDING_ID = Object.seal(
    {
        DEFAULT: 0,
        MORGUE: 1,
        FUNERAL_HOME: 2,
        HOSPITAL: 3,
        BELT_N: 4,
        BELT_E: 5,
        BELT_S: 6,
        BELT_W: 7,
        COFFINATOR: 8,
        CASKETINATOR: 9,
        INCINERATOR: 10,
        DELETE: 11,
        MERGER_N: 12,
        MERGER_E: 13,
        MERGER_S: 14,
        MERGER_W: 15,
        FILTER_N: 16,
        FILTER_E: 17,
        FILTER_S: 18,
        FILTER_W: 19
    }
)

export const buildings = Array.from([
    {
        id: BUILDING_ID.DEFAULT,
        name: "default",
        img: await loadImage("public/assets/buildings/default.svg")
    },
    {
        id: BUILDING_ID.MORGUE,
        name: "morgue",
        img: await loadImage("public/assets/buildings/morgue.svg")
    },
    {
        id: BUILDING_ID.FUNERAL_HOME,
        name: "morgue",
        img: await loadImage("public/assets/buildings/funeral_home.svg")
    },
    {
        id: BUILDING_ID.HOSPITAL,
        name: "morgue",
        img: await loadImage("public/assets/buildings/morgue.svg")
    },
    {
        id: BUILDING_ID.BELT_N,
        name: "North facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"NORTH")
    },
    {
        id: BUILDING_ID.BELT_E,
        name: "East facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"EAST")
    },
    {
        id: BUILDING_ID.BELT_S,
        name: "South facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"SOUTH")
    },
    {
        id: BUILDING_ID.BELT_W,
        name: "West facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"WEST")
    },
    {
        id: BUILDING_ID.COFFINATOR,
        name: "Coffinator",
        buildable: true,
        img: await loadImage("public/assets/buildings/coffinator.svg")
    },
    {
        id: BUILDING_ID.CASKETINATOR,
        name: "Casketinator",
        buildable: true,
        img: await loadImage("public/assets/buildings/casketinator.svg")
    },
    {
        id: BUILDING_ID.INCINERATOR,
        name: "Incinerator",
        buildable: true,
        img: await loadImage("public/assets/buildings/incinerator.svg")
    },
    {
        id: BUILDING_ID.DELETE,
        name: "Delete",
        img: await loadImage("public/assets/items/cross.svg")
    },
    {
        id: BUILDING_ID.MERGER_N,
        name: "North facing merger",
        buildable: true,
        img: await loadRotatable(mergerTemplate,"NORTH")
    },
    {
        id: BUILDING_ID.MERGER_E,
        name: "East facing merger",
        buildable: true,
        img: await loadRotatable(mergerTemplate,"EAST")
    },
    {
        id: BUILDING_ID.MERGER_S,
        name: "South facing merger",
        buildable: true,
        img: await loadRotatable(mergerTemplate,"SOUTH")
    },
    {
        id: BUILDING_ID.MERGER_W,
        name: "West facing merger",
        buildable: true,
        img: await loadRotatable(mergerTemplate,"WEST")
    },
    {
        id: BUILDING_ID.FILTER_N,
        name: "North facing filter",
        buildable: true,
        img: await loadRotatable(filterTemplate,"NORTH")
    },
    {
        id: BUILDING_ID.FILTER_E,
        name: "East facing filter",
        buildable: true,
        img: await loadRotatable(filterTemplate,"EAST")
    },
    {
        id: BUILDING_ID.FILTER_S,
        name: "South facing filter",
        buildable: true,
        img: await loadRotatable(filterTemplate,"SOUTH")
    },
    {
        id: BUILDING_ID.FILTER_W,
        name: "West facing filter",
        buildable: true,
        img: await loadRotatable(filterTemplate,"WEST")
    },
])

async function loadRotatable(template, facing) {
    return await loadImage(objectUrlFromTemplate(fillImageTemplate(template, facing)))
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