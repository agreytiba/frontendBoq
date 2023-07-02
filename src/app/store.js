import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import patientReducer from '../redux/patient/patientSlice'
import doctorReducer from '../redux/doctor/doctorSlices'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    doctor: doctorReducer 
  },
})
