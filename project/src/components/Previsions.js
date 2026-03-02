import { getIconeUrl } from '../utils/weather'
import styles from '../styles/Meteo.module.css'

export default function Previsions({ jours }) {
  if (!jours || jours.length === 0) return null

  return (
    <div className={styles.previsions}>
      <h3 className={styles.previsionsTitle}>Prévisions sur 5 jours</h3>
      <div className={styles.previsionsGrid}>
        {jours.map((jour, i) => (
          <div key={i} className={styles.jourCard}>
            <span className={styles.jourNom}>{jour.jour}</span>
            <img
              src={getIconeUrl(jour.icone)}
              alt={jour.description}
              className={styles.jourIcone}
            />
            <span className={styles.jourTemp}>{jour.temp}°</span>
            <span className={styles.jourMinMax}>
              {jour.tempMin}° / {jour.tempMax}°
            </span>
            <span className={styles.jourDesc}>{jour.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}