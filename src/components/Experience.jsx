import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Zap } from 'lucide-react';

function ExperienceCard({ exp, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      style={{ display: 'flex', gap: '2rem', position: 'relative' }}
    >
      {/* Timeline line */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: 'var(--gradient-accent)',
          boxShadow: '0 0 20px rgba(79, 135, 255, 0.5)',
          flexShrink: 0,
          marginTop: '0.25rem',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', inset: -3, borderRadius: '50%',
            border: '1px solid rgba(79, 135, 255, 0.3)',
          }} />
        </div>
        <div style={{
          width: 1,
          flex: 1,
          background: 'linear-gradient(to bottom, rgba(79, 135, 255, 0.3), transparent)',
          minHeight: '60px',
          marginTop: '8px',
        }} />
      </div>

      {/* Card */}
      <div
        className="glass-card"
        style={{
          padding: '2rem 2.25rem',
          marginBottom: '2rem',
          flex: 1,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              {exp.role}
            </h3>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.85rem',
              borderRadius: '100px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              background: 'rgba(56, 189, 248, 0.06)',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--cyan)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}>
              <Calendar size={11} />
              {exp.period}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--blue)',
              fontFamily: 'var(--font-heading)',
            }}>
              {exp.company}
            </span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
            }}>
              <MapPin size={12} />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {exp.bullets.map((bullet, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: '0.75rem',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
            }}>
              <Zap size={14} color="var(--cyan)" style={{ flexShrink: 0, marginTop: '0.22rem', opacity: 0.7 }} />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience({ activePersona, personaData }) {
  const currentPersona = personaData[activePersona];
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 100%)',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '30%', right: '-10%',
        width: '40vw', height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.04) 0%, transparent 70%)',
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
            <div className="section-eyebrow">Professional Journey</div>
            <h2 className="section-title">
              Work{' '}
              <span className="text-gradient">Experience</span>
            </h2>
            <p className="section-subtitle">
              Real-world internships building production AI systems, NLP pipelines, and automation tools.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: '860px' }}>
          {currentPersona.experience.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
