import { solve, getSquareNumberByCellCoordinates, getSquareDigits, initialSudokuToInternalRepresentation, calculatePotentialSolutionsForCell, getRowDigits, getColumnDigits, getNumberOfUnsolvedCells, internalSudokuToString, findAllAlternativesInSquare, findSingleAlternativesInSquare, squareCoordinatesToSudokuCoordinates, getSquare } from '../../src/solver';

const TEST_INITIAL_SUDOKU = [
    [3, null, 7, null, 8, 1, null, null, null],
    [null, null, null, 5, null, null, 3, 8, null],
    [null, null, null, 7, null, null, 1, 6, null],
    [null, 8, 5, null, null, null, null, 4, 2],
    [4, null, null, null, null, null, null, null, 5],
    [6, 9, null, null, null, null, 7, 3, null],
    [null, 2, 3, null, null, 7, null, null, null],
    [null, 6, 8, null, null, 9, null, null, null],
    [null, null, null, 1, 6, null, 2, null, 3]
];

describe('solver', () => {
    it('solves correctly', () => {
        const solvedSudoku = [
            [3, 4, 7, 6, 8, 1, 5, 2, 9],
            [2, 1, 6, 5, 9, 4, 3, 8, 7],
            [8, 5, 9, 7, 3, 2, 1, 6, 4],
            [7, 8, 5, 9, 1, 3, 6, 4, 2],
            [4, 3, 2, 8, 7, 6, 9, 1, 5],
            [6, 9, 1, 2, 4, 5, 7, 3, 8],
            [1, 2, 3, 4, 5, 7, 8, 9, 6],
            [5, 6, 8, 3, 2, 9, 4, 7, 1],
            [9, 7, 4, 1, 6, 8, 2, 5, 3]
        ];
        expect(solve(TEST_INITIAL_SUDOKU).toString()).toBe(solvedSudoku.toString());
    });

    it('returns correct square number by cell coordinates', () => {
        // 1
        expect(getSquareNumberByCellCoordinates(0, 0)).toBe(1);
        expect(getSquareNumberByCellCoordinates(0, 1)).toBe(1);
        expect(getSquareNumberByCellCoordinates(0, 2)).toBe(1);
        expect(getSquareNumberByCellCoordinates(1, 0)).toBe(1);
        expect(getSquareNumberByCellCoordinates(1, 1)).toBe(1);
        expect(getSquareNumberByCellCoordinates(1, 2)).toBe(1);
        expect(getSquareNumberByCellCoordinates(2, 0)).toBe(1);
        expect(getSquareNumberByCellCoordinates(2, 1)).toBe(1);
        expect(getSquareNumberByCellCoordinates(2, 2)).toBe(1);
        // 4
        expect(getSquareNumberByCellCoordinates(3, 0)).toBe(4);
        expect(getSquareNumberByCellCoordinates(3, 1)).toBe(4);
        expect(getSquareNumberByCellCoordinates(3, 2)).toBe(4);
        expect(getSquareNumberByCellCoordinates(4, 0)).toBe(4);
        expect(getSquareNumberByCellCoordinates(4, 1)).toBe(4);
        expect(getSquareNumberByCellCoordinates(4, 2)).toBe(4);
        expect(getSquareNumberByCellCoordinates(5, 0)).toBe(4);
        expect(getSquareNumberByCellCoordinates(5, 1)).toBe(4);
        expect(getSquareNumberByCellCoordinates(5, 2)).toBe(4);
    });

    it('returns correct square digits by square number', () => {
        expect(getSquareDigits(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 1).toString()).toBe([3, 7].toString());
        expect(getSquareDigits(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 7).toString()).toBe([2, 3, 6, 8].toString());
    });

    it('calculates correct potential solutions for cell', () => {
        expect(calculatePotentialSolutionsForCell(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 0, 1).toString()).toBe([4, 5].toString());
    });

    it('returns correct row digits', () => {
        expect(getRowDigits(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 1).toString()).toBe([5, 3, 8].toString());
    });

    it('returns correct column digits', () => {
        expect(getColumnDigits(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 1).toString()).toBe([8, 9, 2, 6].toString());
    });

    it('returns correct number of unsolved cells', () => {
        expect(getNumberOfUnsolvedCells(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU))).toBe(51);
    });

    it('converts mini-sudoku to correct string', () => {
        expect(internalSudokuToString([
            [[1, 2, 3], [5], [7]],
            [[], [6, 7], [8, 9]],
            [[], [], []]
        ])).toBe('[123], [5], [7]\n[], [67], [89]\n[], [], []')
    });

    it('finds correct alternatives in square', () => {
        const square = [
            [[1], [2], [3]],
            [[4, 5], [5, 6], [6, 7]],
            [[7, 9], [8], [5, 6]]
        ];
        expect(findAllAlternativesInSquare(square).toString()).toBe([
            [4, 1, 0],
            [5, 1, 0],
            [5, 1, 1],
            [6, 1, 1],
            [6, 1, 2],
            [7, 1, 2],
            [7, 2, 0],
            [9, 2, 0],
            [5, 2, 2],
            [6, 2, 2],
        ].toString());
    });

    it('finds correct single alternatives in square', () => {
        const square = [
            [[1], [2], [3]],
            [[4, 5], [5, 6], [6, 7]],
            [[7, 9], [8], [5, 6]]
        ];
        expect(findSingleAlternativesInSquare(square).toString()).toBe([
            [4, 1, 0],
            [9, 2, 0],
        ].toString());
    });

    it('converts correctly square coodriantes to sudoku coordinates', () => {
        expect(squareCoordinatesToSudokuCoordinates(5, 1, 1).toString()).toBe([4, 4].toString());
    });

    it('returns correct square', () => {
        expect(getSquare(initialSudokuToInternalRepresentation(TEST_INITIAL_SUDOKU), 4).toString()).toBe([
            [[], [8], [5]],
            [[4], [], []],
            [[6], [9], []]
        ].toString());
    });
});
