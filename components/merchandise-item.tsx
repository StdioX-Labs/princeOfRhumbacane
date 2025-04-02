"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

type MerchandiseItemProps = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isNew?: boolean
  hasSizes?: boolean
  sizes?: string[]
}

export function MerchandiseItem({
  id,
  name,
  description,
  price,
  image,
  category,
  isNew = false,
  hasSizes = false,
  sizes = ["S", "M", "L", "XL", "XXL"],
}: MerchandiseItemProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(hasSizes ? null : "ONE SIZE")
  const [quantity, setQuantity] = useState(1)
  const { addMerchandiseToCart } = useCart()

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    addMerchandiseToCart({
      id: uuidv4(),
      itemId: id,
      name,
      price,
      image,
      size: selectedSize || undefined,
      quantity,
    })

    // toast({
    //   title: "Added to cart",
    //   description: `${name} ${selectedSize ? `(${selectedSize})` : ""} added to your cart.`,
    // })
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {isNew && (
          <div className="absolute right-2 top-2">
            <Badge>New</Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {hasSizes && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Size:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-8 min-w-[2.5rem] px-2"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="font-bold">KES {price.toLocaleString()}</div>
        <Button size="sm" onClick={handleAddToCart}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

