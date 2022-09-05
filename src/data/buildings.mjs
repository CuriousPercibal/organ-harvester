import {EAST, NORTH, SOUTH, WEST} from "./directions.js";

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
        src: "public/assets/buildings/default.svg"
    },
    {
        id: BUILDING_ID.MORGUE,
        name: "morgue",
        src: "public/assets/buildings/morgue.svg",
    },
    {
        id: BUILDING_ID.FUNERAL_HOME,
        name: "morgue",
        src: "public/assets/buildings/funeral_home.svg",
    },
    {
        id: BUILDING_ID.HOSPITAL,
        name: "morgue",
        src: "public/assets/buildings/morgue.svg",
    },
    {
        id: BUILDING_ID.BELT_N,
        name: "North facing belt",
        buildable: true,
        state: "NORTH",
    },
    {
        id: BUILDING_ID.BELT_E,
        name: "East facing belt",
        buildable: true,
        state: "EAST",
    },
    {
        id: BUILDING_ID.BELT_S,
        name: "South facing belt",
        buildable: true,
        state: "SOUTH",
    },
    {
        id: BUILDING_ID.BELT_W,
        name: "West facing belt",
        buildable: true,
        state: "WEST",
    },
    {
        id: BUILDING_ID.COFFINATOR,
        name: "Coffinator",
        src: "public/assets/buildings/coffinator.svg",
        buildable: true,
    },
    {
        id: BUILDING_ID.CASKETINATOR,
        name: "Casketinator",
        src: "public/assets/buildings/casketinator.svg",
        buildable: true,
    },
    {
        id: BUILDING_ID.INCINERATOR,
        name: "Incinerator",
        src: "public/assets/buildings/incinerator.svg",
        buildable: true,
    },
    {
        id: BUILDING_ID.DELETE,
        name: "Delete",
        src: "public/assets/items/cross.svg",
    },
    {
        id: BUILDING_ID.MERGER_N,
        name: "North facing merger",
        buildable: true,
        state: "NORTH",
    },
    {
        id: BUILDING_ID.MERGER_E,
        name: "East facing merger",
        buildable: true,
        state: "EAST",
    },
    {
        id: BUILDING_ID.MERGER_S,
        name: "South facing merger",
        buildable: true,
        state: "SOUTH",
    },
    {
        id: BUILDING_ID.MERGER_W,
        name: "West facing merger",
        buildable: true,
        state: "WEST",
    },
    {
        id: BUILDING_ID.FILTER_N,
        name: "North facing filter",
        buildable: true,
        state: "NORTH",
    },
    {
        id: BUILDING_ID.FILTER_E,
        name: "East facing filter",
        buildable: true,
        state: "EAST",
    },
    {
        id: BUILDING_ID.FILTER_S,
        name: "South facing filter",
        buildable: true,
        state: "SOUTH",
    },
    {
        id: BUILDING_ID.FILTER_W,
        name: "West facing filter",
        buildable: true,
        state: "WEST",
    },
])