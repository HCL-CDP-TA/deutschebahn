import HeroSection from "@/components/sections/hero-section"
import BahnCardIntro from "@/components/sections/bahncard-intro"
import BahnCardComparison from "@/components/sections/bahncard-comparison"
import PricingSection from "@/components/sections/pricing-section"
import BenefitsSection from "@/components/sections/benefits-section"
import FAQSection from "@/components/sections/faq-section"
import CTASection from "@/components/sections/cta-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      {/* <BahnCardIntro /> */}
      <BahnCardComparison />
      {/* <PricingSection /> */}
      {/* <BenefitsSection /> */}
      <FAQSection />
      {/* <CTASection /> */}
    </div>
  )
}
