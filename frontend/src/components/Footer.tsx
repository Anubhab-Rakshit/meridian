import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, Terminal, AtSign } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_URL = 'https://github.com/Anubhab-Rakshit/meridian';
const USER_GUIDE_URL = 'https://github.com/Anubhab-Rakshit/meridian/blob/main/docs/USAGE.md';
const ARCHITECTURE_URL = 'https://github.com/Anubhab-Rakshit/meridian/blob/main/docs/architecture.md';
const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeUNNyC7LbEBR1XpLa_VJbyh_Vd7NtndDYDyGkCIhV13SluwA/viewform?usp=sharing&ouid=116630055802177695188';
const DEMO_VIDEO_URL = 'https://youtu.be/CFae-K52us0';
const LIVE_DEMO_URL = 'https://meridian-midnight.vercel.app/';
const X_URL = 'https://x.com/meridian_split';

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

interface FooterProps {
  onNavigateAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAbout }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(textRef.current, "skewY", "deg");
    let clamp = gsap.utils.clamp(-20, 20);

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <footer className="cinematic-footer">
      <div className="footer-content">
        <motion.div 
          ref={textRef}
          className="footer-massive-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Settle in Secret.
        </motion.div>
        
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-heading">MIDNIGHT NETWORK</h4>
            <p className="footer-desc">
              Meridian utilizes Zero-Knowledge proofs on the Midnight Preprod testnet to guarantee observable privacy behavior for group expenses.
            </p>
            {onNavigateAbout && (
              <button
                onClick={onNavigateAbout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  marginTop: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>Read Architecture & Mission →</span>
              </button>
            )}
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">RESOURCES</h4>
            <div className="footer-links">
              <a href={USER_GUIDE_URL} className="footer-link" {...externalLinkProps}>User Guide</a>
              <a href={ARCHITECTURE_URL} className="footer-link" {...externalLinkProps}>Architecture</a>
              <a href={FEEDBACK_FORM_URL} className="footer-link" {...externalLinkProps}>Feedback Form</a>
              <a href={DEMO_VIDEO_URL} className="footer-link" {...externalLinkProps}>3-Min Demo</a>
              <a href={GITHUB_URL} className="footer-link" {...externalLinkProps}>GitHub Repository</a>
            </div>
          </div>

          <div className="footer-col align-right">
            <h4 className="footer-heading">CONNECT</h4>
            <div className="social-links">
              <Magnetic pull={0.4}><a href={GITHUB_URL} className="social-link" aria-label="GitHub" {...externalLinkProps}><Terminal size={18} /></a></Magnetic>
              <Magnetic pull={0.4}><a href={LIVE_DEMO_URL} className="social-link" aria-label="Live demo" {...externalLinkProps}><Globe size={18} /></a></Magnetic>
              <Magnetic pull={0.4}><a href={X_URL} className="social-link" aria-label="Meridian on X" {...externalLinkProps}><AtSign size={18} /></a></Magnetic>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="text-mono text-muted">&copy; 2026 Meridian</span>
          <span className="text-mono text-muted">Confidential Ledger</span>
        </div>
      </div>
    </footer>
  );
};

