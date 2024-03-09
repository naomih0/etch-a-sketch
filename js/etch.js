const grid = document.querySelector('.container');

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

createGrid(6);

const gridButton = document.createElement('button');
gridButton.textContent = 'Create New Grid Size';
document.body.appendChild(gridButton);

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
    let a = ((Math.random() * 1).toFixed(1));

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

let brushColor;
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


function createColorButton(name) {

    const button = document.createElement('button');
    button.textContent = name;
    button.id = name.toLowerCase() + '-button'; 
    document.body.appendChild(button);
}

const buttonNames = ['Rainbow', 'Color', 'Grayscale', 'Eraser'];
buttonNames.forEach(name => {
    createColorButton(name);  
});

const rainbowButton = document.getElementById('rainbow-button');
const greyscaleButton = document.getElementById('grayscale-button');
const eraserButton = document.getElementById('eraser-button');
const colorButton = document.getElementById('color-button');

rainbowButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.rainbow);
    handleButtonClick(colorFunctions.rainbow);
});

greyscaleButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.grayscale);
    handleButtonClick(colorFunctions.grayscale);
});

eraserButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.eraser);
    handleButtonClick(colorFunctions.eraser);
});

colorButton.addEventListener('click', function() {
    updateCellsForColor(colorFunctions.color);
    handleButtonClick(colorFunctions.color);
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

    cellColor.forEach(cell => {
        cell.addEventListener('mousedown', handleMouseEvent);
        cell.addEventListener('mouseover', handleMouseEvent);
        cell.addEventListener('mouseup', handleMouseEvent);
    });
};

updateCellsForColor(colorFunctions.rainbow);