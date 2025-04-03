"use server"

import fs from "fs"
import path from "path"

// Define the image types
type GalleryImage = {
  id: number
  src: string
  alt?: string
  category?: string
}

type CarouselImage = {
  id: number
  src: string
  alt?: string
}

// Helper function to format camelCase to Title Case with spaces
function formatCamelCase(text: string): string {
  // Add space before capital letters and capitalize the first letter
  const withSpaces = text.replace(/([A-Z])/g, " $1").trim()
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

// Helper function to add spaces between letters and numbers
function addSpacesBetweenLettersAndNumbers(text: string): string {
  return text.replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2")
}

// Fallback gallery images
function getFallbackGalleryImages(): GalleryImage[] {
  return [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600&text=Fallback+Image+1",
      alt: "Fallback Image 1",
      category: "Fallback",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600&text=Fallback+Image+2",
      alt: "Fallback Image 2",
      category: "Fallback",
    },
  ]
}

// Function to scan the gallery directory and generate image list
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery")

    // Check if directory exists
    if (!fs.existsSync(galleryDir)) {
      console.log("Gallery directory does not exist, creating it...")
      fs.mkdirSync(galleryDir, { recursive: true })
      return getFallbackGalleryImages() // Return fallback images if directory was just created
    }

    // Read all files in the directory
    const files = fs.readdirSync(galleryDir)

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    })

    if (imageFiles.length === 0) {
      return getFallbackGalleryImages() // Return fallback images if no images found
    }

    // Process each image file
    return imageFiles.map((file, index) => {
      // Get filename without extension
      const nameWithoutExt = path.basename(file, path.extname(file))

      // Split by underscore to get category and description
      const parts = nameWithoutExt.split("_")
      const category = parts[0] ? formatCamelCase(parts[0]) : "Uncategorized"

      // Get description part (everything after the first underscore)
      let description = parts.slice(1).join("_")

      // Format the description
      description = formatCamelCase(description)
      description = addSpacesBetweenLettersAndNumbers(description)

      return {
        id: index + 1,
        src: `/images/gallery/${file}`,
        alt: description,
        category: category,
      }
    })
  } catch (error) {
    console.error("Error reading gallery directory:", error)
    return getFallbackGalleryImages() // Return fallback images on error
  }
}

// Update the getCarouselImages function to better handle various naming formats
export async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    const carouselDir = path.join(process.cwd(), "public", "images", "carousel")

    // Check if directory exists
    if (!fs.existsSync(carouselDir)) {
      console.log("Carousel directory does not exist, creating it...")
      fs.mkdirSync(carouselDir, { recursive: true })
      return getFallbackCarouselImages() // Return fallback images if directory was just created
    }

    // Read all files in the directory
    const files = fs.readdirSync(carouselDir)

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    })

    if (imageFiles.length === 0) {
      return getFallbackCarouselImages() // Return fallback images if no images found
    }

    // Process each image file
    return imageFiles.map((file, index) => {
      // Get filename without extension
      const nameWithoutExt = path.basename(file, path.extname(file))

      // Format the filename for display
      // Replace hyphens and underscores with spaces
      let caption = nameWithoutExt.replace(/[-_]/g, " ")

      // Add spaces between camelCase words
      caption = caption.replace(/([a-z])([A-Z])/g, "$1 $2")

      // Add spaces between numbers and letters
      caption = caption.replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2")

      // Capitalize each word
      caption = caption
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
        .trim()

      return {
        id: index + 1,
        src: `/images/carousel/${file}`,
        alt: caption,
      }
    })
  } catch (error) {
    console.error("Error reading carousel directory:", error)
    return getFallbackCarouselImages() // Return fallback images on error
  }
}

// Update the fallback carousel images to demonstrate different naming formats
function getFallbackCarouselImages(): CarouselImage[] {
  return [
    {
      id: 1,
      src: "/placeholder.svg?height=800&width=1600&text=StagePerformance",
      alt: "Stage Performance",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=800&width=1600&text=Studio+Session",
      alt: "Studio Session",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=800&width=1600&text=Live-Show2024",
      alt: "Live Show 2024",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=800&width=1600&text=Acoustic_Night",
      alt: "Acoustic Night",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=800&width=1600&text=FestivalAppearance",
      alt: "Festival Appearance",
    },
  ]
}

export async function getHeroImages(): Promise<{ src: string; alt: string }[]> {
  try {
    const heroDir = path.join(process.cwd(), "public", "images", "hero")

    // Check if directory exists
    if (!fs.existsSync(heroDir)) {
      console.log("Hero directory does not exist, creating it...")
      fs.mkdirSync(heroDir, { recursive: true })
      return getFallbackHeroImages() // Return fallback images if directory was just created
    }

    // Read all files in the directory
    const files = fs.readdirSync(heroDir)

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
    })

    if (imageFiles.length === 0) {
      return getFallbackHeroImages() // Return fallback images if no images found
    }

    // Process each image file
    return imageFiles.map((file, index) => {
      // Get filename without extension
      const nameWithoutExt = path.basename(file, path.extname(file))

      // Format the filename for display
      // Replace hyphens and underscores with spaces
      let caption = nameWithoutExt.replace(/[-_]/g, " ")

      // Add spaces between camelCase words
      caption = caption.replace(/([a-z])([A-Z])/g, "$1 $2")

      // Add spaces between numbers and letters
      caption = caption.replace(/([a-zA-Z])(\d)/g, "$1 $2").replace(/(\d)([a-zA-Z])/g, "$1 $2")

      // Capitalize each word
      caption = caption
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
        .trim()

      return {
        src: `/images/hero/${file}`,
        alt: caption,
      }
    })
  } catch (error) {
    console.error("Error reading hero directory:", error)
    return getFallbackHeroImages() // Return fallback images on error
  }
}

// Add this function to your existing actions.ts file
function getFallbackHeroImages(): { src: string; alt: string }[] {
  return [
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Performance",
      alt: "YABA Performance",
    },
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Studio",
      alt: "YABA in Studio",
    },
    {
      src: "/placeholder.svg?height=1080&width=1920&text=YABA+Concert",
      alt: "YABA Concert",
    },
  ]
}

export async function getShowImages(): Promise<string[]> {
  // Simulate fetching show images
  return [
    "/placeholder.svg?height=400&width=600&text=Summer+Solstice+Festival",
    "/placeholder.svg?height=400&width=600&text=Moonlight+Sonata",
    "/placeholder.svg?height=400&width=600&text=Autumn+Rhythms+Tour",
    "/placeholder.svg?height=400&width=600&text=Winter+Wonderland",
  ]
}

export async function getTimelineImages(): Promise<string[]> {
  // Simulate fetching timeline images
  return [
    "/placeholder.svg?height=400&width=600&text=2018_FirstAlbum",
    "/placeholder.svg?height=400&width=600&text=2019_WorldTour",
    "/placeholder.svg?height=400&width=600&text=2020_AwardRecognition",
    "/placeholder.svg?height=400&width=600&text=2021_CollaborationAlbum",
    "/placeholder.svg?height=400&width=600&text=2022_SymphonyPerformance",
    "/placeholder.svg?height=400&width=600&text=2023_DocumentaryRelease",
  ]
}

export async function getAboutImages(): Promise<string[]> {
  // Simulate fetching about section images
  return [
    "/placeholder.svg?height=600&width=400&text=Portrait_YABA",
    "/placeholder.svg?height=400&width=400&text=Studio_Recording",
    "/placeholder.svg?height=400&width=400&text=Performance_Live",
    "/placeholder.svg?height=600&width=400&text=Stage_Concert",
  ]
}

export async function getSocialImages(): Promise<string[]> {
  // Simulate fetching social media images
  return [
    "/placeholder.svg?height=400&width=400&text=Social_NewTour",
    "/placeholder.svg?height=400&width=400&text=Social_NewTrack",
    "/placeholder.svg?height=400&width=400&text=Social_Photoshoot",
    "/placeholder.svg?height=400&width=400&text=Social_Festival",
  ]
}

export async function getTestimonialImages(): Promise<string[]> {
  // Simulate fetching testimonial images
  return [
    "/placeholder.svg?height=100&width=100&text=Critic_MusicWeekly",
    "/placeholder.svg?height=100&width=100&text=Critic_SarahJohnson",
    "/placeholder.svg?height=100&width=100&text=Producer_MichaelChen",
  ]
}

export async function getMerchandiseImages(): Promise<string[]> {
  // Simulate fetching merchandise images
  return [
    "/placeholder.svg?height=500&width=500&text=Clothing_TShirt",
    "/placeholder.svg?height=500&width=500&text=Music_Vinyl",
    "/placeholder.svg?height=500&width=500&text=Accessories_Poster",
    "/placeholder.svg?height=500&width=500&text=Clothing_Hoodie",
    "/placeholder.svg?height=500&width=500&text=Music_Digital",
    "/placeholder.svg?height=500&width=500&text=Accessories_Tote",
    "/placeholder.svg?height=500&width=500&text=Clothing_Beanie",
    "/placeholder.svg?height=500&width=500&text=Accessories_Photo",
  ]
}

// Add this function to your existing actions.ts file
export async function getLogoImage(): Promise<string> {
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "logo", "yaba_logo.png")

    // Check if logo file exists
    if (fs.existsSync(logoPath)) {
      return "/images/logo/yaba_logo.png"
    }

    // Check if logo directory exists, if not create it
    const logoDir = path.join(process.cwd(), "public", "images", "logo")
    if (!fs.existsSync(logoDir)) {
      console.log("Logo directory does not exist, creating it...")
      fs.mkdirSync(logoDir, { recursive: true })
    }

    // Return placeholder if no logo found
    return "/placeholder.svg?height=200&width=400&text=YABA+LOGO"
  } catch (error) {
    console.error("Error checking for logo:", error)
    return "/placeholder.svg?height=200&width=400&text=YABA+LOGO"
  }
}

