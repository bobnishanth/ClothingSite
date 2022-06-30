import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../context/cart.context'
import './cart-icon.styles.scss'
import { useContext } from 'react'
const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const toogle = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <div className='cart-icon-container' onClick={toogle}>
      <ShoppingIcon className='shopping-icon'></ShoppingIcon>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon
