"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart, type TicketType } from "@/context/cart-context"

export type Event = {
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

export function TicketSelection({ event }: { event: Event }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null)
  const [ticketQuantities, setTicketQuantities] = useState<Record<number, number>>(
    Object.fromEntries(event.ticketTypes.map((type) => [type.id, 0])),
  )

  const { addTicketToCart } = useCart()

  const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = event.ticketTypes.reduce((sum, type) => sum + (ticketQuantities[type.id] || 0) * type.price, 0)

  const increaseQuantity = (typeId: number) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [typeId]: (prev[typeId] || 0) + 1,
    }))
  }

  const decreaseQuantity = (typeId: number) => {
    if (ticketQuantities[typeId] > 0) {
      setTicketQuantities((prev) => ({
        ...prev,
        [typeId]: prev[typeId] - 1,
      }))
    }
  }

  // Replace the handleAddToCart function with this enhanced version
  const handleAddToCart = () => {
    // Validate that at least one ticket is selected
    if (totalTickets <= 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to continue.",
        variant: "destructive",
      })
      return
    }

    // Process ticket purchase directly without adding to cart
    event.ticketTypes.forEach((ticketType) => {
      const quantity = ticketQuantities[ticketType.id]
      if (quantity > 0) {
        // Process purchase directly (in a real app, this would call a payment API)
        console.log(`Purchased ${quantity} ${ticketType.name} ticket(s) for ${event.title}`)
      }
    })

    // Reset quantities and close dialog
    setTicketQuantities(Object.fromEntries(event.ticketTypes.map((type) => [type.id, 0])))
    setIsDialogOpen(false)

    // toast({
    //   title: "Tickets purchased successfully",
    //   description: `${totalTickets} ticket(s) for ${event.title} have been purchased.`,
    // })
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button disabled={event.isSoldOut}>{event.isSoldOut ? "Sold Out" : "Buy Tickets"}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Tickets</DialogTitle>
            <DialogDescription>
              {event.title} - {event.date} at {event.time}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-2">
              {event.ticketTypes.map((ticketType) => (
                <Card key={ticketType.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{ticketType.name}</CardTitle>
                    <CardDescription>{ticketType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold">KES {ticketType.price.toLocaleString()}</div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseQuantity(ticketType.id)}
                          disabled={ticketQuantities[ticketType.id] <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{ticketQuantities[ticketType.id] || 0}</span>
                        <Button variant="outline" size="icon" onClick={() => increaseQuantity(ticketType.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <Separator className="my-2" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Tickets:</span>
              <span>{totalTickets}</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span>Total:</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleAddToCart} className="w-full" disabled={totalTickets === 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

