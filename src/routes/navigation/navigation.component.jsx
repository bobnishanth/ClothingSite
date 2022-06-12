import '../navigation/navigation.styles.scss'
import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/logo.svg'

const Navigation = () => {
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
          <Link className='nav-link' to='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation
