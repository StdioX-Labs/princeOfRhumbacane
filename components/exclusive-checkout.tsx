"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, User, Mail, Phone, Check, CreditCard, Gift, Star, Music, Coffee } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Add a Kenyan phone number validation regex - more flexible to accommodate various formats
const kenyanPhoneRegex = /^(?:\+254|254|0)[17][\d\s]{8,10}$/

// Exclusive offering type
type ExclusiveOffering = {
  name: string
  description: string
  price: number
  icon: string
}

// Gift type
type GiftDetails = {
  amount: number
  message: string
}

// Props type definition
type ExclusiveCheckoutProps = {
  type: "exclusive" | "gift"
  onClose: () => void
}

export function ExclusiveCheckout({ type, onClose }: ExclusiveCheckoutProps) {
  const [activeStep, setActiveStep] = useState("details")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [offering, setOffering] = useState<ExclusiveOffering | null>(null)
  const [gift, setGift] = useState<GiftDetails>({ amount: 500, message: "" })
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [paymentTermsAgreed, setPaymentTermsAgreed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [giftAmount, setGiftAmount] = useState<number>(500)
  const [customAmount, setCustomAmount] = useState<boolean>(false)

  // Load offering from session storage if type is exclusive
  useEffect(() => {
    if (type === "exclusive") {
      const storedOffering = sessionStorage.getItem("exclusiveCheckout")
      if (storedOffering) {
        try {
          const parsedOffering = JSON.parse(storedOffering)
          setOffering({
            name: parsedOffering.name,
            description: getOfferingDescription(parsedOffering.name),
            price: Number.parseInt(parsedOffering.price.replace(/,/g, "")),
            icon: getOfferingIcon(parsedOffering.name),
          })
        } catch (error) {
          console.error("Failed to parse offering from sessionStorage", error)
        }
      }
    }
  }, [type])

  // Get offering description based on name
  const getOfferingDescription = (name: string): string => {
    switch (name) {
      case "Exclusive Track":
        return "Get an unreleased track from YABA"
      case "Virtual Coffee":
        return "15-minute video chat with YABA"
      case "VIP Experience":
        return "VIP access to next show + meetup"
      default:
        return "Connect with YABA"
    }
  }

  // Get offering icon based on name
  const getOfferingIcon = (name: string): string => {
    switch (name) {
      case "Exclusive Track":
        return "music"
      case "Virtual Coffee":
        return "coffee"
      case "VIP Experience":
        return "star"
      default:
        return "star"
    }
  }

  // Get icon component based on string
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "music":
        return <Music className="h-5 w-5" />
      case "coffee":
        return <Coffee className="h-5 w-5" />
      case "star":
        return <Star className="h-5 w-5" />
      case "gift":
        return <Gift className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  // Gift amount options
  const giftAmounts = [
    { value: 500, label: "KES 500" },
    { value: 1000, label: "KES 1,000" },
    { value: 2000, label: "KES 2,000" },
    { value: 5000, label: "KES 5,000" },
    { value: 0, label: "Custom Amount" },
  ]

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

      // For gift type, also validate message and amount
      if (type === "gift" && customAmount) {
        const customAmountValue = formData.get("custom-amount") as string
        if (!customAmountValue || isNaN(Number(customAmountValue)) || Number(customAmountValue) < 100) {
          setValidationErrors({
            ...validationErrors,
            customAmount: "Please enter a valid amount (minimum KES 100)",
          })
          return
        } else {
          setGift({
            ...gift,
            amount: Number(customAmountValue),
          })
        }
      }

      if (type === "gift") {
        const message = formData.get("gift-message") as string
        setGift({
          ...gift,
          message: message,
        })
      }

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
        const mpesaPhone = formData.get("mpesa-phone-payment") as string

        if (!mpesaPhone) {
          errors.mpesaPhone = "Please enter your M-PESA phone number"
          hasErrors = true
        } else {
          // More lenient cleaning - keep only digits
          const cleanPhone = mpesaPhone.replace(/[^\d+]/g, "")

          // Try different formats if the initial validation fails
          if (!kenyanPhoneRegex.test(cleanPhone)) {
            // Try adding a leading zero if it might be missing
            const withLeadingZero = cleanPhone.startsWith("7") ? "0" + cleanPhone : cleanPhone

            if (!kenyanPhoneRegex.test(withLeadingZero)) {
              errors.mpesaPhone = "Please enter a valid M-PESA phone number (e.g., 07XX XXX XXX)"
              hasErrors = true
            } else {
              // Valid with leading zero added
              formData.set("mpesa-phone-payment", withLeadingZero)
            }
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

        toast({
          title: type === "exclusive" ? "Exclusive offering purchased!" : "Gift sent successfully!",
          description:
            type === "exclusive"
              ? `Thank you for purchasing ${offering?.name}. You'll receive details via email.`
              : "Thank you for your gift. YABA appreciates your support!",
        })
      }, 2000)
    }
  }

  // Handle gift amount change
  const handleGiftAmountChange = (value: string) => {
    const numValue = Number.parseInt(value)
    if (numValue === 0) {
      setCustomAmount(true)
    } else {
      setCustomAmount(false)
      setGiftAmount(numValue)
      setGift({
        ...gift,
        amount: numValue,
      })
    }
  }

  return (
    <div className="pb-20">
      <div className="container pt-4 pb-8">
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
                <h1 className="text-2xl font-bold w-full text-center md:text-left">
                  {type === "exclusive" ? "Exclusive Offering" : "Send a Gift"}
                </h1>
              </div>

              <Tabs value={activeStep} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details" disabled={activeStep !== "details"}>
                    1. Your Details
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      {type === "gift" && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4">Gift Amount</h2>
                          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                            <RadioGroup
                              defaultValue={giftAmount.toString()}
                              onValueChange={handleGiftAmountChange}
                              className="space-y-3"
                            >
                              {giftAmounts.map((amount) => (
                                <div key={amount.value} className="flex items-center">
                                  <div className="flex items-center flex-1">
                                    <RadioGroupItem
                                      value={amount.value.toString()}
                                      id={`amount-${amount.value}`}
                                      className="mr-3"
                                    />
                                    <Label
                                      htmlFor={`amount-${amount.value}`}
                                      className="flex-1 font-medium cursor-pointer"
                                    >
                                      {amount.label}
                                    </Label>
                                  </div>
                                  {amount.value > 0 && (
                                    <div className="text-sm text-muted-foreground">
                                      {amount.value === 500 && "Basic Support"}
                                      {amount.value === 1000 && "Fan Favorite"}
                                      {amount.value === 2000 && "Super Supporter"}
                                      {amount.value === 5000 && "Ultimate Fan"}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </RadioGroup>

                            {customAmount && (
                              <div className="mt-4 pl-7">
                                <Label htmlFor="custom-amount" className="text-sm font-medium mb-1.5 block">
                                  Enter Custom Amount (KES)
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="custom-amount"
                                    name="custom-amount"
                                    type="number"
                                    min="100"
                                    placeholder="Enter amount (min. KES 100)"
                                    className="pl-12"
                                    onChange={(e) => setGift({ ...gift, amount: Number(e.target.value) })}
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                                    KES
                                  </div>
                                </div>
                                {validationErrors.customAmount && (
                                  <p className="text-sm text-destructive mt-1">{validationErrors.customAmount}</p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-6">
                            <Label htmlFor="gift-message" className="text-base font-medium">
                              Gift Message (Optional)
                            </Label>
                            <Textarea
                              id="gift-message"
                              name="gift-message"
                              placeholder="Add a personal message to YABA..."
                              className="mt-2 min-h-[120px] resize-y"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                          <div className="grid gap-4">
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
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  placeholder="07XX XXX XXX"
                                  className="pl-10"
                                />
                              </div>
                              {validationErrors.phone && (
                                <p className="text-sm text-destructive">{validationErrors.phone}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                We'll only use this to contact you about your purchase
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mt-6">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={termsAgreed}
                            onCheckedChange={(checked) => setTermsAgreed(checked === true)}
                            className="mt-1"
                          />
                          <div>
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and conditions
                            </label>
                            <p className="text-xs text-muted-foreground mt-1">
                              By checking this box, you agree to our Terms of Service and Privacy Policy.
                            </p>
                          </div>
                        </div>
                        {validationErrors.terms && (
                          <p className="text-sm text-destructive mt-2 ml-7">{validationErrors.terms}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                        {isProcessing ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          "Complete Purchase"
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                            <div className="flex items-center space-x-3 rounded-md border p-3 transition-colors hover:bg-muted/50">
                              <RadioGroupItem value="mpesa" id="mpesa" />
                              <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                                <div className="font-medium">M-PESA</div>
                                <div className="text-sm text-muted-foreground">Pay via M-PESA mobile money</div>
                              </Label>
                              <div className="h-10 w-10 rounded bg-green-600/10 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-green-600" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 rounded-md border p-3 transition-colors hover:bg-muted/50">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex-1 cursor-pointer">
                                <div className="font-medium">Credit/Debit Card</div>
                                <div className="text-sm text-muted-foreground">
                                  Pay with Visa, Mastercard, or other cards
                                </div>
                              </Label>
                              <div className="flex space-x-1">
                                <div className="h-6 w-10 rounded bg-blue-600/10 flex items-center justify-center">
                                  <svg viewBox="0 0 24 16" className="h-3 w-8 text-blue-600" fill="currentColor">
                                    <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4v11.2C0 14.92 1.08 16 2.4 16h19.2c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0z" />
                                    <path
                                      fill="#fff"
                                      d="M9.6 6H7.2v4.8h2.4V6zm-1.2-3.6c-.66 0-1.2.54-1.2 1.2 0 .66.54 1.2 1.2 1.2.66 0 1.2-.54 1.2-1.2 0-.66-.54-1.2-1.2-1.2zM16.8 6h-2.4v4.8h2.4V6z"
                                    />
                                  </svg>
                                </div>
                                <div className="h-6 w-10 rounded bg-red-600/10 flex items-center justify-center">
                                  <svg viewBox="0 0 24 16" className="h-4 w-8 text-red-600" fill="currentColor">
                                    <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4v11.2C0 14.92 1.08 16 2.4 16h19.2c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0z" />
                                    <circle fill="#fff" cx="8" cy="8" r="5" />
                                    <circle fill="#ff0000" cx="16" cy="8" r="5" fillOpacity="0.8" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
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
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-2 text-green-600"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                              </svg>
                              You will receive an M-PESA prompt on this number to complete payment
                            </div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-900/30 mt-2">
                            <h3 className="text-sm font-medium text-green-800 dark:text-green-400 flex items-center">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                              </svg>
                              How M-PESA Payment Works
                            </h3>
                            <ol className="mt-2 text-xs text-green-700 dark:text-green-300 space-y-1 pl-6 list-decimal">
                              <li>Enter your M-PESA registered phone number</li>
                              <li>Click "Complete Purchase" to initiate payment</li>
                              <li>You'll receive an M-PESA prompt on your phone</li>
                              <li>Enter your M-PESA PIN to authorize payment</li>
                              <li>Once confirmed, your purchase will be complete</li>
                            </ol>
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
                              <div className="relative">
                                <Input id="card-cvc" name="card-cvc" placeholder="123" />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 text-muted-foreground"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                  </svg>
                                </div>
                              </div>
                              {validationErrors.cardCvc && (
                                <p className="text-sm text-destructive">{validationErrors.cardCvc}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 bg-muted/30 p-3 rounded-md">
                            <div className="flex items-center">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 mr-2"
                              >
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              Secure payment
                            </div>
                            <div className="flex space-x-2">
                              <span className="inline-block h-5 w-8 bg-blue-600/10 rounded"></span>
                              <span className="inline-block h-5 w-8 bg-red-600/10 rounded"></span>
                              <span className="inline-block h-5 w-8 bg-yellow-600/10 rounded"></span>
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

            <div className="md:col-span-1">
              <Card className="sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    {type === "exclusive" ? (
                      <>
                        <div className="bg-gradient-to-br from-rose-700 to-amber-700 text-white rounded-full p-2 shadow-mdw-md h-8 w-8 flex items-center justify-center mr-3">
                          {offering && getIconComponent(offering.icon)}
                        </div>
                        {offering?.name || "Exclusive Offering"}
                      </>
                    ) : (
                      <>
                        <div className="bg-gradient-to-br from-rose-700 to-amber-700 text-white rounded-full p-2 shadow-md h-8 w-8 flex items-center justify-center mr-3">
                          <Gift className="h-5 w-5" />
                        </div>
                        Gift to YABA
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {type === "exclusive" ? offering?.description || "Connect with YABA" : "Thank you for your support"}
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="mx-auto max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{type === "exclusive" ? "Purchase Complete!" : "Gift Sent!"}</CardTitle>
              <CardDescription>
                {type === "exclusive"
                  ? "Thank you for your purchase. Your exclusive offering has been confirmed."
                  : "Thank you for your gift. YABA appreciates your support!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                <div className="bg-gradient-to-br from-rose-700 to-amber-700 text-white rounded-full p-2 shadow-md h-10 w-10 flex items-center justify-center">
                  {type === "exclusive" ? offering && getIconComponent(offering.icon) : <Gift className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {type === "exclusive" ? offering?.name || "Exclusive Offering" : "Gift to YABA"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {type === "exclusive" ? offering?.description || "Connect with YABA" : "Thank you for your support"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between text-sm">
                  <p>Subtotal</p>
                  <p>
                    KES {type === "exclusive" ? offering?.price.toLocaleString() || "0" : gift.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p>Processing Fee</p>
                  <p>
                    KES{" "}
                    {Math.round((type === "exclusive" ? offering?.price || 0 : gift.amount) * 0.03).toLocaleString()}
                  </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>
                    KES{" "}
                    {Math.round((type === "exclusive" ? offering?.price || 0 : gift.amount) * 1.03).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/20 p-4 border border-green-200 dark:border-green-900/30">
                <div className="flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2 text-green-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    Confirmation #: {type === "exclusive" ? "EXC-" : "GIFT-"}
                    {Math.floor(Math.random() * 1000000)}
                  </p>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onClose} className="w-full">
                Return to Site
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

