import '../navigation/navigation.styles.scss'
import { Fragment } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { Link, Outlet } from 'react-router-dom'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { userContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase.util'

const Navigation = () => {
  const { currentUser } = useContext(userContext)
  const { isCartOpen } = useContext(CartContext)

  const handleSignOut = async () => {
    await signOutUser()
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <Logo className='logo'></Logo>
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {currentUser ? (
            <span className='nav-link' to='/shop' onClick={handleSignOut}>
              Sign Out<br></br>
              {currentUser.email}
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              Sign In
            </Link>
          )}
          <CartIcon></CartIcon>
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation
