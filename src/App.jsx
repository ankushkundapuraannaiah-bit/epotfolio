import React, { useState, useEffect } from 'react';
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

  // Sync theme attribute with HTML tag for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas theme={theme} />

      {/* Main Content Sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <Hero
          activePersona={activePersona}
          setActivePersona={setActivePersona}
          personaData={resumeData.personas}
          profileData={resumeData.profile}
        />

        {/* Dynamic content sections reacting to activePersona */}
        <Skills activePersona={activePersona} personaData={resumeData.personas} />
        
        <Experience activePersona={activePersona} personaData={resumeData.personas} />
        
        <Projects activePersona={activePersona} personaData={resumeData.personas} profileData={resumeData.profile} />
        
        <Certifications activePersona={activePersona} personaData={resumeData.personas} />
        
        <Contact profileData={resumeData.profile} />

        {/* Footer */}
        <footer style={{
          padding: '2.5rem 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-heading)'
        }}>
          <div className="container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p>© {new Date().getFullYear()} Ankush Kundapura Annaiah. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#about" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>About</a>
              <a href="#projects" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Projects</a>
              <a href="#contact" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Contact</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Styles for responsive footer */}
      <style>{`
        @media (max-width: 600px) {
          footer .container {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
