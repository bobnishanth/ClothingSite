import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './category-item.styles.scss'
const CategoryItem = (props) => {
  const { imageUrl, title, route } = props.category
  const navigate = useNavigate()
  const navigationHandler = () => navigate(route)
  return (
    <div className='category-container' onClick={navigationHandler}>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='category-body-container'>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default CategoryItem
