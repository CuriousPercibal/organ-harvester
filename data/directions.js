export const NORTH = Object.seal({x: 0, y: -1})
export const SOUTH = Object.seal({x: 0, y: 1})
export const EAST = Object.seal({x: 1, y: 0})
export const WEST = Object.seal({x: -1, y: 0})

const directions = Object.seal({
    NORTH, SOUTH, EAST, WEST
})

export function nameToDirection(directionName) {
    console.log(directionName)
    return directions[directionName.toUpperCase()]
}

export function directionToName(direction) {
    for (const dir in directions) {
        if (directions[dir].x === direction.x && directions[dir].y === direction.y)
            return directions[dir]
    }
    return {x:0, y:0}
}