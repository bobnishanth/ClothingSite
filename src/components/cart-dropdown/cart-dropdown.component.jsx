import Button from '../button/button.component'
import '../cart-dropdown/cart-dropdown.styles.scss'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CartItem from '../cart-item/cart-item.component'
const CartDropDown = () => {
  const navigate = useNavigate()
  const handleCheckout = () => navigate('/checkout')
  const { cartItems, cartTotal } = useContext(CartContext)
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}></CartItem>
          ))
        ) : (
          <span className='empty-message'>Cart is empty</span>
        )}
      </div>
      {cartItems.length > 0 && <span>Total:$ {cartTotal}</span>}

      {cartItems.length > 0 && (
        <Button
          style={{ borderRadius: '0px' }}
          onClick={handleCheckout}
          buttonType='submit'
        >
          Go to Checkout
        </Button>
      )}
    </div>
  )
}

export default CartDropDown
