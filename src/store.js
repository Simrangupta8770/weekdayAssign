import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters'
import jobsReducer from './jobs'
const store = configureStore({
  reducer: {
    filters: filtersReducer,
    jobs: jobsReducer,
  },
})

export default store