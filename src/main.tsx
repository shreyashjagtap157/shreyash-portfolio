import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import '@fontsource/sora/latin-300.css'
import '@fontsource/sora/latin-400.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-800.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/noto-sans-devanagari/devanagari-400.css'
import './styles/theme.css'
import './styles/app.css'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import { PrefsProvider, initPrefs } from './theme/PrefsProvider'
import { ReaderProvider } from './reader/ReaderProvider'

initPrefs()
createRoot(document.getElementById('root')!).render(
  <StrictMode><PrefsProvider><ReaderProvider><I18nProvider><App /></I18nProvider></ReaderProvider></PrefsProvider></StrictMode>,
)
