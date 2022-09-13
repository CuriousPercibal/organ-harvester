import {EAST, NORTH, SOUTH, WEST} from "./directions.mjs";
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

const filterDescription = "Filters out "
const filters = {
    bad_organ: false,
    urn: false,
    casket: false,
    coffin: false,
}

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
        FILTER_N: 12,
        FILTER_E: 13,
        FILTER_S: 14,
        FILTER_W: 15,
        BIOHAZARD: 16
    }
)

export const buildings = Array.from([
    {},
    {
        id: BUILDING_ID.MORGUE,
        name: "morgue",
        img: await loadImage("assets/buildings/morgue.svg")
    },
    {
        id: BUILDING_ID.FUNERAL_HOME,
        name: "morgue",
        img: await loadImage("assets/buildings/funeral_home.svg")
    },
    {
        id: BUILDING_ID.HOSPITAL,
        name: "morgue",
        img: await loadImage("assets/buildings/hospital.svg")
    },
    {
        id: BUILDING_ID.BELT_N,
        name: "North facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate, "NORTH"),
        description: "Moves items to the north direction.",
        cost: 10
    },
    {
        id: BUILDING_ID.BELT_E,
        name: "East facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate, "EAST"),
        description: "Moves items to the east direction.",
        cost: 10
    },
    {
        id: BUILDING_ID.BELT_S,
        name: "South facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate, "SOUTH"),
        description: "Moves items to the south direction.",
        cost: 10
    },
    {
        id: BUILDING_ID.BELT_W,
        name: "West facing belt",
        buildable: true,
        img: await loadRotatable(beltTemplate, "WEST"),
        description: "Moves items to the west direction.",
        cost: 10
    },
    {
        id: BUILDING_ID.COFFINATOR,
        name: "Coffinator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, coffinatorContent.replace('#coffin', coffinSvg).replace('#corpse', corpseSvg)))),
        description: "Puts a corpse into a coffin.",
        cost: 100
    },
    {
        id: BUILDING_ID.CASKETINATOR,
        name: "Casketinator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, casketinatorContent.replace('#corpse', corpseSvg)))),
        description: "Puts a corpse into a casket.",
        cost: 100
    },
    {
        id: BUILDING_ID.INCINERATOR,
        name: "Incinerator",
        buildable: true,
        img: await loadImage(objectUrlFromTemplate(fillBuildingTemplate(buildingTemplate, incineratorContent))),
        description: "Incinerates a corpse and puts its ashes into a urn.",
        cost: 100
    },
    {
        id: BUILDING_ID.DELETE,
        name: "Delete",
        img: await loadImage("assets/items/cross.svg")
    },
    {
        id: BUILDING_ID.FILTER_N,
        name: "North facing filter",
        description: filterDescription,
        buildable: true,
        img: await loadRotatable(filterTemplate, "NORTH"),
        cost: 250,
        filters
    },
    {
        id: BUILDING_ID.FILTER_E,
        name: "East facing filter",
        description: filterDescription,
        buildable: true,
        img: await loadRotatable(filterTemplate, "EAST"),
        cost: 250,
        filters
    },
    {
        id: BUILDING_ID.FILTER_S,
        name: "South facing filter",
        description: filterDescription,
        buildable: true,
        img: await loadRotatable(filterTemplate, "SOUTH"),
        cost: 250,
        filters
    },
    {
        id: BUILDING_ID.FILTER_W,
        name: "West facing filter",
        description: filterDescription,
        buildable: true,
        img: await loadRotatable(filterTemplate, "WEST"),
        cost: 250,
        filters
    },
    {
        id: BUILDING_ID.BIOHAZARD,
        name: "Biohazard disposal",
        description: "Destroys biological hazards.",
        buildable: true,
        img: await loadImage("assets/buildings/biohazard.svg"),
        cost: 1000
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

