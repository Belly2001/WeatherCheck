import { getIconeUrl } from '../utils/weather'
import { FaWind, FaTint, FaThermometerHalf } from 'react-icons/fa'
import styles from '../styles/Meteo.module.css'

export default function MeteoActuelle({ data }) {
  if (!data) return null

  return (
    <div className={styles.meteoActuelle}>
      <div className={styles.villeSection}>
        <h1 className={styles.villeNom}>{data.ville}</h1>
        <span className={styles.pays}>{data.pays}</span>
      </div>

      <div className={styles.tempSection}>
        <img
          src={getIconeUrl(data.icone)}
          alt={data.description}
          className={styles.iconeGrande}
        />
        <span className={styles.tempGrande}>{data.temp}°</span>
      </div>

      <p className={styles.description}>{data.description}</p>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <FaThermometerHalf />
          <span>Ressenti {data.ressenti}°</span>
        </div>
        <div className={styles.detailItem}>
          <FaTint />
          <span>Humidité {data.humidite}%</span>
        </div>
        <div className={styles.detailItem}>
          <FaWind />
          <span>Vent {data.vent} km/h</span>
        </div>
      </div>
    </div>
  )
}