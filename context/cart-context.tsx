"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type TicketType = {
  id: number
  eventId: number
  name: string
  price: number
  description: string
}

export type CartTicket = {
  id: string
  eventId: number
  eventName: string
  eventDate: string
  ticketType: TicketType
  price: number
  quantity: number
}

export type CartMerchandise = {
  id: string
  itemId: number
  name: string
  price: number
  image: string
  size?: string
  quantity: number
}

export type CartItem = CartTicket | CartMerchandise

type CartContextType = {
  cartItems: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addTicketToCart: (ticket: CartTicket) => void
  addMerchandiseToCart: (merchandise: CartMerchandise) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isTicket: (item: CartItem) => item is CartTicket
  isMerchandise: (item: CartItem) => item is CartMerchandise
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))

    // Calculate total price
    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
    setCartTotal(total)

    // Calculate total items
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(count)
  }, [cartItems])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  const isTicket = (item: CartItem): item is CartTicket => {
    return "eventId" in item
  }

  const isMerchandise = (item: CartItem): item is CartMerchandise => {
    return "itemId" in item
  }

  const addTicketToCart = (ticket: CartTicket) => {
    setCartItems((prevItems) => {
      // Check if this exact ticket type is already in cart
      const existingIndex = prevItems.findIndex(
        (item) => isTicket(item) && item.eventId === ticket.eventId && item.ticketType.id === ticket.ticketType.id,
      )

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        const existingItem = updatedItems[existingIndex]
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + ticket.quantity,
        }
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, ticket]
      }
    })
    openCart() // Just open the cart without showing a toast
  }

  const addMerchandiseToCart = (merchandise: CartMerchandise) => {
    setCartItems((prevItems) => {
      // Check if this exact merchandise with same size is already in cart
      const existingIndex = prevItems.findIndex(
        (item) => isMerchandise(item) && item.itemId === merchandise.itemId && item.size === merchandise.size,
      )

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        const existingItem = updatedItems[existingIndex]
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + merchandise.quantity,
        }
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, merchandise]
      }
    })
    openCart() // Just open the cart without showing a toast
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addTicketToCart,
    addMerchandiseToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isTicket,
    isMerchandise,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

