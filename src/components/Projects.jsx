import React from 'react';
import { ExternalLink, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects({ activePersona, personaData, profileData }) {
  const currentProjects = personaData[activePersona].projects;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.75rem' }}>
            Featured <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'var(--gradient-primary)',
            margin: '0 auto 1.5rem auto',
            borderRadius: '2px'
          }}></div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            A showcase of key projects that demonstrate my technical skills and problem-solving abilities within this role.
          </p>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-3"
          >
            {currentProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Bar with Icon & Action Link */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    color: 'var(--primary)'
                  }}>
                    <FolderOpen size={28} />
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <a
                        href={`https://${profileData.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--text-secondary)',
                          transition: 'color var(--transition-fast)',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                        title="View Repository"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}>
                    {project.title}
                  </h3>

                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {project.period}
                  </span>

                  <p style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  {project.tech.split(' · ').map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.3rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        borderRadius: '6px'
                      }}
                    >
                      {tag}
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
