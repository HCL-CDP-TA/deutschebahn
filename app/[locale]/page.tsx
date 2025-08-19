"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Train, MapPin, Clock, CreditCard } from "lucide-react"
import { useTranslations } from "next-intl"
import { CdpPageEvent } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

export default function HomePage() {
  const t = useTranslations("home")

  return (
    <div className="flex flex-col min-h-screen">
      <CdpPageEvent pageName="Home Page" />
      {/* Hero Section */}
      <section
        className="relative h-[600px] md:h-[700px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home-hero.avif')",
          filter: "brightness(0.85)",
        }}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />

        <div className="container mx-auto px-4 py-32 md:py-48 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-white/90 mb-8">{t("heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-6 text-lg font-semibold">
                {t("bookJourney")}
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30 rounded-md px-6 py-6 text-lg font-semibold">
                {t("viewTimetable")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BahnCard Promotion Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{t("bahncardTitle")}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{t("bahncardSubtitle")}</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                    <CreditCard className="h-6 w-6 text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{t("threeCardOptionsTitle")}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{t("threeCardOptionsDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{t("validOneYearTitle")}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{t("validOneYearDesc")}</p>
                  </div>
                </div>
              </div>
              <Link href="/bahncard">
                <Button className="bg-red-600 hover:bg-red-700 text-white">{t("learnMoreBahncard")}</Button>
              </Link>
            </div>
            <div
              className="h-[400px] rounded-xl overflow-hidden shadow-lg bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/home-subhero.avif')" }}></div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                  <Train className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t("trainStatusTitle")}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{t("trainStatusDesc")}</p>
                  <Button variant="outline">{t("checkStatus")}</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t("stationInfoTitle")}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{t("stationInfoDesc")}</p>
                  <Button variant="outline">{t("viewStations")}</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-950 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{t("timetablesTitle")}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{t("timetablesDesc")}</p>
                  <Button variant="outline">{t("viewTimetables")}</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
