export const mergerTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(%deg) translate(%t1 %t2)">
        <rect width="64" height="64" fill="#2f2f2f" x="0" y="0" stroke="#5f5f5f" stroke-width="4"/>
        <line x1="32" x2="32" y1="20" y2="44" stroke-width="4" stroke="#7ceb44"/>
        <line x1="20" x2="44" y1="32" y2="32" stroke-width="4" stroke="#7ceb44"/>
        <path d="M5 27L 10 32 L5 37" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M27 59L 32 54 L37 59" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M59 27L 54 32 L59 37" stroke="#c0f734" fill="none" stroke-width="2"/>
        <path d="M20 15 L32 5 L45 15 M 32 5z" stroke="#c0f734" fill="none" stroke-width="2"/>
    </g>
</svg>
`