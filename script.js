const prompt = require('prompt-sync')();

const grid = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
const direction = {
    "north": -1,
    "east": 1,
    "south": 1,
    "west": -1,
    'right': 1,
    'left': -1
}

const valueStartSouth = 4

// prompt questions
console.log('PLACE Pacman');
let column = prompt('');
while (column < 0 || column > 4) {
    column = prompt('invalid value, try again: ');
}

let row = prompt('');
while (row < 0 || row > 4) {
    row = prompt('invalid value, try again: ');
}

let facing = prompt('');

let action = '';

// PLACE 
const place = {
    "column": Number(column), // move to north/south
    "row": Number(row), // move to east/west
    "direction": facing
}
pacmanPosition(place)


while (action !== "report") {
    if (action === 'right' || action === 'left') {
        changeDirection(action)
    } else if (action === 'move') {
        const movement = place['direction']
        movePacman(movement)
    }
    action = prompt('');
}


// functions
function pacmanPosition(place) {
    const column = valueStartSouth - place['column']
    const row = place['row']
    return grid[column][row] = 'P'
}

function movePacman(movement) {
    const column = valueStartSouth - place['column']
    const row = place['row']
    const newDirection = direction[movement]

    if (movement === 'north' || movement === 'south') {
        if (grid[column][row - newDirection] !== undefined) {
            grid[column][row - newDirection] = 'P'
            // restart grid table
            grid[column][row] = 0
            setNewPosition(movement)
        }

    } else {
        if (grid[column - newDirection] !== undefined) {
            grid[column - newDirection][row] = 'P'

            // restart grid table
            grid[column][row] = 0
            setNewPosition(movement)
        }

    }
}

function setNewPosition(direction) {
    grid.forEach((column, index) => {
        const row = column.findIndex(pacman => pacman !== 0)
        if (row !== -1) {
            place['column'] = valueStartSouth - index
            place['row'] = row
        }
    })
    place['direction'] = direction
}

function changeDirection(rotate) {
    const currentFacing = place['direction']
    const directionArray = Object.keys(direction)
    const currentDirectionIndex = directionArray.findIndex(direction => direction === currentFacing)

    let newDirectionIndex = currentDirectionIndex + direction[rotate]

    newDirectionIndex === 4 ?? (newDirectionIndex = 0)
    newDirectionIndex === -1 ?? (newDirectionIndex = 3)

    const newDirection = directionArray[newDirectionIndex]

    return place['direction'] = newDirection;
}

function report() {
    console.log('>> Output: ', place)
}

report();










