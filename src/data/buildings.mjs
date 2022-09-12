import {EAST, NORTH, SOUTH, WEST} from "./directions.js";
import {mergerTemplate} from "../buildings/merger.js";
import {beltTemplate} from "../buildings/belt.mjs";
import {filterTemplate} from "../buildings/filter.mjs";
import {loadImage, objectUrlFromTemplate} from "../modules/loader.mjs";
import {coffinatorContent} from "../buildings/coffinator.mjs";
import {casketinatorContent} from "../buildings/casketinator.mjs";
import {incineratorContent} from "../buildings/incinerator.mjs";
import {coffinSvg} from "../entities/coffin.mjs";
import {corpseSvg} from "../entities/corpse.mjs";

const buildingTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="64" height="64" fill="#454545" stroke-width="6" stroke="#2f2f2f"/>
    <rect x="0" y="23" width="2" height="20" fill="#736c5c"/>
    <rect x="62" y="23" width="2" height="20" fill="#736c5c"/>
    <line x1="59" x2="54" y1="28" y2="33" stroke-width="2" stroke="#c0f734"/>
    <line x1="59" x2="54" y1="37" y2="32" stroke-width="2" stroke="#c0f734"/>

    <line x1="10" x2="5" y1="28" y2="33" stroke-width="2" stroke="#c0f734"/>
    <line x1="10" x2="5" y1="37" y2="32" stroke-width="2" stroke="#c0f734"/>
    %content
</svg>
`

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
        FILTER_W: 19,
        BIOHAZARD: 20
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
        img: await loadRotatable(beltTemplate,"NORTH"),
        description: "Moves items to the north direction."
    },
    {
        id: BUILDING_ID.BELT_E,
        name: "East facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"EAST"),
        description: "Moves items to the east direction."
    },
    {
        id: BUILDING_ID.BELT_S,
        name: "South facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"SOUTH"),
        description: "Moves items to the south direction."
    },
    {
        id: BUILDING_ID.BELT_W,
        name: "West facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate,"WEST"),
        description: "Moves items to the west direction."
    },
    {
        id: BUILDING_ID.COFFINATOR,
        name: "Coffinator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, coffinatorContent.replace('#coffin', coffinSvg).replace('#corpse', corpseSvg)))),
        description: "Puts a corpse into a coffin."
    },
    {
        id: BUILDING_ID.CASKETINATOR,
        name: "Casketinator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, casketinatorContent.replace('#corpse', corpseSvg)))),
        description: "Puts a corpse into a casket."
    },
    {
        id: BUILDING_ID.INCINERATOR,
        name: "Incinerator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, incineratorContent))),
        description: "Incinerates a corpse and puts its ashes into a urn."
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
    {
        id: BUILDING_ID.BIOHAZARD,
        name: "Biohazard disposal",
        buildable: true,
        img: await loadImage("public/assets/buildings/biohazard.svg")
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
    }
}

function replaceInTemplate(template, deg, t1, t2) {
    return template.replace('#deg', deg)
        .replace('#t1', t1)
        .replace('#t2', t2);
}

function fillBuildingTemplate(template, content) {
    return template.replace('%content', content)
}

