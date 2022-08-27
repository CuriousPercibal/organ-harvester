import {ITEMS} from "../data/items.mjs";

export function isEntityCollidingWithCoffinator(coffinator, entiy) {
    const x = entiy.position.x - coffinator.position.x
    const y = entiy.position.y - coffinator.position.y
    return x <= 1.5 && y <= 2 && x >= 0.5 && y >= 0
}

export function putInCoffin(coffinator, entity) {
    if (entity.id === ITEMS.COFFIN)
        return
    entity.originalId = entity.id
    entity.id = ITEMS.COFFIN
}