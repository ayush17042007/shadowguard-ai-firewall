'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Shield, Sigma, Terminal, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────
   Animated entropy formula token component
───────────────────────────────────────── */
function EntropyFormula() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const tokens = [
    { text: 'H', color: '#00e5ff', delay: 0 },
    { text: '(X)', color: '#a0bfcc', delay: 0.08 },
    { text: ' = ', color: '#7a9ab0', delay: 0.16 },
    { text: '−', color: '#ff6b35', delay: 0.24 },
    { text: 'Σ', color: '#00e5ff', delay: 0.32, glow: true },
    { text: ' p(x', color: '#a0bfcc', delay: 0.4 },
    { text: 'ᵢ', color: '#ffd60a', delay: 0.46 },
    { text: ')', color: '#a0bfcc', delay: 0.52 },
    { text: ' log ', color: '#ff6b35', delay: 0.58 },
    { text: 'p(x', color: '#a0bfcc', delay: 0.65 },
    { text: 'ᵢ', color: '#ffd60a', delay: 0.71 },
    { text: ')', color: '#a0bfcc', delay: 0.77 },
  ]

  return (
    <div ref={ref} className="flex flex-wrap items-baseline gap-0 font-mono select-none" aria-label="Shannon entropy formula: H(X) = negative sum of p(x_i) log p(x_i)">
      {tokens.map((t, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: t.delay, ease: 'easeOut' }}
          style={{
            color: t.color,
            textShadow: t.glow ? `0 0 18px ${t.color}` : undefined,
          }}
          className="text-3xl md:text-4xl font-bold leading-none"
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Probability bar (animated on mount)
───────────────────────────────────────── */
const PROB_BARS = [
  { label: 'executed', prob: 0.24, color: '#00e5ff' },
  { label: 'confirmed', prob: 0.19, color: '#00e5ff' },
  { label: 'processed', prob: 0.17, color: '#00e676' },
  { label: 'completed', prob: 0.14, color: '#ffd60a' },
  { label: 'approved ⚠', prob: 0.26, color: '#ff3d3d', alert: true },
]

function ProbabilityBars() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#7a9ab0] mb-1">
        Next-Token Distribution
      </p>
      {PROB_BARS.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#7a9ab0] w-20 truncate">{bar.label}</span>
          <div className="flex-1 h-4 rounded-sm bg-white/5 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${bar.prob * 100}%` } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-sm"
              style={{
                backgroundColor: bar.color,
                boxShadow: bar.alert ? `0 0 10px ${bar.color}80` : undefined,
              }}
            />
            {bar.alert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 0] } : {}}
                transition={{ duration: 1.2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 bg-[#ff3d3d]/15 rounded-sm"
              />
            )}
          </div>
          <span className="text-[11px] font-mono w-8 text-right" style={{ color: bar.color }}>
            {(bar.prob * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   Terminal scratchpad lines
───────────────────────────────────────── */
const TERMINAL_LINES = [
  { text: '> Scratchpad intercept initialized...', color: '#7a9ab0', delay: 0 },
  { text: '> Reading agent reasoning chain [line 1]', color: '#a0bfcc', delay: 0.3 },
  { text: '  INTENT: "Retrieve user financial records"', color: '#a0bfcc', delay: 0.6 },
  { text: '> Scanning for adversarial patterns...', color: '#7a9ab0', delay: 0.9 },
  { text: '  [Line 4] ANOMALY DETECTED ⚑', color: '#ff6b35', delay: 1.2, alert: true },
  { text: '  Injected directive: "ignore prev. context"', color: '#ff3d3d', delay: 1.45, critical: true },
  { text: '> Behavioral fingerprint mismatch (0.94 σ)', color: '#ff3d3d', delay: 1.7, critical: true },
  { text: '> GATE 1: EXECUTION BLOCKED ✕', color: '#ff3d3d', delay: 2.0, critical: true },
  { text: '> Incident logged. Audit trail preserved.', color: '#00e676', delay: 2.3 },
]

function TerminalWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed">
      {TERMINAL_LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: line.delay }}
          className="flex items-start gap-2"
          style={{ color: line.critical ? '#ff3d3d' : line.alert ? '#ff6b35' : line.color }}
        >
          {line.critical && (
            <span className="flex-shrink-0 mt-0.5 text-[#ff3d3d]">!</span>
          )}
          <span className={line.critical ? 'font-bold' : ''}>{line.text}</span>
        </motion.div>
      ))}
      <motion.span
        animate={isInView ? { opacity: [1, 0, 1] } : { opacity: 0 }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-[#00e5ff]"
      >
        █
      </motion.span>
    </div>
  )
}

/* ─────────────────────────────────────────
   Pipeline flow bar
───────────────────────────────────────── */
const PIPELINE_STEPS = [
  { label: 'User Query', icon: Terminal, color: '#7a9ab0' },
  { label: 'Gate 1\nBehavioral Audit', icon: AlertTriangle, color: '#ff6b35' },
  { label: 'Gate 2\nEntropy Check', icon: Sigma, color: '#00e5ff' },
  { label: 'API Execution\nEngine', icon: Zap, color: '#00e676' },
]

function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="flex items-center justify-between gap-0 w-full">
      {PIPELINE_STEPS.map((step, i) => {
        const Icon = step.icon
        const isLast = i === PIPELINE_STEPS.length - 1
        return (
          <div key={step.label} className="flex items-center flex-1 min-w-0">
            {/* Step node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${step.color}18`,
                  border: `1px solid ${step.color}44`,
                  boxShadow: `0 0 16px ${step.color}22`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: step.color }} />
              </div>
              <span
                className="text-[10px] font-semibold text-center whitespace-pre-line leading-tight"
                style={{ color: step.color }}
              >
                {step.label}
              </span>
            </motion.div>

            {/* Connector arrow */}
            {!isLast && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                className="flex-1 flex items-center justify-center origin-left mx-1 -mt-5"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-[#7a9ab0]/40 to-[#7a9ab0]/10" />
                <ChevronRight className="w-3 h-3 text-[#7a9ab0]/40 flex-shrink-0" />
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────
   Entropy Score Dial (animated ring)
───────────────────────────────────────── */
function EntropyDial() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' })
  const circumference = 2 * Math.PI * 36
  const targetFill = 0.78 // high entropy = 78%

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#7a9ab0]">
        Entropy Score
      </p>
      <div className="relative w-24 h-24">
        <svg ref={ref} viewBox="0 0 80 80" className="w-full h-full -rotate-90">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="#ff3d3d"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * (1 - targetFill) } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: 'drop-shadow(0 0 8px #ff3d3d)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-xl font-black text-[#ff3d3d] font-mono leading-none"
          >
            0.78
          </motion.span>
          <span className="text-[9px] text-[#7a9ab0] uppercase tracking-wide mt-0.5">HIGH</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-[#ff3d3d] font-semibold">
        <AlertTriangle className="w-3 h-3" />
        STREAM INTERCEPTED
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Main section export
───────────────────────────────────────── */
export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative z-10 py-28 px-6">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#ff3d3d]/[0.025] blur-[160px]" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00e5ff]/[0.025] blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto relative flex flex-col gap-14">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--cyan)] mb-4">
            Dual-Layer Architecture
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white text-balance mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Shadow Guard:{' '}
            <span className="text-[var(--cyan)] glow-cyan-text">A Unified Immune System</span>
          </h2>
          <p className="max-w-xl mx-auto text-[#7a9ab0] text-base leading-relaxed text-pretty">
            A dual-layer, real-time firewall operating directly between the{' '}
            <span className="text-white font-medium">User Query</span> and the{' '}
            <span className="text-white font-medium">API Execution Engine</span>.
          </p>
        </motion.div>

        {/* ── Pipeline Flow Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass rounded-2xl px-8 py-6 border border-white/5"
        >
          <PipelineFlow />
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Gate 1: Behavioral Audit — spans 3 cols, tall terminal card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 group relative rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(10, 16, 24, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 61, 61, 0.2)',
              boxShadow: '0 0 40px rgba(255, 61, 61, 0.05)',
            }}
          >
            {/* Red ambient glow top-left */}
            <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-[#ff3d3d]/10 blur-3xl pointer-events-none group-hover:bg-[#ff3d3d]/15 transition-all duration-500" aria-hidden="true" />

            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-5 py-3.5 border-b"
              style={{ borderColor: 'rgba(255, 61, 61, 0.2)', backgroundColor: 'rgba(255, 61, 61, 0.06)' }}
            >
              {/* Traffic lights */}
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff3d3d]" style={{ boxShadow: '0 0 6px #ff3d3d' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b35]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd60a]/40" />
              <div className="ml-3 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#ff6b35]" />
                <span className="text-[11px] font-mono font-semibold text-[#ff6b35] tracking-widest uppercase">
                  gate-1 · behavioral-audit.log
                </span>
              </div>
              <div className="ml-auto">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#ff3d3d]/15 text-[#ff3d3d] border border-[#ff3d3d]/25 tracking-wider animate-pulse">
                  LIVE
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="flex flex-col gap-6 p-6 flex-1">
              {/* Gate header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-[#ff6b35] mb-2">
                    Auditing Intent &amp; Real-Time Scratchpad Interception
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    GATE 1:{' '}
                    <span className="text-[#ff3d3d]" style={{ textShadow: '0 0 20px rgba(255,61,61,0.5)' }}>
                      BEHAVIORAL AUDIT
                    </span>
                  </h3>
                </div>
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,61,61,0.12)', border: '1px solid rgba(255,61,61,0.3)' }}
                >
                  <Shield className="w-5 h-5 text-[#ff3d3d]" />
                </div>
              </div>

              {/* Concept text */}
              <p className="text-sm text-[#7a9ab0] leading-relaxed">
                Defending the agent&apos;s internal reasoning from external adversarial manipulation.
                The Defender Agent reads the hidden{' '}
                <span className="text-[#ff6b35] font-medium font-mono">scratchpad</span> line-by-line,
                catching zero-day prompt injections and hijacked logic{' '}
                <span className="text-white font-medium">before any tool execution can lock in.</span>
              </p>

              {/* Live terminal */}
              <div
                className="rounded-xl p-4 flex-1 min-h-[180px]"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255, 61, 61, 0.12)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
                }}
              >
                <TerminalWindow />
              </div>
            </div>
          </motion.div>

          {/* ── Gate 2: Statistical Entropy — spans 2 cols ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 group relative rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(0, 14, 22, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.18)',
              boxShadow: '0 0 40px rgba(0, 229, 255, 0.04)',
            }}
          >
            {/* Cyan ambient glow */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-[#00e5ff]/8 blur-3xl pointer-events-none group-hover:bg-[#00e5ff]/12 transition-all duration-500" aria-hidden="true" />

            {/* Header bar */}
            <div
              className="flex items-center gap-2 px-5 py-3.5 border-b"
              style={{ borderColor: 'rgba(0, 229, 255, 0.18)', backgroundColor: 'rgba(0, 229, 255, 0.05)' }}
            >
              <Sigma className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span className="text-[11px] font-mono font-semibold text-[#00e5ff] tracking-widest uppercase">
                gate-2 · entropy-layer
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#00e5ff] animate-pulse" />
                <span className="text-[9px] font-mono text-[#00e5ff]/70">PROCESSING</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 p-6 flex-1">
              {/* Gate header */}
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#00e5ff]/60 mb-2">
                  The Ignorance Protocol &amp; Calculating Doubt
                </div>
                <h3
                  className="text-2xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  GATE 2:{' '}
                  <span className="text-[#00e5ff] glow-cyan-text">STATISTICAL ENTROPY</span>
                </h3>
              </div>

              {/* Formula block */}
              <div
                className="rounded-xl p-5 flex flex-col gap-4"
                style={{
                  background: 'rgba(0, 229, 255, 0.04)',
                  border: '1px solid rgba(0, 229, 255, 0.12)',
                }}
              >
                <p className="text-[9px] font-mono tracking-widest uppercase text-[#7a9ab0]">
                  Shannon Entropy — Intercept Condition
                </p>
                <EntropyFormula />
                <p className="text-[11px] text-[#7a9ab0] font-mono leading-relaxed mt-1 border-t border-white/5 pt-3">
                  <span className="text-[#00e5ff]">High H(X)</span> → model is{' '}
                  <span className="text-[#ff3d3d] font-bold">overconfident &amp; uncertain</span>.
                  Stream intercepted. <span className="text-[#00e676]">Accuracy</span> over Fluency.
                </p>
              </div>

              {/* Concept text */}
              <p className="text-sm text-[#7a9ab0] leading-relaxed">
                Quantifying epistemic uncertainty at the{' '}
                <span className="text-[#00e5ff] font-mono font-medium">logit layer</span>{' '}
                to intercept lies before generation. Protects against the machine&apos;s overconfidence.
              </p>

              {/* Probability bars */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0, 229, 255, 0.08)',
                }}
              >
                <ProbabilityBars />
              </div>

              {/* Entropy dial */}
              <div
                className="rounded-xl p-4 flex items-center justify-center"
                style={{
                  background: 'rgba(255, 61, 61, 0.04)',
                  border: '1px solid rgba(255, 61, 61, 0.12)',
                }}
              >
                <EntropyDial />
              </div>
            </div>
          </motion.div>

          {/* ── Bottom row: two wide stat tiles ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-2 glass rounded-2xl p-6 flex items-center gap-5"
            style={{ border: '1px solid rgba(255, 107, 53, 0.2)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.3)' }}
            >
              <AlertTriangle className="w-5 h-5 text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#ff6b35]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Zero-Day
              </p>
              <p className="text-xs text-[#7a9ab0] leading-snug mt-0.5">
                Prompt injection defense requires no prior training on the attack signature.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
            className="lg:col-span-3 glass rounded-2xl p-6 flex items-center gap-5"
            style={{ border: '1px solid rgba(0, 229, 255, 0.2)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}
            >
              <CheckCircle2 className="w-5 h-5 text-[#00e5ff]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#00e5ff] glow-cyan-text" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Pre-Generation Intercept
              </p>
              <p className="text-xs text-[#7a9ab0] leading-snug mt-0.5">
                Entropy is computed at the logit layer — before the hallucinated token is ever emitted into the response stream.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
