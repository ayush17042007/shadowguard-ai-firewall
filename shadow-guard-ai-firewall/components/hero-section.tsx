'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ShieldAlert } from 'lucide-react'

const headline = ['Mathematical', 'Certainty', 'for', 'Generative', 'AI.']

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroSection() {
  const handleScroll = () => {
    document.querySelector('#impact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--red)]/30 text-[var(--red)] text-xs font-semibold tracking-widest uppercase"
      >
        <ShieldAlert className="w-3.5 h-3.5" />
        Enterprise AI Security Platform
      </motion.div>

      {/* Headline — staggered word reveal */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8"
        aria-label="Mathematical Certainty for Generative AI."
      >
        {headline.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-white"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {word === 'Generative' || word === 'AI.' ? (
              <span className="text-[var(--cyan)] glow-cyan-text">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
        className="max-w-2xl mx-auto text-base sm:text-lg text-[#7a9ab0] leading-relaxed mb-12"
      >
        Unbounded AI is an enterprise liability. Stop prompt injections, eliminate confident lies,
        and prevent catastrophic failures—from{' '}
        <span className="text-[var(--red)] font-medium">$1 Chevy Tahoe sales</span> to{' '}
        <span className="text-[var(--orange)] font-medium">Air Canada lawsuits</span>.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={handleScroll}
          className="group flex items-center gap-3 px-8 py-4 rounded-xl glass border border-[var(--cyan)]/40 text-[var(--cyan)] font-semibold text-base hover:bg-[var(--cyan)]/10 hover:glow-cyan transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Explore the Firewall
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.span>
        </button>
      </motion.div>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--cyan)]/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[var(--red)]/[0.05] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[var(--cyan)]/[0.04] blur-[90px]" />
      </div>
    </section>
  )
}
