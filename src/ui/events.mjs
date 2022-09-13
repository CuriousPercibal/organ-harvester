import {
    buildUIContainer,
    bulldozer,
    changeBulldozer,
    onBuildButtonClick,
    placeBuilding,
    remove,
    selectedBuilding,
    unselectBuilding
} from "./build.mjs";
import {containerDiv, game, setWealth, STD_TILE_WIDTH, wealth} from "../index.js";
import {getCollidingEntityAtPosition, POOL, spawnEntity} from "../entities/entity.mjs";
import {createInfo} from "./info.mjs";
import {BUILDING_ID} from "../data/buildings.mjs";
import {onSaveButtonClick, openFilterSettings, saveButton, setFilterSettingsVisible} from "./filter_setting.mjs";

export let mouseX
export let mouseY

const events = {
    'q': onQ,
    'd': changeBulldozer,
    's': save,
    'l': load,
}

export function onmousemove(event) {
    mouseX = event.pageX - containerDiv.offsetLeft
    mouseY = event.pageY - containerDiv.offsetTop
}

export function onmouseclick(event, game) {
    if (selectedBuilding) {
        placeBuilding(game, selectedBuilding, calculateCellPosition());
        return
    }

    if (bulldozer) {
        remove(game, calculateCellPosition())
        return;
    }

    const collided = getCollidingEntityAtPosition({x: (mouseX / STD_TILE_WIDTH)-0.5, y: (mouseY / STD_TILE_WIDTH) -3})
    if (collided) {
        console.log("OPEN")
        createInfo(collided)
    }

    const position = calculateCellPosition()
    const building = game.cells[position.y][position.x]
    if (building && building?.filters) {
        console.log("Filter clicked")
        openFilterSettings(building.filters)
        saveButton.onclick = () => {onSaveButtonClick(building)}
    }
}

export function onkeypress(event) {
    const func = events[event.key] || (() => {})
    func()
}

function onQ() {
    if (!buildUIContainer.hidden) {
        onBuildButtonClick()
        return;
    }

    if (selectedBuilding) {
        unselectBuilding()
    }

    if (bulldozer) {
        changeBulldozer()
    }
}

function calculateCellPosition() {
    const position = {
        x: Math.floor(mouseX / STD_TILE_WIDTH),
        y: Math.floor(mouseY / STD_TILE_WIDTH) - 3
    }
    console.log(position)
    return position
}

function save() {
    const buildings = game.cells.flat().filter(value => value)
    const items = POOL.filter(value => value.active)
    const save = {items, buildings, wealth}
    localStorage.setItem('oh_savedgame', JSON.stringify(save))
}

export function load() {
    const state = JSON.parse(localStorage.getItem('oh_savedgame'))
    console.log(state)
    console.log(!state)
    console.log(state === { })

    if (!state) {
        return
    }
    state?.buildings?.forEach(building => placeBuilding(game, building, building.position))
    state?.items?.forEach(entity => spawnEntity(entity))
    setWealth(state.wealth || 10000)
    console.log(game.cells)
}