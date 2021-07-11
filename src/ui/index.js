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
