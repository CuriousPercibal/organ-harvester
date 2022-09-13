import {corpseTransformator, isCollidingWithAnyEntityAtPosition, setEntityPosition} from "../entities/entity.mjs";
import {ITEMS} from "../data/items.mjs";

export const extractorTemplate = `
    <circle cx="20" cy="40" r="4" stroke-width="2" stroke="gray" fill="none"/>
    <circle cx="32" cy="40" r="4" stroke-width="2" stroke="gray" fill="none"/>
    <line x1="20" x2="30" y1="16" y2="38" stroke="gray" stroke-width="2"/>
    <line x1="32" x2="22" y1="16" y2="38" stroke="gray" stroke-width="2"/>
    <line x1="44" x2="44" y1="16" y2="34" stroke="gray" stroke-width="4"/>
    <polygon points="42,34 42,44 46,40 46,34" fill="white"/>
    <line x1="33" x2="28" y1="59" y2="54" stroke-width="2" stroke="#cc2f2f"/>
    <line x1="32" x2="37" y1="59" y2="54" stroke-width="2" stroke="#cc2f2f"/>
`

export function extract(building, entity) {
    const organs = {
        heart: entity.heart,
        kidney: entity.kidney,
        liver: entity.liver
    }
    const func = corpseTransformator(ITEMS.CORPSE)
    func(building, entity)
    entity.extracted = true
    if (isCollidingWithAnyEntityAtPosition(newPosition, newPosition)) {
        return

    }
    if (entity.id === ITEMS.CORPSE) {
        Object.assign(entity, {originalId: entity.id, id})

    }
    setEntityPosition(entity, newPosition)

}