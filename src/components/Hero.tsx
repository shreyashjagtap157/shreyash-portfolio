import { useI18n } from '../i18n/I18nProvider'
import { ReaderLensControl } from './ReaderLensControl'

export function Hero() {
  const { t } = useI18n()
  return (
    <div className="hero" id="about">
      <div className="hero-copy">
        <h1>{t('h1')}</h1>
        <p className="sub">{t('sub')}</p>
        <div className="actions">
          <a className="btn" href="#work">{t('b1')}</a>
          <a className="btn ghost" href="#contact">{t('b2')}</a>
          <ReaderLensControl />
        </div>
      </div>
      <div className="viz" aria-hidden="true" translate="no">
        <pre className="v-void"><b>$</b> omni build --edition 1{'\n'}<b>ok</b> lex  <b>ok</b> parse  <b>ok</b> sema{'\n'}<b>ok</b> ir   <b>..</b> codegen{'\n'}# governed by spec/, not guesswork <i>_</i></pre>
        <svg className="v-orbital" viewBox="0 0 270 190"><g stroke="currentColor" fill="none" opacity=".6"><path d="M135 95L42 35M135 95L232 45M135 95L48 160M135 95L226 150M42 35L48 160M232 45L226 150" /></g><g fill="var(--card)" stroke="currentColor" strokeWidth="1.6"><circle cx="135" cy="95" r="16" /><circle cx="42" cy="35" r="9" /><circle cx="232" cy="45" r="9" /><circle cx="48" cy="160" r="9" /><circle cx="226" cy="150" r="9" /></g><text x="135" y="99" fill="currentColor" fontSize="9" textAnchor="middle">lead</text></svg>
        <div className="v-blueprint">{['spec', 'core', 'platform', 'self-host'].map((s, i) => <span key={s}>{i > 0 && <em>→</em>}<b>{s}</b></span>)}</div>
        <div className="v-aurora"><p>Omni <small>Rust</small></p><p>NexusAgent <small>Python</small></p><p>UEP <small>Java</small></p></div>
      </div>
    </div>
  )
}
