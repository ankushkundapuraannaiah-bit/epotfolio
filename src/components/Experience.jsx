import React from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience({ activePersona, personaData }) {
  const currentExperience = personaData[activePersona].experience;

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.75rem' }}>
            Work <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Experience</span>
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'var(--gradient-primary)',
            margin: '0 auto 1.5rem auto',
            borderRadius: '2px'
          }}></div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A timeline of my professional roles, highlighting specific achievements and contributions aligned with my active persona.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '1rem 0'
        }}>
          {/* Vertical Center Line */}
          <div style={{
            position: 'absolute',
            left: '31px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'var(--border-color)',
            zIndex: 1
          }}></div>

          {/* Timeline Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              {currentExperience.map((exp, idx) => (
                <div
                  key={exp.role + exp.company}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Timeline Circle Node */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    border: '3px solid var(--primary)',
                    boxShadow: '0 0 15px var(--border-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                    marginRight: '2rem',
                    zIndex: 3
                  }}>
                    <Briefcase size={22} />
                  </div>

                  {/* Experience Info Panel */}
                  <div className="glass-panel" style={{
                    flexGrow: 1,
                    padding: '2.25rem',
                    borderRadius: '24px',
                    width: 'calc(100% - 96px)'
                  }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem'
                        }}>
                          {exp.role}
                        </h3>
                        <h4 style={{
                          fontSize: '1.05rem',
                          color: 'var(--primary)',
                          fontWeight: 600
                        }}>
                          {exp.company}
                        </h4>
                      </div>

                      {/* Meta Pills */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '0.4rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Accomplishments */}
                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}>
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            position: 'relative',
                            paddingLeft: '1.5rem',
                          }}
                        >
                          {/* Circle List Item Marker */}
                          <span style={{
                            position: 'absolute',
                            left: '3px',
                            top: '10px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'var(--primary)'
                          }}></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
