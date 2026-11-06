import { EN, type Dict } from './languages'

// Chromium's on-device Translator API. No network request leaves the page.
interface TranslatorInstance { translate(text: string): Promise<string> }
interface TranslatorStatic {
  availability(o: { sourceLanguage: string; targetLanguage: string }): Promise<string>
  create(o: { sourceLanguage: string; targetLanguage: string }): Promise<TranslatorInstance>
}
const api = (): TranslatorStatic | undefined => (globalThis as unknown as { Translator?: TranslatorStatic }).Translator
const VERSION = 'v1-' + Object.keys(EN).length + '-' + Object.values(EN).join('').length

export const machineSupported = (): boolean => !!api()
export async function machineAvailability(lang: string): Promise<string> {
  const T = api()
  if (!T) return 'unavailable'
  try { return await T.availability({ sourceLanguage: 'en', targetLanguage: lang }) } catch { return 'unavailable' }
}
export function cached(lang: string): Dict | null {
  try { const raw = localStorage.getItem(`mt:${VERSION}:${lang}`); return raw ? (JSON.parse(raw) as Dict) : null } catch { return null }
}
export async function machineTranslate(lang: string): Promise<Dict> {
  const hit = cached(lang)
  if (hit) return hit
  const T = api()
  if (!T) throw new Error('unsupported')
  const tr = await T.create({ sourceLanguage: 'en', targetLanguage: lang })
  const out: Dict = {}
  for (const [k, v] of Object.entries(EN)) out[k] = /^[\w .,+()/-]*$/.test(v) && v.length < 4 ? v : await tr.translate(v)
  try { localStorage.setItem(`mt:${VERSION}:${lang}`, JSON.stringify(out)) } catch { /* storage may be unavailable */ }
  return out
}
