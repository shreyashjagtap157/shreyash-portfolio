import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { CaseStudy, Contact, Experience, Footer, Skills } from './components/Sections'
import { useI18n } from './i18n/I18nProvider'
import { useEffect } from 'react'
import { CapabilityExplorer } from './components/CapabilityExplorer'
import { ArchitectureExplorer } from './components/ArchitectureExplorer'
import { DeliverySection } from './components/DeliverySection'
import { ResearchSection } from './components/ResearchSection'

export default function App() {
  const { t } = useI18n()
  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Header />
      <main id="main" className="container">
        <Hero /><ArchitectureExplorer /><CapabilityExplorer /><Projects /><CaseStudy /><Skills /><DeliverySection /><Experience /><ResearchSection /><Contact />
      </main>
      <Footer />
    </>
  )
}
