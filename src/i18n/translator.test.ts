import { describe, it, expect, beforeEach, afterEach } from 'vitest'

// Modules under test
import { BUILTIN, EN, ALL_CODES, RTL, baseCode } from '../i18n/languages'
import { machineSupported, machineAvailability, cached, machineTranslate } from '../i18n/translator'

describe('i18n locales', () => {
  it('has all five built-in locales', () => {
    for (const code of ['en', 'hi', 'mr', 'de', 'fr']) {
      expect(BUILTIN[code]).toBeDefined()
      expect(typeof BUILTIN[code].h1).toBe('string')
      expect(BUILTIN[code].h1.length).toBeGreaterThan(0)
    }
  })

  it('every built-in locale shares the same key set as en', () => {
    const enKeys = Object.keys(EN).sort()
    for (const code of ['hi', 'mr', 'de', 'fr']) {
      const keys = Object.keys(BUILTIN[code]).sort()
      expect(keys).toEqual(enKeys)
    }
  })

  it('RTL set contains expected codes', () => {
    expect(RTL.has('ar')).toBe(true)
    expect(RTL.has('he')).toBe(true)
    expect(RTL.has('fa')).toBe(true)
    expect(RTL.has('ur')).toBe(true)
    expect(RTL.has('en')).toBe(false)
  })

  it('baseCode strips region subtags', () => {
    expect(baseCode('en-US')).toBe('en')
    expect(baseCode('ar-SA')).toBe('ar')
    expect(baseCode('pt-BR')).toBe('pt')
    expect(baseCode('de')).toBe('de')
  })

  it('ALL_CODES includes built-ins plus extras', () => {
    for (const code of ['en', 'hi', 'mr', 'de', 'fr']) {
      expect(ALL_CODES).toContain(code)
    }
    expect(ALL_CODES).toContain('ar')
    expect(ALL_CODES).toContain('zh')
  })
})

describe('translator fallback logic', () => {
  let originalTranslator: unknown

  beforeEach(() => {
    originalTranslator = (globalThis as unknown as { Translator?: unknown }).Translator
    ;(globalThis as unknown as { Translator?: unknown }).Translator = undefined
    localStorage.clear()
  })

  afterEach(() => {
    ;(globalThis as unknown as { Translator?: unknown }).Translator = originalTranslator
    localStorage.clear()
  })

  it('machineSupported is false when Translator API is absent', () => {
    expect(machineSupported()).toBe(false)
  })

  it('machineAvailability returns unavailable when API absent', async () => {
    await expect(machineAvailability('ar')).resolves.toBe('unavailable')
  })

  it('cached returns null when nothing stored', () => {
    expect(cached('ar')).toBeNull()
  })

  it('machineTranslate throws when API absent', async () => {
    await expect(machineTranslate('ar')).rejects.toThrow('unsupported')
  })

  it('machineTranslate uses cache when available', async () => {
    const dict = { a: '1', b: '2' }
    // Use the module's own cache key
    localStorage.setItem(`mt:${'v1-' + Object.keys(EN).length + '-' + Object.values(EN).join('').length}:ar`, JSON.stringify(dict))
    const result = await machineTranslate('ar')
    expect(result).toEqual(dict)
  })
})
