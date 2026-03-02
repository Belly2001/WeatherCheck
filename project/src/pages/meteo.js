import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { FaSearch } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MeteoActuelle from '../components/MeteoActuelle'
import Previsions from '../components/Previsions'
import { getMeteoActuelle, getPrevisions } from '../utils/weather'
import styles from '../styles/Meteo.module.css'

export default function Meteo() {
  const router = useRouter()
  const [ville, setVille] = useState('')
  const [meteo, setMeteo] = useState(null)
  const [previsions, setPrevisions] = useState([])
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  // la fonction qui va chercher la meteo
  const chercher = useCallback(async (nomVille) => {
    if (!nomVille.trim()) return

    setLoading(true)
    setErreur('')
    setMeteo(null)
    setPrevisions([])

    const [meteoData, previsionsData] = await Promise.all([
      getMeteoActuelle(nomVille),
      getPrevisions(nomVille)
    ])

    if (!meteoData) {
      setErreur('Ville introuvable. Vérifie l\'orthographe et réessaie.')
    } else {
      setMeteo(meteoData)
      setPrevisions(previsionsData)
    }

    setLoading(false)
  }, [])

// si on arrive avec une ville dans l'URL (depuis le hero)
  useEffect(() => {
    const villeURL = router.query.ville
    if (villeURL) {
      setVille(villeURL)
    }
  }, [router.query.ville])

  // quand la ville change depuis l'URL, on lance la recherche
  useEffect(() => {
    if (router.query.ville && ville === router.query.ville) {
      chercher(ville)
    }
  }, [ville, router.query.ville, chercher])

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
                  if (e.key === 'Enter') chercher(ville)
                }}
                className={styles.searchInput}
              />
              <button className={styles.searchBtn} onClick={() => chercher(ville)}>
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