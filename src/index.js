import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {loadAssets} from "./modules/loader.mjs";
import {POOL, spawnEntity} from "./entities/entity.mjs";
import {buildings, BUILDINGS} from "./data/buildings.mjs";
import {bulldozer, listBuildings, placeBuilding, selectedBuilding} from "./ui/build.mjs";
import {ITEMS} from "./data/items.mjs";
import {mouseX, mouseY, onkeypress, onmouseclick, onmousemove} from "./ui/events.mjs";
import {drawBackground} from "./modules/background.mjs";

let index;
export const FPS = 30
let start = Date.now()
let frameDuration = 1000 / FPS
let lag = 0;
export const STD_TILE_WIDTH = 64;
export const WIDTH = 30;
export const HEIGHT = 20;

export async function init() {
    const canvas = createCanvas('scene')
    index = {
        canvas,
        scene: canvas.getContext('2d'),
        cells: Array(20).fill(undefined).map(() => Array(30))
    }
    document.addEventListener("mousemove", onmousemove);
    document.addEventListener("keypress", onkeypress)
    canvas.onclick = evt => onmouseclick(evt, index)
    document.getElementById('top').onclick = evt => onmouseclick(evt, index)
    document.getElementById('left').onclick = evt => onmouseclick(evt, index)
    document.getElementById('right').onclick = evt => onmouseclick(evt, index)
    document.getElementById('bottom').onclick = evt => onmouseclick(evt, index)

    drawBackground(window.innerWidth, window.innerHeight)
    spawnEntity(ITEMS.CORPSE, {x: 17, y: 0.5})
    spawnEntity(ITEMS.COFFIN, {x: 17, y: 2.5})
    spawnEntity(ITEMS.CASKET, {x: 17, y: 4.5})
    spawnEntity(ITEMS.URN, {x: 17, y: 6.5})
    spawnEntity(ITEMS.LIVER, {x: 18, y: 3.5})
    spawnEntity(ITEMS.BAD_LIVER, {x: 18, y: 4.5})
    spawnEntity(ITEMS.HEART, {x: 18, y: 5.5})
    spawnEntity(ITEMS.BAD_HEART, {x: 18, y: 6.5})
    spawnEntity(ITEMS.KIDNEY, {x: 18, y: 7.5})
    spawnEntity(ITEMS.BAD_KIDNEY, {x: 18, y: 8.5})
    console.log(POOL.filter(value => value.active))
    console.log(buildings)
    await loadAssets()
    load(1)
    listBuildings()
    mainLoop()
}

function createCanvas(name) {
    const c = document.createElement('canvas')
    c.id = name
    c.width = WIDTH * STD_TILE_WIDTH
    c.height = (HEIGHT + 3) * STD_TILE_WIDTH
    const element = document.getElementById('scene-container')
    element.appendChild(c)
    return c
}

function mainLoop() {
    requestAnimationFrame(mainLoop);
    let current = Date.now()
    let elapsed = current - start;
    start = current;
    lag += elapsed;
    while (lag >= frameDuration) {
        update();
        lag -= frameDuration;
    }
    let lagOffset = lag / frameDuration;
    render(lagOffset);
}

function load(slot) {
    const state = JSON.parse(localStorage.getItem('oh_savedgame' + slot))
    state?.objects?.buildings.forEach(building => placeBuilding(index, building, building.position))
    console.log(index.cells)
}

function update() {
    const usage = POOL.filter(value => value.active).length / 10
    console.log(`Pool usage: ${usage}%`)

    POOL.filter(item => item.active)
        .filter(isColliding)
        .forEach(interactWithAllMatch)
}

function isColliding(item) {
    return index.cells
        .flat()
        .some(building => building?.collider(building, item))
}

function interactWithAllMatch(item) {
    const belts = index.cells.flat()
        .filter(building => building?.id <= BUILDINGS.BELT_W)
        .filter(building => building?.collider(building, item))
    if (belts.length) {
        belts[0].interact(belts[0], item)
    }
    index.cells.flat()
        .filter(building => building?.id > BUILDINGS.BELT_W)
        .filter(building => building?.collider(building, item))
        .forEach(building => building?.interact(building, item))
}

function render() {
    index.scene.clearRect(0, 0, index.scene.canvas.width, index.scene.canvas.height);
    drawBasePattern(index.scene)
    drawGrid(index.scene)
    drawBuildingInCell(index.scene, {x: 12, y: -3.15}, BUILDINGS.MORGUE)
    index.cells.flat()
        .filter(value => !!value && value.id <= BUILDINGS.BELT_W)
        .forEach(value => drawBuildingInCell(index.scene, value.position, value.id))
    index.cells.flat()
        .filter(value => !!value && value.id > BUILDINGS.BELT_W)
        .forEach(value => drawBuildingInCell(index.scene, value.position, value.id))
    POOL.filter(value => value.active)
        .forEach(value => drawItemInCell(index.scene, value.position, value.id))

    if (selectedBuilding) {
        index.scene.drawImage(selectedBuilding.img, mouseX - 32, mouseY - 32)
    }

    if (bulldozer) {
        index.scene.drawImage(buildings[BUILDINGS.DELETE].img, mouseX - 32, mouseY - 32)
    }
}

init()
