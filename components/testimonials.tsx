import Image from "next/image"
import { Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

// Helper function to extract testimonial data from image filename
function getTestimonialData(imagePath: string): { author: string; authorRole: string; quote: string } {
  // Default values
  let author = "Music Critic"
  let authorRole = "Industry Professional"
  let quote = "One of the most captivating performances I've witnessed in years."

  // Extract filename from path
  const filename = imagePath.split("/").pop() || ""

  // For placeholder images, extract the text parameter if it exists
  if (filename.includes("placeholder.svg")) {
    const textMatch = imagePath.match(/text=([^&]+)/)
    if (textMatch && textMatch[1]) {
      const text = decodeURIComponent(textMatch[1])

      // Parse the text to extract author and role
      const parts = text.split("_")
      if (parts.length >= 2) {
        const roleType = parts[0]
        const authorName = parts[1]

        // Set author name
        if (authorName === "MusicWeekly") {
          author = "Music Weekly"
          authorRole = "Magazine"
          quote =
            "One of the most captivating performances I've witnessed in years. YABA brings a unique energy to the stage that's simply mesmerizing."
        } else if (authorName === "SarahJohnson") {
          author = "Sarah Johnson"
          authorRole = "Music Critic"
          quote =
            "The artistic vision and execution in YABA's latest album is nothing short of brilliant. A true innovator in the contemporary scene."
        } else if (authorName === "MichaelChen") {
          author = "Michael Chen"
          authorRole = "Producer"
          quote =
            "Working with YABA was an incredible experience. The level of professionalism and creative input transformed our collaboration."
        } else {
          author = authorName.replace(/([A-Z])/g, " $1").trim()

          // Set role based on roleType
          if (roleType === "Critic") {
            authorRole = "Music Critic"
          } else if (roleType === "Producer") {
            authorRole = "Producer"
          } else if (roleType === "Fan") {
            authorRole = "Fan"
          } else {
            authorRole = roleType.replace(/([A-Z])/g, " $1").trim()
          }
        }
      }
    }
  }

  return { author, authorRole, quote }
}

const testimonials = [
  {
    id: 1,
    quote:
      "One of the most captivating performances I've witnessed in years. YABA brings a unique energy to the stage that's simply mesmerizing.",
    author: "Music Weekly",
    authorRole: "Magazine",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    quote:
      "The artistic vision and execution in YABA's latest album is nothing short of brilliant. A true innovator in the contemporary scene.",
    author: "Sarah Johnson",
    authorRole: "Music Critic",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    quote:
      "Working with YABA was an incredible experience. The level of professionalism and creative input transformed our collaboration.",
    author: "Michael Chen",
    authorRole: "Producer",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials({ testimonialImages = [] }: { testimonialImages?: string[] }) {
  // Create testimonials from the provided images
  const imageTestimonials = testimonialImages.map((image, index) => {
    const { author, authorRole, quote } = getTestimonialData(image)

    return {
      id: 100 + index, // Ensure unique IDs
      quote,
      author,
      authorRole,
      image,
    }
  })

  // Combine default testimonials with image testimonials, prioritizing image testimonials
  const combinedTestimonials = [
    ...imageTestimonials,
    ...testimonials.slice(0, Math.max(0, 3 - imageTestimonials.length)),
  ]

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Voices & Reviews</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            What critics, collaborators, and audiences are saying.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {combinedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/40" />
                <p className="mt-4 text-lg italic">{testimonial.quote}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.authorRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

