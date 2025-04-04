"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the carousel image type
type CarouselImage = {
  id: number
  src: string
  alt?: string
}

// Update the getFilenameFromPath function to better handle various naming formats
function getFilenameFromPath(path: string): string {
  // Check if path is undefined or null
  if (!path) {
    return "Image"
  }

  try {
    // Extract filename from path
    const filename = path.split("/").pop() || ""

    // For placeholder images, extract the text parameter if it exists
    if (filename.includes("placeholder.svg")) {
      const textMatch = path.match(/text=([^&]+)/)
      if (textMatch && textMatch[1]) {
        // URL decode the text parameter
        return decodeURIComponent(textMatch[1]).replace(/\+/g, " ")
      }
    }

    // Remove file extension
    const nameWithoutExtension = filename.split(".")[0] || ""

    // Replace hyphens and underscores with spaces
    const nameWithSpaces = nameWithoutExtension.replace(/[-_]/g, " ")

    // Add spaces between camelCase words
    const withCamelCaseSpaces = nameWithSpaces.replace(/([a-z])([A-Z])/g, "$1 $2")

    // Add spaces between numbers and letters
    const withNumberSpaces = withCamelCaseSpaces.replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2")

    // Capitalize each word
    return withNumberSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim()
  } catch (error) {
    console.error("Error processing image filename:", error)
    return "Image" // Fallback caption
  }
}

// Update the PhotoCarousel component to accept title and description props
export function PhotoCarousel({
  images = [],
  title = "Performance Highlights",
  description = "Capturing the essence of artistic expression through visual moments.",
}: {
  images?: CarouselImage[]
  title?: string
  description?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    if (images.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    if (images.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying && images.length > 0) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current) return
      if (document.activeElement !== carouselRef.current && !carouselRef.current.contains(document.activeElement))
        return

      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        e.preventDefault()
        toggleAutoPlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, toggleAutoPlay])

  if (images.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl text-white">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-white/80 sm:text-xl">{description}</p>
        </div>

        <div
          ref={carouselRef}
          className="relative mt-12 mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl"
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Performance highlights carousel"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => {
              // Use the alt text if provided, otherwise extract from filename
              const caption = image.alt || getFilenameFromPath(image.src)

              return (
                <div key={image.id} className="min-w-full" aria-hidden={currentIndex !== index}>
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <p className="text-lg md:text-xl lg:text-2xl font-medium text-white drop-shadow-md line-clamp-2 sm:line-clamp-none">
                        {caption}
                      </p>
                      <div className="w-12 md:w-16 h-0.5 bg-primary mt-1 md:mt-2" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-6">
            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-black/60 backdrop-blur-sm rounded-full scale-75 sm:scale-100">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    currentIndex === index ? "h-3 w-12 bg-primary" : "h-3 w-3 bg-white/50 hover:bg-white/80",
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              onClick={toggleAutoPlay}
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-transform hover:scale-110"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-transform hover:scale-110"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">Press arrow keys to navigate or space to pause/play</p>
        </div>
      </div>
    </section>
  )
}

