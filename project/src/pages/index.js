import Head from 'next/head'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Steps from '../components/Steps'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>WeatherCheck — La météo en temps réel</title>
        <meta name="description" content="Découvre la météo de ta ville en temps réel. Prévisions, température, vent." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <HeroSection />
      <Steps />
      <Gallery />
      <Footer />
    </>
  )
}