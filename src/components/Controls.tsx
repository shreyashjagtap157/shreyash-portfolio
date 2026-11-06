import { useMemo } from 'react'
import { Dropdown, type Option } from './Dropdown'
import { useI18n } from '../i18n/I18nProvider'
import { usePrefs, THEMES, DENSITIES, type Density, type ThemeId } from '../theme/PrefsProvider'
import { ALL_CODES, BUILTIN, nativeName } from '../i18n/languages'

export function Controls() {
  const { t, lang, setLang } = useI18n()
  const { theme, density, setTheme, setDensity } = usePrefs()
  const languages = useMemo<Option[]>(() => ALL_CODES.map(code => ({
    value: code, label: nativeName(code), hint: BUILTIN[code] ? t('l_built') : t('l_mt'),
  })), [t])
  const densities = useMemo<Option[]>(() => DENSITIES.map(item => ({
    value: item, label: t('dens_' + item),
  })), [t])
  const themes = useMemo<Option[]>(() => THEMES.map(item => ({
    value: item.id, label: item.name,
  })), [])

  return (
    <div className="controls">
      <Dropdown label={t('th')} value={theme} options={themes}
        onChange={(value, origin) => setTheme(value as ThemeId, origin)}
        noMatches={t('mt_no_matches')} />
      <Dropdown label={t('lg')} value={lang} options={languages}
        onChange={value => setLang(value)} searchable
        searchLabel={t('srch')} noMatches={t('mt_no_matches')} />
      <Dropdown label={t('dens')} value={density} options={densities}
        onChange={value => setDensity(value as Density)}
        noMatches={t('mt_no_matches')} />
    </div>
  )
}
