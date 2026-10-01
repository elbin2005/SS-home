import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Clock, Sparkles } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="coming-soon-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            width: '600px', height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute', top: '40%', right: '20%',
            width: '300px', height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Floating sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.9,
          }}
          style={{
            position: 'absolute',
            top: `${15 + (i * 13) % 70}%`,
            left: `${8 + (i * 17) % 84}%`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Sparkles size={10 + (i % 3) * 5} style={{ color: i % 2 === 0 ? 'var(--gold)' : 'var(--primary)', opacity: 0.5 }} />
        </motion.div>
      ))}

      {/* Main card */}
      <motion.div
        className="coming-soon-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'relative', zIndex: 10,
          background: 'var(--card)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '2rem',
          padding: '4rem 3.5rem',
          maxWidth: '580px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 40px 120px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Gradient top accent */}
        <div style={{
          position: 'absolute', top: 0, left: '3rem', right: '3rem', height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          borderRadius: '999px',
        }} />

        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(29,78,216,0.15) 0%, rgba(201,168,76,0.1) 100%)',
            border: '1.5px solid rgba(201,168,76,0.3)',
            marginBottom: '1.75rem',
          }}
        >
          <Clock size={36} style={{ color: 'var(--gold)' }} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '999px',
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.3)',
            marginBottom: '1.5rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={12} />
          Coming Soon
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.25,
            background: 'linear-gradient(135deg, var(--foreground) 0%, rgba(201,168,76,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          We&apos;re Working on This
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}
        >
          This feature is currently under development and will be available soon.
          We&apos;re working hard to bring you a seamless experience.
        </motion.p>

        {/* Info cards */}
        <motion.div
          className="coming-soon-features"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { icon: '', label: 'Online Submission', desc: 'Digital manuscript portal' },
            { icon: '', label: 'Author Portal', desc: 'Track your submissions' },
            { icon: '', label: 'Review Dashboard', desc: 'Peer review system' },
            { icon: '', label: 'Notifications', desc: 'Real-time status updates' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '0.85rem',
                padding: '1rem',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{item.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="coming-soon-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            to="/"
            className="btn btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.75rem', borderRadius: '999px', fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <a
            href="/#contact"
            className="btn btn-sidebar"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.75rem', borderRadius: '999px', fontWeight: 600,
            }}
          >
            <Mail size={16} /> Contact Us
          </a>
        </motion.div>

        {/* Submit manuscript note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          style={{
            marginTop: '2rem',
            padding: '1rem 1.25rem',
            borderRadius: '0.85rem',
            background: 'rgba(29,78,216,0.08)',
            border: '1px solid rgba(29,78,216,0.18)',
            fontSize: '0.85rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.6,
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>Want to submit a manuscript?</span>
          {' '}Please{' '}
          <a href="/#contact" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
            contact us directly
          </a>
          {' '}and our team will assist you with the submission process.
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'relative', zIndex: 10,
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: 'var(--muted-foreground)',
          opacity: 0.6,
          letterSpacing: '0.05em',
        }}
      >
        Science and Society — Nirmala College
      </motion.p>
    </div>
  )
}
