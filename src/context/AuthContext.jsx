import React, { createContext, useReducer } from 'react'
import { useState } from 'react';

const CreatedContext=createContext();


function AuthContext({children}) {
   

    const [user,setUser]=useState({userId:null});

  return (
    <CreatedContext.Provider  value={{user,setUser}}>
        {children}
    </CreatedContext.Provider>
  )
}

export {CreatedContext , AuthContext}