"use client"

import { useState, useEffect } from "react"
import ProgressBar from "@/app/[locale]/checkout/ProgressBar"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { CdpPageEvent, useCdp } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

export default function CustomerDataPage() {
  const t = useTranslations("navigation")
  const router = useRouter()
  const { identify, logout } = useCdp()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("bahncard-username") : null,
  )

  // Redirect if already logged in
  useEffect(() => {
    if (username) {
      const params = searchParams.toString()
      router.replace(`/checkout/customer-data${params ? `?${params}` : ""}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    identify({ identifier: email, properties: { userId: email } })
    localStorage.setItem("bahncard-username", email)
    window.dispatchEvent(new Event("bahncard-login"))
    setUsername(email)
  }

  const handleLogout = () => {
    localStorage.removeItem("bahncard-username")
    setUsername(null)
    logout()
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <CdpPageEvent pageName={"Checkout - Login"} />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar - step 1 is the second step (0-based index) */}
          <ProgressBar currentStep={1} />

          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 w-full relative mt-8">
            <div className="flex justify-center mb-6">
              <Image src="/db-logo.svg" alt="Deutsche Bahn Logo" width={57} height={40} />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">{t("loginTitle", { default: "Login" })}</h2>
            {username ? (
              <div className="text-center space-y-6">
                <div>
                  <div className="font-semibold mb-2">{t("loggedInAs", { default: "Logged in as" })}</div>
                  <div className="text-lg">{username}</div>
                </div>
                <Button className="w-full" onClick={handleLogout}>
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    {t("email", { default: "Email" })}
                  </label>
                  <input
                    id="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="password">
                    {t("password", { default: "Password" })}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("login")}
                </Button>
              </form>
            )}
            <Button variant="outline" className="w-full mt-8" onClick={() => router.back()}>
              {t("back", { default: "Back" })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
