'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Database,
  Eye,
  FileCheck,
  Globe,
  Lock,
  ShieldCheck,
} from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'SOC2 Type II Ready' },
  { icon: Globe, label: 'ISO 27001 Compliant' },
  { icon: CheckCircle, label: 'GDPR Compliant' },
  { icon: FileCheck, label: 'HIPAA Ready' },
  { icon: Eye, label: 'Zero Data Retention Available' },
  { icon: Lock, label: 'FIPS 140-2 Validated' },
]

export function TrustBadges() {
  return (
    <section aria-label="Security compliance badges" className="relative z-10 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Subtle divider line above */}
        <div
          className="w-full h-px mb-14"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)',
          }}
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-semibold tracking-widest uppercase text-[#3a5468] mb-8"
        >
          Enterprise Security Compliance
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="flex flex-wrap justify-center gap-4"
          role="list"
        >
          {badges.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg glass border border-white/6 opacity-55 hover:opacity-100 hover:border-[var(--cyan)]/30 transition-all duration-300 cursor-default"
            >
              <Icon className="w-4 h-4 text-[#7a9ab0] flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-[#7a9ab0] whitespace-nowrap">
                {label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Divider line below */}
        <div
          className="w-full h-px mt-14"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
