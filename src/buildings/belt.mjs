import {EAST, NORTH, SOUTH, WEST} from "../data/directions.mjs";
import {BUILDING_ID} from "../data/buildings.mjs";
import {isCollidingWithAnyEntityAtPosition} from "../entities/entity.mjs";

const BELT_SPEED = 0.05
export const beltTemplate = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <defs>
        <g id="arrow">
            <line x1="54" x2="31" y1="22" y2="0" stroke="#0f0f0f" stroke-width="4"/>
            <line x1="10" x2="33" y1="22" y2="0" stroke="#0f0f0f" stroke-width="4"/>
        </g>
    </defs>
    <g transform="rotate(#deg) translate(#t1 #t2)">
        <rect width="44" height="64" fill="#2f2f2f" x="10" y="0" />
        <use href="#arrow"/>
        <use href="#arrow" transform="translate(0 -16)"/>
        <use href="#arrow" transform="translate(0 16)"/>
        <use href="#arrow" transform="translate(0 32)"/>
        <use href="#arrow" transform="translate(0 48)"/>
        <line x1="10" x2="10" y1="0" y2="64" stroke="#3f3f3f" stroke-width="4"/>
        <line x1="54" x2="54" y1="0" y2="64" stroke="#3f3f3f" stroke-width="4"/>
    </g>
</svg>
`

export function moveEntityOnBelt(belt, entity) {
    const direction = determineDirection(belt, entity)
    moveEntity(entity, direction)
}

function determineDirection(belt, entity) {
    const x = belt.position.x
    const y = belt.position.y
    const ex = x - entity.position.x + 0.5
    const ey = y - entity.position.y + 0.5
    if ((belt.id === BUILDING_ID.BELT_N || belt.id === BUILDING_ID.BELT_S) && ex < 0.45) {
        return WEST
    }
    if ((belt.id === BUILDING_ID.BELT_N || belt.id === BUILDING_ID.BELT_S) && ex > 0.55) {
        return EAST
    }
    if ((belt.id === BUILDING_ID.BELT_E || belt.id === BUILDING_ID.BELT_W) && ey < 0.45) {
        return NORTH
    }
    if ((belt.id === BUILDING_ID.BELT_E || belt.id === BUILDING_ID.BELT_W) && ey > 0.55) {
        return SOUTH
    }
    switch (belt.id) {
        case BUILDING_ID.BELT_N:
            return NORTH
        case BUILDING_ID.BELT_E:
            return EAST
        case BUILDING_ID.BELT_S:
            return SOUTH
        case BUILDING_ID.BELT_W:
            return WEST
    }
}

export function moveEntity(entity, direction) {
    const x = entity.position.x + direction.x * BELT_SPEED
    const y = entity.position.y + direction.y * BELT_SPEED

    if (isCollidingWithAnyEntityAtPosition(entity, {x, y})) {
        return
    }

    entity.position = {x, y}
}

export function isColliding(belt, entity) {
    const x = belt.position.x
    const y = belt.position.y
    const ex = Math.abs(x - entity.position.x)
    const ey = Math.abs(y - entity.position.y)
    return ex < 0.5 && ey <= 0.5
}