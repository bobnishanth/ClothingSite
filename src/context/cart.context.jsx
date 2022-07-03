import { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer.util'

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

const INITIAL_STATE = {
  isCartopen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}
const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }

    default:
      throw new Error(`Unhandled type of ${type} in CartReducer`)
  }
}
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
  // const [isCartOpen, setIsCartOpen] = useState(false)
  // const [cartItems, setCartItems] = useState([])
  // const [cartCount, setCartCount] = useState(0)
  // const [cartTotal, setCartTotal] = useState(0)
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE)

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   )
  //   setCartCount(newCartCount)
  // }, [cartItems])

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   )
  //   setCartTotal(newCartTotal)
  // }, [cartItems])
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }
  const decreaseItemInCart = (productToDecrese) => {
    const newCartItems = decreaseCartItem(cartItems, productToDecrese)
    updateCartItemsReducer(newCartItems)
  }
  const deleteItemInCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete)
    updateCartItemsReducer(newCartItems)
  }
  const setIsCartOpen = (bool) => {
    dispatch({ type: 'SET_IS_CART_OPEN', payload: bool })
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartTotal,
    setCartTotal: 0,
    cartCount,
    decreaseItemInCart,
    deleteItemInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
