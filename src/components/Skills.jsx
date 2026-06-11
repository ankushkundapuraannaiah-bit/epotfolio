import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills({ activePersona, personaData }) {
  const currentSkills = personaData[activePersona].skills;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.75rem' }}>
            Technical <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Expertise</span>
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'var(--gradient-primary)',
            margin: '0 auto 1.5rem auto',
            borderRadius: '2px'
          }}></div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A curated list of my technical skills, tools, and methodologies tailored to my focus in this persona.
          </p>
        </div>

        {/* Dynamic Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-2"
            style={{ gap: '2rem' }}
          >
            {currentSkills.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.category}
                variants={cardVariants}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%'
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--primary)'
                  }}></span>
                  {skillGroup.category}
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: '10px',
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.color = 'var(--primary)';
                        e.target.style.boxShadow = '0 4px 12px var(--border-glow)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = 'var(--border-color)';
                        e.target.style.color = 'var(--text-secondary)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
