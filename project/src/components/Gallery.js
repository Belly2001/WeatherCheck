import { useState, useEffect } from 'react'
import styles from '../styles/Gallery.module.css'

const images = [
  { src: '/images/sun.jpg', texte: 'Profite du soleil ', desc: 'Journée parfaite pour sortir. Pense à la crème solaire !' },
  { src: '/images/cloud.jpg', texte: 'Ciel couvert ', desc: 'Les nuages arrivent. Garde un oeil sur les prévisions.' },
  { src: '/images/rain.jpg', texte: 'Pluie en vue ', desc: 'N\'oublie pas ton parapluie avant de partir !' },
  { src: '/images/neige.jpg', texte: 'Temps hivernal ', desc: 'Couvre-toi bien, les températures chutent.' }
]

export default function Gallery() {
  const [imageActuelle, setImageActuelle] = useState(0)

  // on change d'image toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setImageActuelle((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.section}>
      {/* toutes les images chargees des le debut */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`${styles.imageBg} ${i === imageActuelle ? styles.imageActive : styles.imageHidden}`}
          style={{ backgroundImage: `url(${img.src})` }}
        ></div>
      ))}

      <div className={styles.overlay}></div>

      {/* le texte change aussi en fondu */}
      <div className={styles.content}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`${styles.texteBlock} ${i === imageActuelle ? styles.texteActive : styles.texteHidden}`}
          >
            <h2 className={styles.titre}>{img.texte}</h2>
            <p className={styles.desc}>{img.desc}</p>
          </div>
        ))}

        <div className={styles.dots}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === imageActuelle ? styles.dotActive : ''}`}
              onClick={() => setImageActuelle(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  )
}