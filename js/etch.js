const grid = document.querySelector('.container');

const section2 = document.querySelector(".two");
const bubble1 = document.querySelector(".bubble1");
const bubble2 = document.querySelector(".bubble2");
const bubble3Box = document.querySelector(".bubble3-button-box");

// Object mapping color brush functions
const colorFunctions = {
    rainbow: rainbowColor,
    grayscale: grayscaleColor,
    eraser: eraseColor,
    color: choiceColor, 
}; 

// Stores the last clicked color button function for new grid creation
let lastClickButton = null;
function handleButtonClick(colorFunction) {
    lastClickButton = colorFunction;
};

// Checks if new grid number is between 0-100
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
        // If yes, then removes old grid so new grid can replace
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
                cell.classList.add('cell-with-border');
                row.appendChild(cell);
            };
        };
    }

    else {
        return;
    };
};

createGrid(8); // Creates the default grid

// Creates the New Grid button
const gridButton = document.createElement('button');
gridButton.textContent = 'New Grid';
bubble1.appendChild(gridButton);

gridButton.addEventListener('click', pickGridNumber);


function pickGridNumber(event) {
   let pick = prompt('Pick a Number between 0-100!');
   createGrid(pick);
   
   // Gets the last click button for new grid 
   if (lastClickButton) {
    updateCellsForColor(lastClickButton);
   }    

   else {
    updateCellsForColor(colorFunctions.rainbow); // defaults at rainbow brush
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

// Function to handle brush colors based on the clicked color tile
function brushColors(event) {
    const colorClasses = ['color-one', 'color-two', 'color-three', 'color-four', 'color-five', 
    'color-six', 'color-seven', 'color-eight', 'color-nine', 'color-ten'];

    // Get the background color of the clicked tile
    const color = window.getComputedStyle(event.target).backgroundColor;

    for (let i = 0; i < colorClasses.length; i++) {

        if (event.target.classList.contains(colorClasses[i])) {
            brushColor = color;  // If the clicked tile matches a color class, set brushColor to its color
            break;
        };
    };

    // For css styling (only one color can be selected for this css style at a time)
    colorClasses.forEach(function(colorClass) {
        document.querySelector("." + colorClass).classList.remove("clicked");
    });

    event.target.classList.add("clicked"); 
};

// Event listeners to trigger brushColors function when color tiles are clicked
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

document.querySelector(".color-one").classList.add("clicked"); // For css styling (Default)

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
        if (cell.classList.contains('cell-with-border')) {
            cell.classList.remove('cell-with-border');
        } 

        else {
            cell.classList.add('cell-with-border');
        };
    });
    console.log('Fin')
};

function pickBackgroundColor() {
    grid.style.backgroundColor = brushColor;
};

// Creates Buttons (dyanmic)
function createColorButton(name, parentDiv = section2) {

    const button = document.createElement('button');
    button.textContent = name;
    button.id = name.toLowerCase() + '-button'; 
    parentDiv.appendChild(button);
};

// Create buttons based on names in buttonNames array and assign them specific locations in the HTML.
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
    };
});

// Standard Color Brush Buttons
const rainbowButton = document.getElementById('rainbow-button');
const greyscaleButton = document.getElementById('grayscale-button');
const eraserButton = document.getElementById('eraser-button');
const colorButton = document.getElementById('color-button');

const clearButton = document.getElementById('clear-button');
const toggleGridButton = document.getElementById('toggle-grid-button');
const bgColorButton = document.getElementById('bg-color-button');

// Removes the click class from the 4 standard color buttons (only one color can be selected for this css style at a time)
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

rainbowButton.classList.add("clicked"); // For css styling (default)

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

// Colors the cell base on the brush selected (Handles both mouse & touch interactions)
function updateCellsForColor(colorFunction) {
    const cellColor = document.querySelectorAll('.cell');
    let isDragging = false;
    const touchedCells = new Set();

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

        // Get the target element of the touch event
        const targetElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);

        // Checks if target element exists and is a .cell element
        if (targetElement && targetElement.classList.contains('cell')) {
   
            if (!touchedCells.has(targetElement)) { // Checks to see if the cell has been touch yet

                colorFunction({ target: targetElement }); 
                touchedCells.add(targetElement);  // Add the cell to the set of touched cells
            };

            if (event.type === 'touchstart') {
                isDragging = true;
            } 
            else if (event.type === 'touchend') {
                isDragging = false;
            };
        };
    };

    // Reset dragging state and touched cells when touch ends
    function handleTouchEnd() {
        isDragging = false;
        touchedCells.clear();
    };
    
    cellColor.forEach(cell => {
        // Mouse event listeners
        cell.addEventListener('mousedown', handleMouseEvent);
        cell.addEventListener('mouseover', handleMouseEvent);
        cell.addEventListener('mouseup', handleMouseEvent);

        // Touch event listeners
        cell.addEventListener('touchstart', handleTouchEvent);
        cell.addEventListener('touchmove', handleTouchEvent);
        cell.addEventListener('touchend', handleTouchEnd);
    });
};

updateCellsForColor(colorFunctions.rainbow); // Default brush color