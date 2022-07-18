let GRID_SIZE = 16;

let gridColor = "#543b16";
let clicked = false;
let colorType = "normal";

// this function colors each grid unit with current selected color
function colorHandler(event) {
    if (clicked) {
        if (colorType === "normal")
            event.target.style.backgroundColor = gridColor;
        else if (colorType === "random") {
            event.target.style.backgroundColor = getRandomColor();
        }
    }
}

// this function returns a random rgb color value
function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

// this function handles en event which changes color mode to random
function randomColorHandler() {
    colorType = "random";
}

// this function handles an event which changes current color in normal mode.
function colorChangeHandler(event) {
    if (colorType !== "normal") colorType = "normal";

    gridColor = event.target.value;
    colorWrapperElement.style.backgroundColor = gridColor;
}

// this handler checks if user clicked on grid and toggles it
function colorClickHandler() {
    clicked = !clicked;
}

// this function handles event where a user changes grid size
function changeGridSizeHandler(event) {
    GRID_SIZE = event.target.value;
    resetGridHandler();
}

// this function creates grid with given size as parameter
function createGrid(gridSize) {
    const gridContainerElement = document.querySelector(".grid-container");
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid");
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridElement.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const gridUnit = document.createElement("div");
        gridUnit.classList.add("grid-unit");
        gridUnit.addEventListener("mousedown", colorClickHandler);
        gridUnit.addEventListener("mouseover", colorHandler);
        gridElement.appendChild(gridUnit);
    }
    gridContainerElement.appendChild(gridElement);
}

// this function handles event of resetting grid.
function resetGridHandler() {
    const gridContainerElement = document.querySelector(".grid-container");
    gridContainerElement.innerHTML = "";
    createGrid(GRID_SIZE);
}

const colorPicker = document.querySelector("#grid-color");
colorPicker.addEventListener("input", colorChangeHandler);

const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", resetGridHandler);

const sizeSelectElement = document.querySelector("#grid-size");
sizeSelectElement.addEventListener("input", changeGridSizeHandler);
sizeSelectElement.value = GRID_SIZE;

const randomColorButton = document.querySelector("#random-color");
randomColorButton.addEventListener("click", randomColorHandler);
createGrid(GRID_SIZE);

const colorWrapperElement = document.querySelector(".color-wrapper");
colorWrapperElement.style.backgroundColor = gridColor;
