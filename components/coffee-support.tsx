"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Star, X, Music } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function CoffeeSupport() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const [showComponent, setShowComponent] = useState(true)

  useEffect(() => {
    if (pathname?.includes("/checkout")) {
      setShowComponent(false)
    } else {
      setShowComponent(true)
    }
  }, [pathname])

  useEffect(() => {
    if (!showComponent) return

    // Show the button after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)

        // Check if the component is in viewport to auto-expand
        if (componentRef.current && !hasAutoOpened) {
          const rect = componentRef.current.getBoundingClientRect()
          const isInViewport =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

          if (isInViewport) {
            setIsExpanded(true)
            setHasAutoOpened(true)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasAutoOpened, showComponent])

  // Auto-expand when first visible
  useEffect(() => {
    if (!showComponent) return
    if (isVisible && !hasAutoOpened) {
      setTimeout(() => {
        setIsExpanded(true)
        setHasAutoOpened(true)
      }, 500)
    }
  }, [isVisible, hasAutoOpened, showComponent])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Handle checkout navigation
  const handleCheckout = (offering: string, amount: string) => {
    try {
      // Create a checkout item
      const checkoutItem = {
        name: offering,
        price: amount.replace("KES ", ""),
        type: "exclusive",
      }

      // Store in session storage for checkout page
      sessionStorage.setItem("exclusiveCheckout", JSON.stringify(checkoutItem))

      // Navigate to checkout
      router.push("/checkout?type=exclusive")
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback: use window.location if router fails
      window.location.href = "/checkout?type=exclusive"
    }
  }

  // Exclusive offerings
  const exclusiveOfferings = [
    {
      id: "exclusive-track",
      name: "Exclusive Track",
      description: "Get an unreleased track",
      amount: "KES 500",
      icon: <Music className="h-4 w-4" />,
    },
    {
      id: "virtual-coffee",
      name: "Virtual Coffee",
      description: "15-min video chat",
      amount: "KES 1,500",
      icon: <Coffee className="h-4 w-4" />,
    },
    {
      id: "vip-experience",
      name: "VIP Experience",
      description: "Next show + meetup",
      amount: "KES 3,000",
      icon: <Star className="h-4 w-4" />,
    },
  ]

  return (
    showComponent && (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={componentRef}
            className="fixed bottom-6 left-6 z-40 touch-manipulation"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Main button */}
              <motion.button
                onClick={toggleExpanded}
                className={`
                bg-gradient-to-r from-rose-900 to-amber-900 text-white rounded-full shadow-xl 
                flex items-center cursor-pointer transition-all duration-300 justify-center
                border border-amber-200/30 backdrop-blur-sm
                min-w-[48px] min-h-[48px]
                ${isExpanded ? "rotate-0" : "hover:rotate-12"}
              `}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={isExpanded ? "Close exclusive offerings" : "View exclusive offerings"}
              >
                {isExpanded ? <X className="h-5 w-5" /> : <Star className="h-5 w-5 text-amber-200" />}
              </motion.button>

              {/* Expanded exclusive offerings */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="absolute bottom-full left-0 mb-4"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-rose-900/50 w-[280px]">
                      {/* Header */}
                      <div className="p-4 text-center border-b border-rose-900/30 bg-gradient-to-r from-rose-900/50 to-amber-900/50">
                        <h3 className="font-bold text-amber-100 text-lg">Exclusive Offerings</h3>
                        <p className="text-xs text-amber-200/80 mt-1">Connect deeper with YABA's music</p>
                      </div>

                      {/* Exclusive offerings */}
                      <div className="p-3">
                        {exclusiveOfferings.map((offering, index) => (
                          <motion.div
                            key={offering.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="mb-3 last:mb-0"
                          >
                            <button
                              onClick={() => handleCheckout(offering.name, offering.amount)}
                              className="w-full text-left p-3 rounded-xl bg-gradient-to-br from-black/60 to-rose-950/30 hover:from-rose-950/40 hover:to-amber-950/40 transition-colors border border-rose-900/20 group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-rose-700 to-amber-700 text-white rounded-full p-2 shadow-md group-hover:from-rose-600 group-hover:to-amber-600 transition-colors">
                                  {offering.icon}
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-white block">{offering.name}</span>
                                  <span className="text-xs text-amber-200/70 block">{offering.description}</span>
                                </div>
                                <span className="text-xs bg-black/40 text-amber-200 px-2.5 py-1.5 rounded-lg font-medium border border-amber-900/30">
                                  {offering.amount}
                                </span>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="p-3 pt-0">
                        <button
                          onClick={() => router.push("/checkout?type=gift")}
                          className="block w-full text-center text-xs text-amber-200/70 hover:text-amber-200 transition-colors py-1"
                        >
                          Send YABA a gift →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  )
}

