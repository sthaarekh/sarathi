import {createContext, useContext} from 'react'
import { CreatedContext } from '../AuthContext'

function useAuth() {
    const {state,dispatch}=useContext(CreatedContext)
  return (
    {state,dispatch}
  )
}

export default useAuth