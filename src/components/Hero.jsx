import React from 'react';
import { Brain, Code, Cpu, Palette, FileText, Send, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ activePersona, setActivePersona, personaData, profileData }) {
  const personas = [
    { id: 'aiml', label: 'AI/ML & GenAI', icon: Brain, color: '#0066ff' },
    { id: 'swe', label: 'Software Engineer', icon: Code, color: '#38bdf8' },
    { id: 'rl', label: 'RL Environments', icon: Cpu, color: '#00c6ff' },
    { id: 'uiux', label: 'UI/UX Designer', icon: Palette, color: '#a855f7' },
  ];

  const currentPersonaInfo = personaData[activePersona];

  return (
    <header className="section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 2,
    }}>
      <div className="container" style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        paddingTop: '4rem'
      }}>
        {/* Intro Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '0.4rem 1.2rem',
          borderRadius: '50px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.5rem',
          border: '1.5px solid var(--border-color)',
          fontFamily: 'var(--font-heading)'
        }}>
          <span>Welcome to my Interactive ePortfolio</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          letterSpacing: '-2px',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          {profileData.name}
        </h1>

        {/* Dynamic Persona Role Title */}
        <div style={{ minHeight: '3.5rem', marginBottom: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={activePersona}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-gradient"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {currentPersonaInfo.roleTitle}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Brief Dynamic Persona Objective */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 3rem auto',
          minHeight: '5.5rem'
        }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activePersona}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7
              }}
            >
              {currentPersonaInfo.objective}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Persona Switcher Panel */}
        <div style={{
          marginBottom: '3.5rem'
        }}>
          <p style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Select a professional persona to filter my expertise
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {personas.map((persona) => {
              const IconComp = persona.icon;
              const isActive = activePersona === persona.id;

              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersona(persona.id)}
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 1rem',
                    borderRadius: '16px',
                    border: isActive ? `2px solid var(--primary)` : '1px solid var(--border-color)',
                    background: isActive ? 'var(--bg-secondary)' : 'var(--bg-card)',
                    boxShadow: isActive ? `0 10px 20px -5px var(--border-glow)` : 'none',
                    transform: isActive ? 'scale(1.03)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--primary-light)' : 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}>
                    <IconComp size={20} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}>
                    {persona.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Actions */}
        <div style={{
          display: 'flex',
          gap: '1.25rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href={currentPersonaInfo.resumePath}
            download
            className="btn-primary"
          >
            <FileText size={18} />
            Download Persona Resume
          </a>

          <a
            href="#contact"
            className="btn-secondary"
          >
            Get In Touch
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Decorative Wave/Bottom Gradient transition */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '150px',
        background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        pointerEvents: 'none',
        zIndex: 3
      }}></div>
    </header>
  );
}
