import {ITEMS, items} from "../data/items.mjs";
import {CASKET, URN} from "../entities/entity.mjs";

const infoContainer = document.getElementById('info-container')

const infoTemplate = `<span id="img"></span>
<span>
    <div>Name:</div>
    <div>Expense:</div>
    <div>Burial:</div>
    <div>Organs:</div>
</span>
<span>
    <div>%name</div>
    <div>$%cost</div>
    <div>%burial</div>
    <div style="display: flex; flex-direction: row;">
        <div id="heart"></div>
        <div id="liver"></div>
        <div id="kidney"></div>
    </div>
</span>
`

export function setInfoVisible(visible) {
    infoContainer.hidden = !visible;
    console.log(infoContainer.hidden)
}

export function createInfo(entity) {
    setInfoVisible(true)
    document.getElementById('info').innerHTML = infoTemplate.replace('%name', entity.name)
        .replace('%cost', entity.value)
        .replace('%burial', getMethod(entity.method))
    fillImages(entity)
}

export function fillImages(entity) {
    document.getElementById('img').appendChild(items.find(value => value.id === entity.id).img)
    document.getElementById('heart').appendChild(
        items.find(value => (entity.heart && value.id === ITEMS.HEART) || (!entity.heart && value.id === ITEMS.BAD_HEART)).img
    )
    document.getElementById('liver').appendChild(
        items.find(value => (entity.liver && value.id === ITEMS.LIVER) || (!entity.liver && value.id === ITEMS.BAD_LIVER)).img
    )
    document.getElementById('kidney').appendChild(
        items.find(value => (entity.kidney && value.id === ITEMS.KIDNEY) || (!entity.kidney && value.id === ITEMS.BAD_KIDNEY)).img
    )
}

function getMethod(method) {
    switch (method) {
        case CASKET:
            return "Casket"
        case URN:
            return "Urn"
        default:
            return "Coffin"
    }
}