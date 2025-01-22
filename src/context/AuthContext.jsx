import React, { createContext, useReducer } from 'react'

const CreatedContext=createContext();

const reducer=(state,action)=>{
    switch (action.type){
        case 'Login':
                return {
                    ...state,
                    user:action.payload
                }
        case 'Logout':
            return{
                ...state , user:null
            }

        default:
                return state
    }
}

function AuthContext({children}) {
    const initialState={
        user:null
    }

    const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <CreatedContext.Provider  value={{state,dispatch}}>
        {children}
    </CreatedContext.Provider>
  )
}

export {CreatedContext , AuthContext}