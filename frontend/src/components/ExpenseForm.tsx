import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, Users, Percent } from 'lucide-react';
import { useToast } from './TransactionToast';
import { percentagesToShares, percentagesTotal100 } from '../lib/split-shares';
import type { SplitShares } from '../hooks/useCirclesStore';

interface ExpenseFormProps {
  members: { id: string; name: string }[];
  onAddExpense: (
    label: string,
    amount: number,
    splitType: 'equal' | 'custom',
    shares?: SplitShares
  ) => Promise<void>;
}

/** Equal default percentages (2 dp) that always total exactly 100. */
function defaultShares(members: { id: string; name: string }[]): Record<string, string> {
  const n = members.length;
  const cents = Math.floor(10000 / n);
  const parts = Array.from({ length: n }, () => cents);
  parts[0] += 10000 - cents * n;
  const result: Record<string, string> = {};
  members.forEach((m, i) => {
    result[m.id] = (parts[i] / 100).toFixed(2);
  });
  return result;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ members, onAddExpense }) => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [customPercentages, setCustomPercentages] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast, updateToast } = useToast();

  const totalPercentage = useMemo(() => {
    return members.reduce((sum, m) => sum + (parseFloat(customPercentages[m.id] ?? '0') || 0), 0);
  }, [customPercentages, members]);

  const sharesValid = percentagesTotal100(members, customPercentages);

  const handleSelectCustom = () => {
    setSplitType('custom');
    if (Object.keys(customPercentages).length === 0) {
      setCustomPercentages(defaultShares(members));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !amount.trim()) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    if (splitType === 'custom' && !sharesValid) return;

    setIsSubmitting(true);
    const toastId = addToast({ type: 'pending', title: 'Logging Expense', message: 'Generating ZK proof for the expense commitment...' });

    try {
      const shares =
        splitType === 'custom'
          ? percentagesToShares(members, customPercentages, parsedAmount)
          : undefined;
      await onAddExpense(label, parsedAmount, splitType, shares);
      updateToast(toastId, { type: 'success', title: 'Expense Logged', message: 'The commitment was successfully recorded on Midnight.' });
      setLabel('');
      setAmount('');
    } catch (err) {
      updateToast(toastId, { type: 'error', title: 'Transaction Failed', message: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
  };

  const splitButtonStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '0.75rem',
    background: active ? 'rgba(212,175,55,0.1)' : 'transparent',
    border: `1px solid ${active ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}`,
    color: active ? 'var(--accent-gold)' : 'var(--text-muted)',
    borderRadius: '8px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      style={{
        padding: '2rem',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ padding: '0.5rem', background: 'rgba(212,175,55,0.1)', borderRadius: '8px', color: 'var(--accent-gold)' }}>
          <Plus size={16} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', margin: 0 }}>Log New Expense</h3>
      </div>

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <div style={{ flex: 2 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
            DESCRIPTION
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Dinner at Dorsia"
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
            AMOUNT ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
          SPLIT TYPE
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => setSplitType('equal')}
            style={splitButtonStyle(splitType === 'equal')}
          >
            <Users size={14} /> Split Equally
          </button>
          <button
            type="button"
            onClick={handleSelectCustom}
            style={splitButtonStyle(splitType === 'custom')}
          >
            <Percent size={14} /> Custom Shares
          </button>
        </div>
      </div>

      {splitType === 'custom' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1.25rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-gold)', letterSpacing: '0.2em' }}>
              CUSTOM SHARES (%)
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: sharesValid ? '#34d399' : '#ff5050',
                fontWeight: 600,
              }}
            >
              TOTAL {totalPercentage.toFixed(2)}% {sharesValid ? '✓' : '— must be 100%'}
            </span>
          </div>

          {members.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#fff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={m.id}
              >
                {m.name}
              </span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={customPercentages[m.id] ?? '0'}
                onChange={(e) =>
                  setCustomPercentages((prev) => ({ ...prev, [m.id]: e.target.value }))
                }
                style={{
                  ...inputStyle,
                  width: '90px',
                  padding: '0.6rem 0.75rem',
                  textAlign: 'right',
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>%</span>
            </div>
          ))}

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Each member is charged their share of the total. Shares must add up to 100%.
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !label.trim() || !amount.trim() || (splitType === 'custom' && !sharesValid)}
        style={{
          marginTop: '1rem',
          width: '100%',
          padding: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 600,
          background: isSubmitting ? 'transparent' : 'var(--accent-gold)',
          color: isSubmitting ? 'var(--accent-gold)' : '#000',
          border: isSubmitting ? '1px solid var(--accent-gold)' : 'none',
          borderRadius: '8px',
          cursor: isSubmitting ? 'wait' : 'pointer',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: (!label.trim() || !amount.trim() || (splitType === 'custom' && !sharesValid)) ? 0.5 : 1
        }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={14} className="animate-spin" /> PROVING ON-CHAIN...
          </>
        ) : (
          'LOG CONFIDENTIAL EXPENSE'
        )}
      </button>
    </motion.form>
  );
};
