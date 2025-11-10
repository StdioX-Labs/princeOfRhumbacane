"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

type HeroImage = {
  src: string
  alt: string
}

export function HeroSection({
  images = [],
  logoSrc = "",
}: {
  images?: HeroImage[]
  logoSrc?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)

  // Default images if none are provided
  const defaultImages: HeroImage[] = [
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Performance",
      alt: "YABA performance",
    },
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Studio",
      alt: "YABA in studio",
    },
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Concert",
      alt: "YABA concert",
    },
  ]

  // Use provided images or fall back to defaults
  const heroImages = images.length > 0 ? images : defaultImages

  // Default logo if none is provided
  const logo = logoSrc || "/placeholder.svg?height=200&width=400&text=YABA+LOGO"

  useEffect(() => {
    setMounted(true)

    // Subtle movement effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return

      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position as percentage of window
      const moveX = (clientX - windowWidth / 2) / windowWidth
      const moveY = (clientY - windowHeight / 2) / windowHeight

      // Apply subtle movement to the image (max 15px in any direction)
      imageRef.current.style.transform = `translate(${moveX * 15}px, ${moveY * 15}px)`
    }

    // Image rotation interval
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(imageInterval)
    }
  }, [heroImages.length])

  // Function to handle smooth scrolling to the shows section
  const scrollToShows = (e: React.MouseEvent) => {
    e.preventDefault()
    const showsSection = document.getElementById("shows")
    if (showsSection) {
      const headerOffset = 80
      const elementPosition = showsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-[#1A2421]">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center text-[#F0FFF0]">
              <div className="relative h-20 w-80 mx-auto">
                {/* Placeholder for logo during SSR */}
                <div className="w-full h-full bg-[#708238]/20 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1A2421]">
      {/* Professional background with parallax effect */}
      <div ref={imageRef} className="absolute inset-0 z-0 transition-transform duration-[3s] ease-out">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              quality={90}
              sizes="100vw"
              className="opacity-30 scale-110 object-cover"
              style={{
                objectPosition: 'center center'
              }}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Sophisticated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2421]/95 via-[#1A2421]/85 to-[#1A2421]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421] via-transparent to-[#1A2421]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(112,130,56,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(157,193,131,0.06),transparent_50%)]" />
      </div>

      {/* Sleek geometric accent lines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Horizontal lines */}
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#708238]/20 to-transparent" />
        <div className="absolute top-[70%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9DC183]/15 to-transparent" />

        {/* Vertical accent lines */}
        <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#708238]/15 to-transparent" />
        <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#9DC183]/10 to-transparent" />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mx-auto max-w-5xl"
          >
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Logo with sophisticated animations */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative h-32 w-72 mx-auto sm:h-40 sm:w-96 md:h-48 md:w-[28rem] lg:h-56 lg:w-[32rem]">
                  {/* Elegant glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-[#9DC183]/15 blur-[60px]"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt="YABA Logo"
                    fill
                    className="object-contain relative z-10 drop-shadow-[0_0_40px_rgba(157,193,131,0.25)]"
                    priority
                  />
                </div>
              </motion.div>

              {/* Elegant separator */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#708238]" />
                <div className="w-1.5 h-1.5 bg-[#9DC183] rotate-45" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#708238]" />
              </motion.div>

              {/* Subtitle with refined typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="space-y-3"
              >
                <p className="text-sm font-light tracking-[0.4em] text-[#9DC183] uppercase md:text-base">
                  Prince Of Rhumbacane
                </p>

              </motion.div>

              {/* CTA Button with enhanced design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                className="pt-8"
              >
                <button
                  onClick={scrollToShows}
                  className="group relative overflow-hidden"
                >
                  {/* Button background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#708238] to-[#708238] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[#9DC183]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

                  {/* Button border */}
                  <div className="relative px-12 py-4 border border-[#708238] group-hover:border-[#9DC183] transition-colors duration-500">
                    <span className="relative z-10 text-[#F0FFF0] text-xs tracking-[0.25em] uppercase font-light flex items-center gap-3">
                      Explore My Work
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Ambient light particles effect */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[10%] w-2 h-2 bg-[#9DC183]/30 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-[#708238]/40 rounded-full blur-sm"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[40%] right-[25%] w-1 h-1 bg-[#9DC183]/20 rounded-full blur-sm"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </section>
  )
}
