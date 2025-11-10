"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Music, CreditCard, Smartphone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa")

  // M-Pesa form data
  const [mpesaData, setMpesaData] = useState({
    phoneNumber: "",
    name: "",
    email: "",
  })

  // Card form data
  const [cardData, setCardData] = useState({
    email: "",
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleMpesaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMpesaData({
      ...mpesaData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    })
  }

  const handleMpesaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate M-Pesa STK push
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "M-Pesa Request Sent!",
        description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
      })

      // Simulate successful payment after PIN entry
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: "Your download link has been sent via SMS and email.",
        })
        setMpesaData({ phoneNumber: "", name: "", email: "" })
      }, 3000)
    }, 2000)
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate card payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful!",
        description: "Your download link has been sent to your email.",
      })
      setCardData({
        email: "",
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      })
    }, 2000)
  }

  const tracks = [
    "Baada Ya Kazi",
    "Something",
    "Sema",
    "Wape Wape",
    "Adhiambo",
    "Mazoea"
  ]

  return (
    <div className="min-h-screen bg-[#1A2421] checkout-page">
      {/* Header */}
      <div className="border-b border-[#708238]/20 bg-[#1A2421]">
        <div className="container py-6">
          <Button asChild variant="ghost" size="sm" className="text-[#F0FFF0] hover:text-[#9DC183] hover:bg-[#708238]/10">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="container py-12">
        <div className="mx-auto max-w-5xl">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl mb-3 text-[#F0FFF0]">
              Purchase Full EP
            </h1>
            <div className="w-20 h-1 bg-[#708238] rounded-full mx-auto mb-4" />
            <p className="text-[#9DC183] text-lg">
              Get all 6 tracks from Wape Wape EP
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Order Summary - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1A2421] border-[#708238]/30 shadow-xl">
                <CardHeader className="border-b border-[#708238]/20">
                  <CardTitle className="text-[#F0FFF0]">Order Summary</CardTitle>
                  <CardDescription className="text-[#9DC183]">Full EP details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* EP Info */}
                  <div className="flex items-start gap-4 p-4 bg-[#708238]/10 rounded-lg border border-[#708238]/20">
                    <div className="bg-[#708238]/20 p-3 rounded-lg">
                      <Music className="h-10 w-10 text-[#9DC183]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#F0FFF0] text-lg">Wape Wape</h3>
                      <p className="text-sm text-[#9DC183] mt-1">6-Track EP • 2025</p>
                      <p className="text-sm text-[#9DC183]/80 mt-2">
                        High quality digital downloads
                      </p>
                    </div>
                  </div>

                  {/* Track List */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#F0FFF0]">Includes:</p>
                    {tracks.map((track, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-[#9DC183]">
                        <span className="text-[#9DC183]/60">{index + 1}.</span>
                        <span>{track}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-[#708238]/20 pt-4 space-y-3">
                    <div className="flex justify-between text-[#9DC183]">
                      <span>EP Price</span>
                      <span className="font-medium">KES 1,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-[#F0FFF0]">
                      <span>Total</span>
                      <span>KES 1,000</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-[#708238]/5 p-4 rounded-lg border border-[#708238]/20 space-y-2">
                    <div className="flex items-center gap-2 text-[#9DC183]">
                      <div className="h-1.5 w-1.5 bg-[#9DC183] rounded-full" />
                      <span className="text-sm">Instant download • All 6 tracks</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9DC183]">
                      <div className="h-1.5 w-1.5 bg-[#9DC183] rounded-full" />
                      <span className="text-sm">High quality audio files</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9DC183]">
                      <div className="h-1.5 w-1.5 bg-[#9DC183] rounded-full" />
                      <span className="text-sm">Unlimited plays • No DRM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section - Takes 3 columns */}
            <div className="lg:col-span-3">
              <Card className="bg-[#1A2421] border-[#708238]/30 shadow-xl">
                <CardHeader className="border-b border-[#708238]/20">
                  <CardTitle className="text-[#F0FFF0]">Payment Method</CardTitle>
                  <CardDescription className="text-[#9DC183]">Choose how you'd like to pay</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "mpesa" | "card")} className="w-full">
                    {/* Payment Method Tabs */}
                    <TabsList className="grid w-full grid-cols-2 bg-[#708238]/10 p-1 h-auto">
                      <TabsTrigger
                        value="mpesa"
                        className="gap-2 py-3 data-[state=active]:bg-[#708238] data-[state=active]:text-[#F0FFF0] text-[#9DC183] hover:text-[#F0FFF0]"
                      >
                        <Smartphone className="h-5 w-5" />
                        <span className="font-medium">M-Pesa</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="card"
                        className="gap-2 py-3 data-[state=active]:bg-[#708238] data-[state=active]:text-[#F0FFF0] text-[#9DC183] hover:text-[#F0FFF0]"
                      >
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Card</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* M-Pesa Payment */}
                    <TabsContent value="mpesa" className="mt-8">
                      <form onSubmit={handleMpesaSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="mpesa-name" className="text-[#F0FFF0]">Full Name</Label>
                          <Input
                            id="mpesa-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={mpesaData.name}
                            onChange={handleMpesaChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mpesa-email" className="text-[#F0FFF0]">Email</Label>
                          <Input
                            id="mpesa-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={mpesaData.email}
                            onChange={handleMpesaChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            required
                          />
                          <p className="text-xs text-[#9DC183]/70">
                            Download links will be sent here
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mpesa-phone" className="text-[#F0FFF0]">M-Pesa Phone Number</Label>
                          <Input
                            id="mpesa-phone"
                            name="phoneNumber"
                            type="tel"
                            placeholder="254712345678"
                            value={mpesaData.phoneNumber}
                            onChange={handleMpesaChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            required
                          />
                          <p className="text-xs text-[#9DC183]/70">
                            Enter your Safaricom number (e.g., 254712345678)
                          </p>
                        </div>

                        <div className="bg-[#708238]/10 p-4 rounded-lg border border-[#708238]/20 space-y-3">
                          <p className="font-medium text-[#F0FFF0] flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-[#9DC183]" />
                            How it works:
                          </p>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-[#9DC183]">
                            <li>Click "Pay with M-Pesa"</li>
                            <li>You'll receive an STK push on your phone</li>
                            <li>Enter your M-Pesa PIN</li>
                            <li>Download links sent instantly</li>
                          </ol>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] font-medium py-6 text-lg"
                          size="lg"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Lock className="mr-2 h-5 w-5 animate-pulse" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Smartphone className="mr-2 h-5 w-5" />
                              Pay KES 1,000 with M-Pesa
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Card Payment */}
                    <TabsContent value="card" className="mt-8">
                      <form onSubmit={handleCardSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="card-email" className="text-[#F0FFF0]">Email</Label>
                          <Input
                            id="card-email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={cardData.email}
                            onChange={handleCardChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            required
                          />
                          <p className="text-xs text-[#9DC183]/70">
                            Download links will be sent here
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-name" className="text-[#F0FFF0]">Cardholder Name</Label>
                          <Input
                            id="card-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={cardData.name}
                            onChange={handleCardChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="card-number" className="text-[#F0FFF0]">Card Number</Label>
                          <Input
                            id="card-number"
                            name="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={handleCardChange}
                            className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry" className="text-[#F0FFF0]">Expiry Date</Label>
                            <Input
                              id="card-expiry"
                              name="expiryDate"
                              type="text"
                              placeholder="MM/YY"
                              value={cardData.expiryDate}
                              onChange={handleCardChange}
                              className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvv" className="text-[#F0FFF0]">CVV</Label>
                            <Input
                              id="card-cvv"
                              name="cvv"
                              type="text"
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={handleCardChange}
                              className="bg-[#708238]/10 border-[#708238]/30 text-[#F0FFF0] placeholder:text-[#9DC183]/50 focus:border-[#9DC183] focus:ring-[#9DC183]"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] font-medium py-6 text-lg"
                          size="lg"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Lock className="mr-2 h-5 w-5 animate-pulse" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-5 w-5" />
                              Pay KES 1,000 with Card
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-[#9DC183]/70">
                          🔒 Your payment information is secure and encrypted
                        </p>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

