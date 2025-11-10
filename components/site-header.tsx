"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const router = useRouter()


  useEffect(() => {
    // Handle scroll events
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Find the active section based on scroll position
      const sections = ["about", "music"]
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-[#1A2421]/95 backdrop-blur-md border-b border-[#708238]/20 shadow-2xl shadow-[#708238]/10" 
          : "bg-transparent border-b border-white/5"
      }`}
    >
      {/* Elegant decorative top line */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9DC183]/50 to-transparent transition-opacity duration-500 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`} />

      <div className="container flex h-20 items-center justify-between">
        {/* Artistic Logo */}
        <button
          onClick={navigateHome}
          className="group flex items-center space-x-3 focus:outline-none relative"
        >
          <div className="absolute -inset-2 bg-[#708238]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          <span className="relative font-serif text-3xl font-bold tracking-tight text-[#F0FFF0] group-hover:text-[#9DC183] transition-colors duration-300">
            YABA
          </span>

        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={navigateHome}
            className={`relative px-4 py-2 text-sm font-light tracking-wider transition-all duration-300 group ${
              pathname === "/" && !activeSection ? "text-[#9DC183]" : "text-[#F0FFF0]/70 hover:text-[#F0FFF0]"
            }`}
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-[#708238]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#9DC183] transition-all duration-300 ${
              pathname === "/" && !activeSection ? "w-1/2" : "w-0 group-hover:w-1/2"
            }`} />
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`relative px-4 py-2 text-sm font-light tracking-wider transition-all duration-300 group ${
              activeSection === "about" ? "text-[#9DC183]" : "text-[#F0FFF0]/70 hover:text-[#F0FFF0]"
            }`}
          >
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-[#708238]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#9DC183] transition-all duration-300 ${
              activeSection === "about" ? "w-1/2" : "w-0 group-hover:w-1/2"
            }`} />
          </button>
          <button
            onClick={() => scrollToSection("music")}
            className={`relative px-4 py-2 text-sm font-light tracking-wider transition-all duration-300 group ${
              activeSection === "music" ? "text-[#9DC183]" : "text-[#F0FFF0]/70 hover:text-[#F0FFF0]"
            }`}
          >
            <span className="relative z-10">Music</span>
            <div className="absolute inset-0 bg-[#708238]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#9DC183] transition-all duration-300 ${
              activeSection === "music" ? "w-1/2" : "w-0 group-hover:w-1/2"
            }`} />
          </button>
          <Link
            href="/contact"
            className={`relative px-4 py-2 text-sm font-light tracking-wider transition-all duration-300 group ${
              pathname === "/contact" ? "text-[#9DC183]" : "text-[#F0FFF0]/70 hover:text-[#F0FFF0]"
            }`}
          >
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-[#708238]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded" />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#9DC183] transition-all duration-300 ${
              pathname === "/contact" ? "w-1/2" : "w-0 group-hover:w-1/2"
            }`} />
          </Link>

          {/* Decorative separator */}
          <div className="h-6 w-[1px] bg-[#708238]/30 mx-2" />

          {/* CTA Button */}
          <Button
            asChild
            className="ml-2 bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] border-none shadow-lg shadow-[#708238]/30 hover:shadow-[#9DC183]/40 transition-all duration-300 rounded-full px-6"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-[#F0FFF0] hover:text-[#9DC183] hover:bg-[#708238]/10">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#1A2421] border-l border-[#708238]/30">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={(e) => {
                    navigateHome(e)
                    setIsMenuOpen(false)
                  }}
                  className={`text-lg font-light tracking-wider transition-colors hover:text-[#9DC183] text-left py-3 px-4 rounded ${
                    pathname === "/" && !activeSection ? "text-[#9DC183] bg-[#708238]/10" : "text-[#F0FFF0]"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`text-lg font-light tracking-wider transition-colors hover:text-[#9DC183] text-left py-3 px-4 rounded ${
                    activeSection === "about" ? "text-[#9DC183] bg-[#708238]/10" : "text-[#F0FFF0]"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("music")}
                  className={`text-lg font-light tracking-wider transition-colors hover:text-[#9DC183] text-left py-3 px-4 rounded ${
                    activeSection === "music" ? "text-[#9DC183] bg-[#708238]/10" : "text-[#F0FFF0]"
                  }`}
                >
                  Music
                </button>
                <Link
                  href="/contact"
                  className={`text-lg font-light tracking-wider transition-colors hover:text-[#9DC183] py-3 px-4 rounded ${
                    pathname === "/contact" ? "text-[#9DC183] bg-[#708238]/10" : "text-[#F0FFF0]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Button asChild className="mt-4 bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] border-none shadow-lg">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Get in Touch
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

