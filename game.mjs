import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {buildings, items, loadAssets} from "./modules/loader.mjs";
import {POOL, SOUTH, spawnEntity, moveEntity} from "./entities/entity.mjs";

let game = {}
let cells = []

export async function init() {
    const canvas = document.getElementById('scene')
    game['scene'] = canvas.getContext('2d')
    game.scene.canvas.width = window.innerWidth
    game.scene.canvas.height = window.innerHeight
    game.scene.imageSmoothingEnabled = false
    game.scene.msImageSmoothingEnabled = false
    game.scene.webkitImageSmoothingEnabled = false
    game.scene.imageSmoothingQuality = "high"
    await loadAssets()
    mainLoop()
}

function mainLoop() {
    spawnEntity(0, {x: 17, y:0})
    render()
    load(1)
    spawnAndMove()
}

function spawnAndMove() {
    setTimeout(function () {
        POOL.filter(value => value.active).forEach(value => moveEntity(value.index, SOUTH))
        render()
        spawnAndMove()
    }, 30 )
}

function load(slot) {
    const state = JSON.parse(localStorage.getItem('oh_savedgame' + slot))
    console.log(state)
    for (const building of state?.objects?.buildings) {
        drawBuildingInCell(game.scene, building.cell, building.id)
    }
}

function render() {
    game.scene.clearRect(0, 0, game.scene.canvas.width, game.scene.canvas.height);
    drawBasePattern(game.scene)
    drawGrid(game.scene)
    drawBuildingInCell(game.scene, {x: 12, y:-3.15}, 0)
    POOL.filter(value => value.active)
        .forEach(value => drawItemInCell(game.scene, value.position, value.id))
}
