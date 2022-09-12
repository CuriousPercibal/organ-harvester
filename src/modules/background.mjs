const starColors = [
    '#093b29',
    '#113a3b',
    '#5d6903',
    '#634601',
]

export function drawBackground(width, height) {
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.getElementById('background')
    for (let i = 0; i < width+height; i++) {
        const rect = document.createElementNS(ns, 'rect')
        const size = Math.random() * 4
        const x = Math.random() * width
        const y = Math.random() * height
        rect.setAttributeNS(null, 'width', size)
        rect.setAttributeNS(null, 'height', size)
        rect.setAttributeNS(null, 'x', x)
        rect.setAttributeNS(null, 'y', y)
        rect.setAttributeNS(null, 'fill', starColors[i%starColors.length])
        svg.appendChild(rect)
    }
}