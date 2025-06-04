"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, UserRound, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslations } from "next-intl"
import LoginModal from "./LoginModal"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const t = useTranslations("navigation")

  useEffect(() => {
    setUsername(localStorage.getItem("bahncard-username"))
  }, [showLogin])

  const handleLogout = () => {
    localStorage.removeItem("bahncard-username")
    setUsername(null)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}>
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 text-red-600 dark:text-red-500 font-bold text-xl">
                <Image src="/db-logo.svg" alt="Deutsche Bahn Logo" width={57} height={40} />
              </Link>
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/bahncard" className="text-sm font-medium hover:text-red-600 dark:hover:text-red-500">
                  {t("bahncard")}
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-red-600 dark:hover:text-red-500">
                  {t("tickets")}
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-red-600 dark:hover:text-red-500">
                  {t("travelInfo")}
                </Link>
                <Link href="#" className="text-sm font-medium hover:text-red-600 dark:hover:text-red-500">
                  {t("helpContact")}
                </Link>
              </nav>
            </div>

            {/* Right: Language, Mode, Login, Mobile Menu */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ModeToggle />
              <div className="hidden md:flex flex-1 justify-center">
                {username ? (
                  <Button variant="default" className="w-auto flex items-center" onClick={handleLogout}>
                    {t("logout")} ({username})
                  </Button>
                ) : (
                  <Button variant="default" className="w-auto flex items-center" onClick={() => setShowLogin(true)}>
                    <UserRound size={32} className="pr-2" /> {t("login")}
                  </Button>
                )}
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 p-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}>
                {t("tickets")}
              </Link>
              <Link
                href="/bahncard"
                className="text-sm font-medium p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}>
                {t("bahncard")}
              </Link>
              <Link
                href="/travel-info"
                className="text-sm font-medium p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}>
                {t("travelInfo")}
              </Link>
              <Link
                href="/help-contact"
                className="text-sm font-medium p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}>
                {t("helpContact")}
              </Link>
              <Button
                variant="default"
                className="mt-4 w-full"
                onClick={() => {
                  setShowLogin(true)
                  setIsMenuOpen(false)
                }}>
                <UserRound size={32} className="pr-2" /> {t("login")}
              </Button>
            </nav>
          </div>
        )}
      </header>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}

export default Header
