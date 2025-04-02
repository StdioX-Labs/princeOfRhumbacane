import type React from "react"
import "@/app/globals.css"
import { Playfair_Display } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { ArtisticCursor } from "@/components/artistic-cursor"
import { CoffeeSupport } from "@/components/coffee-support"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "YABA | Prince Of Rhumbacane",
  description: "Official website of YABA, showcasing upcoming shows, social media updates, and booking information.",
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
          <CartProvider>
            {children}
            <CartSidebar />
            <Toaster />
            <ArtisticCursor />
            <CoffeeSupport />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'