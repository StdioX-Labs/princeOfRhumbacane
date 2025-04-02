import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingForm } from "@/components/booking-form"

export const metadata = {
  title: "Contact YABA | Bookings & Inquiries",
  description: "Get in touch with YABA for bookings, songwriting proposals, and special requests.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Get in Touch
              </h1>
              <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                Whether you're interested in booking a performance, collaborating on songwriting, or have a special
                request, we'd love to hear from you.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

