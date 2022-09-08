import {FIRST_NAMES} from "./firstnames.mjs";
import {LAST_NAMES} from "./lastnames.mjs";
import {ITEMS} from "../data/items.mjs";

export const SPEED = 0.07

export const POOL_SIZE = 1000
export const POOL = Array(POOL_SIZE)
const entityBlueprint = {index: 0, id: -1, active: false, position: {x: 0, y: 0}}

function initPool() {
    for (let i = 0; i < POOL.length; i++) {
        const clone = Object.assign({}, entityBlueprint)
        clone.index = i
        POOL[i] = clone
    }
}

export function spawnEntity(entityId, spawnPosition) {
    const firstInactive = POOL.find(value => !value.active)
    if (!firstInactive) {
        console.log("Max number of entities reached")
        return
    }
    const firstName = FIRST_NAMES[Math.floor(Math.random()*FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)]

    firstInactive.active = true
    firstInactive.id = entityId
    firstInactive.position = spawnPosition
    firstInactive.name = `${firstName} ${lastName}`
}

export function setEntityPosition(entity, position) {
    const pos = entity.position
    pos.x = position.x
    pos.y = position.y
}


export function corpseTransformator(id) {
    return function (building, entity) {
        if (Math.abs(entity.position.y - building.position.y) > 0.1 && building.position.x > building.position.x) {
            return
        }

        if (entity.id === ITEMS.CORPSE) {
            entity.originalId = entity.id
            entity.id = id
        }

        setEntityPosition(entity, {x: building.position.x-0.6, y: building.position.y})
    }
}

initPool()