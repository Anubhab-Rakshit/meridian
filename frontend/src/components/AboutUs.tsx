import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Fingerprint,
  ShieldCheck,
  Hash,
  Share2,
  BadgeCheck,
  Radar,
  Workflow,
  LineChart,
  RefreshCcw,
  Award,
  Layers,
  Eye,
  Cpu,
} from 'lucide-react';

// ==========================================
// Feature icons — lucide-react, consistent with the app icon set
// ==========================================

const IconZkSeal: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Fingerprint size={size} strokeWidth={1.5} />
);

const IconShieldedVault: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <ShieldCheck size={size} strokeWidth={1.5} />
);

const IconCommitmentPrism: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Hash size={size} strokeWidth={1.5} />
);

const IconNettingMatrix: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Share2 size={size} strokeWidth={1.5} />
);

const IconSettlementSeal: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <BadgeCheck size={size} strokeWidth={1.5} />
);

const IconSurveillanceNode: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Radar size={size} strokeWidth={1.5} />
);

const IconGraphOptimization: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Workflow size={size} strokeWidth={1.5} />
);

const IconAnalyticsCurve: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <LineChart size={size} strokeWidth={1.5} />
);

const IconRecurringCycle: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <RefreshCcw size={size} strokeWidth={1.5} />
);

const IconBadgeStar: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Award size={size} strokeWidth={1.5} />
);

const IconCrossCircleVenn: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Layers size={size} strokeWidth={1.5} />
);

const IconSelectiveIris: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Eye size={size} strokeWidth={1.5} />
);

const IconCompactCircuit: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <Cpu size={size} strokeWidth={1.5} />
);

interface AboutUsProps {
  onLaunch: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onLaunch }) => {
  const [activeTab, setActiveTab] = useState<'contract' | 'circuits' | 'netting' | 'analytics' | 'badges'>('contract');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="landing-container">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="hero-content">
          <motion.div variants={itemVariants} className="trust-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
            MIDNIGHT PREPROD • ZERO-KNOWLEDGE LEDGER
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="hero-title">
            Meridian.
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-gold)' }}>
            Private circles. Real money. Zero exposure.
          </motion.p>
          <motion.p variants={itemVariants} className="hero-subtitle">
            The first dApp on Midnight Network for shared expenses — every amount, balance, and identity stays hidden from the public ledger. Venmo-simple, cash-private.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <button onClick={onLaunch} className="launch-btn-primary">
              <span className="btn-text">LAUNCH MERIDIAN</span>
              <div className="btn-glow-effect"></div>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ========================================================= */}
      {/* 2. THE PROBLEM SECTION */}
      {/* ========================================================= */}
      <section className="features-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '2rem', justifyContent: 'center' }}
        >
          <div className="section-title-line"></div>
          <h2 className="section-title">The Status Quo</h2>
          <div className="section-title-line"></div>
        </motion.div>

        <div className="features-grid">
          <motion.div 
            className="feature-card glass-panel"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="feature-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <IconSurveillanceNode size={26} />
              <div className="icon-glow" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}></div>
            </div>
            <h3 className="feature-title">Surveillance Apps</h3>
            <p className="feature-desc">
              Every expense-splitting app — Venmo, Splitwise, SplitIt — has the same flaw: <strong style={{ color: '#fff' }}>everything is public</strong>. Pay for dinner and the whole group sees who paid, how much, and for what. Your spending habits and social graph are an open book.
            </p>
            <div className="feature-card-border"></div>
          </motion.div>

          <motion.div 
            className="feature-card glass-panel"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <div className="feature-icon-wrapper">
              <IconZkSeal size={26} />
              <div className="icon-glow"></div>
            </div>
            <h3 className="feature-title">Public Blockchains</h3>
            <p className="feature-desc">
              On transparent blockchains it's worse: every transaction is permanently recorded and visible forever — an indelible dossier leaking your liquidity, income bracket, and peer interactions to the entire world.
            </p>
            <div className="feature-card-border"></div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. THE SOLUTION SECTION (How Meridian Works) */}
      {/* ========================================================= */}
      <section className="features-section" style={{ marginTop: '4rem' }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '2rem', justifyContent: 'center', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '2rem' }}>
            <div className="section-title-line"></div>
            <h2 className="section-title">Zero-Knowledge Architecture</h2>
            <div className="section-title-line"></div>
          </div>
          <p className="hero-subtitle" style={{ marginTop: '1rem', fontSize: '1rem' }}>
            Meridian is built on Midnight Network, a blockchain designed for selective disclosure — the ability to prove facts about your data without revealing the data itself.
          </p>
        </motion.div>

        <div className="features-grid">
          {[
            {
              step: '01',
              title: 'Create a Circle',
              icon: <IconShieldedVault size={28} />,
              desc: 'Deploy a privacy vault on Midnight — each circle gets its own contract address and invite secret. Members join by proving knowledge of the secret.',
            },
            {
              step: '02',
              title: 'Log Expenses',
              icon: <IconCommitmentPrism size={28} />,
              desc: 'Each payment is logged as a commitment hash: proof the expense exists without revealing the amount, label, or who paid. The hash goes on-chain; the details stay local.',
            },
            {
              step: '03',
              title: 'Compute Balances',
              icon: <IconNettingMatrix size={28} />,
              desc: 'The netting engine computes who owes whom from local data only — no balances are ever published to the blockchain.',
            },
            {
              step: '04',
              title: 'Settle on-chain',
              icon: <IconSettlementSeal size={28} />,
              desc: 'The settlement circuit proves balances are correct, the plan is optimal, and every member nets to zero — the verified hash is recorded on-chain.',
            },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
                <div className="feature-icon-wrapper">
                  {item.icon}
                  <div className="icon-glow"></div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: 'var(--accent-gold)', opacity: 0.5 }}>{item.step}</div>
              </div>
              <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
              <div className="feature-card-border"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. KEY FEATURES SECTION */}
      {/* ========================================================= */}
      <section className="features-section" style={{ marginTop: '4rem' }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '2rem', justifyContent: 'center' }}
        >
          <div className="section-title-line"></div>
          <h2 className="section-title">Product Capabilities</h2>
          <div className="section-title-line"></div>
        </motion.div>

        <div className="features-grid">
          {[
            {
              title: 'Confidential Expense Tracking',
              icon: <IconShieldedVault size={26} />,
              desc: 'Every expense is stored as a cryptographic commitment. The blockchain sees a hash; you see the full details. No one else learns the amounts.',
            },
            {
              title: 'Optimal Settlement Graph',
              icon: <IconGraphOptimization size={26} />,
              desc: 'The netting engine computes the minimum number of transfers needed to settle all debts. This isn’t an approximation; it’s proven.',
            },
            {
              title: 'Privacy-Preserving Analytics',
              icon: <IconAnalyticsCurve size={26} />,
              desc: 'See your circle’s spending patterns — total volume, per-member contributions — all computed locally. The analytics engine produces aggregate statistics safely.',
            },
            {
              title: 'Recurring Pacts',
              icon: <IconRecurringCycle size={26} />,
              desc: 'Automate shared subscriptions. Create recurring pacts for Netflix or rent. Each pact is a commitment to a fixed amount on a fixed schedule.',
            },
            {
              title: 'Badge System',
              icon: <IconBadgeStar size={26} />,
              desc: 'Earn privacy-preserving badges based on your spending behavior. Badges are computed locally and never published on-chain.',
            },
            {
              title: 'Cross-Circle Portability',
              icon: <IconCrossCircleVenn size={26} />,
              desc: 'Your membership proof works across circles. Join multiple groups with the same wallet, and your identity is consistent but isolated.',
            },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: "easeOut" }}
            >
              <div className="feature-icon-wrapper">
                {item.icon}
                <div className="icon-glow"></div>
              </div>
              <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
              <div className="feature-card-border"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. WHY MIDNIGHT SECTION */}
      {/* ========================================================= */}
      <section className="features-section" style={{ marginTop: '4rem' }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '2rem', justifyContent: 'center' }}
        >
          <div className="section-title-line"></div>
          <h2 className="section-title">Foundational Infrastructure</h2>
          <div className="section-title-line"></div>
        </motion.div>

        <div className="features-grid">
          {[
            {
              title: 'Selective Disclosure',
              icon: <IconSelectiveIris size={26} />,
              desc: 'Midnight lets you prove facts about your data (e.g., "I have a positive balance in this circle") without revealing the data itself (the actual balance).',
            },
            {
              title: 'Compact Circuits',
              icon: <IconCompactCircuit size={26} />,
              desc: 'Meridian’s ZK circuits are compiled from Compact, Midnight’s native circuit language. Each circuit is a small, auditable program.',
            },
            {
              title: 'Wallet Integration',
              icon: <IconShieldedVault size={26} />,
              desc: 'Midnight wallets (1 AM, Lace) handle proving, balancing, and submission. The dApp never touches private keys. The wallet proves statements on your behalf.',
            },
            {
              title: 'Preprod Network',
              icon: <IconZkSeal size={26} />,
              desc: 'Meridian runs on Midnight’s Preprod testnet. All contracts, transactions, and settlements are real on-chain operations — not simulations.',
            },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: "easeOut" }}
            >
              <div className="feature-icon-wrapper">
                {item.icon}
                <div className="icon-glow"></div>
              </div>
              <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
              <div className="feature-card-border"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. TEAM / MISSION SECTION */}
      {/* ========================================================= */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        style={{ minHeight: 'auto', marginTop: '4rem', padding: '4rem 2rem' }}
      >
        <div className="hero-content" style={{ maxWidth: '800px' }}>
          <h2 className="hero-title" style={{ fontSize: '3rem' }}>
            Why We Built This
          </h2>
          <p className="hero-subtitle">
            Financial privacy is a human right, not a luxury. Today's tools force a choice: convenient apps that harvest your data, or private tools that don't work for groups. Meridian removes the tradeoff — expense-splitting convenience with the privacy of cash, and no one (platform, blockchain, or member) learns your details unless you choose to share them.
          </p>
        </div>
      </motion.section>

      {/* ========================================================= */}
      {/* 7. TECHNICAL DEEP DIVE SECTION */}
      {/* ========================================================= */}
      <section className="features-section" style={{ marginTop: '4rem' }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '2rem', justifyContent: 'center' }}
        >
          <div className="section-title-line"></div>
          <h2 className="section-title">System Specification</h2>
          <div className="section-title-line"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[
            { id: 'contract', label: 'Smart Contract' },
            { id: 'circuits', label: 'ZK Circuits' },
            { id: 'netting', label: 'Netting Engine' },
            { id: 'analytics', label: 'Analytics Engine' },
            { id: 'badges', label: 'Badge System' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '0.6rem 1.25rem',
                borderRadius: '100px',
                border: activeTab === tab.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === tab.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="glass-panel spec-pane">
          <AnimatePresence mode="wait">
            {activeTab === 'contract' && (
              <motion.div
                key="tab-contract"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}><IconCompactCircuit size={20} /></div>
                  <h3 className="feature-title" style={{ fontSize: '2rem' }}>Compact Smart Contract: splitpool</h3>
                </div>
                <p className="feature-desc" style={{ marginBottom: '2rem' }}>
                  Meridian uses the <code style={{ color: 'var(--accent-gold)' }}>splitpool</code> contract, compiled from Compact into ZK intermediate representations (zkir). It maintains five verified on-chain state fields:
                </p>
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    { field: 'inviteRoot', desc: 'Commitment to the circle membership tree' },
                    { field: 'memberCount', desc: 'Verified counter of joined circle members' },
                    { field: 'expenseCount', desc: 'Cumulative total of logged confidential expenses' },
                    { field: 'settlementCount', desc: 'Number of successfully finalized debt settlements' },
                    { field: 'lastSettlementHash', desc: 'Cryptographic hash of the most recent settlement plan' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>{item.field}</div>
                      <div className="feature-desc" style={{ fontSize: '0.85rem' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'circuits' && (
              <motion.div
                key="tab-circuits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}><IconZkSeal size={20} /></div>
                  <h3 className="feature-title" style={{ fontSize: '2rem' }}>Auditable ZK Circuits</h3>
                </div>
                <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { name: 'join', desc: 'Proves knowledge of the invite secret and increments memberCount without revealing the secret itself.' },
                    { name: 'logExpense', desc: 'Proves valid circle membership and increments expenseCount; the commitment hash is derived from the member’s private secret and salt.' },
                    { name: 'settle', desc: 'Proves membership, stores the verified settlement plan hash, and increments settlementCount to transition debt state.' },
                  ].map((c, idx) => (
                    <div key={idx} style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                        circuit {c.name}()
                      </div>
                      <div className="feature-desc" style={{ fontSize: '0.9rem' }}>
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'netting' && (
              <motion.div
                key="tab-netting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}><IconNettingMatrix size={20} /></div>
                  <h3 className="feature-title" style={{ fontSize: '2rem' }}>Minimum-Transfer Netting Engine</h3>
                </div>
                <p className="feature-desc" style={{ maxWidth: '800px' }}>
                  Computes minimum-transaction settlement plans using a greedy algorithm that matches creditors and debtors by amount. For circles with ≤20 members, exhaustive search finds the true mathematical minimum. For larger circles, the greedy approximation achieves the same optimal reduction in O(N log N) complexity.
                </p>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="tab-analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}><IconAnalyticsCurve size={20} /></div>
                  <h3 className="feature-title" style={{ fontSize: '2rem' }}>Client-Side Analytics Engine</h3>
                </div>
                <p className="feature-desc" style={{ maxWidth: '800px' }}>
                  Computes aggregate statistics (total volume, averages, medians, standard deviations, distribution fairness) entirely from raw local expense data. All computation is performed client-side; only aggregated results are displayed in the dashboard.
                </p>
              </motion.div>
            )}

            {activeTab === 'badges' && (
              <motion.div
                key="tab-badges"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}><IconBadgeStar size={20} /></div>
                  <h3 className="feature-title" style={{ fontSize: '2rem' }}>Statistical Badge System</h3>
                </div>
                <p className="feature-desc" style={{ maxWidth: '800px' }}>
                  Evaluates spending behavior against statistical thresholds and assigns local badges (Fair Splitter, Top Contributor, Settlement Champion, Circle Founder). No on-chain transaction is needed — badges are computed in your browser and stored in local state.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CALL TO ACTION SECTION */}
      {/* ========================================================= */}
      <section className="footer-cta-section" style={{ marginTop: '4rem' }}>
        <motion.div
          className="cta-card glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="cta-background-glow"></div>
          <div className="feature-icon-wrapper" style={{ margin: '0 auto 1.5rem auto' }}>
            <IconShieldedVault size={26} />
            <div className="icon-glow"></div>
          </div>
          <h2 className="cta-title">Start Your First Circle</h2>
          <p className="hero-subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
            Connect your Midnight wallet. Deploy a privacy vault. Split your first expense — confidentially.
          </p>
          <button onClick={onLaunch} className="launch-btn-secondary">
            LAUNCH MERIDIAN
          </button>
        </motion.div>
      </section>

    </div>
  );
};
