import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext({
  isCartopen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  decreaseItemInCart: () => {},
  addItemToCart: () => {},
  deleteItemInCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})
const addCartItems = (cartItems, productToAdd) => {
  const existingCarItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )
  if (existingCarItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}
const decreaseCartItem = (cartItems, productToDecrese) => {
  const existingCarItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecrese.id
  )
  if (existingCarItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDecrese.id)
  }
  console.log(productToDecrese)
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrese.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id)
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }
  const decreaseItemInCart = (productToDecrese) => {
    setCartItems(decreaseCartItem(cartItems, productToDecrese))
  }
  const deleteItemInCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartTotal,
    setCartTotal,
    cartCount,
    decreaseItemInCart,
    deleteItemInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
