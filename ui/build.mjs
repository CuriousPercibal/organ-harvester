import {BUILDINGS, buildings} from "../data/buildings.mjs";
import {isEntityCollidingWithBelt, moveEntityOnBelt} from "../buildings/belt.mjs";

const buildUI = document.getElementById('build')
export const buildUIContainer = document.getElementById('build-container')
const template = `<span><img src="%img"></span>
<span>
    <h2>%name</h2>
    <h2>%cost</h2>
</span>
<span>
    <p>%description</p>
</span>`
export let selectedBuilding = undefined
const buildButton = document.getElementById('build-button')
buildButton.onclick =  onBuildButtonClick
const closeBuildUi = document.getElementById('close-building-ui')
closeBuildUi.onclick = onBuildButtonClick

export function onBuildButtonClick(event) {
    console.log('onBuildButtonClick')
    if (buildUIContainer.hidden)
        unselectBuilding()
    buildUIContainer.hidden = !buildUIContainer.hidden
}

export function listBuildings() {
    for (const building of buildings.filter(building => building.buildable)) {
        const info = createInfo(building.name, building.src)
        info.onclick = evt => {selectBuilding(building.id)}
        buildUI.appendChild(info)
    }
}

export function placeBuilding(game, building, position) {
    if (game.cells[position.y][position.x]?.occupied) {
        return
    }
    const [collider, move] = getUtilityFunctions(building)
    building = Object.assign({}, building)
    console.log(position)
    console.log(collider)
    console.log(move)
    building.collider = collider
    building.move = move
    building.position = position
    game.cells[position.y][position.x] = building
    for (let i = position.x + 1; i <= position.x + building.width; i++) {
        for (let j = position.y + 1; j <= position.y + building.height; j++) {
            game.cells[j][i] = {occupied: true}
        }
    }
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
        default:
            return [(a, b) => {
            }, (a, b) => {
            }]
    }
}

function createInfo(name = 'placeholder', buildingImage = 'assets/buildings/default.svg', cost = 0, description='Lorem ipsum') {
    const div = document.createElement('div')
    div.className = 'infos'
    div.innerHTML = template.replace('%img', buildingImage)
        .replace('%name', name)
        .replace('%cost', cost + '$')
        .replace('%description', description)
    return div
}

export function unselectBuilding() {
    selectedBuilding = undefined;
}

function selectBuilding(id) {
    selectedBuilding = buildings[id];
    buildUIContainer.hidden = !buildUIContainer.hidden
}