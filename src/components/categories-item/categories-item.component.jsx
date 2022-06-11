import CategoryItem from '../category-item/catergory-item.component'
import './categories-item.styles.scss'

const CategoriesItem = ({ categories }) => {
  return (
    <div className='categories-container'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category}></CategoryItem>
      ))}
    </div>
  )
}

export default CategoriesItem
