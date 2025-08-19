"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Button } from "../ui/button"
import cards from "@/app/data/cards"
import Link from "next/link"
import { useCdp } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

type BahnCardFeature = {
  feature: string
  tooltip?: string
}

const BahnCardComparison = () => {
  const t = useTranslations("bahncard.comparison")
  const tCard = useTranslations("bahncard.comparison.card")
  const tTable = useTranslations("bahncard.comparison.table")

  const features: BahnCardFeature[] = [
    {
      feature: tTable("flexpreis"),
      tooltip: tTable("flexpreisTooltip"),
    },
    {
      feature: tTable("sparpreis"),
      tooltip: tTable("sparpreisTooltip"),
    },
  ]

  const [travelClass, setTravelClass] = useState<"2nd" | "1st">("2nd")

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t("headline")}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">{t("subline")}</p>
        </div>

        <Tabs
          defaultValue="2nd"
          className="max-w-5xl mx-auto"
          onValueChange={value => setTravelClass(value as "2nd" | "1st")}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="1st">{t("firstClass")}</TabsTrigger>
              <TabsTrigger value="2nd">{t("secondClass")}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="2nd" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {cards.secondClass.map((card, index) => {
                const cardKey = Object.keys(card)[0] as keyof (typeof cards.secondClass)[0]
                const cardData = card[cardKey]

                if (!cardData) return null

                return (
                  <CardOption
                    key={index}
                    title={cardData.title}
                    subTitle={cardData?.subtitle}
                    price={cardData.price.toFixed(2)}
                    flexiDiscount={cardData.flexiDiscount}
                    saverDiscount={cardData?.saverDiscount}
                    color={
                      cardKey.startsWith("bahnCard25")
                        ? "bg-gradient-to-br from-amber-500 to-amber-600"
                        : cardKey.startsWith("bahnCard50")
                        ? "bg-gradient-to-br from-red-600 to-red-700"
                        : "bg-gradient-to-br from-slate-800 to-black"
                    }
                    travelClass="2nd"
                    tCard={tCard}
                  />
                )
              })}
            </div>

            <ComparisonTable travelClass="2nd" features={features} tTable={tTable} />
          </TabsContent>

          <TabsContent value="1st" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {cards.firstClass.map((card, index) => {
                const cardKey = Object.keys(card)[0] as keyof (typeof cards.secondClass)[0]
                const cardData = card[cardKey]

                if (!cardData) return null

                return (
                  <CardOption
                    key={index}
                    title={cardData.title}
                    subTitle={cardData?.subtitle}
                    price={cardData.price.toFixed(2)}
                    flexiDiscount={cardData.flexiDiscount}
                    saverDiscount={cardData?.saverDiscount}
                    color={
                      cardKey.startsWith("bahnCard25")
                        ? "bg-gradient-to-br from-amber-500 to-amber-600"
                        : cardKey.startsWith("bahnCard50")
                        ? "bg-gradient-to-br from-red-600 to-red-700"
                        : "bg-gradient-to-br from-slate-800 to-black"
                    }
                    travelClass="1st"
                    tCard={tCard}
                  />
                )
              })}
            </div>

            <ComparisonTable travelClass="1st" features={features} tTable={tTable} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

interface CardOptionProps {
  title: string
  subTitle: string
  price: string
  flexiDiscount: string
  saverDiscount: string
  color: string
  travelClass: "1st" | "2nd"
  hasUnlimitedTravel?: boolean
  tCard: ReturnType<typeof useTranslations>
}

const CardOption = ({
  title,
  subTitle,
  price,
  flexiDiscount,
  saverDiscount,
  color,
  travelClass,
  hasUnlimitedTravel,
  tCard,
}: CardOptionProps) => {
  const { track } = useCdp()
  const recommended = false
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105",
        recommended ? "ring-2 ring-red-600 dark:ring-red-500 relative" : "",
      )}>
      {recommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-b-lg font-medium text-sm">
          {tCard("recommended")}
        </div>
      )}

      <div className={`${color} text-white p-4 relative`}>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            {travelClass === "2nd" ? tCard("secondClass") : tCard("firstClass")}
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-2 mt-7">{tCard(title)}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">€{price}</span>
        </div>
        <div className="mt-4 inline-block text-sm h-32">{tCard(subTitle)}</div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-4">
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm">{travelClass === "1st" ? tCard("firstClass") : tCard("secondClass")}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm">
              {flexiDiscount} {tCard("offFlexpreis")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm">
              {saverDiscount} {tCard("offSparpreis")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm">{tCard("digitalbahncard")}</span>
          </li>
          {/* <li className="flex items-start gap-2">
            {title.indexOf("trial") < 0 ? (
              <X className="h-5 w-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
            ) : (
              <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            )}
            <span className="text-sm">{tCard("trial")}</span>
          </li> */}
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm">
              {title.indexOf("trial") < 0 ? tCard("validFor3Months") : tCard("validForYear")}
            </span>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            onClick={() =>
              track({
                identifier: "select_BahnCard",
                properties: { card: tCard(title), class: travelClass, price },
              })
            }
            href={`/checkout/configuration?travelClass=${travelClass}&card=${title}`}>
            <Button className="w-full">{tCard("select", { card: tCard(title) })}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ComparisonTable = ({
  travelClass,
  features,
  tTable,
}: {
  travelClass: "1st" | "2nd"
  features: BahnCardFeature[]
  tTable: ReturnType<typeof useTranslations>
}) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left bg-slate-100 dark:bg-slate-800 font-semibold text-sm rounded-tl-lg">
              {tTable("features")}
            </th>
            <th className="text-white px-6 py-3 text-center bg-amber-500 dark:bg-amber-950 font-semibold text-sm">
              {tTable("bc25")}
            </th>
            <th className="text-white px-6 py-3 text-center bg-red-600 dark:bg-red-950 font-semibold text-sm">
              {tTable("bc50")}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-slate-200 dark:border-slate-800">
              <td className="px-4 py-4 text-sm">
                {feature.feature}
                {feature.tooltip && (
                  <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({feature.tooltip})</span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-semibold">{index === 0 ? "50%" : "25%"}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-semibold">25%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BahnCardComparison
