import { Fragment, useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import Signup from '../../components/sign-up-form/sign-up-form.component'
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInWithFacebookPopup,
} from '../../utils/firebase.util'
import Button from '../../components/button/button.component'
const SignIn = () => {
  useEffect(() => {
    async function fetchdata() {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
    }
    fetchdata()
  }, [])
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(response.user)
  }
  const logFacebookUser = async () => {
    const response = await signInWithFacebookPopup()

    const userDocRef = await createUserDocumentFromAuth(response.user)
  }

  return (
    <Fragment>
      <div>
        <Signup></Signup>
      </div>
      <div>
        <Button buttonType='google' onClick={logGoogleUser}>
          Sign In with Google
        </Button>
        <Button buttonType='google' onClick={signInWithGoogleRedirect}>
          Sign In with Google Redirect
        </Button>
        <Button buttonType='google' onClick={logFacebookUser}>
          Sign In with Facebook
        </Button>
      </div>
    </Fragment>
  )
}

export default SignIn
