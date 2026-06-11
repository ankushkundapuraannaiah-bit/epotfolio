import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Languages, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function Education({ profileData }) {
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const containerRef = useRef();
  const containerInView = useInView(containerRef, { once: true, margin: '-60px' });

  const eduColors = ['#38bdf8', '#4f87ff', '#a855f7'];

  return (
    <section id="education" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 100%)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '-10%',
        width: '35vw', height: '35vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(79, 135, 255, 0.04) 0%, transparent 70%)',
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
            <div className="section-eyebrow">Academic Background</div>
            <h2 className="section-title">
              Education &{' '}
              <span className="text-gradient">Languages</span>
            </h2>
            <p className="section-subtitle">
              Degrees, schooling, and linguistic fluencies that round out my profile.
            </p>
          </motion.div>
        </div>

        {/* Grid layout: Left = Education timeline, Right = Languages & Competency */}
        <div ref={containerRef} style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}
        className="contact-grid" // Reuses the grid collapse styles from contact-grid
        >
          {/* Left Column: Education Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {profileData.education.map((edu, idx) => {
              const color = eduColors[idx % eduColors.length];
              return (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: -30 }}
                  animate={containerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
                  className="glass-card"
                  style={{
                    padding: '2rem 2.25rem',
                    position: 'relative'
                  }}
                >
                  {/* Decorative left border stripe */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    width: '4px',
                    background: `linear-gradient(to bottom, ${color}, transparent)`,
                    borderRadius: '4px 0 0 4px'
                  }} />

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}>
                      {edu.institution}
                    </h3>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.85rem',
                      borderRadius: '100px',
                      border: `1px solid ${color}30`,
                      background: `${color}08`,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color,
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}>
                      <Calendar size={11} />
                      {edu.period}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {edu.degree}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    <MapPin size={12} />
                    {edu.location}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Languages & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Languages Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={containerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card"
              style={{ padding: '2rem 2.25rem' }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <Languages size={18} color="var(--cyan)" />
                Languages
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {profileData.languages.map((lang) => (
                  <div key={lang.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {lang.name}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--cyan)',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {lang.level}
                      </span>
                    </div>
                    {/* Visual proficiency bar */}
                    <div style={{
                      height: '4px',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={containerInView ? {
                          width: lang.level.includes('Full') ? '100%' : '75%'
                        } : {}}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: 'var(--gradient-hero)',
                          borderRadius: '10px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Profile Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={containerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card"
              style={{
                padding: '2rem 2.25rem',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(79, 135, 255, 0.06))',
                borderColor: 'rgba(168, 85, 247, 0.15)',
              }}
            >
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
                marginBottom: '0.8rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <Sparkles size={16} color="var(--purple)" />
                Linguistic Edge
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                Operating in multilingual environments enables clear cross-cultural communication, precise documentation standards, and effective collaboration on international teams.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
