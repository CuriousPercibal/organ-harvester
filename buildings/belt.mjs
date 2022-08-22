import {moveEntity} from "../entities/entity.mjs";
import {nameToDirection, EAST, WEST, NORTH, SOUTH} from "../data/directions.js";

const facingSouth = {
    nq: SOUTH,
    eq: WEST,
    wq: EAST,
    sq: SOUTH
}

const facingNorth = {
    nq: NORTH,
    eq: WEST,
    wq: EAST,
    sq: NORTH
}

const facingEast = {
    nq: SOUTH,
    eq: EAST,
    wq: EAST,
    sq: NORTH
}

const facingWest = {
    nq: SOUTH,
    eq: WEST,
    wq: WEST,
    sq: NORTH
}

export function moveEntityOnBelt(belt, entity) {
    console.log(belt)
    const direction = determineDirection(belt, entity)
    console.log(direction)
    moveEntity(entity.index, direction)
}

function determineDirection(belt, entity) {
    const x = entity.position.x - belt.position.x
    const y = entity.position.y - belt.position.y
    const direction = nameToDirection(belt.state)
    if ((Math.abs(x) < 0.15 && Math.abs(y) < 0.15) || (Math.round(x) === direction.x && Math.round(y) === direction.y)) {
        console.log({direction})
        return direction
    }
    console.log('Center', {x, y})
    return {x, y}
}

function getFacing(belt) {
    switch (belt.state) {
        case 'NORTH':
            return facingNorth;
        case 'SOUTH':
            return facingSouth;
        case 'EAST':
            return facingEast;
        case 'WEST':
            return facingWest;
    }
}

export function isEntityCollidingWithBelt(belt, entity) {
    const x = Math.round(entity.position.x)
    const y = Math.round(entity.position.y)
    const bx = belt.position.x
    const by = belt.position.y
    console.log("Colliding: ", x >= bx && y >= by && x <= (bx + 1) && y <= (by + 1), entity)
    return x >= bx && y >= by && x <= (bx + 1) && y <= (by + 1)
}