"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// Add a check for the checkout page path
// Import usePathname at the top of the file
import { usePathname } from "next/navigation"

export function ArtisticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMouseOnPage, setIsMouseOnPage] = useState(false)
  const [isMobile, setIsMobile] = useState(false) // Add isMobile state
  const pathname = usePathname()
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const checkIsMobile = () => {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.matchMedia("(max-width: 768px)").matches
    }

    setIsMobile(checkIsMobile())
  }, [])

  useEffect(() => {
    if (pathname?.includes("/checkout")) {
      setShouldRender(false)
      return
    }
    setShouldRender(true)
  }, [pathname])

  useEffect(() => {
    if (!shouldRender) return

    // Only show cursor after a short delay to prevent initial animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)

      if (hoveredElement) {
        // Check if the element or its parents have cursor:pointer
        let element = hoveredElement as HTMLElement
        let isPointerCursor = false

        while (element && element !== document.body) {
          const cursorStyle = window.getComputedStyle(element).cursor
          if (cursorStyle === "pointer") {
            isPointerCursor = true
            break
          }
          element = element.parentElement as HTMLElement
        }

        setIsPointer(isPointerCursor)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track when mouse enters or leaves the page
    const handleMouseEnter = () => setIsMouseOnPage(true)
    const handleMouseLeave = () => setIsMouseOnPage(false)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousemove", updateCursorType)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Force cursor to be visible on mouse movement
    const forceVisibility = () => {
      setIsVisible(true)
      setIsMouseOnPage(true)
    }

    window.addEventListener("mousemove", forceVisibility)

    // Hide default cursor
    document.documentElement.style.cursor = "none"

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousemove", updateCursorType)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousemove", forceVisibility)

      // Restore default cursor
      document.documentElement.style.cursor = ""
    }
  }, [mousePosition.x, mousePosition.y, shouldRender])

  // Don't render on mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsVisible(false)
      document.documentElement.style.cursor = ""
    }
  }, [isMobile])

  if (!isVisible || !isMouseOnPage || isMobile || !shouldRender) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isClicking ? 0.9 : 1,
      }}
      transition={{
        type: "spring",
        mass: 0.1, // Reduced mass for faster movement
        stiffness: 200, // Increased stiffness for faster movement
        damping: 10, // Reduced damping for faster movement
        velocity: 5, // Added initial velocity for faster response
      }}
      style={{
        translateX: "-8px",
        translateY: "-3px",
      }}
    >
      {/* Custom arrow cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
        }}
      >
        {/* Arrow shape with white fill and primary color outline */}
        <path
          d="M2.5 2L10 18L13 11L20 8L2.5 2Z"
          fill="white"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

