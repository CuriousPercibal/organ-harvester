import {ITEMS} from "../data/items.mjs";

export const POOL_SIZE = 1000
export const POOL = initPool()
export const COFFIN = 0
export const CASKET = 1
export const URN = 2

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
    const value = (Math.floor(Math.random()*50) + 50)*10
    Object.assign(firstInactive, {
        active: true,
        id: entityId,
        position: spawnPosition,
        name: `Patient #${Math.floor(Math.random() * 100000)}`,
        value,
        heart: Math.random() > 0.6,
        kidney: Math.random() > 0.2,
        liver: Math.random() > 0.7,
        method: [COFFIN, CASKET, URN][Math.floor(Math.random()*3)]
    })
    console.log(firstInactive)
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
            Object.assign(entity, {originalId: entity.id, id})
        }

        setEntityPosition(entity, newPosition)
        console.log()
    }
}

export function isCollidingWithAnyEntityAtPosition(entity, position) {
    return POOL.filter(value => value.index !== entity.index)
        .filter(value => value.active)
        .some(value => isCollidingTwoEntity({position}, value))
}

export function getCollidingEntityAtPosition(position) {
    return POOL.filter(value => value.active)
        .find(() => isCollidingWithAnyEntityAtPosition({index: -1}, position))
}

export function isCollidingTwoEntity(entity, otherEntity) {
    const x = otherEntity.position.x
    const y = otherEntity.position.y
    const ex = Math.abs(x - entity.position.x)
    const ey = Math.abs(y - entity.position.y)
    return ex < 0.4 && ey <= 0.9
}

export function spawnCorpse() {
    const next = Math.floor(Math.random()*3000)+1000
    setTimeout(() => {
        if (!isCollidingWithAnyEntityAtPosition({index: -1}, {x:15, y:0})) {
            spawnEntityWithId(ITEMS.CORPSE, {x:15, y:0})
        }
        spawnCorpse()
    },next)
}
