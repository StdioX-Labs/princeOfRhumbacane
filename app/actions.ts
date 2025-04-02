"use server"

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

// Server actions to fetch images for different sections
// In a real implementation, these would fetch from a database or CMS

export async function getGalleryImages(): Promise<GalleryImage[]> {
  // Simulate fetching gallery images
  return [
    {
      id: 1,
      src: "/placeholder.svg?height=600&width=800&text=live_Performance",
      alt: "Performance at Summer Festival",
      category: "live",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=800&width=600&text=studio_Recording",
      alt: "Studio recording session",
      category: "studio",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=600&width=800&text=backstage_Preparation",
      alt: "Backstage preparation",
      category: "backstage",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=800&width=800&text=photoshoot_AlbumCover",
      alt: "Album cover photoshoot",
      category: "photoshoot",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=600&width=800&text=live_Orchestra",
      alt: "Performing with orchestra",
      category: "live",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=800&width=600&text=press_Interview",
      alt: "Interview session",
      category: "press",
    },
  ]
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  // Simulate fetching carousel images
  return [
    {
      id: 1,
      src: "/placeholder.svg?height=800&width=1600&text=Performance Highlights",
      alt: "Live performance at Madison Square Garden",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=800&width=1600&text=Studio Session",
      alt: "Recording session for the new album",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=800&width=1600&text=World Tour",
      alt: "World tour opening night",
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

