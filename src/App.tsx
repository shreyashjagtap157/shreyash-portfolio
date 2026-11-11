import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Approach, CaseStudy, Contact, Experience, Footer, Skills } from './components/Sections'
import { GitHubActivity } from './components/GitHubActivity'
import { useI18n } from './i18n/I18nProvider'
import { useReader, type ReadingLens } from './reader/ReaderProvider'
import type { ComponentType } from 'react'

type SectionEntry = readonly [string, ComponentType]

const SECTION_ORDER: Record<ReadingLens, SectionEntry[]> = {
  balanced: [['work', Projects], ['case', CaseStudy], ['skills', Skills], ['approach', Approach], ['activity', GitHubActivity], ['exp', Experience], ['contact', Contact]],
  overview: [['exp', Experience], ['work', Projects], ['skills', Skills], ['approach', Approach], ['case', CaseStudy], ['activity', GitHubActivity], ['contact', Contact]],
  engineering: [['work', Projects], ['case', CaseStudy], ['skills', Skills], ['approach', Approach], ['activity', GitHubActivity], ['exp', Experience], ['contact', Contact]],
  research: [['approach', Approach], ['case', CaseStudy], ['work', Projects], ['skills', Skills], ['activity', GitHubActivity], ['exp', Experience], ['contact', Contact]],
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
        {SECTION_ORDER[lens].map(([id, SectionComponent]) => (
          <SectionComponent key={id} />
        ))}
      </main>
      <Footer />
    </>
  )
}
