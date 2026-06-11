import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categoryColors = {
  'Machine Learning & Deep Learning': '#38bdf8',
  'NLP & LLMs': '#a855f7',
  'Python & AI Libraries': '#4f87ff',
  'Data & Evaluation': '#22c55e',
  'Tools & Platforms': '#6366f1',
  'Languages & Core': '#38bdf8',
  'Software Engineering': '#4f87ff',
  'AI & ML Integration': '#a855f7',
  'Systems & Tools': '#6366f1',
  'Engineering Practices': '#22c55e',
  'RL & AI Systems': '#38bdf8',
  'Systems & Tooling': '#4f87ff',
  'Testing & Automation': '#6366f1',
  'AI & ML Frameworks': '#a855f7',
  'Design Tools': '#e879f9',
  'UX Practice': '#a855f7',
  'Front-End': '#38bdf8',
  'AI & Product Design': '#4f87ff',
  'Programming & Core': '#6366f1',
};

function SkillGroup({ category, items, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = categoryColors[category] || 'var(--cyan)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
      className="glass-card"
      style={{ padding: '1.75rem 2rem' }}
    >
      {/* Category header */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: color,
          boxShadow: `0 0 10px ${color}`,
          flexShrink: 0,
        }} />
        <h4 style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color,
          fontFamily: 'var(--font-heading)',
        }}>
          {category}
        </h4>
      </div>

      {/* Skill chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map((skill) => (
          <span
            key={skill}
            className="skill-chip"
            style={{ '--chip-color': color }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills({ activePersona, personaData }) {
  const currentPersona = personaData[activePersona];
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-void) 0%, var(--bg-deep) 100%)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(79, 135, 255, 0.05) 0%, transparent 70%)',
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
            <div className="section-eyebrow">Technical Mastery</div>
            <h2 className="section-title">
              Skills &{' '}
              <span className="text-gradient">Expertise</span>
            </h2>
            <p className="section-subtitle">
              A curated toolkit built through internships, hackathons, and hands-on AI/ML development.
            </p>
          </motion.div>
        </div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {currentPersona.skills.map((skillGroup, idx) => (
            <SkillGroup
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
              index={idx}
            />
          ))}
        </div>

        {/* Tech marquee */}
        <div style={{
          marginTop: '4rem',
          overflow: 'hidden',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(to right, var(--bg-deep), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
            background: 'linear-gradient(to left, var(--bg-deep), transparent)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div className="marquee-track">
            {[
              'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face',
              'React', 'Three.js', 'Figma', 'OpenAI Gym', 'LLMs',
              'RAG Pipelines', 'Vector DBs', 'FastAPI', 'NumPy', 'Pandas',
              'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face',
              'React', 'Three.js', 'Figma', 'OpenAI Gym', 'LLMs',
              'RAG Pipelines', 'Vector DBs', 'FastAPI', 'NumPy', 'Pandas',
            ].map((tech, i) => (
              <span key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0 2rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.08em',
              }}>
                <span style={{ color: 'var(--cyan)', opacity: 0.4 }}>✦</span>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
