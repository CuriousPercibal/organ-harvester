export function dispose(building, entity) {
    if (Math.abs(entity.position.x - building.position.x) > 0.1 && building.position.y > entity.position.y) {
        return
    }

    entity.active = false;
}