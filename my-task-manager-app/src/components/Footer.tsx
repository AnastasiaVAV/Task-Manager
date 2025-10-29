import styles from '../styles/components/Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <nav className={styles.footer__menu}>
          <ul className={styles.footer__menuList}>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer