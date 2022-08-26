import {buildUIContainer, onBuildButtonClick, placeBuilding, selectedBuilding, unselectBuilding} from "./build.mjs";
import {HEIGHT, STD_TILE_WIDTH, WIDTH} from "../game.mjs";

export let mouseX
export let mouseY

export function onmousemove (event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    console.log({mouseX, mouseY});
}

export function onmouseclick(event, game) {
    if (selectedBuilding) {
        console.log(calculateCellPosition())
        placeBuilding(game, selectedBuilding, calculateCellPosition());
    }
}

export function onkeypress (event) {
    console.log(event.key);
    switch (event.key) {
        case "q":
            onQ()
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
}

function calculateCellPosition() {
    const position = {
        x: Math.floor(mouseX/STD_TILE_WIDTH),
        y: Math.floor(mouseY/STD_TILE_WIDTH)-3
    }
    console.log(position)
    return position
}
