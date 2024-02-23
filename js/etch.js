const grid = document.querySelector('.container');

function createGrid(num) {

    if (num >= 101) {
        return alert('Too big.....Pick a number between 0-100')
    }
    else if (num <= 0) {
        return alert('Too small....Pick a number between 0-100')
    }

    let removeRow = document.querySelectorAll('.row');
    let removeCell = document.querySelectorAll('.cell');

    if (removeCell !== null || removeRow !== null) {
        removeRow.forEach(row => {
            row.remove();
        });
    
        removeCell.forEach(cell => {
            cell.remove();
        })
    } 
    
    // Create Row
    for (let i = 0; i < num; i++) {
        const row = document.createElement('div')
        row.classList = 'row'
        grid.appendChild(row)

        // Create Cell in Row
        for (let j = 0; j < num; j++) {
            const cell = document.createElement('div')
            cell.classList = 'cell'
            row.appendChild(cell)
        };
    };

    updateEventListeners();
};

createGrid(6)

const gridButton = document.createElement('button');
gridButton.textContent = 'Create New Grid Size';
document.body.appendChild(gridButton);

gridButton.addEventListener('click', pickGridNumber)

function pickGridNumber(event) {
   let pick = prompt('Pick a Number between 0-100!');
   createGrid(pick)
}


function randomColor() {
    return Math.floor(Math.random() * 256);
}

function changeColor(event) {
    let r = randomColor()
    let g = randomColor()
    let b = randomColor()
    let a = ((Math.random() * 1).toFixed(1))

    let rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    event.target.style.backgroundColor = rgba;
}

function updateEventListeners() {
    const cellColor = document.querySelectorAll('.cell');
    cellColor.forEach(cell => {
        cell.addEventListener('mouseover', changeColor);
    });
}
