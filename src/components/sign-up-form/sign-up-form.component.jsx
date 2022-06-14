import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase.util'
import FormInput from '../input-form/input-form.component'
import Button from '../button/button.component'
import './sign-up.styles.scss'
const Signup = () => {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const resetFormField = () => {
    setFormField({ defaultFormFields })
  }
  const [formField, setFormField] = useState(defaultFormFields)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormField({ ...formField, [name]: value })
  }
  const { displayName, email, password, confirmPassword } = formField
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password === confirmPassword) {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      response.user.displayName = displayName
      if (response) {
        await createUserDocumentFromAuth(response.user)
        resetFormField()
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          name='displayName'
          required
          type='text'
          value={displayName}
          onChange={handleChange}
        ></FormInput>
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

        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          required
          type='password'
          value={confirmPassword}
          onChange={handleChange}
        ></FormInput>
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default Signup
