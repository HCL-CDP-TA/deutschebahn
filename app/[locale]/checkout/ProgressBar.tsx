"use client"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { TramFront } from "lucide-react"

type ProgressBarProps = {
  currentStep: number
}

const stepRoutes = [
  "/checkout/configuration",
  "/checkout/login",
  "/checkout/customer-data",
  "/checkout/payment"
]

export default function ProgressBar({ currentStep, disableNavigation = false }: ProgressBarProps & { disableNavigation?: boolean }) {
  const t = useTranslations("checkout.progressbar")
  const router = useRouter()
  const pathname = usePathname()

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")]
  const stepCount = steps.length
  const trainIconWidth = 40 // px

  // Helper: get locale prefix from current path
  const getLocalePrefix = () => {
    const match = pathname.match(/^\/([a-zA-Z-]+)\b/)
    return match ? `/${match[1]}` : ""
  }
  const localePrefix = getLocalePrefix()

  // For flex layout, each box is 1/stepCount width
  const boxWidth = `${100 / stepCount}%`

  // Get saved product params from localStorage (only on client)
  let productParams = ""
  if (typeof window !== "undefined" && currentStep > 0) {
    const saved = localStorage.getItem("bahncard-customer-data")
    if (saved) {
      try {
        const obj = JSON.parse(saved)
        // Use "card" and "travelClass" from saved object for params
        if (obj.card && obj.travelClass) {
          productParams = `?travelClass=${encodeURIComponent(obj.travelClass)}&card=${encodeURIComponent(obj.card)}`
        }
      } catch {}
    }
  }

  return (
    <div className="mb-8">
      {/* Numbered progress indicators in flex row */}
      <div className="flex mb-8">
        {steps.map((step, index) => {
          const isClickable = index < currentStep && !disableNavigation
          const route =
            index === 0
              ? `${localePrefix}${stepRoutes[index]}${productParams}`
              : `${localePrefix}${stepRoutes[index]}`
          return (
            <div
              key={step}
              className="flex flex-col items-center"
              style={{ width: boxWidth, minWidth: 32 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors ${
                  index === currentStep
                    ? "bg-red-600 text-white"
                    : index < currentStep
                    ? `bg-green-600 text-white ${isClickable ? "cursor-pointer hover:ring-2 hover:ring-green-400" : "cursor-default"}`
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
                style={{ cursor: isClickable ? "pointer" : "default" }}
                aria-disabled={!isClickable}
                onClick={() => isClickable && router.push(route)}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center whitespace-nowrap">{step}</span>
            </div>
          )
        })}
      </div>
      {/* Progress bar and train icon BELOW the indicators */}
      <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-8">
        {/* Red progress bar */}
        <div
          className="absolute h-full bg-red-600 rounded-full transition-all duration-300"
          style={{
            left: 0,
            width: `calc(${((currentStep + 1) / stepCount) * 100}% - ${50 / stepCount}%)`,
            top: 0,
            zIndex: 1,
          }}
        />
        {/* Train icon */}
        <div
          className="absolute z-30 transition-all duration-300"
          style={{
            left: `calc(${((currentStep + 0.5) / stepCount) * 100}% - 20px)`,
            top: -20,
          }}>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-200 dark:border-slate-700">
            <TramFront className="w-8 h-8 text-red-600 drop-shadow" />
          </div>
        </div>
      </div>
    </div>
  )
}
