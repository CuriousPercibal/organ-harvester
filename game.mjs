import {drawBasePattern, drawBuildingInCell, drawGrid, drawItemInCell} from "./modules/base.mjs";
import {loadAssets} from "./modules/loader.mjs";
import {POOL, spawnEntity} from "./entities/entity.mjs";
import {isEntityCollidingWithBelt, moveEntityOnBelt} from "./buildings/belt.mjs";
import {drawBackground} from "./modules/background.mjs";
import {buildings, BUILDINGS} from "./data/buildings.mjs";
import {listBuildings, onBuildButtonClick} from "./ui/build.mjs";

const game = {}
const FPS = 30
let start = Date.now()
let frameDuration = 1000 / FPS
let lag = 0;

export async function init() {
    createCanvas('scene', 1920, 1472)
    drawBackground(window.innerWidth, window.innerHeight)
    const canvas = document.getElementById('scene')
    game['scene'] = canvas.getContext('2d')
    game.cells = Array(20).fill(undefined)
    for (let i = 0; i < game.cells.length; i++) {
        game.cells[i] = Array(30)
        for (let j = 0; j < game.cells[i].length; j++) {
            game.cells[i][j] = {id: -1, position: {x: j, y: i}}
        }
    }
    await loadAssets()
    const buildButton = document.getElementById('build-button')
    buildButton.onclick =  onBuildButtonClick
    const closeBuildUi = document.getElementById('close-building-ui')
    closeBuildUi.onclick = onBuildButtonClick
    load(1)
    spawnEntity(0, {x: 17, y: 0})
    listBuildings()
    mainLoop()
}

function createCanvas(name, width, height) {
    const c = document.createElement('canvas')
    //canvas.translate = true
    c.id = name
    c.width = width
    c.height = height
    const element = document.getElementById('scene-container')
    element.appendChild(c)
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
        const [collider, move] = getUtilityFunctions(building)
        console.log(collider)
        console.log(move)
        building.collider = collider
        building.move = move
        game.cells[building.position.y][building.position.x] = building
    }
}

function getUtilityFunctions(building) {
    const id = building.id
    console.log(buildings[id]?.name)
    switch (id) {
        case BUILDINGS.BELT_N:
        case BUILDINGS.BELT_E:
        case BUILDINGS.BELT_S:
        case BUILDINGS.BELT_W:
            return [isEntityCollidingWithBelt, moveEntityOnBelt]
        default:
            return [(a, b) => {
            }, (a, b) => {
            }]
    }
}

function update() {
    const usage = POOL.filter(value => value.active).length / 10
    console.log(`Pool usage: ${usage}%`)

    POOL.filter(value => value.active)
        .filter(value => {
            const x = Math.floor(value.position.x + 0.5)
            const y = Math.floor(value.position.y + 0.5)
            const building = game.cells[y][x]
            const collider = building.collider
            return !!collider && collider(building, value)
        })
        .forEach(value => {
            const x = Math.floor(value.position.x)
            const y = Math.floor(value.position.y)
            const building = game.cells[y][x]
            const move = building.move
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
}
