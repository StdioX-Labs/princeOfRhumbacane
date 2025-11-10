import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AudioPlayer } from "@/components/audio-player"

// Import server actions
import {
  getAboutImages,
  getHeroImages,
  getLogoImage,
} from "./actions"

export default async function Home() {
  const aboutImages = (await getAboutImages()) || []
  const heroImages = (await getHeroImages()) || []
  const logoSrc = await getLogoImage()

  // Define the Wape Wape EP tracks
  const wapeWapeTracks = [
    { number: 1, title: "Baada Ya Kazi", audio: "/images/yaba/music/baada ya kazi.wav" },
    { number: 2, title: "Something", audio: "/images/yaba/music/something.wav" },
    { number: 3, title: "Sema", audio: "/images/yaba/music/sema.wav" },
    { number: 4, title: "Wape Wape", audio: null },
    { number: 5, title: "Adhiambo", audio: null },
    { number: 6, title: "Mazoea", audio: "/images/yaba/music/mazoea.wav" },
  ]

  return (
    <>
      <HeroSection images={heroImages} logoSrc={logoSrc} />

      <AboutSection aboutImages={aboutImages} />

      {/* Wape Wape EP Section */}
      <section id="music" className="py-16 md:py-24 lg:py-32 bg-[#1A2421] relative overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#708238]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#9DC183]/5 blur-[120px] rounded-full" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-[#F0FFF0]">Wape Wape</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#9DC183] to-transparent rounded-full mx-auto" />
              <p className="text-lg text-[#9DC183]">
                A 6-track EP exploring rhythms, emotions, and stories through sound
              </p>
            </div>

            <Card className="overflow-hidden bg-[#1A2421] border-[#708238]/30 shadow-2xl shadow-[#708238]/10">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Album Art */}
                  <div className="bg-[#708238]/10 aspect-square flex items-center justify-center relative overflow-hidden border-r border-[#708238]/20">
                    <Image
                      src="/images/yaba/wape.PNG"
                      alt="Wape Wape EP Cover"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421]/60 via-transparent to-transparent" />
                  </div>

                  {/* Track List */}
                  <div className="p-6 space-y-3 bg-[#1A2421]">
                    {wapeWapeTracks.map((track) => (
                      <div
                        key={track.number}
                        className="rounded-lg border border-[#708238]/20 bg-[#708238]/5 p-4 transition-all duration-300 hover:bg-[#708238]/10 hover:border-[#9DC183]/30"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-[#9DC183] min-w-[24px]">
                            {track.number}.
                          </span>
                          <span className="flex-1 font-medium text-[#F0FFF0]">{track.title}</span>
                          {!track.audio && (
                            <span className="text-xs text-[#9DC183]/60 italic">Preview unavailable</span>
                          )}
                        </div>
                        {track.audio && (
                          <div className="ml-9">
                            <AudioPlayer
                              src={track.audio}
                              trackTitle={track.title}
                              trackNumber={track.number}
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="pt-4 space-y-3">
                      <Button asChild className="w-full bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] border-none shadow-lg shadow-[#708238]/30 hover:shadow-[#9DC183]/40 transition-all duration-300" size="lg">
                        <Link href="/checkout" className="gap-2">
                          <ShoppingCart className="h-5 w-5" />
                          Purchase EP - KES 1,000
                        </Link>
                      </Button>
                      <p className="text-xs text-center text-[#9DC183]/70">
                        High quality digital download • All tracks included
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Contact CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1A2421] to-[#1A2421]/95 border-t border-[#708238]/20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl text-[#F0FFF0]">Get in Touch</h2>
            <p className="text-[#9DC183]">
              For bookings, collaborations, or inquiries
            </p>
            <Button asChild size="lg" className="bg-[#708238] hover:bg-[#9DC183] text-[#F0FFF0] border-none shadow-lg shadow-[#708238]/30 hover:shadow-[#9DC183]/40 transition-all duration-300">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

