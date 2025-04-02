"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

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

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">YABA</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Artistic background with subtle movement on mouse position */}
      <div ref={imageRef} className="absolute inset-0 z-0 transition-transform duration-[3s]">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="YABA"
          fill
          quality={100}
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />

        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Artistic frame element */}
      <div className="absolute inset-x-4 inset-y-4 border border-white/10 z-10 pointer-events-none md:inset-x-8 md:inset-y-8 lg:inset-x-16 lg:inset-y-16" />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="overflow-hidden"
              >
                {/* Temporary logo for YABA */}
                <div className="relative h-40 w-80 mx-auto sm:h-48 sm:w-96 md:h-56 md:w-[32rem]">
                  <svg viewBox="0 0 400 150" className="w-full h-full">
                    <defs>
                      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                      </linearGradient>
                    </defs>
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="url(#logoGradient)"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "120px",
                        fontWeight: "200",
                        letterSpacing: "0.15em",
                      }}
                    >
                      YABA
                    </text>
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-6 h-[1px] w-24 bg-white/30"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-6 text-lg font-light tracking-widest text-white/70 uppercase"
              >
                Prince Of Rhumbacane
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-16"
              >
                <Button
                  onClick={scrollToShows}
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-none px-8 py-6 text-sm tracking-widest uppercase"
                >
                  Discover
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          className="h-12 w-[1px] bg-white/30 mx-auto"
        />
      </motion.div>
    </section>
  )
}

