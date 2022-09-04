import {BUILDINGS, buildings} from "../data/buildings.mjs";
import {isEntityCollidingWithBelt, moveEntityOnBelt} from "../buildings/belt.mjs";
import {mouseX, mouseY} from "./events.mjs";
import {isEntityCollidingWithCoffinator, putInCoffin} from "../buildings/coffinator.mjs";

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

export function onBuildButtonClick(event) {
    console.log('onBuildButtonClick')
    if (buildUIContainer.hidden)
        unselectBuilding()
    buildUIContainer.hidden = !buildUIContainer.hidden
}

export function listBuildings() {
    buildings
        .filter(building => building.buildable)
        .forEach(building => {
            const info = createInfo(building.name, building.img)
            info.onclick = () => selectBuilding(building.id)
            buildUI.appendChild(info)
        })
}

export function placeBuilding(game, building, position) {
    const buildingInCell = game.cells[position.y][position.x]
    if (buildingInCell && buildingInCell.id > BUILDINGS.BELT_W) {
        return
    }
    game.cells.flat()
        .filter(value => !!value && value.id > BUILDINGS.BELT_W)
        .filter(value => value.collider(value, {position: {x: mouseX, y: mouseY}}))
        .map(value => game.cells[value.position.y][value.position.x] = undefined)
    const [collider, move] = getUtilityFunctions(building)
    building = Object.assign({collider, interact: move, position}, building)
    console.log(position)
    console.log(collider)
    console.log(move)
    game.cells[position.y][position.x] = building

}

export function remove(game, position) {
    game.cells[position.y][position.x] = undefined
}

function getUtilityFunctions(building) {
    const id = building.id
    console.log(buildings[id]?.name)
    switch (id) {
        case BUILDINGS.BELT_N:
        case BUILDINGS.BELT_E:
        case BUILDINGS.BELT_S:
        case BUILDINGS.BELT_W:
            return [isEntityCollidingWithBelt, moveEntityOnBelt]
        case BUILDINGS.COFFINATOR:
            return [isEntityCollidingWithCoffinator, putInCoffin]
        default:
            return [doNothing, doNothing]
    }
}

function createInfo(name = 'placeholder', buildingImage = new HTMLImageElement(), cost = 0, description = 'Lorem ipsum') {
    const div = document.createElement('div')
    div.className = 'infos'
    div.innerHTML = template.replace('%img', buildingImage.outerHTML)
        .replace('%name', name)
        .replace('%cost', cost + '$')
        .replace('%description', description)
    return div
}

export function unselectBuilding() {
    selectedBuilding = undefined;
}

export function changeBulldozer() {
    bulldozer = !bulldozer
}

function doNothing(a, b) {
}

function selectBuilding(id) {
    selectedBuilding = buildings[id];
    buildUIContainer.hidden = !buildUIContainer.hidden
}