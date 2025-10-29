import { configureStore } from '@reduxjs/toolkit'
import { supabaseApi } from '../api/supabaseApi'

const store = configureStore({
  reducer: {
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(supabaseApi.middleware),
})

export default store