import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { getTranslations } from "next-intl/server"

const Footer = async () => {
  const t = await getTranslations("footer")
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("aboutTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("career")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("press")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("sustainability")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("customerServiceTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("helpContact")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("passengerRights")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("accessibility")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("lostFound")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("travelInfoTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("timetableBooking")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("dbNavigatorApp")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("delayInfo")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("railFly")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("legalTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("cookieSettings")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                  {t("imprint")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">{t("facebook")}</span>
              </Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">{t("twitter")}</span>
              </Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">{t("instagram")}</span>
              </Link>
              <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">{t("linkedin")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
