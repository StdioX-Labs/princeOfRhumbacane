"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Instagram, Facebook, Youtube, Music, XIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialMediaBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  useEffect(() => {
    const handleScroll = () => {
      // Show the banner after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "#",
      color: "from-purple-500 via-pink-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
      hoverBg: "bg-gradient-to-r from-purple-600 to-pink-600",
      hoverText: "text-white",
      followers: "25K",
      handle: "@yaba_official",
    },
    {
      name: "TikTok",
      icon: <Music className="h-5 w-5" />,
      url: "#",
      color: "from-black via-gray-800 to-gray-700",
      bgColor: "bg-gradient-to-br from-black via-gray-800 to-gray-700",
      hoverBg: "bg-black",
      hoverText: "text-white",
      followers: "42K",
      handle: "@yaba_official",
    },
    {
      name: "X",
      icon: <XIcon className="h-5 w-5" />,
      url: "#",
      color: "from-gray-900 via-gray-800 to-gray-700",
      bgColor: "bg-black",
      hoverBg: "bg-gray-800",
      hoverText: "text-white",
      followers: "18K",
      handle: "@yaba_official",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "#",
      color: "from-blue-600 via-blue-500 to-blue-400",
      bgColor: "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400",
      hoverBg: "bg-blue-600",
      hoverText: "text-white",
      followers: "30K",
      handle: "YABA Official",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "#",
      color: "from-red-600 via-red-500 to-red-400",
      bgColor: "bg-gradient-to-br from-red-600 via-red-500 to-red-400",
      hoverBg: "bg-red-600",
      hoverText: "text-white",
      followers: "15K",
      handle: "YABA Music",
    },
  ]

  // Toggle the expanded state of the floating social button
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="social-media" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background with subtle animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,0,0,0.1)_0%,transparent_60%)]"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Connect With YABA
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Join our growing community and stay updated with exclusive content, behind-the-scenes moments, and upcoming
            performances.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="group"
            >
              <Link href={social.url} className="block h-full">
                <div className="h-full rounded-2xl overflow-hidden relative shadow-lg">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 ${social.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-white/30 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col items-center gap-4">
                    <motion.div
                      className={`rounded-full p-4 bg-gradient-to-br ${social.color} text-white shadow-md`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {social.icon}
                    </motion.div>

                    <div className="text-center">
                      <h3 className="text-xl font-bold">{social.name}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {social.handle}
                      </p>
                      <div className="mt-3 flex items-center justify-center">
                        <motion.p
                          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {social.followers}
                        </motion.p>
                        <span className="ml-2 text-xs text-muted-foreground">followers</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`mt-2 border-0 bg-gradient-to-r ${social.color} text-white hover:text-white hover:opacity-90 transition-all duration-300 shadow-md`}
                    >
                      <span>Follow</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-md p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Latest Music Video</h3>
            <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src="/placeholder.svg?height=480&width=854&text=Music+Video"
                alt="Latest Music Video"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="rounded-full bg-primary/80 backdrop-blur-sm p-5 cursor-pointer hover:bg-primary transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </motion.div>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground text-lg">Watch "Rhumbacane Dreams" - Official Music Video</p>
          </div>
        </motion.div>
      </div>

      {/* Improved floating social media button with professional popup */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 touch-manipulation"
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
                  ${isExpanded ? "bg-black" : "bg-primary"} 
                  text-white rounded-full shadow-xl flex items-center cursor-pointer 
                  transition-all duration-300 justify-center
                  border-2 border-white
                  md:min-w-[140px] md:min-h-[48px]
                  min-w-[48px] min-h-[48px]
                `}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                aria-label={isExpanded ? "Close social media menu" : "Open social media menu"}
              >
                {isExpanded ? (
                  <div className="flex items-center py-2 px-4 md:px-5">
                    <XIcon className="h-5 w-5" />
                    <span className="font-medium hidden md:inline ml-2">Close</span>
                  </div>
                ) : (
                  <div className="flex items-center py-2 px-3 md:px-4">
                    <div className="flex space-x-1 md:space-x-2 md:mr-2">
                      <Instagram className="h-5 w-5" />
                      <Music className="h-5 w-5 hidden md:block" />
                      <XIcon className="h-5 w-5 hidden md:block" />
                    </div>
                    <span className="font-medium hidden md:inline ml-1">Follow YABA</span>
                  </div>
                )}
              </motion.button>

              {/* Enhanced popup social buttons with better contrast and visibility */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 items-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Popup header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-black text-white px-4 py-2 rounded-lg mb-1 w-[180px] text-center shadow-lg"
                    >
                      <p className="text-sm font-medium">Follow YABA on</p>
                    </motion.div>

                    {/* Social buttons with enhanced contrast */}
                    <div className="bg-black/70 backdrop-blur-md rounded-xl p-2 border border-white/30 shadow-xl w-[180px]">
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={social.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                          className="mb-1 last:mb-0"
                        >
                          <Link
                            href={social.url}
                            className={`
                              flex items-center gap-3 p-2 rounded-lg 
                              text-white transition-all duration-200
                              hover:${social.hoverBg} hover:${social.hoverText}
                              group
                            `}
                          >
                            <div
                              className={`${social.bgColor} rounded-full p-2 flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors duration-200`}
                            >
                              {social.icon}
                            </div>
                            <span className="font-medium text-sm">{social.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

