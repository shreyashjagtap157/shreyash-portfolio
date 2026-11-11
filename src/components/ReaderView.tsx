import { useI18n } from '../i18n/I18nProvider'

export type ReaderViewId = 'balanced' | 'overview' | 'engineering' | 'research'

const OPTIONS: { value: ReaderViewId; key: string }[] = [
  { value: 'balanced', key: 'reader_balanced' },
  { value: 'overview', key: 'reader_overview' },
  { value: 'engineering', key: 'reader_engineering' },
  { value: 'research', key: 'reader_research' },
]

interface Props {
  value: ReaderViewId
  onChange: (value: ReaderViewId) => void
}

export function ReaderView({ value, onChange }: Props) {
  const { t } = useI18n()
  return (
    <section className="reader-view" aria-labelledby="reader-view-title">
      <div className="reader-view-copy">
        <span className="reader-view-kicker">{t('reader_kicker')}</span>
        <h2 id="reader-view-title">{t('reader_label')}</h2>
        <p aria-live="polite">{t('reader_desc_' + value)}</p>
      </div>
      <div className="reader-view-options" role="group" aria-label={t('reader_label')}>
        {OPTIONS.map(option => (
          <button
            key={option.value}
            type="button"
            className="reader-view-option"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {t(option.key)}
          </button>
        ))}
      </div>
    </section>
  )
}
