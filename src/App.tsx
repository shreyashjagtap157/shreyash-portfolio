import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Approach, CaseStudy, Contact, Experience, Footer, Skills } from './components/Sections'
import { GitHubActivity } from './components/GitHubActivity'
import { useI18n } from './i18n/I18nProvider'
import { useReader, type ReadingLens } from './reader/ReaderProvider'
import type { ComponentType } from 'react'

const SECTION_ORDER: Record<ReadingLens, ComponentType[]> = {
  balanced: [Projects, CaseStudy, Skills, Approach, GitHubActivity, Experience, Contact],
  overview: [Experience, Projects, Skills, Approach, CaseStudy, GitHubActivity, Contact],
  engineering: [Projects, CaseStudy, Skills, Approach, GitHubActivity, Experience, Contact],
  research: [Approach, CaseStudy, Projects, Skills, GitHubActivity, Experience, Contact],
}

export default function App() {
  const { t } = useI18n()
  const { lens } = useReader()
  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Header />
      <main id="main" className="container">
        <Hero />
        {SECTION_ORDER[lens].map(SectionComponent => (
          <SectionComponent key={SectionComponent.name} />
        ))}
      </main>
      <Footer />
    </>
  )
}
