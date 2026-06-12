'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Impact', href: '#impact' },
  { label: 'Monitor', href: '#monitor' },
  { label: 'ROI', href: '#roi' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 glass rounded-none"
        style={{ opacity: bgOpacity }}
      />

      {/* Always-visible floating pill */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label="Shadow Guard home"
        >
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg glass glow-cyan border border-[var(--cyan)]/30">
            <ShieldCheck className="w-4 h-4 text-[var(--cyan)]" />
          </div>
          <span
            className="text-lg font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Shadow<span className="text-[var(--cyan)]">Guard</span>
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.href)}
              className="text-sm font-medium text-[#7a9ab0] hover:text-[var(--cyan)] transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => handleScroll('#architecture')}
          className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#060a0f] bg-[var(--cyan)] glow-cyan transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          <Zap className="w-4 h-4" />
          Launch Enterprise Demo
        </button>
      </div>
    </motion.header>
  )
}
