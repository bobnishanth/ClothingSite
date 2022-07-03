import { createContext } from 'react'
import { useEffect, useReducer } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase.util'
export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'USER_ACTION_TYPES.SET_CURRENT_USER':
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error('error')
  }
}
const INITIAL_STATE = {
  currentUser: null,
}
export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null)
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const { currentUser } = state // Destructing
  const setCurrentUser = (user) => {
    dispatch({ type: 'USER_ACTION_TYPES.SET_CURRENT_USER', payload: user })
  }
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
