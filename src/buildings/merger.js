import {BUILDING_ID} from "../data/buildings.mjs";
import {EAST, NORTH, SOUTH, WEST} from "../data/directions.mjs";
import {isCollidingWithAnyEntityAtPosition} from "../entities/entity.mjs";

export const mergerTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(#deg) translate(#t1 #t2)">
        <rect width="64" height="64" fill="#2f2f2f" x="0" y="0" stroke="#5f5f5f" stroke-width="4"/>
        <line x1="32" x2="32" y1="20" y2="44" stroke-width="4" stroke="#7ceb44"/>
        <line x1="20" x2="44" y1="32" y2="32" stroke-width="4" stroke="#7ceb44"/>
        <path d="M5 27L 10 32 L5 37" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M27 59L 32 54 L37 59" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M59 27L 54 32 L59 37" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M20 15 L32 5 L45 15 M 32 5z" stroke="#c0f734" fill="none" stroke-width="2"/>
    </g>
</svg>
`

export function merge() {
    let inputSelector = 0;
    return function (building, entity) {
        console.log(inputSelector)
        const table = getTable(building.id)
        const output = table.pop()
        const input = table[inputSelector]

        if (Math.sign(entity.x * input.x) > 0 || Math.sign(entity.y*input.y) > 0 ) {
            inputSelector = (++inputSelector) % 3;
            return
        }

        const newPos = {
            x: building.position.x + 1.5 * output.x,
            y: building.position.y + 1.5 * output.y,
        }
        console.log(output)

        if (isCollidingWithAnyEntityAtPosition(entity, newPos)) {
            console.log("Output is stuck!")
            return
        }

        entity.position = newPos
        inputSelector = (++inputSelector) % 3;
    }
}

function getTable(id) {
    switch (id) {
        case BUILDING_ID.MERGER_E: return [NORTH, WEST, SOUTH, EAST]
        case BUILDING_ID.MERGER_S: return [EAST, NORTH, WEST, SOUTH]
        case BUILDING_ID.MERGER_W: return [SOUTH, EAST, NORTH, WEST]
        default: return [WEST, SOUTH, EAST, NORTH]
    }
}