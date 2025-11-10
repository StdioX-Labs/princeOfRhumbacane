import Image from "next/image"

export function AboutSection({ aboutImages = [] }: { aboutImages?: string[] }) {
  // Function to get image for about section
  const getAboutImage = (index: number) => {
    if (aboutImages.length > 0) {
      return aboutImages[index % aboutImages.length]
    }

    // Default placeholder images
    const placeholders = [
      "/placeholder.svg?height=600&width=400&text=Portrait",
      "/placeholder.svg?height=400&width=400&text=Studio",
      "/placeholder.svg?height=400&width=400&text=Performance",
      "/placeholder.svg?height=600&width=400&text=Stage",
    ]

    return placeholders[index]
  }

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#1A2421]/95 to-[#1A2421] relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#708238]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#9DC183]/5 blur-[120px] rounded-full" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-[#F0FFF0]">About YABA</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#708238] to-[#9DC183] rounded-full" />
            </div>

            <div className="space-y-4 text-[#9DC183]/80">
              <p className="text-lg font-medium text-[#F0FFF0]">
                YABA, also known as the Prince of Rhumbacane, is a versatile artist blending traditional rhythms
                with contemporary sounds to create a unique musical experience.
              </p>
              <p>
                Through his music, YABA tells stories that resonate with audiences, drawing from his rich cultural
                heritage and personal journey as an artist.
              </p>
              <p>
                His latest work, the "Wape Wape" EP, showcases his evolution as a musician and his commitment to
                authentic artistic expression.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="grid gap-4 md:gap-6">
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-[#708238]/10 aspect-[2/3] border border-[#708238]/20">
                <Image
                  src={getAboutImage(0) || "/placeholder.svg"}
                  alt="YABA portrait"
                  width={400}
                  height={600}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-[#708238]/10 aspect-square border border-[#708238]/20">
                <Image
                  src={getAboutImage(1) || "/placeholder.svg"}
                  alt="YABA in the studio"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid gap-4 md:gap-6 mt-8 md:mt-12">
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-[#708238]/10 aspect-square border border-[#708238]/20">
                <Image
                  src={getAboutImage(2) || "/placeholder.svg"}
                  alt="YABA performing"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-2xl shadow-[#708238]/10 aspect-[2/3] border border-[#708238]/20">
                <Image
                  src={getAboutImage(3) || "/placeholder.svg"}
                  alt="YABA on stage"
                  width={400}
                  height={600}
                  className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
