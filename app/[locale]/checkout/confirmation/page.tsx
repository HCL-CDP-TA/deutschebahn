"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Download } from "lucide-react"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import type { CheckoutData } from "@/app/types/checkout"

export default function ConfirmationPage() {
  const router = useRouter()
  const t = useTranslations("checkout.confirmation")
  const tCard = useTranslations("bahncard.comparison.card")
  const tNav = useTranslations("navigation")
  const tPayment = useTranslations("checkout.payment")
  const tCustomerData = useTranslations("checkout.customerData")
  const [customerData, setCustomerData] = useState<any>(null)
  const [username, setUsername] = useState<string>("")
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("bahncard-customer-data")
      if (data) setCustomerData(JSON.parse(data))
      const storedUsername = localStorage.getItem("bahncard-username")
      if (storedUsername) setUsername(storedUsername)

      const stored = localStorage.getItem("bahncard-customer-data")
      if (stored) setCheckoutData(JSON.parse(stored))
    }
  }, [])

  const orderNumber = useMemo(() => `DB-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000000)}`, [])

  // Helper to show payment method label
  const paymentLabel = (method: string | undefined) => {
    switch (method) {
      case "paypal":
        return tPayment("paypal")
      case "sepa":
        return tPayment("sepa")
      case "saved-card":
        return tPayment("savedCard", { card: "VISA **** 2949" })
      case "new-card":
        return tPayment("addNewCard")
      case "bonvoyo":
        return tPayment("bonvoyo")
      default:
        return "-"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar currentStep={3} disableNavigation />

          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t("successTitle")}</h1>
            <p className="text-slate-600 dark:text-slate-400">{t("successMessage")}</p>
          </div>

          {/* Main Card */}
          <Card className="p-6">
            {/* Order Summary */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("orderSummary")}</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("orderNumber")}</span>
                    <span className="font-medium">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("product")}</span>
                    <span className="font-medium">{customerData ? tCard(customerData.card) : "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("class")}</span>
                    <span className="font-medium">
                      {customerData?.travelClass === "1st" ? t("firstClass") : t("secondClass")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("startDate")}</span>
                    <span className="font-medium">
                      {customerData?.dateOfBirth ? new Date(customerData.startDate).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h2 className="text-lg font-semibold mb-4">{t("customerDetails")}</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("name")}</span>
                    <span className="font-medium">
                      {customerData
                        ? `${customerData.title ? tCustomerData(customerData.title) + " " : ""}${
                            customerData.firstName
                          } ${customerData.lastName}`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("username")}</span>
                    <span className="font-medium">{username || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t("address")}</span>
                    <span className="font-medium">{customerData?.address || "-"}</span>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold">{t("price")}</span>
                  <span className="text-2xl font-bold">
                    €{customerData?.price ? customerData.price.toFixed(2) : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("paymentMethod")}</span>
                  <span className="font-medium">{paymentLabel((checkoutData as any)?.paymentMethod)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => window.print()}>
                <Download className="mr-2 h-4 w-4" />
                {t("downloadReceipt")}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                {tNav("returnHome", { default: "Return to Homepage" })}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
