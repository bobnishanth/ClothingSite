import { useState } from 'react'
import { useContext } from 'react'

import { userContext } from '../../context/user.context'
import FormInput from '../input-form/input-form.component'
import { ReactComponent as Googlelogo } from '../../assets/googlelogo.svg'
import { ReactComponent as Facebooklogo } from '../../assets/facebooklogo.svg'

import './sign-in-from.styles.scss'

import {
  signInWithGooglePopup,
  signInWithFacebookPopup,
  signInUserWithEmailAndPassword,
} from '../../utils/firebase.util'

import Button from '../button/button.component'

const defaultFormFields = {
  email: '',
  password: '',
}

const SigninForm = () => {
  const [formField, setFormField] = useState(defaultFormFields)
  const { email, password } = formField

  const logGoogleUser = async () => {
    await signInWithGooglePopup()
    // const { user } = await signInWithGooglePopup().Its used to be like this before moving below line to User Context
    //createUserDocumentFromAuth(user) It is moved to userContext file
  }

  const logFacebookUser = async () => {
    await signInWithFacebookPopup()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormField({ ...formField, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password)

      //response.user.displayName = displayName
      if (user) {
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for Email')
          break
        case 'auth/user-not-found':
          alert('Enter Correct Username')
          break
        default:
          console.log(error)
      }
    }
  }

  return (
    <div>
      <h2>Already have an Account?</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          name='email'
          required
          type='email'
          value={email}
          onChange={handleChange}
        ></FormInput>
        <FormInput
          label='Password'
          name='password'
          required
          type='password'
          value={password}
          onChange={handleChange}
        ></FormInput>
        <div className='buttons-container'>
          <Button type='submit'>Login</Button>

          <Button type='button' buttonType='google' onClick={logGoogleUser}>
            <Googlelogo></Googlelogo>
          </Button>

          <Button type='button' buttonType='google' onClick={logFacebookUser}>
            <Facebooklogo></Facebooklogo>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
