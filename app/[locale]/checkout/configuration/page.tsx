"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CreditCard } from "lucide-react"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useTranslations } from "next-intl"
import cards from "@/app/data/cards"
import Link from "next/link"
import { useLocale } from "next-intl"
import { de, enAU, Locale } from "date-fns/locale"

const localeMap: Record<string, Locale> = {
  en: enAU,
  de: de,
}

const ConfigurationPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("checkout.configuration")
  const tCard = useTranslations("comparison.card")

  // Get query params
  const travelClassParam = searchParams.get("travelClass") as "1st" | "2nd" | null
  const cardParam = searchParams.get("card") || ""

  const [travelClass, setTravelClass] = useState<number>(travelClassParam == "1st" ? 0 : 1)
  const [cardTitle, setCardTitle] = useState(cardParam)
  const [startDate, setStartDate] = useState<Date>(new Date())

  // Update query params when travelClass or cardTitle changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set("travelClass", travelClass == 0 ? "1st" : "2nd")
    params.set("card", cardTitle)
    router.replace(`?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelClass, cardTitle])

  const getCardPriceByTitle = (cardClass: "firstClass" | "secondClass", title: string) => {
    const cardArray = cards[cardClass]
    if (!cardArray) return undefined

    for (const cardObj of cardArray) {
      const [key, value] = Object.entries(cardObj)[0]
      if (value.title === title) {
        return value.price
      }
    }

    return undefined // not found
  }
  const prices = [getCardPriceByTitle("firstClass", cardParam), getCardPriceByTitle("secondClass", cardParam)]

  const appLocale = useLocale()
  const dateFnsLocale = localeMap[appLocale] || enAU

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <ProgressBar currentStep={0} />

          {/* Product Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="bg-red-100 dark:bg-red-950 p-4 rounded-lg">
              <CreditCard className="h-8 w-8 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{tCard(cardParam)}</h1>
              <p className="text-slate-600 dark:text-slate-400">{tCard(cardParam.replace("Title", "Subtitle"))}</p>
            </div>
          </div>

          {/* Main Card */}
          <Card className="p-6">
            {/* Class Selection */}
            <div className="mb-6">
              <label className="block font-bold mb-2">{t("travelClass")}</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    travelClass === 0
                      ? "border-red-600 bg-red-50 dark:bg-red-950"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                  onClick={() => setTravelClass(0)}>
                  <div className="font-semibold mb-1">{t("firstClass")}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">€{prices[0].toFixed(2)}</div>
                </button>
                <button
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    travelClass === 1
                      ? "border-red-600 bg-red-50 dark:bg-red-950"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                  onClick={() => setTravelClass(1)}>
                  <div className="font-semibold mb-1">{t("secondClass")}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">€{prices[1].toFixed(2)}</div>
                </button>
              </div>
            </div>

            {/* Start Date */}
            <div className="mb-6">
              <label className="block font-bold mb-2">{t("startDate")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "PPP", { locale: dateFnsLocale })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={date => date && setStartDate(date)}
                    initialFocus
                    locale={dateFnsLocale}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Price Summary */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xl font-bold">{t("price")}</span>
                <span className="text-2xl font-bold">€{prices[travelClass].toFixed(2)}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => window.history.back()}>
                {t("back")}
              </Button>
              <Link
                className="flex-1"
                href={`/checkout/login?travelClass=${travelClass === 0 ? "1st" : "2nd"}&card=${cardTitle}`}>
                <Button className="w-full">{t("continue")}</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationPage
