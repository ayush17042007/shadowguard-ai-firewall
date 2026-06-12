import { ArchitectureSection } from '@/components/architecture-section'
import { AiTester } from '@/components/ai-tester'
import { HeroSection } from '@/components/hero-section'
import { ImpactSection } from '@/components/impact-section'
import { Navbar } from '@/components/navbar'
import { ParticleCanvas } from '@/components/particle-canvas'
import { PricingSection } from '@/components/pricing-section'
import { RoiCalculator } from '@/components/roi-calculator'
import { SiteFooter } from '@/components/site-footer'
import { ThreatMonitor } from '@/components/threat-monitor'
import { TrustBadges } from '@/components/trust-badges'

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#060a0f]">
      {/* Animated particle mesh background */}
      <ParticleCanvas />

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ImpactSection />
          <ArchitectureSection />
          {/* Live interactive query tester — wired to POST /api/guard */}
          <AiTester />
          {/* Live threat log monitor — polls GET /api/logs every 3s */}
          <ThreatMonitor />
          <RoiCalculator />
          <PricingSection />
          <TrustBadges />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
