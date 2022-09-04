import {POOL} from "../entities/entity.mjs";
import {EAST, NORTH, SOUTH, WEST} from "../data/directions.js";

const BELT_SPEED = 0.05
export const beltTemplate = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <g transform="rotate(%deg) translate(%t1 %t2)">
        <rect width="44" height="64" fill="#2f2f2f" x="10" y="0" />
        <line x1="54" x2="31" y1="54" y2="32" stroke="#0f0f0f" stroke-width="4" />
        <line x1="54" x2="31" y1="70" y2="48" stroke="#0f0f0f" stroke-width="4" />
        <line x1="54" x2="31" y1="38" y2="16" stroke="#0f0f0f" stroke-width="4" />
        <line x1="54" x2="31" y1="22" y2="0" stroke="#0f0f0f" stroke-width="4" />
        <line x1="54" x2="31" y1="6" y2="-16" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="33" y1="54" y2="32" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="33" y1="70" y2="48" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="33" y1="38" y2="16" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="33" y1="22" y2="0" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="33" y1="6" y2="-16" stroke="#0f0f0f" stroke-width="4" />
        <line x1="10" x2="10" y1="0" y2="64" stroke="#3f3f3f" stroke-width="4"/>
        <line x1="54" x2="54" y1="0" y2="64" stroke="#3f3f3f" stroke-width="4"/>
    </g>
</svg>
`

export function moveEntityOnBelt(belt, entity) {
    const direction = determineDirection(belt, entity)
    moveEntity(entity.index, direction)
}

function determineDirection(belt, entity) {
    const [x, y] = getCenterDirection(belt, entity)
    const facing = belt.state.toUpperCase()
    const [first, second, direction] = getDirectionsForFacing(facing)
    if (facing === "NORTH" || facing === "SOUTH") {
        if (x < 0.45) return first
        if (x > 0.55) return second
    }
    if (facing === "EAST" || facing === "WEST") {
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

export function moveEntity(index, direction) {
    const entity = POOL.find((value, index1) => index1 === index)
    if (!entity) {
        console.log(`Entity with index ${index} not found`)
        return
    }
    const pos = entity.position
    pos.x += (direction.x * BELT_SPEED)
    pos.y += (direction.y * BELT_SPEED)
    entity.position = pos
}

function getCenterDirection(belt, entity) {
    const x = Math.round((entity.position.x + 0.5 + Number.EPSILON) * 100) / 100
    const y = Math.round((entity.position.y + 0.5 + Number.EPSILON) * 100) / 100
    const bx = belt.position.x
    const by = belt.position.y
    const cx = Math.abs(x - bx)
    const cy = Math.abs(y - by)
    return [cx, cy]
}

export function isEntityCollidingWithBelt(belt, entity) {
    const [x, y] = getCenterDirection(belt, entity)
    return x <= 1 && y <= 1 && x >= 0 && y >= 0
}