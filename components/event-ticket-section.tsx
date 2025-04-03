"use client"

import { useState } from "react"
import { Ticket, Calendar, Clock, MapPin, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { TicketCheckout } from "@/components/ticket-checkout"
import type { Event } from "@/lib/events"

export function EventTicketSection({ event }: { event: Event }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Update the handleBuyTickets function to check if any tickets are available
  const handleBuyTickets = () => {
    // Only allow ticket purchase if:
    // 1. The event is not sold out
    // 2. There are ticket types available
    // 3. At least one ticket type is available
    if (
      !event.isSoldOut &&
      event.ticketTypes.length > 0 &&
      event.ticketTypes.some((ticket) => ticket.available !== false)
    ) {
      setIsCheckoutOpen(true)
    }
  }

  // Helper function to safely extract numeric ID from string or number
  const extractId = (id: string | number, prefix?: string): number => {
    if (typeof id === "number") return id
    return prefix ? Number(id.replace(prefix, "")) : Number(id)
  }

  return (
    <>
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Date</h3>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Time</h3>
              <p className="text-sm text-muted-foreground">
                {event.time}
                {event.endTime ? ` - ${event.endTime}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">{event.venue.name}</p>
              <p className="text-sm text-muted-foreground">
                {event.venue.city}, {event.venue.country}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              Tickets
            </h3>

            {event.isSoldOut ? (
              <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-900/30">
                <p className="text-sm text-red-800 dark:text-red-300 font-medium">This event is sold out</p>
              </div>
            ) : event.ticketTypes.length === 0 ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md border border-amber-200 dark:border-amber-900/30">
                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">Tickets are not available yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {event.ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-sm text-muted-foreground">KES {ticket.price.toLocaleString()}</p>
                    </div>
                    {!ticket.available ? (
                      <span className="text-xs text-red-600 font-medium">Sold Out</span>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Available</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!event.isSoldOut && event.ticketTypes.some((t) => t.available) && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md border border-blue-200 dark:border-blue-900/30 flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Tickets are selling fast! Secure yours now to avoid disappointment.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={
              event.isSoldOut ||
              event.ticketTypes.length === 0 ||
              !event.ticketTypes.some((ticket) => ticket.available !== false)
            }
            onClick={handleBuyTickets}
          >
            {event.isSoldOut
              ? "Sold Out"
              : event.ticketTypes.length === 0
                ? "Coming Soon"
                : !event.ticketTypes.some((ticket) => ticket.available !== false)
                  ? "Sold Out"
                  : "Buy Tickets"}
          </Button>
        </CardFooter>
      </Card>

      {/* Ticket Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && setIsCheckoutOpen(false)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          <DialogTitle className="sr-only">Buy Tickets for {event.title}</DialogTitle>
          <TicketCheckout
            show={{
              id: typeof event.id === "string" ? Number(event.id.replace("event-", "")) : Number(event.id),
              title: event.title,
              date: event.date,
              time: event.time,
              location: `${event.venue.name}, ${event.venue.city}`,
              description: event.description,
              ticketLink: "#",
              isSoldOut: event.isSoldOut,
              ticketTypes: event.ticketTypes.map((tt) => ({
                id: typeof tt.id === "string" ? Number(tt.id.replace(`${event.id}-ticket-`, "")) : Number(tt.id),
                eventId: typeof event.id === "string" ? Number(event.id.replace("event-", "")) : Number(event.id),
                name: tt.name,
                price: tt.price,
                description: tt.description,
                available: tt.available,
              })),
            }}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

