import { configureStore } from '@reduxjs/toolkit'
import { supabaseApi } from '../api/supabaseApi'

import authSlice from './authSlice'

const store = configureStore({
  reducer: {
    authorization: authSlice,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(supabaseApi.middleware),
})

export default store