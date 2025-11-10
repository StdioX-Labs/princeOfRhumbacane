import { Metadata } from "next"
import { Mail, Phone, MapPin } from "lucide-react"
import { EnquiryForm } from "@/components/enquiry-form"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact – YABA",
  description: "Get in touch with YABA for bookings, collaborations, or inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Get in Touch
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full mx-auto" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                For bookings, collaborations, or any inquiries, reach out and let's create something together.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    info@yaba.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +254 XXX XXX XXX
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Nairobi, Kenya
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="pt-6">
                <EnquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

