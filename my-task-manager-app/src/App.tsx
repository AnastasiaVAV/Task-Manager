import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import './App.scss'
import store from './slices/index'

import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import TasksPage from './components/TasksPage'

import useAuth from './hooks/useAuth'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const { isLogin } = useAuth()
  const loginStatus = isLogin()

  useEffect(() => {
    if (!loginStatus) {
      navigate('/')
    }
  }, [loginStatus, navigate])

  return loginStatus ? <>{children}</> : null
}

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route
                path="tasks"
                element={(
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                )}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
