export async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    })
}

export function objectUrlFromTemplate(template) {
    return URL.createObjectURL(new Blob([template], {type: 'image/svg+xml'}))
}