"use client"

import React, { useRef, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useLocale, useTranslations } from "next-intl"
import { de, enAU, Locale } from "date-fns/locale"
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api"
import cards from "@/app/data/cards"

const localeMap: Record<string, Locale> = {
  en: enAU,
  de: de,
}

export default function CustomerDetailsPage() {
  const router = useRouter()
  const t = useTranslations("checkout.customerData")
  const tNav = useTranslations("navigation")
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [address, setAddress] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const appLocale = useLocale()
  const dateFnsLocale = localeMap[appLocale] || enAU

  // Get stored username from localStorage (client-side only)
  const [username, setUsername] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("bahncard-username"))
    }
  }, [])

  // Get query params
  const searchParams = useSearchParams()
  const travelClassParam = searchParams.get("travelClass") as "1st" | "2nd" | null
  const cardParam = searchParams.get("card") || ""

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

  // Load Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  })

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete
    // Bias to Germany, but allow all countries
    autocomplete.setOptions({
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(47.2701, 5.8663), // SW corner of Germany
        new window.google.maps.LatLng(55.0581, 15.0419), // NE corner of Germany
      ),
      strictBounds: false,
      // Do NOT set componentRestrictions if you want to allow all countries
    })
  }

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace()
      if (place && (place.formatted_address || place.name)) {
        setAddress(place.formatted_address || place.name || "")
      }
    }
  }

  // Save all details to localStorage as a single JSON object
  const handleContinue = () => {
    // Validate fields
    const newErrors: { [key: string]: boolean } = {}
    if (!title) newErrors.title = true
    if (!firstName) newErrors.firstName = true
    if (!lastName) newErrors.lastName = true
    if (!address) newErrors.address = true
    if (!dateOfBirth) newErrors.dateOfBirth = true

    setErrors(newErrors)

    // If any errors, do not continue
    if (Object.keys(newErrors).length > 0) return

    const customerData = {
      username,
      title,
      firstName,
      lastName,
      address,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
      travelClass: travelClassParam,
      card: cardParam,
      price,
    }
    localStorage.setItem("bahncard-customer-data", JSON.stringify(customerData))
    router.push(`/checkout/payment?travelClass=${travelClassParam}&card=${cardParam}`)
  }

  // Add this options object
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar currentStep={1} />
          <Card className="p-6">
            {/* Logged In User */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-2">{tNav("loggedInAs", { default: "Logged in as" })}</Label>
              <div className="mt-3 text-slate-600 dark:text-slate-400 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {username || tNav("notLoggedIn", { default: "Not logged in" })}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="title">{t("title")}</Label>
                <Select value={title} onValueChange={setTitle}>
                  <SelectTrigger className={errors.title ? "border-red-500" : ""}>
                    <SelectValue placeholder={t("selectTitle")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">{t("mr")}</SelectItem>
                    <SelectItem value="Mrs">{t("mrs")}</SelectItem>
                    <SelectItem value="Ms">{t("ms")}</SelectItem>
                    <SelectItem value="dr">{t("dr")}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.title && <span className="text-red-500 text-xs">{t("requiredField")}</span>}
              </div>

              <div>
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  placeholder={t("firstNamePlaceholder")}
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <span className="text-red-500 text-xs">{t("requiredField")}</span>}
              </div>

              <div>
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  placeholder={t("lastNamePlaceholder")}
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <span className="text-red-500 text-xs">{t("requiredField")}</span>}
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <Label>{t("address")}</Label>
              <div className="mt-1">
                {isLoaded ? (
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <Input
                      type="text"
                      placeholder={t("addressPlaceholder")}
                      className={`w-full ${errors.address ? "border-red-500" : ""}`}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </Autocomplete>
                ) : (
                  <Input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder={t("addressPlaceholder")}
                    className={`w-full ${errors.address ? "border-red-500" : ""}`}
                  />
                )}
                {errors.address && <span className="text-red-500 text-xs">{t("requiredField")}</span>}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-6">
              <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
              <Input
                id="dateOfBirth"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : ""}
                onChange={e => setDateOfBirth(e.target.value ? new Date(e.target.value) : undefined)}
                placeholder={t("dateOfBirthPlaceholder")}
                className={`w-full ${errors.dateOfBirth ? "border-red-500" : ""}`}
              />
              {errors.dateOfBirth && <span className="text-red-500 text-xs">{t("requiredField")}</span>}
            </div>

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
                {tNav("back")}
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleContinue}>
                {tNav("continue")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
