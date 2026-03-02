import { useState, useEffect } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import styles from '../styles/Hero.module.css'

// les videos dans l'ordre
const videos = [
  '/videos/soleil.mp4',
  '/videos/nuages.mp4',
  '/videos/pluie.mp4',
  '/videos/hiver.mp4'
]

export default function HeroSection() {
  const [videoActuelle, setVideoActuelle] = useState(0)
  const [videoSuivante, setVideoSuivante] = useState(1)
  const [enTransition, setEnTransition] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      // on lance la transition
      setEnTransition(true)

      // apres 1 seconde (duree du fondu), on switch
      setTimeout(() => {
        setVideoActuelle(videoSuivante)
        setVideoSuivante((videoSuivante + 1) % videos.length)
        setEnTransition(false)
      }, 1000)
    }, 4000)

    return () => clearInterval(timer)
  }, [videoSuivante])

  return (
    <section className={styles.hero}>
      {/* video actuelle (en dessous) */}
      <video
        key={`current-${videoActuelle}`}
        className={`${styles.videoBg} ${styles.videoBack}`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videos[videoActuelle]} type="video/mp4" />
      </video>

      {/* video suivante (par dessus, apparait en fondu) */}
      <video
        key={`next-${videoSuivante}`}
        className={`${styles.videoBg} ${styles.videoFront} ${enTransition ? styles.fadeIn : styles.fadeOut}`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videos[videoSuivante]} type="video/mp4" />
      </video>

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 className={styles.titre}>
          LA MÉTÉO,<br />
          OÙ QUE<br />
          TU SOIS
        </h1>
        <p className={styles.sousTitre}>
          Tape le nom d'une ville et découvre la météo en temps réel.
          Prévisions, température, vent — tout y est.
        </p>
        <div className={styles.searchBar}>
          <FaSearchLocation className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher une ville..."
            className={styles.searchInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                window.location.href = `/meteo?ville=${e.target.value.trim()}`
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}