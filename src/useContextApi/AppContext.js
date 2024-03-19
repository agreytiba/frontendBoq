import React, { createContext, useState } from 'react'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [preMapData, setPreMapData]= useState(null)
    const [showBoq, setShowBoq] = useState(false)
    const [showUserBoq, setShowUseBoq] = useState(false)
  return (
      <AppContext.Provider
          value={{
              preMapData, setPreMapData,
              showUserBoq, setShowUseBoq,
              showBoq, setShowBoq,
          }}
      >
          {children}
          
    </AppContext.Provider>
  )
}
