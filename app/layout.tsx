import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { getTranslations } from "next-intl/server"
import { CdpClientWrapper, HclCdpConfig } from "@hcl-cdp-ta/hclcdp-web-sdk-react"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata")
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
    },
  }
}

const config: HclCdpConfig = {
  writeKey: process.env.NEXT_PUBLIC_HCLCDP_WRITE_KEY || "",
  inactivityTimeout: 1,
  enableSessionLogging: false,
  enableUserLogoutLogging: false,
  cdpEndpoint: "https://pl.dev.hxcd.now.hclsoftware.cloud",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="font-DBScreenSans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CdpClientWrapper config={config}>{children}</CdpClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
