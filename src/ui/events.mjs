import {
    buildUIContainer,
    bulldozer, changeBulldozer,
    onBuildButtonClick,
    placeBuilding, remove,
    selectedBuilding,
    unselectBuilding
} from "./build.mjs";
import {HEIGHT, STD_TILE_WIDTH, WIDTH} from "../index.js";

export let mouseX
export let mouseY

export function onmousemove (event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    //console.log({mouseX, mouseY});
}

export function onmouseclick(event, game) {
    if (selectedBuilding) {
        console.log(calculateCellPosition())
        placeBuilding(game, selectedBuilding, calculateCellPosition());
    }

    if (bulldozer) {
        remove(game, calculateCellPosition())
    }
}

export function onkeypress (event) {
    console.log(event.key);
    switch (event.key) {
        case 'q':
            onQ()
            break
        case 'd':
            changeBulldozer()
            break
    }
}

function onQ() {
    if (!buildUIContainer.hidden) {
        onBuildButtonClick()
        return;
    }

    if (selectedBuilding) {
        unselectBuilding()
    }

    if (bulldozer) {
        changeBulldozer()
    }
}

function calculateCellPosition() {
    const position = {
        x: Math.floor(mouseX/STD_TILE_WIDTH),
        y: Math.floor(mouseY/STD_TILE_WIDTH)-3
    }
    console.log(position)
    return position
}
