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
    console.log(internalSudokuToString(internalSudoku));
    internalSudoku = calculatePotentialSolutions(internalSudoku);
    console.log(internalSudokuToString(internalSudoku));
    let previousNumberOfUnsolvedCells = getNumberOfUnsolvedCells(internalSudoku);
    while (true) {
        internalSudoku = calculatePotentialSolutions(internalSudoku);
        console.log(internalSudokuToString(internalSudoku));
        const currentNumberOfUnsolvedCells = getNumberOfUnsolvedCells(internalSudoku);
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
