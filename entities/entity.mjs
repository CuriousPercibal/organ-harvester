export const SPEED = 0.05
export const NORTH = Object.seal({x: 0, y: -SPEED})
export const SOUTH = Object.seal({x: 0, y: SPEED})
export const EAST = Object.seal({x: SPEED, y: 0})
export const WEST = Object.seal({x: -SPEED, y: 0})
export const POOL_SIZE = 100
export const POOL = Array(POOL_SIZE)
const entityBlueprint = {index: 0, id: -1, active: false, position: {x: 0, y: 0}, state: ""}

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

    firstInactive.active = true
    firstInactive.id = entityId
    firstInactive.position = spawnPosition
}

export function moveEntity(index, direction) {
    const entity = POOL.find((value, index1) => index1 === index)
    if (!entity) {
        console.log(`Entity with index ${index} not found`)
        return
    }
    const pos = entity.position
    pos.x += direction.x
    pos.y += direction.y
    entity.position = pos
}

initPool()