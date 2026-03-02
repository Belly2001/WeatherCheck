import Link from 'next/link'
import { FaCloudSun, FaHome, FaSearch, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <FaCloudSun className={styles.logoIcon} />
        <span>WeatherCheck</span>
      </Link>

      <div className={styles.links}>
        <Link href="/" className={styles.navLink}>
          <FaHome />
          <span>Accueil</span>
        </Link>
        <Link href="/meteo" className={styles.navLink}>
          <FaSearch />
          <span>Météo</span>
        </Link>
        <Link href="/#fonctionnement" className={styles.navLink}>
          <FaInfoCircle />
          <span>À propos</span>
        </Link>
        <Link href="/" className={styles.btnDeconnexion}>
          <FaSignOutAlt />
          <span>Déconnexion</span>
        </Link>
      </div>
    </nav>
  )
}