import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase.util'
const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log(response)
    const userDocRef = await createUserDocumentFromAuth(response.user)
    console.log(userDocRef)
  }
  return (
    <div>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
    </div>
  )
}

export default SignIn
