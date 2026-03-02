// la cle API qu'on a mis dans .env.local
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// recuperer la meteo actuelle d'une ville
export async function getMeteoActuelle(ville) {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`
    )

    if (!res.ok) throw new Error('Ville introuvable')

    const data = await res.json()

    return {
      ville: data.name,
      pays: data.sys.country,
      temp: Math.round(data.main.temp),
      ressenti: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icone: data.weather[0].icon,
      humidite: data.main.humidity,
      vent: Math.round(data.wind.speed * 3.6), // convertir m/s en km/h
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max)
    }
  } catch (err) {
    console.error('Erreur meteo actuelle:', err)
    return null
  }
}

// recuperer les previsions sur 5 jours
export async function getPrevisions(ville) {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`
    )

    if (!res.ok) throw new Error('Previsions introuvables')

    const data = await res.json()

    // l'API renvoie des previsions toutes les 3h
    // on prend une seule prevision par jour (celle de midi)
    const joursUniques = []
    const joursVus = new Set()

    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]
      const heure = item.dt_txt.split(' ')[1]

      // on prend la prevision de 12h pour chaque jour
      if (!joursVus.has(date) && heure === '12:00:00') {
        joursVus.add(date)
        joursUniques.push({
          date: date,
          jour: getJourSemaine(date),
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icone: item.weather[0].icon,
          humidite: item.main.humidity,
          vent: Math.round(item.wind.speed * 3.6)
        })
      }
    })

    // on retourne les 5 premiers jours
    return joursUniques.slice(0, 5)
  } catch (err) {
    console.error('Erreur previsions:', err)
    return []
  }
}

// transformer une date en nom de jour (lundi, mardi...)
function getJourSemaine(dateStr) {
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const date = new Date(dateStr)
  return jours[date.getDay()]
}

// obtenir l'URL de l'icone meteo
export function getIconeUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`
}