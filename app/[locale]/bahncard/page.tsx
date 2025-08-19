import HeroSection from "@/components/sections/hero-section"
import BahnCardComparison from "@/components/sections/bahncard-comparison"
import FAQSection from "@/components/sections/faq-section"
import { CdpPageEvent } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

export default function BahnCardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <CdpPageEvent pageName="Bahncard Selection" />
      <HeroSection />
      <BahnCardComparison />
      <FAQSection />
    </div>
  )
}
