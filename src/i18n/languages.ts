import en from './locales/en.json'
import hi from './locales/hi.json'
import mr from './locales/mr.json'
import de from './locales/de.json'
import fr from './locales/fr.json'

export type Dict = Record<string, string>
export const EN = en as Dict
export const BUILTIN: Record<string, Dict> = { en: EN, hi: hi as Dict, mr: mr as Dict, de: de as Dict, fr: fr as Dict }
// Languages offered in the picker. Built-in ones are hand-translated; the rest use on-device browser translation.
const EXTRA = ['ar','bn','bg','ca','cs','da','el','es','et','fa','fi','gu','he','hr','hu','id','it','ja','kn','ko','lt','lv','ml','ms','nl','no','pa','pl','pt','ro','ru','sk','sl','sr','sv','sw','ta','te','th','tr','uk','ur','vi','zh']
export const ALL_CODES = [...Object.keys(BUILTIN), ...EXTRA]
export const RTL = new Set(['ar', 'he', 'fa', 'ur'])

export function nativeName(code: string): string {
  try { return new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code } catch { return code }
}
export function baseCode(tag: string): string { return tag.toLowerCase().split('-')[0] }
