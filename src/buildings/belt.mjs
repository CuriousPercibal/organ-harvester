import {POOL} from "../entities/entity.mjs";
import {EAST, fromName, NORTH, SOUTH, WEST} from "../data/directions.js";

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
    const x = belt.position.x
    const y = belt.position.y
    const ex = x - entity.position.x + 0.5
    const ey = y - entity.position.y + 0.5
    const facing = belt.state.toUpperCase()
    if ((facing === "NORTH" || facing === "SOUTH") && ex < 0.45) {
        return WEST
    }
    if ((facing === "NORTH" || facing === "SOUTH") && ex > 0.55) {
        return EAST
    }
    if ((facing === "EAST" || facing === "WEST") && ey < 0.45) {
        return NORTH
    }
    if ((facing === "EAST" || facing === "WEST") && ey > 0.55) {
        return SOUTH
    }
    return fromName(facing)
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

export function isEntityCollidingWithBelt(belt, entity) {
    const x = belt.position.x
    const y = belt.position.y
    const ex = Math.abs(x - entity.position.x)
    const ey = Math.abs(y - entity.position.y)
    return ex < 0.5 && ey <= 0.5
}