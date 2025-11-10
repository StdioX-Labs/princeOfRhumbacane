import type React from "react"
import "@/app/globals.css"
import { Playfair_Display } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ArtisticCursor } from "@/components/artistic-cursor"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "YABA – Prince Of Rhumbacane",
  description: "Official website of YABA, the Prince of Rhumbacane. Discover his music and the latest EP 'Wape Wape'.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} min-h-screen font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Toaster />
          <ArtisticCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}

