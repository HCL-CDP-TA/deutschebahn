"use client"

import React, { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { useLocale, useTranslations } from "next-intl"
import { de, enAU, Locale } from "date-fns/locale"
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api"
import cards from "@/app/data/cards"
import type { CheckoutData } from "@/app/types/checkout"
import { CdpPageEvent, useCdp } from "hclcdp-web-sdk-react"

const localeMap: Record<string, Locale> = {
  en: enAU,
  de: de,
}

export default function CustomerDetailsPage() {
  const router = useRouter()
  const { track } = useCdp()
  const t = useTranslations("checkout.customerData")
  const tNav = useTranslations("navigation")
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [address, setAddress] = useState<string>("")
  // State for the selected title value (e.g. "mr", "mrs", etc.)
  const [title, setTitle] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  const [cardParam, setCardParam] = useState<string>("")
  const [travelClassParam, setTravelClassParam] = useState<"1st" | "2nd" | null>(null)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [username, setUsername] = useState<string | null>(null)
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
  const [addressSelected, setAddressSelected] = useState(false)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const appLocale = useLocale()
  const dateFnsLocale = localeMap[appLocale] || enAU

  // Prefill all fields from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bahncard-customer-data")
      if (stored) {
        try {
          const data: CheckoutData = JSON.parse(stored)
          setCheckoutData(data)
          if (data.card) setCardParam(data.card)
          if (data.travelClass) setTravelClassParam(data.travelClass as "1st" | "2nd")
          if (data.price) setPrice(data.price)
          if (data.startDate) setStartDate(new Date(data.startDate))
          if (data.title) setTitle(data.title)
          if (data.firstName) setFirstName(data.firstName)
          if (data.lastName) setLastName(data.lastName)
          if (data.address) {
            setAddress(data.address)
            setAddressSelected(true)
          }
          if (data.dateOfBirth) setDateOfBirth(new Date(data.dateOfBirth))
        } catch {}
      }
      setUsername(localStorage.getItem("bahncard-username"))
    }
  }, [])

  // Load Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  })

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete
    autocomplete.setOptions({
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(47.2701, 5.8663),
        new window.google.maps.LatLng(55.0581, 15.0419),
      ),
      strictBounds: false,
    })
  }

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace()
      if (place && (place.formatted_address || place.name)) {
        setAddress(place.formatted_address || place.name || "")
        setAddressSelected(true)
      }
    }
  }

  // Reset addressSelected if user types in the field
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    setAddressSelected(false)
  }

  // When saving, merge with existing product data
  const handleContinue = () => {
    // Validate fields
    const newErrors: { [key: string]: boolean } = {}
    if (!title) newErrors.title = true
    if (!firstName) newErrors.firstName = true
    if (!lastName) newErrors.lastName = true
    if (!address) newErrors.address = true
    if (!dateOfBirth) newErrors.dateOfBirth = true
    if (!addressSelected) newErrors.address = true

    setErrors(newErrors)

    // If any errors, do not continue
    if (Object.keys(newErrors).length > 0) return

    // Save the localised label
    const selectedTitleLabel = titleOptions.find(opt => opt.value === title)?.label || ""

    // Build new CheckoutData object
    const newCheckoutData: CheckoutData = {
      card: cardParam,
      travelClass: travelClassParam || "",
      price: price || 0,
      startDate: startDate ? startDate.toISOString() : "",
      title,
      firstName,
      lastName,
      address,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : "",
    }
    localStorage.setItem("bahncard-customer-data", JSON.stringify(newCheckoutData))
    setCheckoutData(newCheckoutData)

    track({
      identifier: "customer_data",
      properties: { title: t(title), firstName, lastName, address, dateOfBirth: dateOfBirth.toISOString() },
    })

    router.push("/checkout/payment")
  }

  // Add this handleBack function:
  const handleBack = () => {
    // Get latest card and travelClass from localStorage (or state if you prefer)
    let card = cardParam
    let travelClass = travelClassParam
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bahncard-customer-data")
      if (stored) {
        try {
          const data: CheckoutData = JSON.parse(stored)
          if (data.card) card = data.card
          if (data.travelClass) travelClass = data.travelClass as "1st" | "2nd"
        } catch {}
      }
    }
    // Build params string if both are present
    let params = ""
    if (card && travelClass) {
      params = `?travelClass=${encodeURIComponent(travelClass)}&card=${encodeURIComponent(card)}`
    }
    // Go back to configuration page with params
    router.push(`/checkout/configuration${params}`)
  }

  const titleOptions = [
    { value: "mr", label: t("mr") },
    { value: "mrs", label: t("mrs") },
    ...(appLocale === "en" ? [{ value: "ms", label: t("ms") }] : []),
    { value: "dr", label: t("dr") },
  ]

  // Add this options object
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <CdpPageEvent pageName={"Checkout - Customer Data"} />
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
                    {titleOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.title && <span className="text-red-500 text-xs">{tNav("requiredField")}</span>}
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
                {errors.firstName && <span className="text-red-500 text-xs">{tNav("requiredField")}</span>}
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
                {errors.lastName && <span className="text-red-500 text-xs">{tNav("requiredField")}</span>}
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
                      onChange={handleAddressChange}
                    />
                  </Autocomplete>
                ) : (
                  <Input
                    value={address}
                    onChange={handleAddressChange}
                    placeholder={t("addressPlaceholder")}
                    className={`w-full ${errors.address ? "border-red-500" : ""}`}
                  />
                )}
                {errors.address && <span className="text-red-500 text-xs">{tNav("requiredField")}</span>}
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
              {errors.dateOfBirth && <span className="text-red-500 text-xs">{tNav("requiredField")}</span>}
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
              <Button variant="outline" className="flex-1" onClick={handleBack}>
                {tNav("back")}
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleContinue}
                disabled={!addressSelected}>
                {tNav("continue")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
