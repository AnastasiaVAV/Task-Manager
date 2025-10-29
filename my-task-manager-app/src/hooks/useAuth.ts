interface UserData {
  id: string
  username: string
}

const useAuth = () => {
  const isLogin = () => !!localStorage.getItem('user')
  
  const getUserId = (): string | null => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        console.log('No user data in localStorage')
        return null
      }
      const user = JSON.parse(userData)
      return user?.id || null
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error)
      return null
    }
  }

  const logIn = (userData: UserData) => {
    return localStorage.setItem('user', JSON.stringify(userData))
  }
  const logOut = () => localStorage.removeItem('user')
  return { isLogin, getUserId, logIn, logOut }
}

export default useAuth
