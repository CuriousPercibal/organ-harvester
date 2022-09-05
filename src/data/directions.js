export const NORTH = Object.seal({x: 0, y: -1})
export const SOUTH = Object.seal({x: 0, y: 1})
export const EAST = Object.seal({x: 1, y: 0})
export const WEST = Object.seal({x: -1, y: 0})

export function fromName(name) {
    switch (name) {
        case "NORTH": return NORTH
        case "SOUTH": return SOUTH
        case "EAST": return EAST
        case "WEST": return WEST
    }
}