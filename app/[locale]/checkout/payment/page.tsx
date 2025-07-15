"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Landmark } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useTranslations } from "next-intl"
import type { CheckoutData } from "@/app/types/checkout"
import { CdpPageEvent, useCdp } from "hclcdp-web-sdk-react"

type PaymentMethod = "paypal" | "sepa" | "saved-card" | "new-card" | "bonvoyo"

export default function PaymentPage() {
  const router = useRouter()
  const { track } = useCdp()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("saved-card")
  const t = useTranslations("checkout.payment")
  const tCard = useTranslations("bahncard.comparison.card")
  const tNav = useTranslations("navigation")
  const tCustomer = useTranslations("checkout.customerData")

  const orderNumber = useMemo(() => `DB-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000000)}`, [])

  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [price, setPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bahncard-customer-data")
      if (stored) {
        try {
          const data: CheckoutData = JSON.parse(stored)
          setCheckoutData(data)
          setSelectedMethod((data as any).paymentMethod || "saved-card")
          setPrice(data.price)
        } catch {}
      }
    }
  }, [])

  // Save payment method and continue
  const handleContinue = () => {
    if (!checkoutData) return
    const updatedData = { ...checkoutData, paymentMethod: selectedMethod, orderNumber }
    localStorage.setItem("bahncard-customer-data", JSON.stringify(updatedData))
    setCheckoutData(updatedData)

    track({
      identifier: "BahnCard_Purchase",
      properties: {
        paymentMethod: selectedMethod,
        orderNumber,
        "customer.title": tCustomer(checkoutData.title),
        "customer.firstName": checkoutData.firstName,
        "customer.lastName": checkoutData.lastName,
        formattedAddress: checkoutData.formattedAddress,
        "customer.dateOfBirth": checkoutData.dateOfBirth,
        startDate: checkoutData.startDate,
        travelClass: checkoutData.travelClass,
        card: tCard(checkoutData.card),
      },
    })

    router.push("/checkout/confirmation")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <CdpPageEvent pageName="Checkout - Payment" />
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
                {tNav("back", { default: "Back" })}
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleContinue}>
                {tNav("completePurchase", { default: "Complete Purchase" })}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
