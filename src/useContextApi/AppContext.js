import React, { createContext, useState } from 'react'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [file, setFile]= useState(null)
    const [totalTodos, setTotalTodos] = useState(null)
  return (
      <AppContext.Provider
          value={{
              file, setFile,

              totalTodos, setTotalTodos,
          }}
      >
          {children}
          
    </AppContext.Provider>
  )
}
