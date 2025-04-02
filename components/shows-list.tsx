"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarDays, MapPin, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { TicketCheckout } from "@/components/ticket-checkout"

// Show type definition
type Show = {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  ticketLink: string
  isSoldOut: boolean
  ticketTypes: TicketType[]
}

// Ticket type definition
type TicketType = {
  id: number
  eventId: number
  name: string
  price: number
  description: string
}

const upcomingShows: Show[] = [
  {
    id: 1,
    title: "Summer Solstice Festival",
    date: "June 21, 2025",
    time: "8:00 PM",
    location: "Central Park Amphitheater, Nairobi",
    description: "A magical evening performance celebrating the summer solstice with special guest artists.",
    ticketLink: "#",
    isSoldOut: false,
    ticketTypes: [
      {
        id: 1,
        eventId: 1,
        name: "VIP",
        price: 7500,
        description: "Premium seating, meet & greet, and exclusive merchandise",
      },
      {
        id: 2,
        eventId: 1,
        name: "Regular",
        price: 3500,
        description: "Standard admission with good views",
      },
      {
        id: 3,
        eventId: 1,
        name: "Early Bird",
        price: 2500,
        description: "Limited availability, standard admission",
      },
    ],
  },
  {
    id: 2,
    title: "Moonlight Sonata",
    date: "July 15, 2025",
    time: "9:30 PM",
    location: "Riverside Theater, Mombasa",
    description: "An intimate acoustic performance under the stars with a full orchestra accompaniment.",
    ticketLink: "#",
    isSoldOut: false,
    ticketTypes: [
      {
        id: 4,
        eventId: 2,
        name: "Premium",
        price: 6500,
        description: "Front row seating with complimentary drinks",
      },
      {
        id: 5,
        eventId: 2,
        name: "Standard",
        price: 4500,
        description: "General admission seating",
      },
    ],
  },
  {
    id: 3,
    title: "Autumn Rhythms Tour",
    date: "September 5, 2025",
    time: "7:00 PM",
    location: "Grand Concert Hall, Kisumu",
    description: "The opening night of the nationwide Autumn Rhythms tour featuring new material.",
    ticketLink: "#",
    isSoldOut: true,
    ticketTypes: [],
  },
  {
    id: 4,
    title: "Winter Wonderland",
    date: "December 12, 2025",
    time: "6:30 PM",
    location: "Symphony Hall, Nakuru",
    description: "A festive celebration with holiday classics reimagined in a unique artistic style.",
    ticketLink: "#",
    isSoldOut: false,
    ticketTypes: [
      {
        id: 6,
        eventId: 4,
        name: "VIP Experience",
        price: 8000,
        description: "Premium seating, backstage tour, and holiday gift package",
      },
      {
        id: 7,
        eventId: 4,
        name: "Regular",
        price: 3800,
        description: "Standard admission",
      },
      {
        id: 8,
        eventId: 4,
        name: "Family Package",
        price: 12000,
        description: "Admission for 4 people with special family activities",
      },
    ],
  },
]

export function ShowsList({ showImages = [] }: { showImages?: string[] }) {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Function to get image for a show
  const getShowImage = (index: number) => {
    if (showImages.length > 0) {
      return showImages[index % showImages.length]
    }
    return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(upcomingShows[index].title)}`
  }

  const handleShowSelect = (show: Show) => {
    if (!show.isSoldOut) {
      setSelectedShow(show)
      setIsCheckoutOpen(true)
    }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {upcomingShows.map((show, index) => (
          <Card key={show.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={getShowImage(index) || "/placeholder.svg"}
                alt={show.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">{show.title}</h3>
                <div className="flex items-center gap-1 text-white/80">
                  <CalendarDays className="h-4 w-4" />
                  <span>{show.date}</span>
                </div>
              </div>
              {show.isSoldOut ? (
                <div className="absolute right-4 top-4">
                  <Badge variant="destructive">Sold Out</Badge>
                </div>
              ) : (
                <div className="absolute right-4 top-4">
                  <Badge>Available</Badge>
                </div>
              )}
            </div>
            <CardContent className="pb-3 pt-4">
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>{show.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>{show.time}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{show.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={show.isSoldOut} onClick={() => handleShowSelect(show)}>
                {show.isSoldOut ? "Sold Out" : "Buy Tickets"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Ticket Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && setIsCheckoutOpen(false)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          {selectedShow && <TicketCheckout show={selectedShow} onClose={() => setIsCheckoutOpen(false)} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

