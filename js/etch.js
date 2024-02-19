const grid = document.querySelector('.container');

function createGrid(num) {
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
};

createGrid(16)

const cellColor = document.querySelectorAll('.cell')

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

cellColor.forEach(cell => {
    cell.addEventListener('mouseover', changeColor);
}) 

