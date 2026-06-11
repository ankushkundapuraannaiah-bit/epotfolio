import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ThreeCanvas from './components/ThreeCanvas';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import { resumeData } from './data/resumeData';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activePersona, setActivePersona] = useState('aiml');
  const [loaded, setLoaded] = useState(false);

  // Sync CSS theme variable
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Short page-load delay for smooth canvas init
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed 3D background canvas — stays behind ALL sections */}
      <ThreeCanvas theme={theme} />

      {/* Page fade-in on load */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Hero
          activePersona={activePersona}
          setActivePersona={setActivePersona}
          personaData={resumeData.personas}
          profileData={resumeData.profile}
        />

        {/* Remaining sections have solid BG to occlude the 3D canvas */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Skills       activePersona={activePersona} personaData={resumeData.personas} />
          <Experience   activePersona={activePersona} personaData={resumeData.personas} />
          <Projects     activePersona={activePersona} personaData={resumeData.personas} profileData={resumeData.profile} />
          <Certifications activePersona={activePersona} personaData={resumeData.personas} />
          <Contact      profileData={resumeData.profile} />

          {/* Footer */}
          <footer style={{
            padding: '2.5rem 0',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
          }}>
            <div className="container" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>
                © {new Date().getFullYear()}&nbsp;
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ankush Kundapura Annaiah</span>.
                All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['#about', '#projects', '#contact'].map((href) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseOver={e => e.target.style.color = 'var(--primary)'}
                    onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
