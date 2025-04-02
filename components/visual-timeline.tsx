import Image from "next/image"

// Helper function to extract timeline data from image filename
function getTimelineData(imagePath: string, index: number): { year: string; title: string; description: string } {
  // Default values based on index
  const defaultEvents = [
    {
      year: "2018",
      title: "First Album Release",
      description: "Debut album 'Beginnings' launched to critical acclaim",
    },
    {
      year: "2019",
      title: "World Tour",
      description: "First international tour across 15 countries",
    },
    {
      year: "2020",
      title: "Award Recognition",
      description: "Recipient of the Best New Artist award",
    },
    {
      year: "2021",
      title: "Collaboration Album",
      description: "Released 'Harmony' featuring various artists",
    },
    {
      year: "2022",
      title: "Symphony Performance",
      description: "Special performance with the National Symphony Orchestra",
    },
    {
      year: "2023",
      title: "Documentary Release",
      description: "Behind-the-scenes documentary 'The Journey'",
    },
  ]

  const defaultEvent = defaultEvents[index % defaultEvents.length]

  // Extract filename from path
  const filename = imagePath.split("/").pop() || ""

  // For placeholder images, extract the text parameter if it exists
  if (filename.includes("placeholder.svg")) {
    const textMatch = imagePath.match(/text=([^&]+)/)
    if (textMatch && textMatch[1]) {
      const text = decodeURIComponent(textMatch[1])

      // Parse the text to extract year and event
      const parts = text.split("_")
      if (parts.length >= 2) {
        const year = parts[0]
        const eventName = parts[1]

        // Format the event name (convert camelCase to spaces)
        const formattedEventName = eventName.replace(/([A-Z])/g, " $1").trim()

        // Generate description based on event name
        let description = defaultEvent.description
        if (eventName === "FirstAlbum") {
          description = "Debut album 'Beginnings' launched to critical acclaim"
        } else if (eventName === "WorldTour") {
          description = "First international tour across 15 countries"
        } else if (eventName === "AwardRecognition") {
          description = "Recipient of the Best New Artist award"
        } else if (eventName === "CollaborationAlbum") {
          description = "Released 'Harmony' featuring various artists"
        } else if (eventName === "SymphonyPerformance") {
          description = "Special performance with the National Symphony Orchestra"
        } else if (eventName === "DocumentaryRelease") {
          description = "Behind-the-scenes documentary 'The Journey'"
        }

        return {
          year,
          title: formattedEventName,
          description,
        }
      }
    }
  }

  return defaultEvent
}

const timelineEvents = [
  {
    id: 1,
    year: "2018",
    title: "First Album Release",
    description: "Debut album 'Beginnings' launched to critical acclaim",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    year: "2019",
    title: "World Tour",
    description: "First international tour across 15 countries",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    year: "2020",
    title: "Award Recognition",
    description: "Recipient of the Best New Artist award",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    year: "2021",
    title: "Collaboration Album",
    description: "Released 'Harmony' featuring various artists",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    year: "2022",
    title: "Symphony Performance",
    description: "Special performance with the National Symphony Orchestra",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    year: "2023",
    title: "Documentary Release",
    description: "Behind-the-scenes documentary 'The Journey'",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function VisualTimeline({ timelineImages = [] }: { timelineImages?: string[] }) {
  // Create timeline events from the provided images
  const imageEvents = timelineImages.map((image, index) => {
    const { year, title, description } = getTimelineData(image, index)

    return {
      id: 100 + index, // Ensure unique IDs
      year,
      title,
      description,
      image,
    }
  })

  // Combine default events with image events, prioritizing image events
  const combinedEvents = [...imageEvents, ...timelineEvents.slice(0, Math.max(0, 6 - imageEvents.length))]

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Artistic Journey</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            A visual timeline of milestones and memorable moments throughout the years.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Timeline line - hidden on mobile, visible on md and up */}
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {combinedEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex flex-col md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* For mobile: full width content */}
                <div className="md:w-1/2 md:px-6 w-full">
                  {/* Timeline dot - centered on mobile, alternating on desktop */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 h-4 w-4 rounded-full bg-primary hidden md:block" />

                  {/* Mobile timeline indicator */}
                  <div className="flex items-center mb-4 md:hidden">
                    <div className="h-4 w-4 rounded-full bg-primary mr-3"></div>
                    <span className="font-bold text-primary">{event.year}</span>
                  </div>

                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        {/* Year badge - hidden on mobile as we show it above the image */}
                        <span className="inline-block rounded bg-primary px-2 py-1 text-sm font-bold hidden md:inline-block">
                          {event.year}
                        </span>
                        <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
                        <p className="text-sm text-white/80">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* This empty div is only for desktop layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

