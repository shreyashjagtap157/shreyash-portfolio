import { useMemo } from 'react'
import { Dropdown, type Option } from './Dropdown'
import { useI18n } from '../i18n/I18nProvider'
import { usePrefs, THEMES, DENSITIES, type Density, type ThemeId } from '../theme/PrefsProvider'
import { ALL_CODES, BUILTIN, nativeName } from '../i18n/languages'

export function Controls() {
  const { t, lang, setLang } = useI18n()
  const { theme, density, setTheme, setDensity } = usePrefs()
  const langs = useMemo<Option[]>(() => ALL_CODES.map(c => ({ value: c, label: nativeName(c), hint: BUILTIN[c] ? t('l_built') : t('l_mt') })), [t])
  const dens = useMemo<Option[]>(() => DENSITIES.map(d => ({ value: d, label: t('dens_' + d) })), [t])
  return (
    <div className="controls">
      <Dropdown label={t('th')} value={theme} options={THEMES.map(x => ({ value: x.id, label: x.name }))} onChange={(v, o) => setTheme(v as ThemeId, o)} />
      <Dropdown label={t('lg')} value={lang} options={langs} onChange={v => setLang(v)} searchable searchLabel={t('srch')} noMatches={t('mt_no_matches')} />
      <Dropdown label={t('dens')} value={density} options={dens} onChange={v => setDensity(v as Density)} />
    </div>
  )
}
