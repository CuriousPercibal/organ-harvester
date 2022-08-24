import {buildings} from "../data/buildings.mjs";

const buildUI = document.getElementById('build')
const buildUIContainer = document.getElementById('build-container')
const template = `<span><img src="%img"></span>
<span>
    <h2>%name</h2>
    <h2>%cost</h2>
</span>
<span>
    <p>%description</p>
</span>`
let building = undefined

export function onBuildButtonClick(event) {
    console.log('onBuildButtonClick')
    buildUIContainer.hidden = !buildUIContainer.hidden
}

export function listBuildings() {
    for (const building of buildings.filter(building => building.buildable)) {
        const info = createInfo(building.name, building.src)
        info.addEventListener('onclick', evt => {selectBuilding(building.id)})
        buildUI.appendChild(info)
    }
}

function createInfo(name = 'placeholder', buildingImage = 'assets/buildings/default.svg', cost = 0, description='Lorem ipsum') {
    const div = document.createElement('div')
    div.className = 'infos'
    div.innerHTML = template.replace('%img', buildingImage)
        .replace('%name', name)
        .replace('%cost', cost+'$')
        .replace('%description', description)
    return div
}

function selectBuilding(id) {
    building = buildings[id];
}