import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import styles from '../styles/components/Header.module.scss'

const Header = () => {
  const { isLogin, logOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logOut()
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <ul className={styles.menu__list} aria-label="Основное меню">
          <li className={styles.menu__listItem}>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `${styles.menu__listLink} ${isActive ? styles.active : ''}`
              }
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.menu__listItem}>
            {!isLogin ? (
              <NavLink 
                to="/login"
                className={({ isActive }) => 
                  `${styles.menu__listLink} ${isActive ? styles.active : ''}`
                }
              >
                Войти
              </NavLink>
            ) : (
              <button 
                onClick={handleLogout}
                className={`button ${styles.logoutButton}`}
              >
                Выйти
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header

