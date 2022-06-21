import Button from '../button/button.component'
import '../product-card/product-card.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
const ProdcutCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext)
  const { id, name, price, imageUrl } = product
  const addProductToCart = () => addItemToCart(product)
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}></img>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
        <Button onClick={addProductToCart} buttonType='inverted'>
          Add to Card
        </Button>
      </div>
    </div>
  )
}

export default ProdcutCard
