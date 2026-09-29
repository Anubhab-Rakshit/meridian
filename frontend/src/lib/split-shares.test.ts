import { describe, it, expect } from 'vitest';
import { percentagesToShares, percentagesTotal100 } from './split-shares';

const members = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

describe('percentagesToShares', () => {
  it('splits evenly and sums exactly to the amount', () => {
    const shares = percentagesToShares(
      members,
      { a: '33.33', b: '33.33', c: '33.34' },
      100
    );
    expect(shares.a).toBeCloseTo(33.33, 2);
    expect(shares.b).toBeCloseTo(33.33, 2);
    expect(shares.c).toBeCloseTo(33.34, 2);
    expect(shares.a + shares.b + shares.c).toBeCloseTo(100, 2);
  });

  it('respects custom percentages', () => {
    const shares = percentagesToShares(
      members,
      { a: '50', b: '30', c: '20' },
      90
    );
    expect(shares.a).toBe(45);
    expect(shares.b).toBe(27);
    expect(shares.c).toBe(18);
  });

  it('last member absorbs rounding remainder so the total matches', () => {
    // 10 * 33.33% = 3.333 → rounds to 3.33 each for a, b; c gets the rest
    const shares = percentagesToShares(
      members,
      { a: '33.33', b: '33.33', c: '33.34' },
      10
    );
    const total = shares.a + shares.b + shares.c;
    expect(Math.round(total * 100) / 100).toBe(10);
  });

  it('treats missing or invalid percentages as zero', () => {
    const shares = percentagesToShares(members, { a: '100', b: 'oops' }, 50);
    expect(shares.a).toBe(50);
    expect(shares.b).toBe(0);
    expect(shares.c).toBe(0);
  });
});

describe('percentagesTotal100', () => {
  it('accepts totals within 0.01 of 100', () => {
    expect(percentagesTotal100(members, { a: '33.33', b: '33.33', c: '33.34' })).toBe(true);
    expect(percentagesTotal100(members, { a: '50', b: '50', c: '0' })).toBe(true);
  });

  it('rejects totals that are not 100', () => {
    expect(percentagesTotal100(members, { a: '50', b: '30', c: '10' })).toBe(false);
    expect(percentagesTotal100(members, { a: '100', b: '100', c: '100' })).toBe(false);
  });
});
