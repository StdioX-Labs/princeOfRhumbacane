"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, User, Mail, Phone, MapPin, Check, Truck, Clock, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

// Add Kenyan phone number validation regex after the imports
const kenyanPhoneRegex = /^(?:\+254|254|0)[17]\d{8}$/

// Product type definition
type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  variants?: string[]
  isNew?: boolean
  isBestseller?: boolean
}

// Cart item type definition
type CartItem = {
  product: Product
  quantity: number
  variant: string
}

// Shipping method type
type ShippingMethod = {
  id: string
  name: string
  price: number
  estimatedDelivery: string
}

// Props type definition
type MerchandiseCheckoutProps = {
  cart: CartItem[]
  onClose: () => void
  onComplete: () => void
}

export function MerchandiseCheckout({ cart, onClose, onComplete }: MerchandiseCheckoutProps) {
  const [activeStep, setActiveStep] = useState("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<string>("standard")
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { clearCart } = useCart()

  // Shipping methods
  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 599,
      estimatedDelivery: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 1299,
      estimatedDelivery: "2-3 business days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 2499,
      estimatedDelivery: "Next business day",
    },
  ]

  // Get selected shipping method
  const getSelectedShipping = () => {
    return shippingMethods.find((method) => method.id === shippingMethod) || shippingMethods[0]
  }

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shippingCost = getSelectedShipping().price
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  // Custom form validation and submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Reset validation errors
    setValidationErrors({})

    // Get form elements
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Validation for shipping step
    if (activeStep === "shipping") {
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const address = formData.get("address") as string
      const city = formData.get("city") as string
      const postal = formData.get("postal") as string

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

      if (!address || address.trim().length < 5) {
        errors.address = "Please enter your street address"
        hasErrors = true
      }

      if (!city || city.trim().length < 2) {
        errors.city = "Please enter your city"
        hasErrors = true
      }

      if (!postal || postal.trim().length < 4) {
        errors.postal = "Please enter your postal code"
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
        const mpesaPhone = formData.get("mpesa-phone-payment") as string

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

      if (!termsAgreed) {
        errors.terms = "You must agree to the terms and conditions"
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

        toast({
          title: "Order placed successfully",
          description: "Your order has been placed and will be shipped soon.",
        })
      }, 2000)
    }
  }

  // Handle completion
  const handleComplete = () => {
    clearCart()
    onComplete()
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
                  <TabsTrigger value="shipping" disabled={activeStep !== "shipping"}>
                    1. Shipping
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="shipping" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
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

                      <div>
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                        <div className="mt-3 grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="address">Street Address</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input id="address" name="address" placeholder="123 Main St" className="pl-10" />
                            </div>
                            {validationErrors.address && (
                              <p className="text-sm text-destructive">{validationErrors.address}</p>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                            <Input id="address2" name="address2" placeholder="Apt 4B" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" name="city" placeholder="Nairobi" />
                              {validationErrors.city && (
                                <p className="text-sm text-destructive">{validationErrors.city}</p>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="county">County</Label>
                              <Select defaultValue="Nairobi">
                                <SelectTrigger id="county" name="county">
                                  <SelectValue placeholder="Select county" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Nairobi">Nairobi</SelectItem>
                                  <SelectItem value="Mombasa">Mombasa</SelectItem>
                                  <SelectItem value="Kisumu">Kisumu</SelectItem>
                                  <SelectItem value="Nakuru">Nakuru</SelectItem>
                                  <SelectItem value="Eldoret">Eldoret</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="postal">Postal Code</Label>
                              <Input id="postal" name="postal" placeholder="00100" />
                              {validationErrors.postal && (
                                <p className="text-sm text-destructive">{validationErrors.postal}</p>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="country">Country</Label>
                              <Select defaultValue="KE">
                                <SelectTrigger id="country" name="country">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="KE">Kenya</SelectItem>
                                  <SelectItem value="UG">Uganda</SelectItem>
                                  <SelectItem value="TZ">Tanzania</SelectItem>
                                  <SelectItem value="RW">Rwanda</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">Shipping Method</h2>
                        <RadioGroup
                          defaultValue={shippingMethod}
                          onValueChange={setShippingMethod}
                          className="mt-3 grid gap-3"
                        >
                          {shippingMethods.map((method) => (
                            <div key={method.id} className="flex items-start space-x-3">
                              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                              <div className="grid gap-1 w-full">
                                <div className="flex justify-between">
                                  <Label htmlFor={method.id} className="font-medium">
                                    {method.name}
                                  </Label>
                                  <span className="font-medium">KES {method.price.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  <span>{method.estimatedDelivery}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="notes">Order Notes (optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Special instructions for delivery or gift messages"
                          className="min-h-[80px]"
                        />
                      </div>

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
                            <RadioGroupItem value="mpesa" id="mpesa-payment" />
                            <Label htmlFor="mpesa-payment" className="flex-1 cursor-pointer">
                              <div className="font-medium">M-PESA</div>
                              <div className="text-sm text-muted-foreground">Pay via M-PESA mobile money</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value="card" id="card-payment" />
                            <Label htmlFor="card-payment" className="flex-1 cursor-pointer">
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
                            <Label htmlFor="mpesa-phone-payment">M-PESA Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="mpesa-phone-payment"
                                name="mpesa-phone-payment"
                                placeholder="07XX XXX XXX"
                                className="pl-10"
                              />
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
                  <CardDescription>
                    {cart.reduce((total, item) => total + item.quantity, 0)} items in your cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="max-h-[200px] overflow-auto">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${item.variant}`} className="flex items-center gap-4 py-2">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          {item.variant && <p className="text-xs text-muted-foreground">Size: {item.variant}</p>}
                          <div className="flex justify-between">
                            <p className="text-sm">
                              KES {item.product.price.toLocaleString()} x {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              KES {(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-sm font-medium">KES {subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Shipping</p>
                      <p className="text-sm font-medium">KES {shippingCost.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Tax</p>
                      <p className="text-sm font-medium">KES {Math.round(tax).toLocaleString()}</p>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium">
                      <p>Total</p>
                      <p>KES {Math.round(total).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Shipping via {getSelectedShipping().name}</span>
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
              <CardTitle className="text-2xl">Order Complete!</CardTitle>
              <CardDescription>Thank you for your purchase. Your order has been confirmed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Order #: ORD-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
              <div className="grid gap-2">
                <p className="font-medium">Order Summary</p>
                <div className="max-h-[150px] overflow-auto">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.variant}`}
                      className="flex items-center justify-between py-1 text-sm"
                    >
                      <span>
                        {item.product.name} {item.variant ? `(${item.variant})` : ""} x {item.quantity}
                      </span>
                      <span className="font-medium">KES {(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">KES {subtotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm font-medium">KES {shippingCost.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Tax</p>
                  <p className="text-sm font-medium">KES {Math.round(tax).toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>KES {Math.round(total).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Truck className="mr-2 h-4 w-4" />
                <span>Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleComplete} className="w-full">
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

