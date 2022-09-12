import {buildings} from "../data/buildings.mjs";
import {items} from "../data/items.mjs";

const offset = 64*3 + 10

export function drawBasePattern(context) {
    const canvas = context.canvas
    const width = 16
    const height = 10
    const y = 64*3
    let x = 0
    // linear-gradient(90deg, rgba(0,6,42,0.8477591720281863) 0%, rgba(255,255,255,1) 21%)
    const gradient = context.createLinearGradient(0, 0, 0, y)
    gradient.addColorStop(0, '#000411')
    gradient.addColorStop(1, 'rgba(18,27,40,0.94)')
    context.fillStyle = gradient
    context.fillRect(0,0, canvas.width, y)
    for (x = -2; x < canvas.width; x += width) {
        const brickGradient = context.createLinearGradient(x,y, x, y+height)
        brickGradient.addColorStop(0, '#606060')
        brickGradient.addColorStop(1, '#2f2f2f')
        context.fillStyle = brickGradient
        context.fillRect(x, y, 16, height)
        context.fillStyle = '#2f2f2f'
        context.fillRect(x, y, 4, height)
    }
    context.fillStyle = '#131414'
    context.fillRect(17*64, y, 64, 12)
}

export function drawGrid(context) {
    const canvas = context.canvas
    const cellWidth = 64
    let x = 0;
    context.beginPath()
    for(; x < canvas.width; x += cellWidth) {
        context.moveTo(x, offset)
        context.lineTo(x, canvas.height)
        context.moveTo(0, x + offset)
        context.lineTo(canvas.width, x + offset)
    }
    context.strokeStyle = "#15172f"
    context.lineWidth = 4
    context.stroke();
}

export function drawBuildingInCell(context, cell, buildingNumber) {
    if (buildingNumber === undefined) {
        return
    }
    const building = buildings[buildingNumber]?.img
    drawImage(context, cell, building)
}

export function drawItemInCell(context, cell, buildingNumber) {
    const item = items[buildingNumber]?.img
    drawImage(context, cell, item)
}

function drawImage(context, cell, item) {
    context.drawImage(item, cell.x*64, cell.y*64 + offset)
}