/**
 * Custom split helpers for expense shares.
 */

export type SplitShares = Record<string, number>;

/**
 * Convert percentage inputs (2 dp) into per-member amounts that sum
 * exactly to `amount`. The last member absorbs the rounding remainder.
 */
export function percentagesToShares(
  members: { id: string }[],
  percentages: Record<string, string>,
  amount: number
): SplitShares {
  const shares: SplitShares = {};
  let allocated = 0;
  members.forEach((m, i) => {
    if (i === members.length - 1) {
      shares[m.id] = Math.round((amount - allocated) * 100) / 100;
    } else {
      const pct = parseFloat(percentages[m.id] ?? '0') || 0;
      const value = Math.round(amount * pct) / 100;
      shares[m.id] = value;
      allocated += value;
    }
  });
  return shares;
}

/** True when percentages total exactly 100 (within 0.01 tolerance). */
export function percentagesTotal100(
  members: { id: string }[],
  percentages: Record<string, string>
): boolean {
  const total = members.reduce(
    (sum, m) => sum + (parseFloat(percentages[m.id] ?? '0') || 0),
    0
  );
  return Math.abs(total - 100) <= 0.01;
}
