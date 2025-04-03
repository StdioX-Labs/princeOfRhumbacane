import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, MapPin, Users, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getEvent } from "@/lib/events"
import { EventTicketSection } from "@/components/event-ticket-section"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    }
  }

  return {
    title: `${event.title} - YABA`,
    description: event.description,
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/#shows" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={event.images[0]?.url || "/placeholder.svg?height=400&width=600&text=Event"}
                alt={event.images[0]?.alt || event.title}
                fill
                className="object-cover"
                priority
              />
              {event.isSoldOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    SOLD OUT
                  </Badge>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold">{event.title}</h1>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>
                    {event.time}
                    {event.endTime ? ` - ${event.endTime}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {event.venue.name}, {event.venue.city}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">About This Event</h2>
                <div className="prose max-w-none">
                  {event.longDescription ? (
                    <div className="whitespace-pre-line">{event.longDescription}</div>
                  ) : (
                    <p>{event.description}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Performers</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {event.performers.map((performer) => (
                    <Card key={performer.id}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={performer.imageUrl || "/placeholder.svg?height=100&width=100"}
                            alt={performer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{performer.name}</h3>
                          {performer.role && <p className="text-sm text-muted-foreground">{performer.role}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Venue</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{event.venue.name}</h3>
                        <p className="text-sm text-muted-foreground">{event.venue.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.venue.city}, {event.venue.country}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Capacity: {event.venue.capacity}</span>
                        </div>
                      </div>
                      {event.venue.mapUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={event.venue.mapUrl} target="_blank" rel="noopener noreferrer">
                            View Map
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Suspense fallback={<div>Loading tickets...</div>}>
              <EventTicketSection event={event} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

