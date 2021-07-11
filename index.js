import { solve } from './src/solver/index.js';
import { readSudokuFromTable, writeSudokuToTable } from './src/ui/index.js';

function du(table) {
    const sudoku = readSudokuFromTable(table);
    const solvedSudoku = solve(sudoku);
    writeSudokuToTable(solvedSudoku, table);
}

const table = document.querySelector('#sudoku-table');
if (!table) {
    throw new Error('Table not found');
}

document.querySelector('#sudoku-solve-button').addEventListener('click', () => du(table));
