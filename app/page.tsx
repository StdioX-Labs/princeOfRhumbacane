import Link from "next/link"
import { ArrowRight, Calendar, Mail, Mic } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnquiryForm } from "@/components/enquiry-form"
import { SocialFeed } from "@/components/social-feed"
import { ShowsList } from "@/components/shows-list"
import { HeroSection } from "@/components/hero-section"
import { GallerySection } from "@/components/gallery-section"
import { VisualTimeline } from "@/components/visual-timeline"
import { Testimonials } from "@/components/testimonials"
import { PhotoCarousel } from "@/components/photo-carousel"
import { AboutSection } from "@/components/about-section"
import { MerchandiseStore } from "@/components/merchandise-store"
import { SocialMediaBanner } from "@/components/social-media-banner"

// Import server actions
import {
  getGalleryImages,
  getCarouselImages,
  getShowImages,
  getTimelineImages,
  getAboutImages,
  getSocialImages,
  getTestimonialImages,
  getMerchandiseImages,
  getHeroImages,
  getLogoImage, // Add this import
} from "./actions"

// Update the Home component to fetch the logo
export default async function Home() {
  // Fetch all images
  const galleryImages = (await getGalleryImages()) || []
  const carouselImages = (await getCarouselImages()) || []
  const showImages = (await getShowImages()) || []
  const timelineImages = (await getTimelineImages()) || []
  const aboutImages = (await getAboutImages()) || []
  const socialImages = (await getSocialImages()) || []
  const testimonialImages = (await getTestimonialImages()) || []
  const merchandiseImages = (await getMerchandiseImages()) || []
  const heroImages = (await getHeroImages()) || []
  const logoSrc = await getLogoImage() // Add this line

  return (
    <>
      <HeroSection images={heroImages} logoSrc={logoSrc} /> {/* Pass the logo */}
      {/* Rest of your components remain the same */}
      <section id="shows" className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Experience the Art of Performance
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Immerse yourself in a world of artistic expression, where every performance tells a story and every moment
            creates a memory.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex items-center justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="upcoming">
                  <Calendar className="mr-2 h-4 w-4" />
                  Shows
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Mic className="mr-2 h-4 w-4" />
                  Updates
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="upcoming" className="mt-8">
              <ShowsList showImages={showImages} />
            </TabsContent>
            <TabsContent value="social" className="mt-8">
              <SocialFeed socialImages={socialImages} />
            </TabsContent>
            <TabsContent value="contact" className="mt-8" id="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Fill out the form below for bookings, collaborations, or any other inquiries.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EnquiryForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* ... rest of your code ... */}
      <PhotoCarousel
        images={carouselImages}
        title="Performance Highlights"
        description="Capturing the essence of artistic expression through visual moments."
      />
      <AboutSection aboutImages={aboutImages} />
      <section id="merchandise">
        <MerchandiseStore merchandiseImages={merchandiseImages} />
      </section>
      <GallerySection images={galleryImages} />
      <VisualTimeline timelineImages={timelineImages} />
      {/* Add the new social media banner section here */}
      <SocialMediaBanner />
      <Testimonials testimonialImages={testimonialImages} />
      <section className="bg-muted/50 py-12 md:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Join the Journey</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Stay connected and be part of the artistic journey. Follow on social media for exclusive content and
              updates.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact" className="gap-1">
                  Book a Show
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#" className="gap-1">
                  Join Newsletter
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

