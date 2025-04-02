"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"

export function CartButton() {
  const { toggleCart, cartCount } = useCart()

  return (
    <Button onClick={toggleCart} variant="outline" size="icon" className="relative" aria-label="Open shopping cart">
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0">
          {cartCount}
        </Badge>
      )}
    </Button>
  )
}

