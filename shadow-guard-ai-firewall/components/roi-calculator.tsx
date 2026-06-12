'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { DollarSign, Droplets } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// --- helpers ---
function formatDollars(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

function formatGallons(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B gal`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M gal`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K gal`
  return `${n.toFixed(0)} gal`
}

// Animated number display
function AnimatedNumber({
  value,
  format,
}: {
  value: number
  format: (n: number) => string
}) {
  const [display, setDisplay] = useState(format(value))
  const prev = useRef(value)

  useEffect(() => {
    const from = prev.current
    const to = value
    prev.current = value

    if (from === to) {
      setDisplay(format(to))
      return
    }

    const start = performance.now()
    const duration = 400

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(format(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value, format])

  return <span>{display}</span>
}

export function RoiCalculator() {
  // Slider state: volume in millions, cost in cents
  const [volumeM, setVolumeM] = useState(100) // 100M requests
  const [costCents, setCostCents] = useState(3)  // $0.03 per request

  const volumeRequests = volumeM * 1_000_000
  const costPerRequest = costCents / 100

  // Savings: 30% OPEX reduction on total annual spend
  const annualSpend = volumeRequests * costPerRequest * 12
  const annualSavings = annualSpend * 0.30

  // Water: 0.25 gallons per 1000 requests saved (early-terminate high-entropy)
  const waterGallons = (volumeRequests * 0.3 / 1000) * 0.25 * 12

  return (
    <section id="roi" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--cyan)] mb-4">
            ROI Calculator
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white text-balance mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Enterprise{' '}
            <span className="text-[var(--cyan)] glow-cyan-text">ROI</span>{' '}
            Calculator
          </h2>
          <p className="max-w-md mx-auto text-[#7a9ab0] text-base leading-relaxed">
            Quantify the value of cognitive boundaries. Adjust your usage to see what Shadow Guard saves you.
          </p>
        </motion.div>

        {/* Dashboard panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-8 md:p-10 border border-[var(--cyan)]/15"
        >
          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Volume slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label
                  htmlFor="volume-slider"
                  className="text-sm font-semibold text-white"
                >
                  Monthly API Volume
                </label>
                <span
                  className="text-lg font-bold text-[var(--cyan)] tabular-nums"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {volumeM >= 1000 ? `${(volumeM / 1000).toFixed(1)}B` : `${volumeM}M`} req
                </span>
              </div>
              <div className="relative">
                <input
                  id="volume-slider"
                  type="range"
                  min={1}
                  max={1000}
                  step={1}
                  value={volumeM}
                  onChange={(e) => setVolumeM(Number(e.target.value))}
                  className="slider-cyan w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                  aria-valuemin={1}
                  aria-valuemax={1000}
                  aria-valuenow={volumeM}
                  aria-label="Monthly API volume in millions of requests"
                  style={{
                    background: `linear-gradient(to right, var(--cyan) 0%, var(--cyan) ${(volumeM - 1) / 9.99}%, rgba(0,229,255,0.12) ${(volumeM - 1) / 9.99}%, rgba(0,229,255,0.12) 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#3a5468]">
                <span>1M</span>
                <span>500M</span>
                <span>1B</span>
              </div>
            </div>

            {/* Cost slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label
                  htmlFor="cost-slider"
                  className="text-sm font-semibold text-white"
                >
                  Average Cost Per Request
                </label>
                <span
                  className="text-lg font-bold text-[var(--cyan)] tabular-nums"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  ${(costCents / 100).toFixed(3)}
                </span>
              </div>
              <div className="relative">
                <input
                  id="cost-slider"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={costCents}
                  onChange={(e) => setCostCents(Number(e.target.value))}
                  className="slider-cyan w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                  aria-valuemin={1}
                  aria-valuemax={10}
                  aria-valuenow={costCents}
                  aria-label="Average cost per request in cents"
                  style={{
                    background: `linear-gradient(to right, var(--cyan) 0%, var(--cyan) ${(costCents - 1) / 0.09}%, rgba(0,229,255,0.12) ${(costCents - 1) / 0.09}%, rgba(0,229,255,0.12) 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#3a5468]">
                <span>$0.01</span>
                <span>$0.05</span>
                <span>$0.10</span>
              </div>
            </div>
          </div>

          {/* Output cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Savings card */}
            <motion.div
              layout
              className="rounded-xl p-6 flex flex-col gap-3 border border-[var(--green)]/20 bg-[var(--green-dim)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--green)]/15 border border-[var(--green)]/25">
                  <DollarSign className="w-5 h-5 text-[var(--green)]" />
                </div>
                <span className="text-xs font-semibold text-[var(--green)] uppercase tracking-widest">
                  Annual OPEX Savings
                </span>
              </div>
              <div
                className="text-3xl md:text-4xl font-extrabold text-[var(--green)] tabular-nums"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <AnimatedNumber value={annualSavings} format={formatDollars} />
              </div>
              <p className="text-xs text-[#7a9ab0] leading-relaxed">
                30% OPEX reduction via early termination of high-entropy sequences and hijacked logic loops.
              </p>
            </motion.div>

            {/* Water card */}
            <motion.div
              layout
              className="rounded-xl p-6 flex flex-col gap-3 border border-[var(--cyan)]/20 bg-[var(--cyan-dim)]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--cyan)]/15 border border-[var(--cyan)]/25">
                  <Droplets className="w-5 h-5 text-[var(--cyan)]" />
                </div>
                <span className="text-xs font-semibold text-[var(--cyan)] uppercase tracking-widest">
                  Water Preserved
                </span>
              </div>
              <div
                className="text-3xl md:text-4xl font-extrabold text-[var(--cyan)] tabular-nums"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <AnimatedNumber value={waterGallons} format={formatGallons} />
              </div>
              <p className="text-xs text-[#7a9ab0] leading-relaxed">
                Halting wasted thermal cooling loops prevents fresh water from being evaporated in data centers.
              </p>
            </motion.div>
          </div>

          {/* Formula hint */}
          <p className="mt-6 text-center text-xs text-[#3a5468] font-mono">
            Based on early termination of high-entropy sequences and hijacked logic loops.
          </p>
        </motion.div>
      </div>

      {/* Slider thumb styles */}
      <style>{`
        .slider-cyan::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
          cursor: pointer;
          border: 2px solid #060a0f;
          transition: transform 0.15s;
        }
        .slider-cyan::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .slider-cyan::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
          cursor: pointer;
          border: 2px solid #060a0f;
        }
      `}</style>
    </section>
  )
}
