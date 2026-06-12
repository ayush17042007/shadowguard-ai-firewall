'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'

const tiers = [
  {
    name: 'Shield',
    price: '$99',
    priceNote: '/month',
    description: 'For high-growth startups.',
    badge: null,
    accentColor: 'var(--cyan)',
    highlighted: false,
    features: [
      '100,000 requests / month',
      'Gate 2 only (entropy-based lie detection)',
      'Basic dashboard',
      'Email support',
    ],
    cta: 'Get Started',
    overage: null,
  },
  {
    name: 'Fortress',
    price: '$999',
    priceNote: '/month',
    description: 'The gold standard for mid-market.',
    badge: 'Most Trusted',
    accentColor: 'var(--cyan)',
    highlighted: true,
    features: [
      '1,000,000 requests / month',
      'Gate 1 + Gate 2: Full dual-layer',
      'Real-time threat monitor',
      'SSO + team management',
      'API access',
      'Custom latency-optimised routing',
    ],
    cta: 'Talk to Sales',
    overage: null,
  },
  {
    name: 'Bastion',
    price: '$5K–$25K',
    priceNote: '/month',
    description: 'For defense, government, and high-security sectors.',
    badge: null,
    accentColor: 'var(--orange)',
    highlighted: false,
    features: [
      'Unlimited requests',
      'Both gates + custom policies',
      'On-premise deployment',
      'Air-gapped operation',
      'Zero-telemetry / zero data retention',
      'Military-grade behavioral auditing',
      'Dedicated support engineer',
      'SOC2 / ISO 27001 compliance',
      'Audit trail export',
    ],
    cta: 'Contact Us',
    overage: null,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--cyan)] mb-4">
            Pricing
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white text-balance mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Secure Your{' '}
            <span className="text-[var(--cyan)] glow-cyan-text">AI Stack</span>
          </h2>
          <p className="max-w-md mx-auto text-[#7a9ab0] text-base leading-relaxed">
            Value-based security, not token passthrough. Every tier is built for enterprises that cannot afford AI failures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`relative glass rounded-2xl p-7 flex flex-col gap-6 overflow-hidden transition-all duration-300 ${
                tier.highlighted
                  ? 'ring-1 ring-[var(--cyan)]/50 shadow-[0_0_60px_rgba(0,229,255,0.1)] -translate-y-4'
                  : ''
              }`}
              style={{
                border: `1px solid ${tier.accentColor}33`,
              }}
            >
              {/* Ambient glow for highlighted */}
              {tier.highlighted && (
                <div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: 'var(--cyan)' }}
                  aria-hidden="true"
                />
              )}

              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-b-lg bg-[var(--cyan)] text-[#060a0f] text-xs font-bold tracking-wide">
                    <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className={tier.badge ? 'mt-4' : ''}>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: tier.accentColor }}
                >
                  {tier.name}
                </span>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span
                    className="text-3xl font-extrabold text-white"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-xs text-[#7a9ab0]">{tier.priceNote}</span>
                </div>
                <p className="mt-2 text-sm text-[#7a9ab0] leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-[#a0bfcc]">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: tier.accentColor }}
                      aria-hidden="true"
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
                  tier.highlighted
                    ? 'bg-[var(--cyan)] text-[#060a0f] glow-cyan hover:brightness-110 hover:scale-[1.02]'
                    : 'glass border hover:bg-white/5'
                }`}
                style={
                  !tier.highlighted
                    ? { borderColor: `${tier.accentColor}44`, color: tier.accentColor }
                    : {}
                }
              >
                {tier.highlighted && <Zap className="w-4 h-4" aria-hidden="true" />}
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Overage note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-[#3a5468] mt-8"
        >
          Consumption Overage: $0.001 per request above tier limits.
        </motion.p>
      </div>
    </section>
  )
}
