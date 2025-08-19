import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useCdp } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

type LoginModalProps = {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const t = useTranslations("navigation")
  const [email, setEmail] = useState("")
  const { identify } = useCdp()

  if (!open) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("bahncard-username", email)
    identify({ identifier: email, properties: { userId: email } })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 text-slate-500 hover:text-red-600"
          onClick={onClose}
          aria-label="Close">
          <X className="h-6 w-6" />
        </button>
        <div className="flex justify-center mb-6">
          <Image src="/db-logo.svg" alt="Deutsche Bahn Logo" width={57} height={40} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("loginTitle", { default: "Login" })}</h2>
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
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent"
            />
          </div>
          <Button type="submit" className="w-full">
            {t("login")}
          </Button>
        </form>
      </div>
    </div>
  )
}
