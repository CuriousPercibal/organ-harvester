import {ITEMS} from "../data/items.mjs";

export const POOL_SIZE = 1000
export const POOL = initPool()

function initPool() {
    const pool = Array(POOL_SIZE)
    for (let i = 0; i < pool.length; i++) {
        const clone = Object.assign({}, {index: 0, id: -1, active: false, position: {x: 0, y: 0}})
        clone.index = i
        pool[i] = clone
    }
    return pool
}

function findFirstActive() {
    let firstInactive = POOL.find(value => !value?.active)
    if (!firstInactive) {
        console.error("Max number of entities reached")
        return undefined
    }
    return firstInactive
}

export function spawnEntityWithId(entityId, spawnPosition) {
    const firstInactive = findFirstActive()
    Object.assign(firstInactive, {
        active: true,
        id: entityId,
        position: spawnPosition,
        name: `Patient #${Math.floor(Math.random() * 100000)}`})
}

export function spawnEntity(entity) {
    const firstInactive = findFirstActive()
    Object.assign(firstInactive, entity)
}

export function setEntityPosition(entity, position) {
    entity.position = position
}

export function corpseTransformator(id) {
    return function (building, entity) {
        if (Math.abs(entity.position.y - building.position.y) > 0.1 && building.position.x > building.position.x) {
            return
        }

        const newPosition = {x: building.position.x - 0.6, y: building.position.y}

        if (isCollidingWithAnyEntityAtPosition(newPosition, newPosition)) {
            return
        }

        if (entity.id === ITEMS.CORPSE) {
            entity.originalId = entity.id
            entity.id = id
        }

        setEntityPosition(entity, newPosition)
    }
}

export function isCollidingWithAnyEntityAtPosition(entity, position) {
    return POOL.filter(value => value.index !== entity.index)
        .filter(value => value.active)
        .some(value => isCollidingTwoEntity({position}, value))
}

export function isCollidingTwoEntity(entity, otherEntity) {
    const x = otherEntity.position.x
    const y = otherEntity.position.y
    const ex = Math.abs(x - entity.position.x)
    const ey = Math.abs(y - entity.position.y)
    return ex < 0.3 && ey <= 1
}
