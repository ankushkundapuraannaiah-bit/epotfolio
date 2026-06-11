import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail, MapPin, Send, MessageCircle,
  ArrowUpRight, CheckCircle
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

export default function Contact({ profileData }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const headerRef = useRef();
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1400);
  };

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      color: '#38bdf8',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'ankushkundapuraannaiah-bit',
      href: `https://github.com/${profileData.github}`,
      color: '#f0f4ff',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Ankush Kundapura Annaiah',
      href: `https://linkedin.com/in/ankush-kundapura-annaiah-1797ba384`,
      color: '#4f87ff',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profileData.location,
      href: '#',
      color: '#a855f7',
    },
  ];

  return (
    <section id="contact" className="section" style={{
      background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-void) 100%)',
    }}>
      {/* Glow center */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw', height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Let's Connect</div>
            <h2 className="section-title">
              Get In{' '}
              <span className="text-gradient">Touch</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Open to AI/ML internships, software engineering roles, and exciting collaboration. Let's build something amazing together.
            </p>
          </motion.div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '3rem',
          alignItems: 'start',
        }}
        className="contact-grid"
        >
          {/* Left – Contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Let's build something incredible
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                fontSize: '0.92rem',
                marginBottom: '2.5rem',
              }}>
                I'm actively seeking AI/ML internships and software engineering opportunities starting
                mid-2026. Whether you have a project idea, internship offer, or just want to chat
                tech — I'm always open.
              </p>

              {/* Social links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {socialLinks.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-glass)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.background = `${color}08`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'var(--bg-glass)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: '12px', flexShrink: 0,
                      background: `${color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} color={color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', color: 'var(--text-muted)',
                        fontFamily: 'var(--font-heading)', marginBottom: '0.2rem',
                      }}>
                        {label}
                      </div>
                      <div style={{
                        fontSize: '0.85rem', fontWeight: 600,
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-heading)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {value}
                      </div>
                    </div>
                    {href.startsWith('http') && (
                      <ArrowUpRight size={14} color="var(--text-muted)" />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            {status === 'sent' ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '1.25rem', minHeight: '320px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle size={32} color="#22c55e" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-outline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  letterSpacing: '-0.03em',
                  marginBottom: '1.75rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}>
                  <MessageCircle size={20} color="var(--cyan)" />
                  Send a Message
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="form-control"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    className="form-control"
                    name="subject"
                    value={form.subject}
                    onChange={handle}
                    placeholder="e.g. AI/ML Internship Opportunity"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    name="message"
                    value={form.message}
                    onChange={handle}
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {status === 'sending' ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
