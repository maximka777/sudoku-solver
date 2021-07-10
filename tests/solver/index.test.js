import { Solver } from '../../src/solver';

describe('Solver', () => {
    it('solves correectly', () => {
        expect(new Solver().solve()).toBe('Solved');
    });
});
