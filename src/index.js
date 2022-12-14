import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {POOL, spawnCorpse} from "./entities/entity.mjs";
import {BUILDING_ID, buildings} from "./data/buildings.mjs";
import {bulldozer, listBuildings, selectedBuilding} from "./ui/build.mjs";
import {load, mouseX, mouseY, onkeypress, onmouseclick, onmousemove} from "./ui/events.mjs";
import {drawBackground} from "./modules/background.mjs";

export let game;
export const containerDiv = document.getElementById('game')
export const FPS = 30
const wealthHeader = document.getElementById('wealth')
let start = Date.now()
let frameDuration = 1000 / FPS
let lag = 0;
export const STD_TILE_WIDTH = 64;
export const WIDTH = 30;
export const HEIGHT = 20;
export let wealth = 10000;

export async function init() {
    const canvas = createCanvas('scene')
    game = {
        canvas,
        scene: canvas.getContext('2d'),
        cells: Array(20).fill(undefined).map(() => Array(30))
    }
    document.addEventListener("keypress", onkeypress)
    Array.of(
        document.getElementById('scene'),
        document.getElementById('t'),
        document.getElementById('l'),
        document.getElementById('r'),
        document.getElementById('b')
    ).forEach(value => {
        value.addEventListener("mousemove", onmousemove)
        value.onclick = evt => onmouseclick(evt, game)
    })

    drawBackground(4000, 4000)
    console.log(POOL.filter(value => value.active))
    console.log(buildings)
    load()
    listBuildings()
    spawnCorpse()
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


function update() {
    const usage = POOL.filter(value => value.active).length / 10
    // console.log(`Pool usage: ${usage}%`)

    POOL.filter(item => item.active)
        .filter(isColliding)
        .forEach(interactWithAllMatch)
}

function isColliding(item) {
    return game.cells
        .flat()
        .some(building => building?.collider(building, item))
}

function interactWithAllMatch(item) {
    const belts = game.cells.flat()
        .filter(building => building?.id <= BUILDING_ID.BELT_W)
        .filter(building => building?.collider(building, item))
    if (belts.length) {
        belts[0].interact(belts[0], item)
    }
    game.cells.flat()
        .filter(building => building?.id > BUILDING_ID.BELT_W)
        .filter(building => building?.collider(building, item))
        .forEach(building => building?.interact(building, item))
}

export function setWealth(amount) {
    wealth = amount
}

function render() {
    wealthHeader.innerText = `$${wealth}`
    game.scene.clearRect(0, 0, game.scene.canvas.width, game.scene.canvas.height);
    drawBasePattern(game.scene)
    drawGrid(game.scene)
    drawBuildingInCell(game.scene, {x: 3, y: -2.15}, BUILDING_ID.FUNERAL_HOME)
    drawBuildingInCell(game.scene, {x: 10, y: -3.15}, BUILDING_ID.MORGUE)
    drawBuildingInCell(game.scene, {x: 20.5, y: -3.15}, BUILDING_ID.HOSPITAL)
    game.cells.flat()
        .filter(value => value)
        .forEach(value => drawBuildingInCell(game.scene, value.position, value.id))
    POOL.filter(value => value.active)
        .forEach(value => drawItemInCell(game.scene, value.position, value.id))

    if (selectedBuilding) {
        game.scene.drawImage(selectedBuilding.img, mouseX - 32, mouseY - 32)
    }

    if (bulldozer) {
        game.scene.drawImage(buildings[BUILDING_ID.DELETE].img, mouseX - 32, mouseY - 32)
    }
}

init().then(() => console.log('loaded'))
