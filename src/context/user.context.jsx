import { createContext } from 'react'
import { useState, useEffect } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase.util'
export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe //This is a function which ends the listener to run all the run.It is essential to invoke this to free  memory or else it will keep on Listening to the state changes
  }, [])
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
