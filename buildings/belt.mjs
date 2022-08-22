import {moveEntity} from "../entities/entity.mjs";
import {nameToDirection, EAST, WEST, NORTH, SOUTH} from "../data/directions.js";

export function moveEntityOnBelt(belt, entity) {
    console.log({belt, entity})
    const direction = determineDirection(belt, entity)
    console.log(direction)
    moveEntity(entity.index, direction)
}

function determineDirection(belt, entity) {
    const [x, y] = getCenterDirection(belt, entity)
    const facing = belt.state.toUpperCase()
    console.log(facing)
    const [first, second, direction] = getDirectionsForFacing(facing)
    console.log({x, y})
    console.log({first, second, direction})
    if ( facing === "NORTH" || facing === "SOUTH" ) {
        if (x < 0.45) return first
        if (x > 0.55) return second
    }
    if ( facing === "EAST" || facing === "WEST" ) {
        if (y < 0.45) return first
        if (y > 0.55) return second
    }
    return direction
}

function getDirectionsForFacing(facing) {
    switch (facing) {
        case 'NORTH':
            return [EAST, WEST, NORTH];
        case 'SOUTH':
            return [EAST, WEST, SOUTH];
        case 'EAST':
            return [SOUTH, NORTH, EAST];
        case 'WEST':
            return [SOUTH, NORTH, WEST];
    }
}

function getCenterDirection(belt, entity) {
    const x = Math.round((entity.position.x + 0.5 + Number.EPSILON) * 100) / 100
    const y = Math.round((entity.position.y + 0.5 + Number.EPSILON) * 100) / 100
    const bx = belt.position.x
    const by = belt.position.y
    const cx = Math.abs(x -bx)
    const cy = Math.abs(y -by)
    return [cx, cy]
}

export function isEntityCollidingWithBelt(belt, entity) {
    const [x, y] = getCenterDirection(belt, entity)
    return x <=1 && y <=1 && x >= 0 && y >= 0
}