import Link from "next/link"

import { Button } from "@/components/ui/button"
import { MerchandiseItem } from "@/components/merchandise-item"

const merchandiseItems = [
  {
    id: 1,
    name: "YABA Logo T-Shirt",
    description: "Classic black t-shirt with YABA logo",
    price: 2500,
    image: "/placeholder.svg?height=400&width=400&text=T-Shirt",
    category: "apparel",
    isNew: true,
    hasSizes: true,
  },
  {
    id: 2,
    name: "Tour Hoodie 2025",
    description: "Limited edition hoodie from the 2025 tour",
    price: 4500,
    image: "/placeholder.svg?height=400&width=400&text=Hoodie",
    category: "apparel",
    isNew: true,
    hasSizes: true,
  },
  {
    id: 3,
    name: "Signed Vinyl Album",
    description: "Exclusive signed vinyl of the latest album",
    price: 3800,
    image: "/placeholder.svg?height=400&width=400&text=Vinyl",
    category: "music",
    isNew: false,
    hasSizes: false,
  },
  {
    id: 4,
    name: "YABA Cap",
    description: "Adjustable cap with embroidered logo",
    price: 1800,
    image: "/placeholder.svg?height=400&width=400&text=Cap",
    category: "apparel",
    isNew: false,
    hasSizes: false,
  },
  {
    id: 5,
    name: "Tour Poster (Limited Edition)",
    description: "Numbered limited edition art print",
    price: 2200,
    image: "/placeholder.svg?height=400&width=400&text=Poster",
    category: "collectibles",
    isNew: true,
    hasSizes: false,
  },
  {
    id: 6,
    name: "YABA Tote Bag",
    description: "Canvas tote bag with artistic design",
    price: 1500,
    image: "/placeholder.svg?height=400&width=400&text=Tote",
    category: "accessories",
    isNew: false,
    hasSizes: false,
  },
]

export function MerchandiseSection() {
  return (
    <section id="merchandise" className="py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">Official Merchandise</h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Take a piece of the experience home with official YABA merchandise.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {merchandiseItems.map((item) => (
            <MerchandiseItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              isNew={item.isNew}
              hasSizes={item.hasSizes}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">View Full Shop</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

