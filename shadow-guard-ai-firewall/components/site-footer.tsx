'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const footerLinks = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Impact', href: '#impact' },
  { label: 'Monitor', href: '#monitor' },
  { label: 'ROI', href: '#roi' },
  { label: 'Pricing', href: '#pricing' },
]

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--cyan)]/10">
      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg glass border border-[var(--cyan)]/25 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[var(--cyan)]" />
            </div>
            <span
              className="text-base font-bold text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Shadow<span className="text-[var(--cyan)]">Guard</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#7a9ab0] hover:text-[var(--cyan)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Divider */}
        <div className="mt-10 pt-8 border-t border-[var(--cyan)]/10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-[#7a9ab0]">
              Securing Enterprise AI, Restoring Human Trust, and Preserving Natural Resources.
            </p>
            <p className="text-xs text-[#3a5468]">
              &copy; 2026 Team Code Catalysts &mdash; Ayush Porwal, Jiya Min, Mahima Agrawal, Vinayak Pokhariya.
            </p>
            <p className="text-xs text-[#3a5468]">
              Hackarena 2.0 &nbsp;|&nbsp; Security Track
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
