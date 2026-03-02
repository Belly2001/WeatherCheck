import { FaSearch, FaCloudSun, FaUmbrella } from 'react-icons/fa'
import styles from '../styles/Steps.module.css'

export default function Steps() {
  const etapes = [
    {
      icon: <FaSearch />,
      numero: '01',
      titre: 'Cherche ta ville',
      desc: 'Tape le nom de n\'importe quelle ville dans la barre de recherche.'
    },
    {
      icon: <FaCloudSun />,
      numero: '02',
      titre: 'Consulte la météo',
      desc: 'Température, vent, humidité, prévisions sur 5 jours — tout est là.'
    },
    {
      icon: <FaUmbrella />,
      numero: '03',
      titre: 'Prépare-toi',
      desc: 'Parapluie ou lunettes de soleil ? Tu sauras quoi prendre avant de sortir.'
    }
  ]

  return (
    <section className={styles.section} id="fonctionnement">
      <h2 className={styles.titre}>Comment ça marche ?</h2>
      <p className={styles.sousTitre}>Simple, rapide et gratuit</p>

      <div className={styles.grid}>
        {etapes.map((etape, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconWrapper}>
              {etape.icon}
            </div>
            <span className={styles.numero}>{etape.numero}</span>
            <h3>{etape.titre}</h3>
            <p>{etape.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}