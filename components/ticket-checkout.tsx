"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, Mail, Phone, Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

// Add a Kenyan phone number validation regex after the imports
const kenyanPhoneRegex = /^(?:\+254|254|0)[17]\d{8}$/

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
  ticketTypes: {
    id: number
    eventId: number
    name: string
    price: number
    description: string
    available?: boolean
  }[]
}

// Ticket type definition
// type TicketType = {
//   id: number
//   eventId: number
//   name: string
//   price: number
//   description: string
// }

// Props type definition
type TicketCheckoutProps = {
  show: Show
  onClose: () => void
}

// Update the TicketCheckout component to handle individual sold-out tickets
export function TicketCheckout({ show, onClose }: TicketCheckoutProps) {
  const [activeStep, setActiveStep] = useState("details")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  // Find the first available ticket type to set as default
  const firstAvailableTicket = show.ticketTypes.find((ticket) => ticket.available !== false)
  const [selectedTicketType, setSelectedTicketType] = useState<number>(
    firstAvailableTicket ? firstAvailableTicket.id : show.ticketTypes[0]?.id || 0,
  )
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [paymentTermsAgreed, setPaymentTermsAgreed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { addTicketToCart } = useCart()
  const router = useRouter()

  // Get selected ticket type
  const getSelectedTicket = () => {
    return show.ticketTypes.find((ticket) => ticket.id === selectedTicketType) || show.ticketTypes[0]
  }

  // Calculate subtotal
  const subtotal = getSelectedTicket()?.price * ticketQuantity || 0
  const serviceFee = subtotal * 0.15
  const total = subtotal + serviceFee

  // Handle form submission with custom validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset validation errors
    setValidationErrors({})

    // Get form elements
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Validation for details step
    if (activeStep === "details") {
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string

      let hasErrors = false
      const errors: Record<string, string> = {}

      if (!name || name.trim().length < 2) {
        errors.name = "Please enter your full name (at least 2 characters)"
        hasErrors = true
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address"
        hasErrors = true
      }

      if (!phone) {
        errors.phone = "Please enter your phone number"
        hasErrors = true
      } else {
        const cleanPhone = phone.replace(/\s+/g, "")
        if (!kenyanPhoneRegex.test(cleanPhone)) {
          errors.phone = "Please enter a valid Kenyan phone number (e.g., 07XX XXX XXX)"
          hasErrors = true
        }
      }

      if (!termsAgreed) {
        errors.terms = "You must agree to the terms and conditions"
        hasErrors = true
      }

      if (hasErrors) {
        setValidationErrors(errors)
        return
      }

      // If validation passes, move to payment step
      setActiveStep("payment")
    } else if (activeStep === "payment") {
      // Validation for payment step
      let hasErrors = false
      const errors: Record<string, string> = {}

      if (paymentMethod === "mpesa") {
        const mpesaPhone = formData.get("mpesa-phone") as string

        if (!mpesaPhone) {
          errors.mpesaPhone = "Please enter your M-PESA phone number"
          hasErrors = true
        } else {
          const cleanPhone = mpesaPhone.replace(/\s+/g, "")
          if (!kenyanPhoneRegex.test(cleanPhone)) {
            errors.mpesaPhone = "Please enter a valid M-PESA phone number (e.g., 07XX XXX XXX)"
            hasErrors = true
          }
        }
      } else if (paymentMethod === "card") {
        const cardNumber = formData.get("card-number") as string
        const cardName = formData.get("card-name") as string
        const cardExpiry = formData.get("card-expiry") as string
        const cardCvc = formData.get("card-cvc") as string

        if (!cardNumber || !/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
          errors.cardNumber = "Please enter a valid 16-digit card number"
          hasErrors = true
        }

        if (!cardName || cardName.trim().length < 2) {
          errors.cardName = "Please enter the name on your card"
          hasErrors = true
        }

        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
          errors.cardExpiry = "Please enter a valid expiry date (MM/YY)"
          hasErrors = true
        }

        if (!cardCvc || !/^\d{3,4}$/.test(cardCvc)) {
          errors.cardCvc = "Please enter a valid CVC code"
          hasErrors = true
        }
      }

      if (!paymentTermsAgreed) {
        errors.paymentTerms = "You must agree to the payment terms"
        hasErrors = true
      }

      if (hasErrors) {
        setValidationErrors(errors)
        return
      }

      // If validation passes, process payment
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)

        // Add to cart if payment is successful
        if (getSelectedTicket()) {
          // Don't add tickets to cart, just show success message
          toast({
            title: "Tickets purchased successfully",
            description: `${ticketQuantity} ${getSelectedTicket().name} ticket(s) for ${show.title} have been purchased.`,
          })
        }
      }, 2000)
    }
  }

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= 10) {
      setTicketQuantity(value)
    }
  }

  return (
    <div className="overflow-auto max-h-screen pb-20">
      <div className="container py-8">
        {!isComplete ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="md:hidden absolute top-2 left-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm z-10"
                  aria-label="Back"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold w-full text-center md:text-left">Checkout</h1>
              </div>

              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details" disabled={activeStep !== "details"}>
                    1. Ticket Details
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold">Select Ticket Type</h2>
                        <RadioGroup
                          defaultValue={selectedTicketType.toString()}
                          onValueChange={(value) => setSelectedTicketType(Number.parseInt(value))}
                          className="mt-3 grid gap-3"
                        >
                          {show.ticketTypes.map((ticket) => (
                            <div key={ticket.id} className="flex items-start space-x-3">
                              <RadioGroupItem
                                value={ticket.id.toString()}
                                id={ticket.id.toString()}
                                className="mt-1"
                                disabled={ticket.available === false}
                              />
                              <div className="grid gap-1.5 flex-1">
                                <div className="flex items-center justify-between">
                                  <Label
                                    htmlFor={ticket.id.toString()}
                                    className={`font-medium ${ticket.available === false ? "text-muted-foreground" : ""}`}
                                  >
                                    {ticket.name} - KES {Math.round(ticket.price).toLocaleString()}
                                  </Label>
                                  {ticket.available === false && (
                                    <span className="text-xs text-destructive font-medium">Sold Out</span>
                                  )}
                                </div>
                                <p
                                  className={`text-sm ${ticket.available === false ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                                >
                                  {ticket.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Ticket Quantity</h2>
                        <div className="mt-3 flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => ticketQuantity > 1 && setTicketQuantity(ticketQuantity - 1)}
                            className="h-10 w-10"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={ticketQuantity}
                            onChange={handleQuantityChange}
                            className="mx-2 h-10 w-20 text-center"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => ticketQuantity < 10 && setTicketQuantity(ticketQuantity + 1)}
                            className="h-10 w-10"
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                        <div className="mt-3 grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="name" name="name" placeholder="John Doe" className="pl-10" />
                            </div>
                            {validationErrors.name && (
                              <p className="text-sm text-destructive">{validationErrors.name}</p>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="pl-10"
                              />
                            </div>
                            {validationErrors.email && (
                              <p className="text-sm text-destructive">{validationErrors.email}</p>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="phone" name="phone" type="tel" placeholder="07XX XXX XXX" className="pl-10" />
                            </div>
                            {validationErrors.phone && (
                              <p className="text-sm text-destructive">{validationErrors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={termsAgreed}
                          onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>
                      {validationErrors.terms && (
                        <p className="text-sm text-destructive -mt-4">{validationErrors.terms}</p>
                      )}

                      <Button type="submit" className="w-full">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold">Payment Method</h2>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-4">
                          <div className="flex items-center space-x-2 rounded-md border p-3 mb-3">
                            <RadioGroupItem value="mpesa" id="mpesa" />
                            <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                              <div className="font-medium">M-PESA</div>
                              <div className="text-sm text-muted-foreground">Pay via M-PESA mobile money</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-muted-foreground">
                                Pay with Visa, Mastercard, or other cards
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "mpesa" ? (
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="mpesa-phone">M-PESA Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="mpesa-phone" name="mpesa-phone" placeholder="07XX XXX XXX" className="pl-10" />
                            </div>
                            {validationErrors.mpesaPhone && (
                              <p className="text-sm text-destructive">{validationErrors.mpesaPhone}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              You will receive an M-PESA prompt on this number to complete payment
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="card-number"
                                name="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="pl-10"
                              />
                            </div>
                            {validationErrors.cardNumber && (
                              <p className="text-sm text-destructive">{validationErrors.cardNumber}</p>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="card-name">Name on Card</Label>
                            <Input id="card-name" name="card-name" placeholder="John Doe" />
                            {validationErrors.cardName && (
                              <p className="text-sm text-destructive">{validationErrors.cardName}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="card-expiry">Expiry Date</Label>
                              <Input id="card-expiry" name="card-expiry" placeholder="MM/YY" />
                              {validationErrors.cardExpiry && (
                                <p className="text-sm text-destructive">{validationErrors.cardExpiry}</p>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="card-cvc">CVC</Label>
                              <Input id="card-cvc" name="card-cvc" placeholder="123" />
                              {validationErrors.cardCvc && (
                                <p className="text-sm text-destructive">{validationErrors.cardCvc}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms-payment"
                          checked={paymentTermsAgreed}
                          onCheckedChange={(checked) => setPaymentTermsAgreed(checked === true)}
                        />
                        <label
                          htmlFor="terms-payment"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the payment terms and conditions
                        </label>
                      </div>
                      {validationErrors.paymentTerms && (
                        <p className="text-sm text-destructive -mt-4">{validationErrors.paymentTerms}</p>
                      )}

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Ticket details for {show.title}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{show.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {show.date} at {show.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{show.location}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        {getSelectedTicket()?.name} x {ticketQuantity}
                      </p>
                      <p className="text-sm font-medium">KES {Math.round(subtotal).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Service Fee</p>
                      <p className="text-sm font-medium">KES {Math.round(serviceFee).toLocaleString()}</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <p>Total</p>
                      <p>KES {Math.round(total).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Purchase Complete!</CardTitle>
              <CardDescription>Thank you for your purchase. Your tickets have been confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <p className="font-medium">{show.title}</p>
                <p className="text-sm text-muted-foreground">
                  {show.date} at {show.time}
                </p>
                <p className="text-sm text-muted-foreground">{show.location}</p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    {getSelectedTicket()?.name} x {ticketQuantity}
                  </p>
                  <p className="text-sm font-medium">KES {Math.round(subtotal).toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Service Fee</p>
                  <p className="text-sm font-medium">KES {Math.round(serviceFee).toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>KES {Math.round(total).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Confirmation #: TKT-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onClose} className="w-full">
                Return to Shows
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

