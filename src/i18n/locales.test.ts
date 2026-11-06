import { describe, expect, it } from 'vitest'
import en from './locales/en.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import hi from './locales/hi.json'
import mr from './locales/mr.json'
import { PROJECTS } from '../data/projects'
import { PROJECT_DETAIL_KEYS } from '../data/projectDetails'

describe('portfolio content integrity', () => {
  it('keeps all five maintained locale dictionaries structurally identical', () => {
    const expected = Object.keys(en).sort()
    for (const locale of [de, fr, hi, mr]) expect(Object.keys(locale).sort()).toEqual(expected)
  })

  it('uses unique project identifiers and repository slugs', () => {
    expect(new Set(PROJECTS.map(project => project.id)).size).toBe(PROJECTS.length)
    expect(new Set(PROJECTS.map(project => project.repo.toLowerCase())).size).toBe(PROJECTS.length)
  })

  it('has a localized detail-note key for each selected project', () => {
    expect(Object.keys(PROJECT_DETAIL_KEYS).sort()).toEqual(PROJECTS.map(project => project.id).sort())
    for (const key of Object.values(PROJECT_DETAIL_KEYS)) expect(en[key as keyof typeof en]).toBeTruthy()
  })

  it('does not list the duplicate legacy Omni entry or claim projects are built', () => {
    expect(PROJECTS.some(project => project.id === 'omni0')).toBe(false)
    expect(PROJECTS.every(project => project.status !== ('built' as never))).toBe(true)
  })

  it('keeps Helios a non-neural symbolic architecture with perception-only frozen models', () => {
    expect(PROJECTS.find(project => project.id === 'helios')?.status).toBe('spec')
    expect(en.p_helios).toContain('entirely non-neural symbolic core')
    expect(en.p_helios).toContain('untrusted observations')
    expect(en.detail_helios).toContain('Neural models do not perform core reasoning')
    expect(en.detail_helios).toContain('No runtime implementation exists')
  })
})
