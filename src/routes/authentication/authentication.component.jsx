import SigninForm from '../../components/sign-in-form/sign-in-form.component'
import Signup from '../../components/sign-up-form/sign-up-form.component'

import './authentication.styles.scss'
const Authentication = () => {
  return (
    <div className='authentication-contiainer'>
      <SigninForm></SigninForm>
      <Signup></Signup>
    </div>
  )
}

export default Authentication
