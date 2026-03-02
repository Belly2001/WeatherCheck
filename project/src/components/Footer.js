import { FaCloudSun, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <FaCloudSun />
          <span>WeatherCheck</span>
        </div>
        <p className={styles.desc}>
          La météo en temps réel, simple et rapide.
        </p>
        <div className={styles.socials}>
          <a href="https://github.com/Belly2001" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/ton-profil" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:ndangadonbellystar@gmail.com">
            <FaEnvelope />
          </a>
        </div>
        <p className={styles.copy}>
          © 2026 Don Belly Star NDANGA — Projet personnel
        </p>
      </div>
    </footer>
  )
}