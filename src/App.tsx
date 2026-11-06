import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Approach, CaseStudy, Contact, Experience, Footer, Skills } from './components/Sections'
import { GitHubActivity } from './components/GitHubActivity'
import { useI18n } from './i18n/I18nProvider'

export default function App() {
  const { t } = useI18n()
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Header />
      <main id="main" className="container">
        <Hero />
        <Projects />
        <CaseStudy />
        <Skills />
        <Approach />
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
