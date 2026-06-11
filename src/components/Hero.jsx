import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Brain, Code, Cpu, Palette, FileText, ArrowRight,
  ChevronDown, Zap, Sparkles, MapPin, Mail
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

/* ─── Typing Effect ─── */
function useTypingEffect(words, speed = 80, pause = 2200) {
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
      timer = setTimeout(() => setCharIndex(c => c - 1), speed / 2.2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

/* ─── Animated Number ─── */
function AnimatedCounter({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(value / 50);
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2rem, 4.5vw, 3rem)',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        background: 'var(--gradient-hero)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        marginTop: '0.5rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontFamily: 'var(--font-heading)',
      }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Persona Card ─── */
const personas = [
  { id: 'aiml', label: 'AI / ML',         icon: Brain,   color: '#38bdf8', desc: 'GenAI & LLMs' },
  { id: 'swe',  label: 'Software Eng.',   icon: Code,    color: '#4f87ff', desc: 'Scalable Systems' },
  { id: 'rl',   label: 'RL Environments', icon: Cpu,     color: '#6366f1', desc: 'Simulation & MDP' },
  { id: 'uiux', label: 'UI / UX',         icon: Palette, color: '#a855f7', desc: 'Figma & Design' },
];

/* ─── Main Hero ─── */
export default function Hero({ activePersona, setActivePersona, personaData, profileData }) {
  const heroRef = useRef();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const typedRole = useTypingEffect([
    'AI / ML Engineer',
    'GenAI Developer',
    'Software Developer',
    'UI / UX Designer',
    'RL Environment Builder',
  ]);

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
      {/* Radial ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79, 135, 255, 0.08) 0%, transparent 70%)',
      }} />

      {/* Bottom gradient vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '40%',
        background: 'linear-gradient(to top, var(--bg-void) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />

      {/* Scrollable content */}
      <motion.div
        style={{ y: contentY, opacity: contentOp, position: 'relative', zIndex: 10, width: '100%' }}
      >
        <div className="container" style={{ paddingTop: '9rem', paddingBottom: '6rem' }}>

          {/* ── Status Pill ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.25rem 0.45rem 0.8rem',
              borderRadius: '100px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              background: 'rgba(56, 189, 248, 0.06)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse-glow 1.8s ease-in-out infinite',
              }} />
              Open to Internships · Bengaluru & Remote
            </span>
          </motion.div>

          {/* ── Giant Name ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            style={{ textAlign: 'center', marginBottom: '1.25rem' }}
          >
            <h1 style={{
              fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              fontFamily: 'var(--font-display)',
            }}>
              <span className="text-gradient">Ankush</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>Kundapura</span>
            </h1>
          </motion.div>

          {/* ── Typing Subtitle ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              height: '2.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
            }}
          >
            <span style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em',
            }}>
              {typedRole}
            </span>
            <span style={{
              width: 2.5, height: '1.1em',
              background: 'var(--cyan)',
              display: 'inline-block',
              borderRadius: 2,
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </motion.div>

          {/* ── Location ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-heading)' }}>
              <MapPin size={14} /> Bengaluru, Karnataka, India
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-heading)' }}>
              <Sparkles size={14} color="var(--cyan)" /> B.Tech CSE (AI & ML)
            </span>
          </motion.div>

          {/* ── Persona Selector ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <p style={{
              textAlign: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-heading)',
            }}>
              Choose your focus ↓
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.85rem',
            }}>
              {personas.map((p, idx) => {
                const IconComp = p.icon;
                const active = activePersona === p.id;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setActivePersona(p.id)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.07 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '1.15rem 1.6rem',
                      borderRadius: '20px',
                      border: active ? `1.5px solid ${p.color}50` : '1px solid var(--border-subtle)',
                      background: active
                        ? `linear-gradient(135deg, ${p.color}15, ${p.color}06)`
                        : 'var(--bg-glass)',
                      backdropFilter: 'blur(16px)',
                      cursor: 'pointer',
                      minWidth: '130px',
                      boxShadow: active ? `0 0 30px ${p.color}30, 0 8px 24px rgba(0,0,0,0.4)` : 'none',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {active && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                      }} />
                    )}
                    <div style={{
                      width: 44, height: 44, borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: active ? `${p.color}20` : 'rgba(255,255,255,0.04)',
                      color: active ? p.color : 'var(--text-muted)',
                      transition: 'all 0.25s',
                    }}>
                      <IconComp size={20} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.82rem', fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                      }}>
                        {p.label}
                      </div>
                      <div style={{
                        fontSize: '0.7rem',
                        color: active ? p.color : 'var(--text-muted)',
                        marginTop: '0.15rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 500,
                      }}>
                        {p.desc}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
          >
            <a href={currentPersona.resumePath} download className="btn-primary">
              <FileText size={16} />
              Download Resume
            </a>
            <a href="#projects" className="btn-outline">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-outline">
              <Mail size={16} />
              Say Hello
            </a>
          </motion.div>

          {/* ── Stats Cluster ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              padding: '2rem 3rem',
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '28px',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            <AnimatedCounter value={18} suffix="+" label="GitHub Repos" />
            <div style={{ width: 1, background: 'var(--border-subtle)', alignSelf: 'stretch', minHeight: 44 }} />
            <AnimatedCounter value={5} suffix="+" label="AI/ML Projects" />
            <div style={{ width: 1, background: 'var(--border-subtle)', alignSelf: 'stretch', minHeight: 44 }} />
            <AnimatedCounter value={2} label="Internships" />
            <div style={{ width: 1, background: 'var(--border-subtle)', alignSelf: 'stretch', minHeight: 44 }} />
            <AnimatedCounter value={4} suffix="+" label="Certifications" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: '3rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
          fontFamily: 'var(--font-heading)',
        }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 34, height: 34, borderRadius: '50%',
            border: '1px solid var(--border-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </header>
  );
}
