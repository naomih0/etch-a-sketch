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

createGrid(8)