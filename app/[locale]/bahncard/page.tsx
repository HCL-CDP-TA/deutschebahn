import HeroSection from "@/components/sections/hero-section"
import BahnCardComparison from "@/components/sections/bahncard-comparison"
import FAQSection from "@/components/sections/faq-section"

export default function BahnCardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <BahnCardComparison />
      <FAQSection />
    </div>
  )
}
