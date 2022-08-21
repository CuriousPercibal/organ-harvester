import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {buildings, items, loadAssets} from "./modules/loader.mjs";
import {POOL, SOUTH, spawnEntity, moveEntity} from "./entities/entity.mjs";

const game = {}
const FPS = 60
let start = Date.now()
let frameDuration = 1000 / FPS
let lag = 0;

export async function init() {
    const canvas = document.getElementById('scene')
    game['scene'] = canvas.getContext('2d')
    game.scene.canvas.width = window.innerWidth
    game.scene.canvas.height = window.innerHeight
    game.scene.imageSmoothingEnabled = false
    game.scene.msImageSmoothingEnabled = false
    game.scene.webkitImageSmoothingEnabled = false
    game.scene.imageSmoothingQuality = "high"
    game.cells = Array(20).fill(undefined)
    for (let i = 0; i < game.cells.length; i++) {
        game.cells[i] = Array(30)
        for (let j = 0; j < game.cells[i].length; j++) {
            game.cells[i][j] = { id: -1, position: {x: j, y: i}}
        }
    }
    await loadAssets()
    load(1)
    spawnEntity(0, {x: 17, y: 0})
    mainLoop()
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
    for (const building of state?.objects?.buildings) {
        game.cells[building.position.y][building.position.x] = building
    }
}

function update() {
    POOL.filter(value => value.active).forEach(value => moveEntity(value.index, SOUTH))
}

function render() {
    game.scene.clearRect(0, 0, game.scene.canvas.width, game.scene.canvas.height);
    drawBasePattern(game.scene)
    drawGrid(game.scene)
    drawBuildingInCell(game.scene, {x: 12, y: -3.15}, 0)
    game.cells.flat().filter(value => !!value)
        .forEach(value => drawBuildingInCell(game.scene, value.position, value.id))
    POOL.filter(value => value.active)
        .forEach(value => drawItemInCell(game.scene, value.position, value.id))
}
