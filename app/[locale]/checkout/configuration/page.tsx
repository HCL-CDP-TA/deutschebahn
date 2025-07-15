"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CreditCard } from "lucide-react"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useTranslations, useLocale } from "next-intl"
import cards from "@/app/data/cards"
import { de, enAU, Locale } from "date-fns/locale"
import type { CheckoutData } from "@/app/types/checkout"
import { CdpPageEvent, useCdp } from "hclcdp-web-sdk-react"

const localeMap: Record<string, Locale> = {
  en: enAU,
  de: de,
}

const ConfigurationPage = () => {
  const { track } = useCdp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("checkout.configuration")
  const tCard = useTranslations("bahncard.comparison.card")

  // Get travelClass and card from search params if present
  const travelClassParam = searchParams.get("travelClass")
  const cardParam = searchParams.get("card")

  const [travelClass, setTravelClass] = useState<number>(0)
  const [cardTitle, setCardTitle] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [prevData, setPrevData] = useState<Partial<CheckoutData>>({})

  // Prefill from localStorage if available, but override with params if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bahncard-customer-data")
      if (stored) {
        try {
          const data: CheckoutData = JSON.parse(stored)
          setPrevData(data)
          // OVERRIDE with params if present, else use stored
          if (cardParam) {
            setCardTitle(cardParam)
          } else if (data.card) {
            setCardTitle(data.card)
          }
          if (travelClassParam) {
            setTravelClass(travelClassParam === "2nd" ? 1 : 0)
          } else if (data.travelClass) {
            setTravelClass(data.travelClass === "2nd" ? 1 : 0)
          }
          if (data.startDate) setStartDate(new Date(data.startDate))
        } catch {}
      } else {
        // If not in localStorage, use params if present
        if (cardParam) setCardTitle(cardParam)
        if (travelClassParam) setTravelClass(travelClassParam === "2nd" ? 1 : 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardParam, travelClassParam])

  // Custom back button logic
  const handleBack = () => {
    router.push("/bahncard")
  }

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
  const prices = [getCardPriceByTitle("firstClass", cardTitle) ?? 0, getCardPriceByTitle("secondClass", cardTitle) ?? 0]

  const appLocale = useLocale()
  const dateFnsLocale = localeMap[appLocale] || enAU

  // Save selection to localStorage and continue, merging with previous data
  const handleContinue = () => {
    const selectedClass = travelClass === 0 ? "1st" : "2nd"
    const selectedCard = cardTitle
    const selectedPrice = prices[travelClass]

    // Ensure startDate is at midnight (local time)
    const startDateMidnight = startDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
      : new Date()

    const data: CheckoutData = {
      ...prevData,
      card: selectedCard,
      travelClass: selectedClass,
      price: selectedPrice,
      startDate: startDateMidnight.toISOString(), // <-- always midnight
      title: prevData.title ?? "",
      firstName: prevData.firstName ?? "",
      lastName: prevData.lastName ?? "",
      formattedAddress: prevData.formattedAddress ?? "",
      addressComponents: prevData.addressComponents ?? [],
      dateOfBirth: prevData.dateOfBirth ?? "",
    }
    localStorage.setItem("bahncard-customer-data", JSON.stringify(data))

    track({
      identifier: "configure_BahnCard",
      properties: {
        card: tCard(cardTitle),
        class: selectedClass,
        price: prices[travelClass],
        startDate: startDate.toISOString(),
      },
    })

    router.push("/checkout/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <CdpPageEvent pageName={"Checkout - Configuration"} />
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
              <h1 className="text-3xl font-bold mb-2">{tCard(cardTitle)}</h1>
              <p className="text-slate-600 dark:text-slate-400">{tCard(cardTitle.replace("Title", "Subtitle"))}</p>
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
              <Button variant="outline" className="flex-1" onClick={handleBack}>
                {t("back")}
              </Button>
              <Button className="flex-1" onClick={handleContinue}>
                {t("continue")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationPage
