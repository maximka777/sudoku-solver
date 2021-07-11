const SUDOKU_SIZE = 9;

export function readSudokuFromTable(table) {
    const body = table.querySelector('tbody');
    let sudoku = [];
    for (let i = 0; i < SUDOKU_SIZE; i++) {
        const row = [];
        for (let j = 0; j < SUDOKU_SIZE; j++) {
            row.push(+body.children[i].children[j].children[0].textContent || null);
        }
        sudoku.push(row);
    }
    return sudoku;
}

export function writeSudokuToTable(sudoku, table) {
    const body = table.querySelector('tbody');
    for (let i = 0; i < SUDOKU_SIZE; i++) {
        for (let j = 0; j < SUDOKU_SIZE; j++) {
            body.children[i].children[j].children[0].textContent = `${sudoku[i][j]}`;
        }
    }
}

export async function writeSudokuToTableAccordingToInsertsList(inserts, table, delay) {
    delay = delay || 500;
    const body = table.querySelector('tbody');
    for (let insert of inserts) {
        const cell = body.children[insert.x].children[insert.y];
        cell.style.backgroundColor = insert.isJedi ? JEDI_INSERT_COLOR : DEFAULT_INSERT_COLOR;
        cell.children[0].textContent = `${insert.digit}`;
        await sleep(delay);
    }
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 


const JEDI_INSERT_COLOR = 'orange';

const DEFAULT_INSERT_COLOR = 'green';
