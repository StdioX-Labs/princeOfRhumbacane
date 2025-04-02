"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"

// Client-side only cart button component
function ClientSideCartButton() {
  const { cartCount, toggleCart } = useCart()

  return (
    <Button variant="outline" size="icon" className="relative" onClick={toggleCart} aria-label="Shopping cart">
      <ShoppingBag className="h-5 w-5" />
      {cartCount > 0 && (
        <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0">
          {cartCount}
        </Badge>
      )}
    </Button>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Only access the cart context after component has mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Find the active section based on scroll position
      const sections = ["shows", "gallery", "merchandise", "about"]
      let currentSection = ""

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section is in view (with some buffer for the header)
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHomePage = pathname === "/"

  // Function to handle home navigation
  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault()

    try {
      if (isHomePage) {
        // If already on home page, scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      } else {
        // Navigate to home page
        router.push("/")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      // Fallback to direct navigation
      window.location.href = "/"
    }
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    try {
      // If not on home page, navigate to home page with hash
      if (!isHomePage) {
        // Use router.push instead of window.location to prevent full page reload
        router.push(`/#${sectionId}`)
        return
      }

      // If on home page, scroll to section
      const section = document.getElementById(sectionId)
      if (section) {
        // Smooth scroll to section with offset for header
        const headerOffset = 80
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    } catch (error) {
      console.error("Scroll error:", error)
      // Fallback to direct navigation with hash
      if (!isHomePage) {
        window.location.href = `/#${sectionId}`
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <button onClick={navigateHome} className="flex items-center space-x-2 focus:outline-none">
          <span className="font-serif text-2xl font-bold tracking-tight">YABA</span>
        </button>
        <nav className="hidden md:flex gap-6">
          <button
            onClick={navigateHome}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" && !activeSection ? "text-primary" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("shows")}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "shows" ? "text-primary" : ""
            }`}
          >
            Shows
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "gallery" ? "text-primary" : ""
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection("merchandise")}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "merchandise" ? "text-primary" : ""
            }`}
          >
            Merchandise
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === "about" ? "text-primary" : ""
            }`}
          >
            About
          </button>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/contact" ? "text-primary" : ""
            }`}
          >
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {isMounted ? (
            <ClientSideCartButton />
          ) : (
            <Button variant="outline" size="icon" className="relative" aria-label="Shopping cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          )}
          <Button asChild variant="ghost">
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          {isMounted ? (
            <ClientSideCartButton />
          ) : (
            <Button variant="outline" size="icon" className="relative" aria-label="Shopping cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          )}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={(e) => {
                    navigateHome(e)
                    setIsMenuOpen(false)
                  }}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    pathname === "/" && !activeSection ? "text-primary" : ""
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("shows")}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    activeSection === "shows" ? "text-primary" : ""
                  }`}
                >
                  Shows
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    activeSection === "gallery" ? "text-primary" : ""
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection("merchandise")}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    activeSection === "merchandise" ? "text-primary" : ""
                  }`}
                >
                  Merchandise
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                    activeSection === "about" ? "text-primary" : ""
                  }`}
                >
                  About
                </button>
                <Link
                  href="/contact"
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/contact" ? "text-primary" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Button asChild className="mt-4">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

