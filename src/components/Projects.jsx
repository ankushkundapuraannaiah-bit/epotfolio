import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Code2, ArrowUpRight } from 'lucide-react';
import { Github } from './SocialIcons';

const projectColors = ['#38bdf8', '#a855f7', '#4f87ff', '#22c55e', '#e879f9', '#6366f1'];

function ProjectCard({ project, index, profileData }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const color = projectColors[index % projectColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="glass-card"
      style={{
        padding: '2.25rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
    >
      {/* Top bar color */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color}, transparent)`,
        borderRadius: '32px 32px 0 0',
      }} />

      {/* Index */}
      <div style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.15em',
        color,
        fontFamily: 'var(--font-heading)',
        marginBottom: '1rem',
        opacity: 0.7,
      }}>
        0{index + 1}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.25,
        marginBottom: '1rem',
        flex: 0,
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.87rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        flex: 1,
        marginBottom: '1.5rem',
      }}>
        {project.description}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {project.tech.split(' · ').map((t) => (
            <span key={t} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '100px',
              border: `1px solid ${color}25`,
              background: `${color}08`,
              fontSize: '0.72rem',
              fontWeight: 600,
              color,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.04em',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.75rem', color: 'var(--text-muted)',
            fontFamily: 'var(--font-heading)', fontWeight: 600,
          }}>
            <Calendar size={11} /> {project.period}
          </span>
          <a
            href={`https://github.com/${profileData.github}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              transition: 'color 0.2s',
              marginLeft: 'auto',
            }}
            onMouseOver={e => e.currentTarget.style.color = color}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Github size={13} />
            View on GitHub
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ activePersona, personaData, profileData }) {
  const currentPersona = personaData[activePersona];
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '-5%',
        width: '35vw', height: '35vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
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
            <div className="section-eyebrow">Built & Shipped</div>
            <h2 className="section-title">
              Featured{' '}
              <span className="text-gradient">Projects</span>
            </h2>
            <p className="section-subtitle">
              Hands-on builds across AI/ML, LLM systems, UI/UX design, and simulation environments.
            </p>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {currentPersona.projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
              profileData={profileData}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <a
            href={`https://github.com/${profileData.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ margin: '0 auto' }}
          >
            <Github size={17} />
            See all 18 repos on GitHub
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
