import {BUILDING_ID, buildings} from "../data/buildings.mjs";
import {isColliding, moveEntityOnBelt} from "../buildings/belt.mjs";
import {mouseX, mouseY} from "./events.mjs";
import {ITEMS} from "../data/items.mjs";
import {corpseTransformator} from "../entities/entity.mjs";
import {dispose} from "../buildings/disposal.mjs";
import {merge} from "../buildings/merger.js";

const buildUI = document.getElementById('build')
export const buildUIContainer = document.getElementById('build-container')
const template = `<span>%img</span>
<span>
    <h2>%name</h2>
    <h2>%cost</h2>
</span>
<span>
    <p>%description</p>
</span>`
export let selectedBuilding = undefined
export let bulldozer = false
const buildButton = document.getElementById('build-button')
buildButton.onclick = onBuildButtonClick
const closeBuildUi = document.getElementById('close-building-ui')
closeBuildUi.onclick = onBuildButtonClick

export function onBuildButtonClick() {
    console.log('onBuildButtonClick')
    if (buildUIContainer.hidden)
        unselectBuilding()
    buildUIContainer.hidden = !buildUIContainer.hidden
}

export function listBuildings() {
    buildings
        .filter(building => building.buildable)
        .forEach(insertInfo)
}

export function placeBuilding(game, building, position) {
    game.cells.flat()
        .filter(value => value?.collider(value, {position: {x: mouseX, y: mouseY}}))
        .map(value => game.cells[value.position.y][value.position.x] = { id: BUILDING_ID.DEFAULT })
    const [collider, move] = getUtilityFunctions(building)
    building = Object.assign({collider, interact: move, position}, building)
    console.log(position)
    console.log(collider)
    console.log(move)
    game.cells[position.y][position.x] = building

}

export function remove(game, position) {
    const [collider, interact] = getUtilityFunctions()
    game.cells[position.y][position.x] = {collider, interact}
}

function getUtilityFunctions(building) {
    const id = building?.id
    console.log(buildings[id]?.name)
    switch (id) {
        case BUILDING_ID.BELT_N:
        case BUILDING_ID.BELT_E:
        case BUILDING_ID.BELT_S:
        case BUILDING_ID.BELT_W:
            return [isColliding, moveEntityOnBelt]
        case BUILDING_ID.COFFINATOR:
            return [isColliding, corpseTransformator(ITEMS.COFFIN)]
        case BUILDING_ID.CASKETINATOR:
            return [isColliding, corpseTransformator(ITEMS.CASKET)]
        case BUILDING_ID.INCINERATOR:
            return [isColliding, corpseTransformator(ITEMS.URN)]
        case BUILDING_ID.BIOHAZARD:
            return [isColliding, dispose]
        case BUILDING_ID.MERGER_N:
        case BUILDING_ID.MERGER_E:
        case BUILDING_ID.MERGER_S:
        case BUILDING_ID.MERGER_W:
            return [isColliding, merge()]
        default:
            return [doNothing, doNothing]
    }
}

function createInfo(name = 'placeholder', buildingImage, cost = 0, description = 'Lorem ipsum') {
    const div = document.createElement('div')
    div.className = 'infos'
    div.innerHTML = template.replace('%img', buildingImage.outerHTML)
        .replace('%name', name)
        .replace('%cost', cost + '$')
        .replace('%description', description)
    return div
}

function insertInfo(building) {
    const info = createInfo(building.name, building.img, building.cost, building.description)
    info.onclick = () => selectBuilding(building.id)
    buildUI.appendChild(info)
}

export function unselectBuilding() {
    selectedBuilding = undefined;
}

export function changeBulldozer() {
    bulldozer = !bulldozer

    if (bulldozer) unselectBuilding()
}

function doNothing(a, b) {
}

function selectBuilding(id) {
    selectedBuilding = buildings[id];
    buildUIContainer.hidden = !buildUIContainer.hidden
}