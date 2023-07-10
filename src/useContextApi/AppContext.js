import React, { createContext, useState } from 'react'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [totalPatients, setTotalPatients]= useState(0)
    const [totalDoctors, setTotalDoctors]= useState(0)
    const [totalAppoints, setTotalAppoints]= useState(0)
    const [totalTodos, setTotalTodos]= useState(0)
  return (
      <AppContext.Provider
          value={{
              totalPatients, setTotalPatients,
              totalDoctors, setTotalDoctors,
              totalTodos, setTotalTodos,
              totalAppoints,setTotalAppoints
          }}
      >
          {children}
          
    </AppContext.Provider>
  )
}
