import { EVENT_DIGIT_IS_INSERTED, solve } from './src/solver/index.js';
import { readSudokuFromTable, writeSudokuToTableAccordingToInsertsList } from './src/ui/index.js';

function du(table) {
    const sudoku = readSudokuFromTable(table);

    const events = [];
    solve(sudoku, event => events.push(event));

    writeSudokuToTableAccordingToInsertsList(events.filter(e => e.event === EVENT_DIGIT_IS_INSERTED), table, 100);
}

const table = document.querySelector('#sudoku-table');
if (!table) {
    throw new Error('Table not found');
}

document.querySelector('#sudoku-solve-button').addEventListener('click', () => du(table));
