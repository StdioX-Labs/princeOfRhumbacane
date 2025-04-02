"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ExclusiveCheckout } from "@/components/exclusive-checkout"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const checkoutType = searchParams.get("type")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    try {
      setIsClient(true)
    } catch (error) {
      console.error("Error in checkout page:", error)
    }
  }, [])

  const handleClose = () => {
    try {
      window.history.back()
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to homepage if history navigation fails
      window.location.href = "/"
    }
  }

  return (
    <div className="flex min-h-screen flex-col checkout-page">
      <SiteHeader />
      <main className="flex-1">
        <section className="pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20">
          <div className="container">
            {!isClient ? (
              <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">Checkout</h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">Loading checkout...</p>
              </div>
            ) : (
              <>
                {checkoutType === "exclusive" || checkoutType === "gift" ? (
                  <ExclusiveCheckout type={checkoutType as "exclusive" | "gift"} onClose={handleClose} />
                ) : (
                  <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                      Checkout
                    </h1>
                    <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                      Complete your purchase securely
                    </p>

                    <div className="mx-auto mt-12 max-w-3xl">
                      <div className="text-center p-12 border rounded-lg">
                        <p className="text-lg text-muted-foreground">Please select an item to purchase first.</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

