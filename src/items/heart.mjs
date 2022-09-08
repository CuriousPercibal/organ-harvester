export const heartTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path transform="rotate(0, 25, 17)" fill="url(#g2)" d="m19,21c0,-3 8,-9 8,-9c-0,0 3,0 3,0c0,0 -3.6,5 -3.6,5.3c0,0 0,3.6 -0,3.6c0,0 -7.5,3 -7,0z"/>
        <ellipse fill="url(#g1)" cx="177.5" cy="188.5" rx="87.5" ry="88"/>
        <ellipse fill="url(#g1)" cx="27" cy="29" rx="11" ry="10"/>
        <ellipse fill="url(#g1)" cx="36" cy="29" rx="11" ry="10"/>
        <path fill="%color0" d="m17,33c1,4.6 6.6,11 11,17c1.7,2 3,0 4,0.5c6.7,-6.5 13,-12 13,-14.6c4.6,-7 -28,-6 -28,-1.8l0,0z"/>
        <path fill="url(#g2)" d="m31,20l-7,5l-3.8,7l-1,5.8l0,0.7l2,-6l4,-6l6.4,-6l-0.7,0l0,0z"/>
    </g>
    <defs>
        <linearGradient id="g1" x1="1" y1="1" x2="1" y2="0" spreadMethod="pad">
            <stop stop-color="%color0" offset="0.6"/>
            <stop stop-color="#ffe5ad" offset="1"/>
        </linearGradient>
        <linearGradient id="g2" x1="1" y1="1" x2="1" y2="0">
            <stop stop-color="#ffe5ad" offset="0.6"/>
            <stop stop-color="%color0" offset="1"/>
        </linearGradient>
    </defs>
</svg>
`

export const healthyHeartPalette = ["#820606"]
export const rottenHeartPalette = ["#630056"]
