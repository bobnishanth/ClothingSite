import ProdcutCard from '../../components/product-card/product-card.component'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { CategoriesContext } from '../../context/categories.context'
import '../category/category.styles.scss'
const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [categoriesMap, category])

  return (
    <div>
      <h2 className='title'>
        <span>{category.toUpperCase()}</span>
      </h2>
      <div className='shop-category'>
        {products &&
          products.map((product) => (
            <ProdcutCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default Category
