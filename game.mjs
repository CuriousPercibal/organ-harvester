import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {loadAssets} from "./modules/loader.mjs";
import {POOL, spawnEntity} from "./entities/entity.mjs";
import {BUILDINGS} from "./data/buildings.mjs";
import {listBuildings, placeBuilding, selectedBuilding} from "./ui/build.mjs";
import {ITEMS} from "./data/items.mjs";
import {mouseX, mouseY, onkeypress, onmousemove, onmouseclick} from "./ui/events.mjs";
import {drawBackground} from "./modules/background.mjs";

let game;
export const FPS = 30
let start = Date.now()
let frameDuration = 1000 / FPS
let lag = 0;
export const STD_TILE_WIDTH = 64;
export const WIDTH = 30;
export const HEIGHT = 20;

export async function init() {
    const canvas = createCanvas('scene')
    game = {
        canvas,
        scene: canvas.getContext('2d'),
        cells: Array(20).fill(undefined).map(() => Array(30))
    }
    document.addEventListener("mousemove", onmousemove);
    document.addEventListener("keypress", onkeypress)
    canvas.onclick = evt => onmouseclick(evt, game)
    document.getElementById('top').onclick = evt => onmouseclick(evt, game)
    document.getElementById('left').onclick = evt => onmouseclick(evt, game)
    document.getElementById('right').onclick = evt => onmouseclick(evt, game)
    document.getElementById('bottom').onclick = evt => onmouseclick(evt, game)

    drawBackground(window.innerWidth, window.innerHeight)
    spawnEntity(ITEMS.CORPSE_S, {x: 17, y: 0.5})
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
    state?.objects?.buildings.forEach(building => placeBuilding(game, building, building.position))
    console.log(game.cells)
}

function update() {
    const usage = POOL.filter(value => value.active).length / 10
    console.log(`Pool usage: ${usage}%`)

    POOL.filter(value => value.active)
        .filter(value => {
            const x = Math.floor(value.position.x + 0.5)
            const y = Math.floor(value.position.y + 0.5)
            const building = game.cells[y][x]
            const collider = building?.collider
            return !!collider && collider(building, value)
        })
        .forEach(value => {
            const x = Math.floor(value.position.x)
            const y = Math.floor(value.position.y)
            const building = game.cells[y][x]
            const move = building?.move
            if (move)
                move(building, value)
        })
}

function render() {
    game.scene.clearRect(0, 0, game.scene.canvas.width, game.scene.canvas.height);
    drawBasePattern(game.scene)
    drawGrid(game.scene)
    drawBuildingInCell(game.scene, {x: 12, y: -3.15}, BUILDINGS.MORGUE)
    game.cells.flat()
        .filter(value => !!value)
        .forEach(value => drawBuildingInCell(game.scene, value.position, value.id))
    POOL.filter(value => value.active)
        .forEach(value => drawItemInCell(game.scene, value.position, value.id))

    if (selectedBuilding) {
        game.scene.drawImage(selectedBuilding.img, mouseX - 32, mouseY - 32)
    }
}
