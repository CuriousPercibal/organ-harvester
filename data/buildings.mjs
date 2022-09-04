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
      BULLDOZER: 7,
    }
)

export const buildings = Object.seal([
  {
    id: BUILDINGS.DEFAULT,
    name: "default",
    src: "assets/buildings/default.svg"
  },
  {
    id: BUILDINGS.MORGUE,
    name: "morgue",
    src: "assets/buildings/morgue.svg",
  },
  {
    id: BUILDINGS.BELT_N,
    name: "North facing belt",
    src: "assets/buildings/belt_n.svg",
    state: "NORTH",
    buildable: true,
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_E,
    name: "East facing belt",
    src: "assets/buildings/belt_e.svg",
    state: "EAST",
    buildable: true,
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_S,
    name: "South facing belt",
    src: "assets/buildings/belt_s.svg",
    state: "SOUTH",
    buildable: true,
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.BELT_W,
    name: "West facing belt",
    src: "assets/buildings/belt_w.svg",
    state: "WEST",
    buildable: true,
    width: 1,
    height: 1
  },
  {
    id: BUILDINGS.COFFINATOR,
    name: "Coffinator",
    src: "assets/buildings/coffinator.svg",
    buildable: true,
    width: 2,
    height: 2
  },
  {
    id: BUILDINGS.BULLDOZER,
    name: "Bullodozer",
    src: "assets/items/cross.svg",
  }
])