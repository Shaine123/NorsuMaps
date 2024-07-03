import { configureStore } from "@reduxjs/toolkit"
import universalReducer from '../state/universalSlice'
import mongoDBReducer from '../state/mongoDBSlice'
const store = configureStore({
   reducer: {
       universal: universalReducer,
       mongoDB: mongoDBReducer

   }
})

export default store