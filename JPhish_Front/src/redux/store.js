import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'


// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    counter: counterReducer
  },
})

export default store;