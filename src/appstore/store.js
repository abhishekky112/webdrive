import { configureStore } from '@reduxjs/toolkit'
import tools from './reducers/accesblity'
import user from './reducers/userSlice'
export const store = configureStore({
  reducer: {
    tools,user
  },
})