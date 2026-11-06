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

  it('has exactly 14 unique selected repositories and project identifiers', () => {
    expect(PROJECTS).toHaveLength(14)
    expect(new Set(PROJECTS.map(project => project.id)).size).toBe(14)
    expect(new Set(PROJECTS.map(project => project.repo.toLowerCase())).size).toBe(14)
    expect(PROJECTS.map(project => project.repo)).toEqual([
      'Omni---New', 'Helios', 'nexus-agent', 'AetherOS', 'Mosaic', 'kilocode',
      'Dynamic-Neural-Computing', 'tensor-ring-decomposition', 'UEP',
      'decentralized-iot-network', 'ACTSConnect', 'OldAgeHome', 'MilkyWay', 'ai-os',
    ])
  })

  it('keeps category totals aligned with the visible filters', () => {
    const count = (category: string) => PROJECTS.filter(project => project.cat === category).length
    expect({ systems: count('sys'), ai: count('ai'), platforms: count('plat') }).toEqual({
      systems: 4, ai: 5, platforms: 5,
    })
  })

  it('uses only active maturity labels and provides one localized detail per project', () => {
    const allowed = new Set(['alpha', 'progress', 'spec', 'research', 'candidate', 'prototype'])
    expect(PROJECTS.every(project => allowed.has(project.status))).toBe(true)
    expect(Object.keys(PROJECT_DETAIL_KEYS).sort()).toEqual(PROJECTS.map(project => project.id).sort())
    for (const key of Object.values(PROJECT_DETAIL_KEYS)) expect(en[key as keyof typeof en]).toBeTruthy()
    expect(Object.keys(en)).not.toContain('st_active')
    expect(Object.keys(en)).not.toContain('st_earlier')
    expect(Object.keys(en)).not.toContain('st_built')
  })

  it('records Helios perception-only model use and flags the canonical-spec contradiction', () => {
    expect(PROJECTS.find(project => project.id === 'helios')?.status).toBe('spec')
    expect(en.p_helios).toContain('entirely non-neural symbolic core')
    expect(en.p_helios).toContain('untrusted observations')
    expect(en.detail_helios).toContain('No runtime implementation exists')
    expect(en.detail_helios).toContain('Specification conflict to resolve')
  })

  it('does not attribute upstream Kilo Code functionality to the personal fork', () => {
    expect(PROJECTS.find(project => project.id === 'kilo')?.name).toBe('Kilo Code fork')
    expect(en.detail_kilo).toContain('upstream README still describes the upstream product')
    expect(en.detail_kilo).toContain('experimental fork')
  })
})
