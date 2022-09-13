import {loadImage, objectUrlFromTemplate} from "../modules/loader.mjs";
import {healthyHeartPalette, heartTemplate, rottenHeartPalette} from "../items/heart.mjs";
import {healthyKidneyPalette, kidneyTemplate, rottenKidneyPalette} from "../items/kidney.mjs";
import {healthyLiverPalette, liverTemplate, rottenLiverPalette} from "../items/liver.mjs";
import {corpseSvg} from "../entities/corpse.mjs";
import {coffinSvg} from "../entities/coffin.mjs";

export const ITEMS = {
    CORPSE: 0,
    COFFIN: 1,
    CASKET: 2,
    URN: 3,
    LIVER: 4,
    BAD_LIVER: 5,
    HEART: 6,
    BAD_HEART: 7,
    KIDNEY: 8,
    BAD_KIDNEY: 9,
    PATIENT: 10
}

export const items = [
    {
        id: ITEMS.CORPSE,
        name: "corpse",
        img: await loadImage(objectUrlFromTemplate(corpseSvg))
    },
    {
        id: ITEMS.COFFIN,
        name: "coffin",
        img: await loadImage(objectUrlFromTemplate(coffinSvg))
    },
    {
        id: ITEMS.CASKET,
        name: "casket",
        img: await loadImage("assets/items/casket.svg")
    },
    {
        id: ITEMS.URN,
        name: "urn",
        img: await loadImage("assets/items/urn.svg")
    },
    {
        id: ITEMS.LIVER,
        name: "liver",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(liverTemplate, healthyLiverPalette)))
    },
    {
        id: ITEMS.BAD_LIVER,
        name: "rotten liver",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(liverTemplate, rottenLiverPalette)))
    },
    {
        id: ITEMS.HEART,
        name: "heart",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(heartTemplate, healthyHeartPalette)))
    },
    {
        id: ITEMS.BAD_HEART,
        name: "rotten heart",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(heartTemplate, rottenHeartPalette)))
    },
    {
        id: ITEMS.KIDNEY,
        name: "kidney",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(kidneyTemplate, healthyKidneyPalette)))
    },
    {
        id: ITEMS.BAD_KIDNEY,
        name: "rotten kidney",
        decomposable: true,
        img: await loadImage(objectUrlFromTemplate(fillTemplate(kidneyTemplate, rottenKidneyPalette)))
    }
]

function fillTemplate(template, palette = []) {
    let filledTemplate = template
    palette.forEach((value, index) => filledTemplate = filledTemplate.replaceAll(`%color${index}`, value))
    return filledTemplate
}