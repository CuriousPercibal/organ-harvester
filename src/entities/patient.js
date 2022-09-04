const patientTemplate = `
<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="42" width="24" height="10" fill="%neck"/>
    <ellipse cx="32" cy="24" rx="20" ry="24" fill="%head"/>
    <ellipse cx="32" cy="64" rx="34" ry="16" fill="%neck"/>
    <circle cx="24" cy="24" r="6" fill="%eye"/>
    <circle cx="40" cy="24" r="6" fill="%eye"/>
    %features
</svg>
`

const livePatientPalette = {neck: '#997b6d', head: '#c7ac9f', eye: '#b89a8c'}
const deceasedPatientPalette = {neck: '#99897a', head: '#c7b29f', eye: '#99897a'}

const liveFeatures = `
    <polygon points="20,24 24,22 28,24 24,26" fill="white" stroke="#c7ac9f"/>
    <circle cx="24" cy="24" r="1.5" fill="black"/>
    <polygon points="36,24 40,22 44,24 40,26" fill="white" stroke="#c7ac9f"/>
    <circle cx="40" cy="24" r="1.5" fill="black"/>
    <polygon points="32,24 26,32 34,32" fill="#c29480"/>
    <line x1="28" x2="40" y1="38" y2="38" stroke="#bd776d" stroke-width="4"/>
    <line x1="28" x2="40" y1="38" y2="38" stroke="black" stroke-width="1"/>
`

const deceasedFeatures = `
    <line x1="20" x2="28" y1="24" y2="24" stroke="black"/>
    <line x1="36" x2="44" y1="24" y2="24" stroke="black"/>
    <polygon points="32,24 26,32 34,32" fill="#99897a"/>
    <line x1="28" x2="40" y1="38" y2="38" stroke="#99897a" stroke-width="4"/>
    <line x1="28" x2="40" y1="38" y2="38" stroke="black" stroke-width="1"/>
`

function createImage(state) {
    let palette, features;
    if (state?.toUpperCase() === 'DECEASED') {
        palette = deceasedPatientPalette
        features = deceasedFeatures
    } else {
        palette = livePatientPalette
        features = liveFeatures
    }

    const src = patientTemplate.replace('%neck', palette['neck']
        .replace('%head', palette['head'])
        .replace('%eye', palette['eye'])
        .replace('%features', features))

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(new Blob([src], {type: 'image/svg+xml'}));
    })
}

export const deceasedPatientImage = await createImage('DECEASED')
export const livePatientImage = await createImage('LIVE')