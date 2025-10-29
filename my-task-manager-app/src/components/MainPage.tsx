import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.scss'

const MainPage = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainPage
 