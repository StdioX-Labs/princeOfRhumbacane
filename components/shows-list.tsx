"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CalendarDays, MapPin, Clock, Loader2, Search, Filter, Tag, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketCheckout } from "@/components/ticket-checkout"
import {
  getFeaturedEvents,
  getUpcomingEvents,
  searchEvents,
  getAllCategories,
  getEventsByCategory,
  type Event,
} from "@/lib/events"

export function ShowsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedShow, setSelectedShow] = useState<Event | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isSearching, setIsSearching] = useState(false)
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(false)

  // Fetch events and categories on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true)

        // Fetch events and categories in parallel
        const [eventsData, featuredData, categoriesData] = await Promise.all([
          getUpcomingEvents(10),
          getFeaturedEvents(3),
          getAllCategories(),
        ])

        setEvents(eventsData)
        setFeaturedEvents(featuredData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is cleared, reset to all events
      try {
        setIsSearching(true)
        const eventsData = await getUpcomingEvents(10)
        setEvents(eventsData)
        setSelectedCategory("")
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setIsSearching(false)
      }
      return
    }

    try {
      setIsSearching(true)
      const results = await searchEvents(searchQuery)
      setEvents(results)
      setSelectedCategory("")
    } catch (err) {
      console.error("Error searching events:", err)
      setError("Failed to search events. Please try again later.")
    } finally {
      setIsSearching(false)
    }
  }

  // Handle category filter
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)

    try {
      setIsSearching(true)
      if (category) {
        const results = await getEventsByCategory(category)
        setEvents(results)
      } else {
        // If category is cleared, reset to all events
        const eventsData = await getUpcomingEvents(10)
        setEvents(eventsData)
      }
    } catch (err) {
      console.error("Error filtering events:", err)
      setError("Failed to filter events. Please try again later.")
    } finally {
      setIsSearching(false)
    }
  }

  // Update the handleShowSelect function to check if the event has available tickets
  const handleShowSelect = (show: Event) => {
    // Only allow selection if:
    // 1. The event is not sold out
    // 2. There are ticket types available
    // 3. At least one ticket type is available
    if (
      !show.isSoldOut &&
      show.ticketTypes.length > 0 &&
      show.ticketTypes.some((ticket) => ticket.available !== false)
    ) {
      setSelectedShow(show)
      setIsCheckoutOpen(true)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading upcoming shows...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-red-100 p-3 text-red-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Failed to Load Events</h3>
        <p className="text-muted-foreground max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Search and filter section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
        </div>

        {/* Active filters */}
        {(searchQuery || selectedCategory) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                {searchQuery}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => {
                    setSearchQuery("")
                    handleSearch()
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleCategoryChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Featured events section (only show if not searching/filtering) */}
      {featuredEvents.length > 0 && !searchQuery && !selectedCategory && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Featured Events</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.images[0]?.url || "/placeholder.svg?height=400&width=600&text=Event"}
                    alt={event.images[0]?.alt || event.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <div className="flex items-center gap-1 text-white/80">
                      <CalendarDays className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                </div>
                <CardContent className="pb-3 pt-4 flex-grow">
                  <div className="grid gap-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>
                        {event.venue.name}, {event.venue.city}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={
                      event.isSoldOut ||
                      event.ticketTypes.length === 0 ||
                      !event.ticketTypes.some((ticket) => ticket.available !== false)
                    }
                    onClick={() => handleShowSelect(event)}
                  >
                    {event.isSoldOut || !event.ticketTypes.some((ticket) => ticket.available !== false)
                      ? "Sold Out"
                      : "Buy Tickets"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* View Upcoming Events Button */}
      <div className="mt-8 mb-4 text-center">
        <Button onClick={() => setShowUpcomingEvents(!showUpcomingEvents)} variant="outline" className="mx-auto">
          {showUpcomingEvents ? "Hide Upcoming Events" : "View Upcoming Events"}
        </Button>
      </div>

      {/* All events section - conditionally rendered */}
      {showUpcomingEvents && (
        <div className="mt-6">
          {searchQuery || selectedCategory ? (
            <h3 className="text-xl font-semibold mb-4">
              {events.length} {events.length === 1 ? "Result" : "Results"} Found
            </h3>
          ) : (
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          )}

          {/* No events state */}
          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <CalendarDays className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Events Found</h3>
              <p className="text-muted-foreground max-w-md">
                {searchQuery || selectedCategory
                  ? "Try adjusting your search or filters to find more events."
                  : "There are no upcoming events scheduled at the moment. Please check back later for updates."}
              </p>
              {(searchQuery || selectedCategory) && (
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    handleSearch()
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {/* Events grid */}
          {events.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.images[0]?.url || "/placeholder.svg?height=400&width=600&text=Event"}
                      alt={event.images[0]?.alt || event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      <div className="flex items-center gap-1 text-white/80">
                        <CalendarDays className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    {event.isSoldOut ? (
                      <div className="absolute right-4 top-4">
                        <Badge variant="destructive">Sold Out</Badge>
                      </div>
                    ) : (
                      <div className="absolute right-4 top-4">
                        <Badge>Available</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="pb-3 pt-4 flex-grow">
                    <div className="grid gap-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>
                          {event.venue.name}, {event.venue.city}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {event.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{event.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/events/${event.slug}`}>View Details</Link>
                    </Button>
                    <Button
                      size="sm"
                      disabled={event.isSoldOut || !event.ticketTypes.some((ticket) => ticket.available !== false)}
                      onClick={() => handleShowSelect(event)}
                    >
                      {event.isSoldOut || !event.ticketTypes.some((ticket) => ticket.available !== false)
                        ? "Sold Out"
                        : "Buy Tickets"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ticket Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && setIsCheckoutOpen(false)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedShow ? `Buy Tickets for ${selectedShow.title}` : "Ticket Checkout"}
          </DialogTitle>
          {selectedShow && (
            <TicketCheckout
              show={{
                id:
                  typeof selectedShow.id === "string"
                    ? Number(selectedShow.id.replace("event-", ""))
                    : Number(selectedShow.id),
                title: selectedShow.title,
                date: selectedShow.date,
                time: selectedShow.time,
                location: `${selectedShow.venue.name}, ${selectedShow.venue.city}`,
                description: selectedShow.description,
                ticketLink: "#",
                isSoldOut: selectedShow.isSoldOut,
                ticketTypes: selectedShow.ticketTypes.map((tt) => ({
                  id:
                    typeof tt.id === "string" ? Number(tt.id.replace(`${selectedShow.id}-ticket-`, "")) : Number(tt.id),
                  eventId:
                    typeof selectedShow.id === "string"
                      ? Number(selectedShow.id.replace("event-", ""))
                      : Number(selectedShow.id),
                  name: tt.name,
                  price: tt.price,
                  description: tt.description,
                  available: tt.available,
                })),
              }}
              onClose={() => setIsCheckoutOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

