import {createContext, useContext} from 'react'
import { CreatedContext } from '../AuthContext'

function useAuth() {
    const {user,setUser}=useContext(CreatedContext)
  return (
    {user,setUser}
  )
}

export default useAuth