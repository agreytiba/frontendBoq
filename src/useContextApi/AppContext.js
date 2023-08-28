import React, { createContext, useState } from 'react'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [preMapData, setPreMapData]= useState(null)
    const [totalTodos, setTotalTodos] = useState(null)
  return (
      <AppContext.Provider
          value={{
              preMapData, setPreMapData,

              totalTodos, setTotalTodos,
          }}
      >
          {children}
          
    </AppContext.Provider>
  )
}
