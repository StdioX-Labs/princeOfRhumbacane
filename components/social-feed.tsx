import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2 } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Helper function to extract social media content from image filename
function getSocialContent(imagePath: string): { platform: string; content: string } {
  // Default values
  let platform = "Instagram"
  let content = "Check out our latest updates and stay connected!"

  // Extract filename from path
  const filename = imagePath.split("/").pop() || ""

  // For placeholder images, extract the text parameter if it exists
  if (filename.includes("placeholder.svg")) {
    const textMatch = imagePath.match(/text=([^&]+)/)
    if (textMatch && textMatch[1]) {
      const text = decodeURIComponent(textMatch[1])

      // Try to determine platform from text
      if (text.toLowerCase().includes("twitter")) {
        platform = "Twitter"
      } else if (text.toLowerCase().includes("instagram")) {
        platform = "Instagram"
      } else if (text.toLowerCase().includes("facebook")) {
        platform = "Facebook"
      }

      // Generate content based on text
      if (text.includes("NewTour")) {
        content =
          "Excited to announce new tour dates for the summer! Check out the Shows section for more details. Can't wait to see you all there! #NewTour #LiveMusic"
      } else if (text.includes("NewTrack")) {
        content =
          "Just finished recording a new track with @amazingproducer. Can't wait for you all to hear it! #NewMusic #ComingSoon"
      } else if (text.includes("Photoshoot")) {
        content =
          "Behind the scenes from yesterday's photoshoot for the upcoming album cover. Special thanks to @photographername for the amazing work!"
      } else if (text.includes("Festival")) {
        content =
          "Just announced! I'll be performing at @festivalnameofficial this year! Tickets on sale now - link in bio. #FestivalSeason"
      }
    }
  }

  return { platform, content }
}

const socialPosts = [
  {
    id: 1,
    platform: "Instagram",
    content:
      "Excited to announce new tour dates for the summer! Check out the Shows section for more details. Can't wait to see you all there! #NewTour #LiveMusic",
    date: "2 days ago",
    likes: 1243,
    comments: 89,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    platform: "Twitter",
    content:
      "Just finished recording a new track with @amazingproducer. Can't wait for you all to hear it! #NewMusic #ComingSoon",
    date: "5 days ago",
    likes: 876,
    comments: 42,
    image: null,
  },
  {
    id: 3,
    platform: "Instagram",
    content:
      "Behind the scenes from yesterday's photoshoot for the upcoming album cover. Special thanks to @photographername for the amazing work!",
    date: "1 week ago",
    likes: 2105,
    comments: 134,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    platform: "Twitter",
    content:
      "Just announced! I'll be performing at @festivalnameofficial this year! Tickets on sale now - link in bio. #FestivalSeason",
    date: "2 weeks ago",
    likes: 1532,
    comments: 67,
    image: null,
  },
]

export function SocialFeed({ socialImages = [] }: { socialImages?: string[] }) {
  // Create posts from the provided images
  const imagePosts = socialImages.map((image, index) => {
    const { platform, content } = getSocialContent(image)

    return {
      id: 100 + index, // Ensure unique IDs
      platform,
      content,
      date: `${index + 1} day${index === 0 ? "" : "s"} ago`,
      likes: Math.floor(Math.random() * 2000) + 500,
      comments: Math.floor(Math.random() * 150) + 30,
      image,
    }
  })

  // Combine default posts with image posts, prioritizing image posts
  const combinedPosts = [...imagePosts, ...socialPosts.slice(0, Math.max(0, 4 - imagePosts.length))]

  return (
    <div className="grid gap-6">
      {combinedPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="YABA" />
                <AvatarFallback>YB</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">YABA</span>
                <span className="text-xs text-muted-foreground">
                  {post.platform} • {post.date}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm">{post.content}</p>
            {post.image && (
              <div className="mt-3 overflow-hidden rounded-md">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt="Social media post image"
                  width={500}
                  height={500}
                  className="aspect-square object-cover transition-all hover:scale-105"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="flex w-full justify-between text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="gap-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="#">View More Updates</Link>
        </Button>
      </div>
    </div>
  )
}

