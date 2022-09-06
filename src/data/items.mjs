import {loadImage} from "../modules/loader.mjs";

export const ITEMS = {
    CORPSE: 1,
    COFFIN: 2,
    CASKET: 3,
    URN: 4,
    LIVER: 5,
    BAD_LIVER: 6,
    HEART: 7,
    BAD_HEART: 8,
    KIDNEY: 9,
    BAD_KIDNEY: 10,
    PATIENT: 11
}

export const items = [
    {
        id: ITEMS.CORPSE,
        name: "corpse",
        img: await loadImage("public/assets/items/corpse.svg")
    },
    {
        id: ITEMS.COFFIN,
        name: "coffin",
        img: await loadImage("public/assets/items/coffin.svg")
    },
    {
        id: ITEMS.CASKET,
        name: "casket",
        img: await loadImage("public/assets/items/casket.svg")
    },
    {
        id: ITEMS.URN,
        name: "urn",
        img: await loadImage("public/assets/items/urn.svg")
    },
    {
        id: ITEMS.LIVER,
        name: "liver",
        decomposable: true,
        img: await loadImage("public/assets/items/liver.svg")
    },
    {
        id: ITEMS.BAD_LIVER,
        name: "rotten liver",
        decomposable: true,
        img: await loadImage("public/assets/items/bad_liver.svg")
    },
    {
        id: ITEMS.HEART,
        name: "heart",
        decomposable: true,
        img: await loadImage("public/assets/items/heart.svg")
    },
    {
        id: ITEMS.BAD_HEART,
        name: "rotten heart",
        decomposable: true,
        img: await loadImage("public/assets/items/bad_heart.svg")
    },
    {
        id: ITEMS.KIDNEY,
        name: "kidney",
        decomposable: true,
        img: await loadImage("public/assets/items/kidney.svg")
    },
    {
        id: ITEMS.BAD_KIDNEY,
        name: "rotten kidney",
        decomposable: true,
        img: await loadImage("public/assets/items/bad_kidney.svg")
    },
    {
        id: ITEMS.PATIENT,
        name: "patient",
        img: await loadImage("public/assets/items/urn.svg")
    }
]