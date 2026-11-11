import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Approach, CaseStudy, Contact, Experience, Footer, Skills } from './components/Sections'
import { GitHubActivity } from './components/GitHubActivity'
import { type ReaderViewId } from './components/ReaderView'
import { EasterEggConsole } from './components/EasterEggConsole'
import { useI18n } from './i18n/I18nProvider'

const READER_VIEW_KEY = 'reader-view-v1'
const READER_VIEWS: readonly ReaderViewId[] = ['balanced', 'overview', 'engineering', 'research']

function initialReaderView(): ReaderViewId {
  try {
    const saved = localStorage.getItem(READER_VIEW_KEY)
    if (saved && READER_VIEWS.includes(saved as ReaderViewId)) return saved as ReaderViewId
  } catch {
    // The reader remains fully usable when browser storage is unavailable.
  }
  return 'balanced'
}

export default function App() {
  const { t } = useI18n()
  const [readerView, setReaderView] = useState<ReaderViewId>(initialReaderView)

  useEffect(() => {
    try {
      localStorage.setItem(READER_VIEW_KEY, readerView)
    } catch {
      // The selected view still applies for this page session.
    }
  }, [readerView])

  const sections = readerView === 'overview'
    ? [
        <Experience key="experience" />,
        <Projects key="projects" />,
        <Skills key="skills" />,
        <CaseStudy key="case-study" />,
        <Approach key="approach" />,
        <GitHubActivity key="activity" />,
      ]
    : readerView === 'engineering'
      ? [
          <Projects key="projects" />,
          <CaseStudy key="case-study" />,
          <GitHubActivity key="activity" />,
          <Skills key="skills" />,
          <Approach key="approach" />,
          <Experience key="experience" />,
        ]
      : readerView === 'research'
        ? [
            <Approach key="approach" />,
            <Projects key="projects" />,
            <CaseStudy key="case-study" />,
            <Skills key="skills" />,
            <Experience key="experience" />,
            <GitHubActivity key="activity" />,
          ]
        : [
            <Projects key="projects" />,
            <CaseStudy key="case-study" />,
            <Skills key="skills" />,
            <Approach key="approach" />,
            <GitHubActivity key="activity" />,
            <Experience key="experience" />,
          ]

  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <Header readerView={readerView} onReaderViewChange={setReaderView} />
      <main id="main" className="container" data-reader-view={readerView}>
        <Hero />
        {sections}
        <EasterEggConsole />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
