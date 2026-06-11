import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ThreeCanvas from './components/ThreeCanvas';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import { resumeData } from './data/resumeData';
import { Mail, Heart } from 'lucide-react';
import { Github, Linkedin } from './components/SocialIcons';

export default function App() {
  const [activePersona, setActivePersona] = useState('aiml');
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef();

  // Page load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const t = setTimeout(() => setLoaded(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Cursor glow tracker
  useEffect(() => {
    const handler = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-void)' }}>
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow" style={{ position: 'fixed', top: 0, left: 0 }} />

      {/* Fixed 3D background canvas */}
      <ThreeCanvas />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Navbar profileData={resumeData.profile} />

        <Hero
          activePersona={activePersona}
          setActivePersona={setActivePersona}
          personaData={resumeData.personas}
          profileData={resumeData.profile}
        />

        {/* Solid-background sections to cover the 3D canvas */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Skills       activePersona={activePersona} personaData={resumeData.personas} />
          <Experience   activePersona={activePersona} personaData={resumeData.personas} />
          <Projects     activePersona={activePersona} personaData={resumeData.personas} profileData={resumeData.profile} />
          <Certifications activePersona={activePersona} personaData={resumeData.personas} />
          <Education    profileData={resumeData.profile} />
          <Contact      profileData={resumeData.profile} />

          {/* ── Footer ── */}
          <footer style={{
            background: 'var(--bg-void)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '3rem 0',
          }}>
            <div className="container">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}>
                {/* Logo + copy */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.04em',
                    background: 'var(--gradient-hero)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.35rem',
                  }}>
                    AK
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-heading)' }}>
                    © {new Date().getFullYear()} Ankush Kundapura Annaiah. All rights reserved.
                  </p>
                </div>

                {/* Social icons */}
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  {[
                    { icon: Github,   href: `https://github.com/${resumeData.profile.github}`,   label: 'GitHub' },
                    { icon: Linkedin, href: 'https://linkedin.com/in/ankush-kundapura-annaiah-1797ba384', label: 'LinkedIn' },
                    { icon: Mail,     href: `mailto:${resumeData.profile.email}`,                label: 'Email' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: 40, height: 40, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-glass)',
                        color: 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.color = 'var(--cyan)';
                        e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>

                {/* Nav links */}
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  {['#about', '#skills', '#projects', '#education', '#contact'].map(href => (
                    <a
                      key={href}
                      href={href}
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
