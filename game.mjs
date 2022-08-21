import {drawBasePattern, drawGrid, drawItemInCell} from "./modules/base.mjs";

let game = {}
let cells = []

export function init() {
    const canvas = document.getElementById('scene')
    game['scene'] = canvas.getContext('2d')
    game.scene.canvas.width = window.innerWidth
    game.scene.canvas.height = window.innerHeight
    game.scene.imageSmoothingEnabled = false
    game.scene.msImageSmoothingEnabled = false
    game.scene.webkitImageSmoothingEnabled = false
    game.scene.imageSmoothingQuality = "high"

    mainLoop()
}

function mainLoop() {
    drawBasePattern(game.scene)
    drawGrid(game.scene)
    drawItemInCell(game.scene, {x: 3, y: 3}, 0)
}

function setup() {

}

function render() {

}
