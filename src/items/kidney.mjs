export const kidneyTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <g id="left">
            <circle cx="20" cy="24" r="6.5" fill="%color0"/>
            <circle cx="20" cy="38" r="6.5" fill="%color0"/>
            <polygon points="14,21 11,28 11,34 14,41 24,38 24,24" fill="%color0"/>
            <line x1="23" x2="28" y1="30" y2="34" stroke="%color1" stroke-width="2"/>
            <line x2="28" x1="28" y2="50" y1="34" stroke="%color1" stroke-width="1"/>
        </g>
    </defs>
    <g>
        <use href="#left"/>
        <use href="#left" transform="translate(16 0)"/>
    </g>
</svg>
`

export const healthyKidneyPalette = ['#4d0818', '#efcf2d']
export const rottenKidneyPalette = ['#69801d', '#fff64a']