import {EAST, NORTH, SOUTH, WEST} from "./directions.js";

export const BUILDINGS = Object.seal(
    {
      DEFAULT: 0,
      MORGUE: 1,
      BELT_N: 2,
      BELT_E: 3,
      BELT_S: 4,
      BELT_W: 5,
      COFFINATOR: 6,
      DELETE: 7,
      MERGER_N: 8,
      MERGER_E: 9,
      MERGER_S: 10,
      MERGER_W: 11,
      FILTER_N: 12,
      FILTER_E: 13,
      FILTER_S: 14,
      FILTER_W: 15
    }
)

export const buildings = Object.seal([
  {
    id: BUILDINGS.DEFAULT,
    name: "default",
    src: "public/assets/buildings/default.svg"
  },
  {
    id: BUILDINGS.MORGUE,
    name: "morgue",
    src: "public/assets/buildings/morgue.svg",
  },
  {
    id: BUILDINGS.BELT_N,
    name: "North facing belt",
    buildable: true,
    state: "NORTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_E,
    name: "East facing belt",
    buildable: true,
    state: "EAST",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_S,
    name: "South facing belt",
    buildable: true,
    state: "SOUTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_W,
    name: "West facing belt",
    buildable: true,
    state: "WEST",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.COFFINATOR,
    name: "Coffinator",
    src: "public/assets/buildings/coffinator.svg",
    buildable: true,
    width: 2,
    height: 2
  },
  {
    id: BUILDINGS.DELETE,
    name: "Delete",
    src: "public/assets/items/cross.svg",
  },
  {
    id: BUILDINGS.MERGER_N,
    name: "North facing merger",
    buildable: true,
    state: "NORTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.MERGER_E,
    name: "East facing merger",
    buildable: true,
    state: "EAST",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.MERGER_S,
    name: "South facing merger",
    buildable: true,
    state: "SOUTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.MERGER_W,
    name: "West facing merger",
    buildable: true,
    state: "WEST",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.FILTER_N,
    name: "North facing filter",
    buildable: true,
    state: "NORTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.FILTER_E,
    name: "East facing filter",
    buildable: true,
    state: "EAST",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.FILTER_S,
    name: "South facing filter",
    buildable: true,
    state: "SOUTH",
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.FILTER_W,
    name: "West facing filter",
    buildable: true,
    state: "WEST",
    width: 1,
    height: 1
  },
])