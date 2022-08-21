import {tiles} from '../data/tiles.mjs'

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
    const image = new Image()
    image.src = 'assets/morgue.svg'
    image.onload = () => {
        context.drawImage(image, 12*64, 0)
    }
}

export function drawGrid(context) {
    const canvas = context.canvas
    const cellWidth = 64
    const cellHeight = 64
    let x = 0;
    let y = 64*3 + 10
    context.beginPath()
    for(x = 0; x < canvas.width; x += cellWidth) {
        context.moveTo(x, y)
        context.lineTo(x, canvas.height)
    }
    for(; y < canvas.height; y += cellHeight) {
        context.moveTo(0, y)
        context.lineTo(canvas.width, y)
    }
    context.strokeStyle = "#15172f"
    context.lineWidth = 4
    context.stroke();
}

export function drawItemInCell(context, cell, buildingNumber) {
    const building = tiles.filter(value => value.id === buildingNumber)[0]
    const canvas = context.canvas
    const yOffset =  64*3 + 10
    const image = new Image()
    image.src = building.src
    image.onload = () => {
        context.drawImage(image, cell.x*64, cell.y*64 + yOffset)
    }
}