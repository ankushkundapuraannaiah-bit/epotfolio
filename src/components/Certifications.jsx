import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle2, Trophy } from 'lucide-react';

export default function Certifications({ activePersona, personaData }) {
  const currentPersona = personaData[activePersona];
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const certColors = ['#38bdf8', '#a855f7', '#4f87ff', '#22c55e', '#e879f9'];

  return (
    <section id="certifications" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-deep) 100%)',
    }}>
      {/* Ambient glow top-right */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '-5%',
        width: '30vw', height: '30vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(232, 121, 249, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-eyebrow">Credentials</div>
            <h2 className="section-title">
              Certifications &{' '}
              <span className="text-gradient-warm">Achievements</span>
            </h2>
            <p className="section-subtitle">
              Recognized credentials from hackathons, industry certifications, and online learning platforms.
            </p>
          </motion.div>
        </div>

        {/* GitHub Achievements Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            padding: '2rem 2.5rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, rgba(79, 135, 255, 0.08), rgba(168, 85, 247, 0.06))',
            borderColor: 'rgba(79, 135, 255, 0.15)',
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: '16px',
            background: 'var(--gradient-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Trophy size={24} color="white" />
          </div>
          <div>
            <h3 style={{
              fontSize: '1.1rem', fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
            }}>
              GitHub Achievements
            </h3>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)' }}>
              Earned <strong style={{ color: 'var(--cyan)' }}>Pull Shark</strong> &amp;{' '}
              <strong style={{ color: 'var(--purple)' }}>Quickdraw</strong> badges on GitHub · 18 repositories · 3 stars
            </p>
          </div>
          <a
            href="https://github.com/ankushkundapuraannaiah-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ marginLeft: 'auto', flexShrink: 0 }}
          >
            View GitHub Profile
          </a>
        </motion.div>

        {/* Certs grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {currentPersona.certifications.map((cert, idx) => {
            const color = certColors[idx % certColors.length];
            const [title, desc] = cert.split(' – ');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true, margin: '-40px' }}
                className="glass-card"
                style={{ padding: '1.75rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: '12px', flexShrink: 0,
                  background: `${color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '0.1rem',
                }}>
                  <Award size={20} color={color} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--text-primary)',
                    marginBottom: desc ? '0.4rem' : 0,
                    lineHeight: 1.35,
                  }}>
                    {title || cert}
                  </div>
                  {desc && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.55,
                    }}>
                      {desc}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
