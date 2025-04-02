"use client"

import { Trash2, Plus, Minus, ShoppingBag, Ticket } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MerchandiseCheckout } from "@/components/merchandise-checkout"

export function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isTicket,
    isMerchandise,
    clearCart,
  } = useCart()

  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const router = useRouter()

  // Get merchandise items from cart
  const merchandiseItems = cartItems.filter((item) => isMerchandise(item))

  const handleCheckout = () => {
    if (merchandiseItems.length > 0) {
      closeCart()
      setIsCheckoutOpen(true)
    } else {
      setIsCheckingOut(true)
      // Simulate checkout process
      setTimeout(() => {
        setIsCheckingOut(false)
        closeCart()
        router.push("/checkout")
      }, 1000)
    }
  }

  const handleCheckoutComplete = () => {
    setIsCheckoutOpen(false)
    clearCart()
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={closeCart}>
        <SheetContent className="flex w-full flex-col sm:max-w-lg">
          <SheetHeader className="px-1">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-12">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
              </div>
              <Button onClick={closeCart} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-1 py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        {isMerchandise(item) ? (
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <Ticket className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium">{item.name}</h4>
                        {isTicket(item) && (
                          <>
                            <p className="text-xs text-muted-foreground">{item.eventName}</p>
                            <p className="text-xs text-muted-foreground">{item.eventDate}</p>
                            <p className="text-xs">{item.ticketType.name}</p>
                          </>
                        )}
                        {isMerchandise(item) && item.size && <p className="text-xs">Size: {item.size}</p>}
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">KES {item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-4 pt-4">
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span>KES {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>KES {cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <SheetFooter className="flex-col gap-2 sm:flex-col">
                  <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                    {isCheckingOut ? "Processing..." : "Checkout"}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </SheetFooter>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Merchandise Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={(open) => !open && setIsCheckoutOpen(false)}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
          <MerchandiseCheckout
            cart={merchandiseItems.map((item) => ({
              product: {
                id: isMerchandise(item) ? item.itemId : 0,
                name: item.name,
                price: item.price,
                image: isMerchandise(item) ? item.image : "",
                category: "",
              },
              quantity: item.quantity,
              variant: isMerchandise(item) && item.size ? item.size : "",
            }))}
            onClose={() => setIsCheckoutOpen(false)}
            onComplete={handleCheckoutComplete}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

