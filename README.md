#  WeatherCheck

Une application web pour consulter la météo en temps réel. Tu tapes le nom d'une ville et t'as directement la température, le vent, l'humidité et les prévisions sur 5 jours.

## Pourquoi ce projet ?

J'avais envie de faire un projet qui utilise une API externe. L'idée c'était d'apprendre à récupérer des données en temps réel et à les afficher avec des composants React. 

## Ce que j'ai utilisé

- **Next.js** — pour la structure et le routing
- **CSS Modules** — tout le style est fait à la main, pas de framework CSS
- **OpenWeatherMap API** — pour récupérer les données météo en temps réel
- **React Icons** — pour les icônes

## Les fonctionnalités

- Recherche de ville avec résultats instantanés
- Météo actuelle (température, ressenti, vent, humidité)
- Prévisions sur 5 jours avec icônes
- Page d'accueil avec vidéos en fond qui changent automatiquement
- Galerie d'images avec transition fluide
- Responsive (ça marche sur mobile)

## Comment lancer le projet
```bash
git clone https://github.com/Belly2001/WeatherCheck.git
cd WeatherCheck/project
npm install
```

Crée un fichier `.env.local` à la racine de `project/` :
```
NEXT_PUBLIC_WEATHER_API=ta_cle_api_ici
```

Pour obtenir une clé API gratuite, crée un compte sur [openweathermap.org](https://openweathermap.org).

Puis lance le projet :
```bash
npm run dev
```

Va sur `http://localhost:3000`




## Démo en ligne

[weather-check-mu.vercel.app](https://weather-check-mu.vercel.app)


## Auteur

**Don Belly Star NDANGA**  
L3 MIASHS Parcours Informatique — Université Toulouse Jean Jaurès  
[LinkedIn](https://www.linkedin.com/in/don-belly-star-ndanga/) · [GitHub](https://github.com/Belly2001)

---

Les données météo proviennent de l'API [OpenWeatherMap](https://openweathermap.org).