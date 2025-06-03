import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl"

const HeroSection = () => {
  const t = useTranslations("hero")

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/BC50_Mitfahrer_Bühnenbild_NoHandy_1280x540.avif"
            alt={t("imageAlt")}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 md:py-48 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {t.rich("headline", {
              highlight: chunks => <span className="text-red-500">{chunks}</span>,
            })}
          </h1>
          <p className="text-xl text-white/90 mb-8">{t("subline")}</p>
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-6 text-lg font-semibold">
              {t("compareButton")}
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30 rounded-md px-6 py-6 text-lg font-semibold">
              {t("calculateButton")}
            </Button>
          </div> */}

          <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6">
            <p className="text-white/90 font-medium text-sm md:text-base">{t("info")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
