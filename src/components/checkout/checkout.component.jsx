import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import './checkout.styles.scss'
const Checkout = () => {
  const {
    cartItems,
    addItemToCart,
    decreaseItemInCart,
    deleteItemInCart,
    cartTotal,
  } = useContext(CartContext)
  return (
    <div>
      <div className='checkout-container'>
        <table>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>

          {cartItems.map((cartItem) => (
            <tr key={cartItem.id}>
              <td>
                {
                  <img
                    style={{ height: '140px', width: '120px' }}
                    src={cartItem.imageUrl}
                    alt={`${cartItem.name}`}
                  />
                }
              </td>
              <td>{cartItem.name}</td>
              <td>
                <button
                  className='button-border'
                  onClick={() => decreaseItemInCart(cartItem)}
                >
                  &lt;
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  className='button-border'
                  onClick={() => addItemToCart(cartItem)}
                >
                  &gt;
                </button>
              </td>
              <td>{cartItem.price}</td>
              <td>
                <button
                  className='button-border'
                  onClick={() => deleteItemInCart(cartItem)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>
              <span>Total:$ {cartTotal}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Checkout
