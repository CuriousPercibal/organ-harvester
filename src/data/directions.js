export const NORTH = Object.freeze({x: 0, y: -1})
export const SOUTH = Object.freeze({x: 0, y: 1})
export const EAST = Object.freeze({x: 1, y: 0})
export const WEST = Object.freeze({x: -1, y: 0})

export function fromName(name) {
    switch (name) {
        case "NORTH": return NORTH
        case "SOUTH": return SOUTH
        case "EAST": return EAST
        case "WEST": return WEST
    }
}