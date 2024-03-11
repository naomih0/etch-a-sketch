const grid = document.querySelector('.container');

const section2 = document.querySelector(".two");
const bubble1 = document.querySelector(".bubble1");
const bubble2 = document.querySelector(".bubble2");
const bubble3Box = document.querySelector(".bubble3-button-box");

const colorFunctions = {
    rainbow: rainbowColor,
    grayscale: grayscaleColor,
    eraser: eraseColor,
    color: choiceColor, 
}; 

let lastClickButton = null;
function handleButtonClick(colorFunction) {
    lastClickButton = colorFunction;
};

function checkNumber(num) {
    if (num >= 101) {
        alert('Too big.....Pick a number between 0-100');
        return 'No';
    }

    else if (num <= 0) {
        alert('Too small....Pick a number between 0-100');
        return 'No';
    }

    else {
        let removeRow = document.querySelectorAll('.row');
        let removeCell = document.querySelectorAll('.cell');

        if (removeCell !== null || removeRow !== null) {
            removeRow.forEach(row => {
                row.remove();
            });

            removeCell.forEach(cell => {
                cell.remove();
            });
        };
        return 'Yes';
    };
};

function createGrid(num) {
    let results = checkNumber(num);

    if (results === 'Yes') {

        // Create Rowss
        for (let i = 0; i < num; i++) {
            const row = document.createElement('div');
            row.classList = 'row';
            grid.appendChild(row);

            // Create Cells in Row
            for (let j = 0; j < num; j++) {
                const cell = document.createElement('div');
                cell.classList = 'cell';
                row.appendChild(cell);
            };
        };
    }

    else {
        return;
    };
};

createGrid(8);

const gridButton = document.createElement('button');
gridButton.textContent = 'New Grid';
bubble1.appendChild(gridButton);

gridButton.addEventListener('click', pickGridNumber);

function pickGridNumber(event) {
   let pick = prompt('Pick a Number between 0-100!');
   createGrid(pick);
   
   if (lastClickButton) {
    updateCellsForColor(lastClickButton);
   }    

   else {
    updateCellsForColor(colorFunctions.rainbow);
   };
};

function randomColor() {
    return Math.floor(Math.random() * 256);
}

function rainbowColor(event) {
    let r = randomColor();
    let g = randomColor();
    let b = randomColor();
    let a = 1;

    let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    event.target.style.backgroundColor = rgba;
};

function grayscaleColor(event) {
    let randomValue = randomColor();

    let rgba = 'rgba(' + randomValue + ',' + randomValue + ',' + randomValue + ', 1)'; 
    event.target.style.backgroundColor = rgba;
};

function eraseColor(event) {
    event.target.style.backgroundColor = '';
};

let brushColor = 'red';
function choiceColor(event) {
    event.target.style.backgroundColor = brushColor;
};

function brushColors(event) {
    const colorClasses = ['color-one', 'color-two', 'color-three', 'color-four', 'color-five', 
    'color-six', 'color-seven', 'color-eight', 'color-nine', 'color-ten'];

    const color = window.getComputedStyle(event.target).backgroundColor;

    for (let i = 0; i < colorClasses.length; i++) {

        if (event.target.classList.contains(colorClasses[i])) {
            brushColor = color;
            break;
        };
    };

    colorClasses.forEach(function(colorClass) {
        document.querySelector("." + colorClass).classList.remove("clicked");
    });

    event.target.classList.add("clicked");
};

document.querySelector(".color-one").addEventListener("click", brushColors);
document.querySelector(".color-two").addEventListener("click", brushColors);
document.querySelector(".color-three").addEventListener("click", brushColors);
document.querySelector(".color-four").addEventListener("click", brushColors);
document.querySelector(".color-five").addEventListener("click", brushColors);
document.querySelector(".color-six").addEventListener("click", brushColors);
document.querySelector(".color-seven").addEventListener("click", brushColors);
document.querySelector(".color-eight").addEventListener("click", brushColors);
document.querySelector(".color-nine").addEventListener("click", brushColors);
document.querySelector(".color-ten").addEventListener("click", brushColors);

document.querySelector(".color-one").classList.add("clicked");

function clearScreen() {
    let cells = grid.querySelectorAll('.cell');

    cells.forEach(function(cell) {
        cell.style.backgroundColor = '';
    });
};

const computedBorderStyle = window.getComputedStyle(document.querySelector('.cell')).border;
function toggleGrid() {
    let cells = grid.querySelectorAll('.cell');

    cells.forEach(function(cell) {

        if (cell.style.border === 'none') {
            cell.style.border = computedBorderStyle;
        } 
        else {
            cell.style.border = 'none';
        };
    });
};

function pickBackgroundColor() {
    grid.style.backgroundColor = brushColor;
};

function createColorButton(name, parentDiv = section2) {

    const button = document.createElement('button');
    button.textContent = name;
    button.id = name.toLowerCase() + '-button'; 
    parentDiv.appendChild(button);
};


const buttonNames = ['Clear', 'Toggle-Grid', 'Rainbow', 'Grayscale', 'Eraser', 'Color', 'Bg-Color'];
buttonNames.forEach(name => {
    if (name === 'Clear' || name === 'Toggle-Grid') {
        createColorButton(name, bubble1); 
    } 
    else if (name === 'Rainbow' || name === 'Grayscale' || name === 'Eraser') {
        createColorButton(name, bubble2); 
    }
    else if (name === 'Color' || name === 'Bg-Color') {
        createColorButton(name, bubble3Box); 
    }
    else {
        createColorButton(name);  
}
});


const rainbowButton = document.getElementById('rainbow-button');
const greyscaleButton = document.getElementById('grayscale-button');
const eraserButton = document.getElementById('eraser-button');
const colorButton = document.getElementById('color-button');

const clearButton = document.getElementById('clear-button');
const toggleGridButton = document.getElementById('toggle-grid-button');
const bgColorButton = document.getElementById('bg-color-button');

function removeClickedClassFromAll() {
    rainbowButton.classList.remove("clicked");
    greyscaleButton.classList.remove("clicked");
    eraserButton.classList.remove("clicked");
    colorButton.classList.remove("clicked");
}

rainbowButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.rainbow);
    handleButtonClick(colorFunctions.rainbow);
    removeClickedClassFromAll();
    this.classList.toggle("clicked");
});

rainbowButton.classList.add("clicked");

greyscaleButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.grayscale);
    handleButtonClick(colorFunctions.grayscale);
    removeClickedClassFromAll();
    this.classList.toggle("clicked");
});

eraserButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.eraser);
    handleButtonClick(colorFunctions.eraser);
    removeClickedClassFromAll();
    this.classList.toggle("clicked");
});

colorButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.color);
    handleButtonClick(colorFunctions.color);
    removeClickedClassFromAll();
    this.classList.toggle("clicked");
});

clearButton.addEventListener('click', function() {
    clearScreen();
});

toggleGridButton.addEventListener('click', function() {
    toggleGrid();
});

bgColorButton.addEventListener('click', function() {
    pickBackgroundColor();
});

function updateCellsForColor(colorFunction) {
    const cellColor = document.querySelectorAll('.cell');
    let isDragging = false;

    function handleMouseEvent(event) {

        if (event.type === 'mousedown') {
            isDragging = true;
            colorFunction(event);
        } 

        else if (event.type === 'mouseup') {
            isDragging = false;
        }

        else if (event.type === 'mouseover' && isDragging) {
            colorFunction(event);
        };
    };

    function handleTouchEvent(event) {
        event.preventDefault(); 

        if (event.type === 'touchstart') {
            isDragging = true;
            colorFunction(event.touches[0]); 
        } 

        else if (event.type === 'touchend') {
            isDragging = false;
        } 

        else if (event.type === 'touchmove' && isDragging) {
            colorFunction(event.touches[0]); 
        };
    };

    cellColor.forEach(cell => {
        cell.addEventListener('mousedown', handleMouseEvent);
        cell.addEventListener('mouseover', handleMouseEvent);
        cell.addEventListener('mouseup', handleMouseEvent);

        cell.addEventListener('touchstart', handleTouchEvent);
        cell.addEventListener('touchend', handleTouchEvent);
        cell.addEventListener('touchmove', handleTouchEvent);
    });
};

updateCellsForColor(colorFunctions.rainbow);