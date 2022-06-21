import { useContext } from 'react'
import { ProductsContext } from '../../context/products.context'
import ProdcutCard from '../../components/product-card/product-card.component'
import './shop.styles.scss'
const Shop = () => {
  const { products } = useContext(ProductsContext)
  return (
    <div className='shop-container'>
      {products.map((product) => (
        <ProdcutCard key={product.id} product={product}></ProdcutCard>
      ))}
    </div>
  )
}

export default Shop
