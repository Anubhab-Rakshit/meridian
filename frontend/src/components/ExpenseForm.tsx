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


  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-panel"
      style={{
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ 
          padding: '0.6rem', 
          background: 'rgba(212,175,55,0.08)', 
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '10px', 
          color: 'var(--accent-gold)',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.15)'
        }}>
          <Plus size={18} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#fff', margin: 0, fontStyle: 'italic', fontWeight: 400 }}>
            Log New Expense
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '0.35rem', letterSpacing: '0.05em' }}>
            Amounts are hashed as ZK commitments.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', width: '100%' }}>
        <div style={{ flex: 2 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
            DESCRIPTION
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Dinner at Dorsia"
            className="premium-input"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
            AMOUNT ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="premium-input"
          />
        </div>
      </div>

      <div>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '0.85rem', fontWeight: 600 }}>
          SPLIT TYPE
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => setSplitType('equal')}
            className={`expense-split-btn ${splitType === 'equal' ? 'active' : ''}`}
          >
            <Users size={15} /> Split Equally
          </button>
          <button
            type="button"
            onClick={handleSelectCustom}
            className={`expense-split-btn ${splitType === 'custom' ? 'active' : ''}`}
          >
            <Percent size={15} /> Custom Shares
          </button>
        </div>
      </div>

      {splitType === 'custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.2em', fontWeight: 600 }}>
              CUSTOM SHARES (%)
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: sharesValid ? '#34d399' : '#ff5050',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              TOTAL {totalPercentage.toFixed(2)}% {sharesValid ? '✓' : '— MUST BE 100%'}
            </span>
          </div>

          {members.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#fff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={m.id}
              >
                {m.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={customPercentages[m.id] ?? '0'}
                  onChange={(e) =>
                    setCustomPercentages((prev) => ({ ...prev, [m.id]: e.target.value }))
                  }
                  className="premium-input"
                  style={{
                    width: '100px',
                    paddingRight: '2rem',
                    textAlign: 'right',
                  }}
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '0.8rem', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.3)',
                  pointerEvents: 'none'
                }}>%</span>
              </div>
            </div>
          ))}

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            Each member is charged their share of the total. Shares must add up to 100%.
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !label.trim() || !amount.trim() || (splitType === 'custom' && !sharesValid)}
        className={`expense-submit-btn ${isSubmitting ? 'submitting' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> PROVING ON-CHAIN...
          </>
        ) : (
          'LOG CONFIDENTIAL EXPENSE'
        )}
      </button>
    </motion.form>
  );
};
