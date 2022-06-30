import { Link } from 'react-router-dom'
import './category-item.styles.scss'
const CategoryItem = (props) => {
  const { imageUrl, title } = props.category

  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='category-body-container'>
        <Link to={`/shop/${title}`}>
          <h2>{title.toUpperCase()}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  )
}

export default CategoryItem
