import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import appointReducer from '../redux/appointment/appointSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    
    appoint: appointReducer
  },
})
