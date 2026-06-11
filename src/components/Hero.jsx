import React, { useState, useEffect, useRef } from 'react';
import { Brain, Code, Cpu, Palette, FileText, ArrowRight, ChevronDown, Zap, Star, Globe } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── Typing Effect Hook ─── */
function useTypingEffect(words, speed = 90, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let timer;

    if (!deleting && charIndex < word.length) {
      timer = setTimeout(() => setCharIndex(c => c + 1), speed);
    } else if (!deleting && charIndex === word.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(c => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    }

    setDisplayed(word.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

/* ─── Animated Counter ─── */
function Counter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(value / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(start);
        }, 40);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        fontWeight: 800,
        fontFamily: 'var(--font-heading)',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Glowing Dot ─── */
function GlowDot({ color = 'var(--primary)' }) {
  return (
    <span style={{
      display: 'inline-block',
      width: 8, height: 8,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 8px 2px ${color}`,
      animation: 'pulse-dot 1.8s ease-in-out infinite',
      marginRight: '0.5rem',
      verticalAlign: 'middle',
    }} />
  );
}

/* ─── Main Hero ─── */
export default function Hero({ activePersona, setActivePersona, personaData, profileData }) {
  const heroRef = useRef();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY  = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const typedRole = useTypingEffect([
    'AI/ML & GenAI Engineer',
    'Software Developer',
    'RL Environment Builder',
    'UI/UX Designer',
  ]);

  const personas = [
    { id: 'aiml', label: 'AI/ML & GenAI',      icon: Brain,   accent: '#38bdf8' },
    { id: 'swe',  label: 'Software Engineer',   icon: Code,    accent: '#0066ff' },
    { id: 'rl',   label: 'RL Environments',     icon: Cpu,     accent: '#00c6ff' },
    { id: 'uiux', label: 'UI/UX Designer',      icon: Palette, accent: '#a855f7' },
  ];

  const currentPersona = personaData[activePersona];

  return (
    <header
      ref={heroRef}
      id="about"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Radial gradient ambient backdrop */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, var(--primary-light) 0%, transparent 70%)',
      }} />

      {/* Grid lines overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(var(--border-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.35,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Scrollable Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOp, position: 'relative', zIndex: 5, width: '100%' }}
      >
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>

          {/* ── Status Pill ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.2rem 0.4rem 0.8rem',
              borderRadius: '50px',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
            }}>
              <GlowDot color="#22c55e" />
              Open to Internship Opportunities · Bengaluru & Remote
            </span>
          </motion.div>

          {/* ── Name ── */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-3px',
              lineHeight: 1.05,
              textAlign: 'center',
              marginBottom: '1.25rem',
            }}
          >
            {profileData.name.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {i > 0 && ' '}
                {i === 0
                  ? <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span>
                  : word}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* ── Typing Subtitle ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
            }}
          >
            <span style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
            }}>
              {typedRole}
            </span>
            <span style={{
              width: 3,
              height: '1.4em',
              background: 'var(--primary)',
              display: 'inline-block',
              borderRadius: 2,
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </motion.div>

          {/* ── Dynamic Role Title ── */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activePersona}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto 3rem auto',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              }}
            >
              {currentPersona.objective.slice(0, 220)}…
            </motion.p>
          </AnimatePresence>

          {/* ── Persona Selector Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginBottom: '3rem' }}
          >
            <p style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2.5px',
              color: 'var(--text-muted)',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)',
            }}>
              ↓  Choose a professional focus  ↓
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}>
              {personas.map((p, idx) => {
                const IconComp = p.icon;
                const active = activePersona === p.id;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setActivePersona(p.id)}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '20px',
                      border: active ? `2px solid ${p.accent}` : '1.5px solid var(--border-color)',
                      background: active
                        ? `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}08 100%)`
                        : 'var(--bg-glass)',
                      backdropFilter: 'blur(12px)',
                      cursor: 'pointer',
                      minWidth: '140px',
                      boxShadow: active ? `0 0 25px ${p.accent}40, 0 8px 20px -5px ${p.accent}25` : 'none',
                      transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Active glow top bar */}
                    {active && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
                        borderRadius: '20px 20px 0 0',
                      }} />
                    )}

                    <div style={{
                      width: '48px', height: '48px',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: active ? `${p.accent}22` : 'var(--bg-secondary)',
                      color: active ? p.accent : 'var(--text-muted)',
                      transition: 'all 0.25s',
                    }}>
                      <IconComp size={22} />
                    </div>

                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}>
                      {p.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4.5rem' }}
          >
            <a
              href={currentPersona.resumePath}
              download
              className="btn-primary"
            >
              <FileText size={17} />
              Download Resume
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects
              <ArrowRight size={17} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </motion.div>

          {/* ── Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3rem',
              flexWrap: 'wrap',
              padding: '2rem 2.5rem',
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            <Counter value={4} suffix="+" label="Resume Personas" />
            <div style={{ width: 1, background: 'var(--border-color)', alignSelf: 'stretch', minHeight: 40 }} />
            <Counter value={5} suffix="+" label="AI/ML Projects" />
            <div style={{ width: 1, background: 'var(--border-color)', alignSelf: 'stretch', minHeight: 40 }} />
            <Counter value={2} suffix="" label="Internships" />
            <div style={{ width: 1, background: 'var(--border-color)', alignSelf: 'stretch', minHeight: 40 }} />
            <Counter value={3} suffix="+" label="Certifications" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-heading)',
        }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            border: '1.5px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Bottom fade-out */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '180px',
        background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 4,
      }} />

      {/* Keyframe CSS injected */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </header>
  );
}
