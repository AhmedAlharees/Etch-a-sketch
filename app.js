/* DOM queries */

const colorInput = document.querySelector('#input-chose-color');
const gridContainer = document.querySelector('.grid-container');
const paintByColorBtn = document.querySelector('.color__choice-btn');
const paintByRainbow = document.querySelector('.rainbow-mode-btn');
const eraserBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const numOfGrid = document.querySelector('.grid-size__input');
const gridValueText = document.querySelector('.range__value');

/* global variables */

let color = colorInput.value;
let isPainting = false;
let isErasing = false;
let colorIsRandom = false;

/* functions */

const getRandomColor = function () {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const randColor = `rgb(${red}, ${green}, ${blue})`;
  return randColor;
};

const displayNumberOfGrids = function () {
  const gridValue = numOfGrid.value;
  gridValueText.textContent = gridValue + ' × ' + gridValue;
};

const changeNumberOfGrid = function () {
  const rowsAndColumns = numOfGrid.value;
  gridContainer.style.gridTemplateRows = `repeat(${rowsAndColumns}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${rowsAndColumns}, 1fr)`;
};

const addGridItems = function () {
  gridContainer.innerHTML = '';
  const rows = numOfGrid.value;
  const columns = rows;
  for (let i = 1; i <= rows * columns; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid');
    gridContainer.appendChild(gridItem);
  }
};

const paintGrid = function (e) {
  const clickedGrid = e.target;
  color = isErasing
    ? '#fff'
    : colorIsRandom
    ? getRandomColor()
    : colorInput.value;

  if (isPainting) {
    if (clickedGrid.classList.contains('grid')) {
      clickedGrid.style.backgroundColor = color;
    }
  }
};

const clearPaint = function () {
  addGridItems();
};

/* event listeners */

numOfGrid.addEventListener('input', () => {
  displayNumberOfGrids();
  changeNumberOfGrid();
  addGridItems();
});

gridContainer.addEventListener('pointerdown', (e) => {
  isPainting = true;
  paintGrid(e);
});

paintByColorBtn.addEventListener(
  'pointerdown',
  () => ((isErasing = false), (colorIsRandom = false))
);

gridContainer.addEventListener('pointerup', () => (isPainting = false));

gridContainer.addEventListener('pointermove', paintGrid);

clearBtn.addEventListener('pointerdown', clearPaint);

eraserBtn.addEventListener('pointerdown', () => (isErasing = true));

paintByRainbow.addEventListener('pointerdown', () => {
  colorIsRandom = true;
  isErasing = false;
});
