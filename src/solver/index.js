const SUDOKU_MAGIC_NUMBER = 9;

const SQUARE_NUMBER_BY_COORDINATES = [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
];

// sudoku is a matrix 9*9 (array of nine arrays of nine digits)
// null means empty cell
// digit means filled in cell
export function solve(sudoku) {
    let internalSudoku = initialSudokuToInternalRepresentation(sudoku);
    internalSudoku = calculatePotentialSolutions(internalSudoku);
    let previousNumberOfUnsolvedCells = getNumberOfUnsolvedCells(internalSudoku);
    while (true) {
        internalSudoku = calculatePotentialSolutions(internalSudoku);
        let currentNumberOfUnsolvedCells = getNumberOfUnsolvedCells(internalSudoku);
        if (currentNumberOfUnsolvedCells === 0) {
            break;
        }
        if (currentNumberOfUnsolvedCells === previousNumberOfUnsolvedCells) {
            internalSudoku = applyJediTechniques(internalSudoku);
        }
        currentNumberOfUnsolvedCells = getNumberOfUnsolvedCells(internalSudoku);
        if (currentNumberOfUnsolvedCells === previousNumberOfUnsolvedCells) {
            throw new Error('Can\'t solve sudoku :(');
        }
        if (currentNumberOfUnsolvedCells === 0) {
            break;
        }
        previousNumberOfUnsolvedCells = currentNumberOfUnsolvedCells;
    }
    return internalSudokuToExternalRepresentation(internalSudoku);
}

export function initialSudokuToInternalRepresentation(sudoku) {
    return sudoku.reduce((result, line) => {
        return [...result, line.map(v => {
            if (v) {
                return [v];
            }
            return [];
        })];
    }, []);
}

export function internalSudokuToExternalRepresentation(sudoku) {
    return sudoku.reduce((result, line) => {
        return [...result, line.map(v => v[0] || null)];
    }, []);
}

export function calculatePotentialSolutions(internalSudoku) {
    return internalSudoku.reduce((result, line, i) => {
        return [...result, line.map((v, j) => {
            if (v.length !== 1) {
                return calculatePotentialSolutionsForCell(internalSudoku, i, j);
            }
            return v;
        })];
    }, []);
}

// i - row
// j - column
export function calculatePotentialSolutionsForCell(internalSudoku, i, j) {
    const rowDigits = getRowDigits(internalSudoku, i);
    const columnDigits = getColumnDigits(internalSudoku, j);
    const squareDigits = getSquareDigits(internalSudoku, getSquareNumberByCellCoordinates(i, j));
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .filter(v => !rowDigits.includes(v))
        .filter(v => !columnDigits.includes(v))
        .filter(v => !squareDigits.includes(v));
}

export function getRowDigits(internalSudoku, r) {
    return internalSudoku[r].filter(v => v.length === 1).map(v => v[0]);
}

export function getColumnDigits(internalSudoku, c) {
    const columnDigits = [];
    for (let i = 0; i < SUDOKU_MAGIC_NUMBER; i++) {
        const cell = internalSudoku[i][c];
        if (cell.length === 1) {
            columnDigits.push(cell[0]);
        }
    }
    return columnDigits;
}

// square is a matrix 3*3 and sudoku is made of 9 such squares
export const getSquareNumberByCellCoordinates = (i, j) => SQUARE_NUMBER_BY_COORDINATES[i][j];

export function getSquareDigits(internalSudoku, squareNumber) {
    const squareDigits = [];
    for (let i = 0; i < SUDOKU_MAGIC_NUMBER; i++) {
        for (let j = 0; j < SUDOKU_MAGIC_NUMBER; j++) {
            if (SQUARE_NUMBER_BY_COORDINATES[i][j] === squareNumber) {
                const cell = internalSudoku[i][j];
                if (cell.length === 1) {
                    squareDigits.push(cell[0]);
                }
            }
        }
    }
    return squareDigits;
}

export function getNumberOfUnsolvedCells(internalSudoku) {
    return internalSudoku.reduce((acc, line) => {
        return acc + line.filter(v => v.length !== 1).length;
    }, 0);
}

export function internalSudokuToString(internalSudoku) {
    return internalSudoku.map(row => row.map(cell => '[' + cell.join('') + ']').join(', ')).join('\n');
}

// returns array of arrays and internal array is data about potential insert
// [digit_to_insert, row, column]
export function findSingleAlternativesInSquare(square) {
    const all = findAllAlternativesInSquare(square);
    const counters = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, curr) => {
        return {
            ...acc,
            [curr]: 0
        }
    }, {});
    for (let alt of all) {
        counters[alt[0]]++;
    }
    const singleAlternatives = Object.entries(counters).reduce((acc, [alt, counter]) => {
        if (counter === 1) {
            return [...acc, +alt];
        }
        return acc;
    }, []);
    return singleAlternatives.map(singleAlt => all.find(altInfo => {
        return altInfo[0] === singleAlt;
    }));
}

export function findAllAlternativesInSquare(square) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = square[i][j];
            if (cell.length > 1) {
                for (let alt of cell) {
                    result.push([alt, i, j]);
                }
            }
        }
    }
    return result;
}

export function getSquare(internalSudoku, squareNumber) {
    const squareCellsInArray = [];
    for (let i = 0; i < SUDOKU_MAGIC_NUMBER; i++) {
        for (let j = 0; j < SUDOKU_MAGIC_NUMBER; j++) {
            if (SQUARE_NUMBER_BY_COORDINATES[i][j] === squareNumber) {
                squareCellsInArray.push(internalSudoku[i][j]);
            }
        }
    }
    const result = [[], [], []];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i][j] = squareCellsInArray[i * 3 + j];
        }
    }
    return result;
}

export function squareCoordinatesToSudokuCoordinates(squareNumber, i, j) {
    for (let x = 0; x < SUDOKU_MAGIC_NUMBER; x++) {
        for (let y = 0; y < SUDOKU_MAGIC_NUMBER; y++) {
            if (SQUARE_NUMBER_BY_COORDINATES[x][y] === squareNumber) {
                return [x + i, y + j];
            }
        }
    }
}

export function applyJediTechniques(internalSudoku) {
    console.log('Jedi\'s technique!!!');
    for (let squareNumber = 1; squareNumber < SUDOKU_MAGIC_NUMBER + 1; squareNumber++) {
        const square = getSquare(internalSudoku, squareNumber);
        const singleAlternatives = findSingleAlternativesInSquare(square);
        if (singleAlternatives.length > 0) {
            const singleAlternative = singleAlternatives[0];
            const [x, y] = squareCoordinatesToSudokuCoordinates(squareNumber, singleAlternative[1], singleAlternative[2]);
            internalSudoku[x][y] = [singleAlternative[0]];
            return internalSudoku;
        }
    }
    return internalSudoku;
}
