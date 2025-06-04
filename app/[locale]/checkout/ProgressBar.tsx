"use client"
import { useTranslations } from "next-intl"

type ProgressBarProps = {
  currentStep: number
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const t = useTranslations("checkout.progressbar")

  const steps = [t("step1"), t("step2"), t("step3"), t("step4")]
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                index === currentStep
                  ? "bg-red-600 text-white"
                  : index < currentStep
                  ? "bg-green-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              }`}>
              {index + 1}
            </div>
            <span className="text-xs text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
        <div
          className="absolute h-full bg-red-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
