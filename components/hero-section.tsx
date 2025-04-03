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
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center text-white">
              <div className="relative h-20 w-80 mx-auto">
                {/* Placeholder for logo during SSR */}
                <div className="w-full h-full bg-white/10 animate-pulse rounded-md"></div>
              </div>
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
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover opacity-60"
              priority={index === 0}
            />
          </div>
        ))}

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
                {/* Logo image instead of SVG text */}
                <div className="relative h-40 w-80 mx-auto sm:h-48 sm:w-96 md:h-56 md:w-[32rem]">
                  <Image src={logo || "/placeholder.svg"} alt="YABA Logo" fill className="object-contain" priority />
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
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-none px-8 py-6 text-sm tracking-widest uppercase"
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

