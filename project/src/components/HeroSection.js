import { useState, useEffect } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import styles from '../styles/Hero.module.css'

const videos = [
  '/videos/soleil.mp4',
  '/videos/nuages.mp4',
  '/videos/pluie.mp4',
  '/videos/hiver.mp4'
]

export default function HeroSection() {
  const [videoActuelle, setVideoActuelle] = useState(0)

  // on change de video toutes les 4 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoActuelle((prev) => (prev + 1) % videos.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      {/* toutes les videos sont chargees des le debut, on joue juste sur l'opacite */}
      {videos.map((src, i) => (
        <video
          key={src}
          className={`${styles.videoBg} ${i === videoActuelle ? styles.videoActive : styles.videoHidden}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

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