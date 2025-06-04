"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Landmark } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useTranslations } from "next-intl"
import cards from "@/app/data/cards"

type PaymentMethod = "paypal" | "sepa" | "saved-card" | "new-card" | "bonvoyo"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("saved-card")
  const t = useTranslations("checkout.payment")
  const tCard = useTranslations("comparison.card")
  const tNav = useTranslations("navigation")

  // Get query params
  const searchParams = useSearchParams()
  const travelClassParam = searchParams.get("travelClass") as "1st" | "2nd" | null
  const cardParam = searchParams.get("card") || ""

  const [travelClass, setTravelClass] = useState<Number>(travelClassParam == "1st" ? 0 : 1)
  const [cardTitle, setCardTitle] = useState(cardParam)

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
  const price = getCardPriceByTitle(travelClassParam === "1st" ? "firstClass" : "secondClass", cardParam)

  // Update query params when travelClass or cardTitle changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set("travelClass", travelClass == 0 ? "1st" : "2nd")
    params.set("card", cardTitle)
    router.replace(`?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelClass, cardTitle])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar currentStep={2} />

          {/* Product Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-red-100 dark:bg-red-950 p-4 rounded-lg">
              <CreditCard className="h-8 w-8 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("paymentMethod")}</h1>
              <p className="text-slate-600 dark:text-slate-400">{t("choosePayment")}</p>
            </div>
          </div>

          {/* Main Card */}
          <Card className="p-6">
            <RadioGroup
              value={selectedMethod}
              onValueChange={value => setSelectedMethod(value as PaymentMethod)}
              className="space-y-4 mb-6">
              {/* PayPal */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === "paypal"
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : "border-slate-200 dark:border-slate-800"
                }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="font-medium">
                    {t("paypal")}
                  </Label>
                </div>
              </div>

              {/* SEPA Direct Debit */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === "sepa"
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : "border-slate-200 dark:border-slate-800"
                }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="sepa" id="sepa" />
                  <Landmark />
                  <Label htmlFor="sepa" className="font-medium">
                    {t("sepa")}
                  </Label>
                </div>
              </div>

              {/* Saved Credit Card */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === "saved-card"
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : "border-slate-200 dark:border-slate-800"
                }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="saved-card" id="saved-card" />
                  <CreditCard />
                  <Label htmlFor="saved-card" className="font-medium">
                    {t("savedCard", { card: "VISA **** 2949" })}
                  </Label>
                </div>
              </div>

              {/* New Credit Card */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === "new-card"
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : "border-slate-200 dark:border-slate-800"
                }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="new-card" id="new-card" />
                  <CreditCard />
                  <Label htmlFor="new-card" className="font-medium">
                    {t("addNewCard")}
                  </Label>
                </div>
              </div>

              {/* Bonvoyo */}
              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === "bonvoyo"
                    ? "border-red-600 bg-red-50 dark:bg-red-950"
                    : "border-slate-200 dark:border-slate-800"
                }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="bonvoyo" id="bonvoyo" />
                  <Image src="/db-logo.svg" alt="Bonvoyo Logo" width={29} height={20} />
                  <Label htmlFor="bonvoyo" className="font-medium">
                    {t("bonvoyo")}
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {/* Price Summary */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xl font-bold">{t("price")}</span>
                <span className="text-2xl font-bold">€{price?.toFixed(2)}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => router.back()}>
                {tNav("cancel", { default: "Cancel" })}
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => router.push("/checkout/confirmation")}>
                {tNav("completePurchase", { default: "Complete Purchase" })}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
