import {ITEMS} from "../data/items.mjs";
import {setEntityPosition} from "../entities/entity.mjs";

export const coffinatorContent = `
    <g transform="scale(0.8) translate(0 8)">
        <polygon points="26,0 18,16 24,64 40,64 46,16 38,0" fill="#3d240a" stroke="#361f07"/>
    </g>
    <g transform="scale(0.8) translate(16 10)">
        <ellipse cx="32" cy="7" rx="5" ry="7"/>
        <polygon points="22,20 42,20 36,56 28,56 " style="fill:black"/>
        <ellipse cx="32" cy="20" rx="10" ry="10"/>
        <ellipse cx="32" cy="56" rx="7" ry="6"/>
        <polygon points="27,10 30,12 34,12 37,10 37,12 34,14 30,14 27,12" fill="gray"/>
        <polygon points="27,50 30,52 34,52 37,50 37,52 34,54 30,54 27,52" fill="gray"/>
        <rect x="28" y="20" width="8" height="10" style="fill:white"/>
        <rect x="29" y="21" width="2" height="3" style="fill:gray"/>
        <line x1="32" y1="22" x2="35" y2="22" stroke="blue"/>
        <line x1="32" y1="24" x2="35" y2="24" stroke="gray"/>
        <line x1="29" y1="26" x2="35" y2="26" stroke="gray"/>
        <line x1="29" y1="28" x2="35" y2="28" stroke="gray"/>
    </g>
`

export function putInCoffin(coffinator, entity) {
    entity.originalId = entity.id
    entity.id = ITEMS.COFFIN
    setEntityPosition(entity, {x: coffinator.position.x-0.6, y: coffinator.position.y})
}