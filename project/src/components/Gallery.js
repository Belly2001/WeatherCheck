import { useState, useEffect } from 'react'
import styles from '../styles/Gallery.module.css'

// les images dans l'ordre que tu voulais
const images = [
  { src: '/images/sun.jpg', texte: 'Profite du soleil ☀️', desc: 'Journée parfaite pour sortir. Pense à la crème solaire !' },
  { src: '/images/cloud.jpg', texte: 'Ciel couvert 🌥️', desc: 'Les nuages arrivent. Garde un oeil sur les prévisions.' },
  { src: '/images/rain.jpg', texte: 'Pluie en vue 🌧️', desc: 'N\'oublie pas ton parapluie avant de partir !' },
  { src: '/images/neige.jpg', texte: 'Temps hivernal ❄️', desc: 'Couvre-toi bien, les températures chutent.' }
]

export default function Gallery() {
  const [imageActuelle, setImageActuelle] = useState(0)
  const [fondu, setFondu] = useState(true)

  // on change d'image toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setFondu(false)

      setTimeout(() => {
        setImageActuelle((prev) => (prev + 1) % images.length)
        setFondu(true)
      }, 400)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const current = images[imageActuelle]

  return (
    <section className={styles.section}>
      {/* image en fond */}
      <div
        className={`${styles.imageBg} ${fondu ? styles.visible : styles.hidden}`}
        style={{ backgroundImage: `url(${current.src})` }}
      ></div>

      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h2 className={styles.titre}>{current.texte}</h2>
        <p className={styles.desc}>{current.desc}</p>

        {/* petits points pour montrer quelle image est active */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === imageActuelle ? styles.dotActive : ''}`}
              onClick={() => {
                setFondu(false)
                setTimeout(() => {
                  setImageActuelle(i)
                  setFondu(true)
                }, 400)
              }}
            ></span>
          ))}
        </div>
      </div>
    </section>
  )
}