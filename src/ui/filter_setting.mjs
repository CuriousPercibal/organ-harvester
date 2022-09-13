import {filter} from "../buildings/filter.mjs";

const filterContainer = document.getElementById('filter-container')
export const saveButton = document.getElementById('save_button')
const closeButton = document.getElementById('close-filter-ui')
closeButton.onclick = () => {setFilterSettingsVisible(false)}
const badInput = document.getElementById('bad')
const casketInput = document.getElementById('coffin')
const coffinInput = document.getElementById('casket')
const urnInput = document.getElementById('urn')

export function setFilterSettingsVisible(visible) {
    filterContainer.hidden = !visible
}

export function openFilterSettings(filters) {
    setFilterSettingsVisible(true)
    createSettings(filters)
}

export function createSettings(filters) {
    badInput.checked = filters.bad_organ
    casketInput.checked = filters.casket
    coffinInput.checked = filters.coffin
    urnInput.checked = filters.urn
}

export function onSaveButtonClick(building) {
    const filters = {
        bad_organ: badInput.checked,
        casket: casketInput.checked,
        coffin: coffinInput.checked,
        urn: urnInput.checked,
    }
    building.interact = filter(filters)
    building.filters = filters
}