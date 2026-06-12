'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Cpu, Droplets, TrendingDown } from 'lucide-react'

const cards = [
  {
    icon: AlertTriangle,
    accent: 'red',
    accentColor: 'var(--red)',
    accentDim: 'var(--red-dim)',
    tag: 'Zero Liability',
    title: 'Eliminating Misinformation Lawsuits',
    description:
      'Mathematically intercept confident lies before they reach users, eliminating the legal and reputational exposure of AI-generated misinformation at enterprise scale.',
    stat: '0',
    statLabel: 'Legal Incidents',
  },
  {
    icon: Cpu,
    accent: 'cyan',
    accentColor: 'var(--cyan)',
    accentDim: 'var(--cyan-dim)',
    tag: 'Workflow Continuity',
    title: 'Eradicating Decision Fatigue',
    description:
      'Stop errors at the source before they propagate. Free your teams from the cognitive overhead of second-guessing every AI output and validating every response.',
    stat: '∞',
    statLabel: 'Confidence',
  },
  {
    icon: TrendingDown,
    accent: 'yellow',
    accentColor: 'var(--yellow)',
    accentDim: 'var(--yellow-dim)',
    tag: '30% OPEX Reduction',
    title: "Stopping API 'Token Burn'",
    description:
      "Terminate hijacked sequences early before they burn through expensive API tokens. Our firewall cuts runaway inference costs at the first sign of adversarial hijacking.",
    stat: '30%',
    statLabel: 'Cost Reduction',
  },
  {
    icon: Droplets,
    accent: 'green',
    accentColor: 'var(--green)',
    accentDim: 'var(--green-dim)',
    tag: 'Resource Preservation',
    title: 'Halting Useless Compute Cycles',
    description:
      'Save immense data-center cooling water and reduce carbon footprint by halting inference on hijacked, futile compute cycles before they waste energy.',
    stat: 'ESG',
    statLabel: 'Impact',
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export function ImpactSection() {
  return (
    <section id="impact" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--cyan)] mb-4">
            Expected Impact
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white text-balance mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Quantifiable ROI.{' '}
            <span className="text-[var(--cyan)] glow-cyan-text">Immediate Value.</span>
          </h2>
          <p className="max-w-xl mx-auto text-[#7a9ab0] text-base leading-relaxed">
            Shadow Guard delivers measurable enterprise outcomes across legal, operational, financial,
            and environmental dimensions.
          </p>
        </motion.div>

        {/* 2×2 Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.tag}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative glass rounded-2xl p-7 flex flex-col gap-5 overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                style={{
                  borderColor: card.accentColor + '33',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                {/* Ambient corner glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                  style={{ backgroundColor: card.accentColor }}
                  aria-hidden="true"
                />

                {/* Top row */}
                <div className="flex items-start justify-between relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: card.accentDim, border: `1px solid ${card.accentColor}33` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.accentColor }} />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-3xl font-extrabold leading-none"
                      style={{ color: card.accentColor, fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {card.stat}
                    </div>
                    <div className="text-xs text-[#7a9ab0] mt-1">{card.statLabel}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span
                    className="inline-block text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md mb-3"
                    style={{ backgroundColor: card.accentDim, color: card.accentColor }}
                  >
                    {card.tag}
                  </span>
                  <h3
                    className="text-lg font-bold text-white mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#7a9ab0] leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
