import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('auth') || 'null') || {
  id: '',
  username: '',
}

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, { payload }) => { // { id, username }
      localStorage.setItem('auth', JSON.stringify(payload))
      return payload
    },
    logOut: (state) => {
      localStorage.removeItem('auth')
      return { id: '', username: '' }
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
