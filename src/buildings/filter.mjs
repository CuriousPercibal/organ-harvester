import {CASKET, COFFIN, isCollidingWithAnyEntityAtPosition, URN} from "../entities/entity.mjs";
import {BUILDING_ID} from "../data/buildings.mjs";
import {EAST, NORTH, SOUTH, WEST} from "../data/directions.mjs";

export const filterTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(#deg) translate(#t1 #t2)">
        <rect width="64" height="64" fill="#2f2f2f" x="0" y="0" stroke="#5f5f5f" stroke-width="4"/>
        <line x1="33" x2="20" y1="15" y2="5" stroke-width="2" stroke="#c0f734"/>
        <line x1="32" x2="45" y1="15" y2="5" stroke-width="2" stroke="#c0f734"/>
        <line x1="33" x2="28" y1="59" y2="54" stroke-width="2" stroke="#c0f734"/>
        <line x1="32" x2="37" y1="59" y2="54" stroke-width="2" stroke="#c0f734"/>
        <line x1="10" x2="5" y1="28" y2="33" stroke-width="2" stroke="#cc2f2f"/>
        <line x1="10" x2="5" y1="37" y2="32" stroke-width="2" stroke="#cc2f2f"/>
    </g>
    <polygon points="22,22 30,32 30,44 34,42 34,32, 42,22" fill="#c0f734" stroke-width="2" stroke="#7ceb44"/>
</svg>
`

export const filters = {
    bad_organ: false,
    urn: false,
    casket: false,
    coffin: false,
}

export function filter(filters) {
    let filter = Object.assign({}, filters);
    return function (building, entity) {
        const [input, filter_out, other_out] = getTable(building.id)

        if (Math.sign(entity.x * input.x) > 0 || Math.sign(entity.y*input.y) > 0 ) {
            return
        }

        let newPos;
        if ( (filter.bad_organ && (entity.liver || entity.kidney || entity.heart)) ||
            (filter.urn && entity.method === URN) ||
            (filter.casket && entity.method === CASKET) ||
            (filter.coffin && entity.method === COFFIN)) {
            newPos = {
                x: building.position.x + 1.5 * filter_out.x,
                y: building.position.y + 1.5 * filter_out.y,
            }
        } else {
            newPos = {
                x: building.position.x + 1.5 * other_out.x,
                y: building.position.y + 1.5 * other_out.y,
            }
        }

        if (isCollidingWithAnyEntityAtPosition(entity, newPos)) {
            console.log("Output is stuck!")
            return
        }

        entity.position = newPos
    }
}

function getTable(id) {
    switch (id) {
        case BUILDING_ID.FILTER_E: return [NORTH, WEST, EAST]
        case BUILDING_ID.FILTER_S: return [EAST, NORTH, SOUTH]
        case BUILDING_ID.FILTER_W: return [SOUTH, EAST, WEST]
        default: return [WEST, SOUTH, NORTH]
    }
}