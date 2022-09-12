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
import {POOL, spawnEntity} from "../entities/entity.mjs";

export let mouseX
export let mouseY

const events = {
    'q': onQ,
    'd': changeBulldozer,
    's': save,
    'l': load,
}

export function onmousemove(event) {
    console.log({left: containerDiv.offsetLeft, top: containerDiv.offsetTop})
    mouseX = event.pageX - containerDiv.offsetLeft
    mouseY = event.pageY - containerDiv.offsetTop
    console.log({mouseX, mouseY});
}

export function onmouseclick(event, game) {
    if (selectedBuilding) {
        console.log(calculateCellPosition())
        placeBuilding(game, selectedBuilding, calculateCellPosition());
    }

    if (bulldozer) {
        remove(game, calculateCellPosition())
    }
}

export function onkeypress(event) {
    console.log(event.key);
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
    state?.buildings.forEach(building => placeBuilding(game, building, building.position))
    state?.items.forEach(entity => spawnEntity(entity))
    setWealth(state.wealth)
    console.log(game.cells)
}