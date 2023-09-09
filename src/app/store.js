import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import materialReducer from '../redux/material/materialSlice'
import mapReducer from '../redux/maps/mapsSlice'
import purchaseReducer from "../redux/purchase/purchaseSlice"
import blogReducer from "../redux/blog/blogSlice"
import providerReducer from "../redux/provider/providerSlice"
import foundationReducer from "../redux/foundation/foundationSlice"
import orderReducer from "../redux/order/orderSlice"
import preReducer from '../redux/pre/preSlice'
import savedPreReducer from '../redux/savedPre/savedPreSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    material: materialReducer,
    map: mapReducer,
    purchase: purchaseReducer,
    blog: blogReducer,
    provider: providerReducer,
    found: foundationReducer,
    order: orderReducer,
    pre: preReducer,
    savedpre: savedPreReducer, 
  }
})
