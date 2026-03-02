import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { FaSearch } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MeteoActuelle from '../components/MeteoActuelle'
import Previsions from '../components/Previsions'
import { getMeteoActuelle, getPrevisions } from '../utils/weather'
import styles from '../styles/Meteo.module.css'

// on recupere la ville depuis l'URL cote serveur
export async function getServerSideProps(context) {
  const ville = context.query.ville || ''
  let meteo = null
  let previsions = []

  if (ville) {
    const [meteoData, previsionsData] = await Promise.all([
      getMeteoActuelle(ville),
      getPrevisions(ville)
    ])
    meteo = meteoData
    previsions = previsionsData
  }

  return {
    props: { villeInitiale: ville, meteoInitiale: meteo, previsionsInitiales: previsions }
  }
}

export default function Meteo({ villeInitiale, meteoInitiale, previsionsInitiales }) {
  const router = useRouter()
  const [ville, setVille] = useState(villeInitiale)
  const [meteo, setMeteo] = useState(meteoInitiale)
  const [previsions, setPrevisions] = useState(previsionsInitiales)
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  // quand on tape une ville et on cherche
  async function chercher() {
    if (!ville.trim()) return

    setLoading(true)
    setErreur('')
    setMeteo(null)
    setPrevisions([])

    const [meteoData, previsionsData] = await Promise.all([
      getMeteoActuelle(ville),
      getPrevisions(ville)
    ])

    if (!meteoData) {
      setErreur('Ville introuvable. Vérifie l\'orthographe et réessaie.')
    } else {
      setMeteo(meteoData)
      setPrevisions(previsionsData)
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>
          {meteo ? `${meteo.ville} — ${meteo.temp}° | WeatherCheck` : 'Météo — WeatherCheck'}
        </title>
      </Head>

      <Navbar />

      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Tape une ville..."
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') chercher()
                }}
                className={styles.searchInput}
              />
              <button className={styles.searchBtn} onClick={chercher}>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className={styles.content}>
            {!meteo && !loading && !erreur && (
              <div className={styles.messageVide}>
                <span>🌤️</span>
                Tape le nom d'une ville pour voir la météo
              </div>
            )}

            {loading && (
              <div className={styles.loader}>
                Chargement...
              </div>
            )}

            {erreur && (
              <div className={styles.erreur}>
                ❌ {erreur}
              </div>
            )}

            {meteo && (
              <>
                <MeteoActuelle data={meteo} />
                <Previsions jours={previsions} />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}