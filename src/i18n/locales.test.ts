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

  it('explains GitHub contribution-calendar privacy consistently in all five locales', () => {
    expect({ en: en.activity_graph_scope, de: de.activity_graph_scope, fr: fr.activity_graph_scope, hi: hi.activity_graph_scope, mr: mr.activity_graph_scope }).toEqual({
      en: "GitHub's public profile calendar may include anonymized contributions from private repositories when that setting is enabled; repository names and details are not shown.",
      de: "Der öffentliche Profilkalender von GitHub kann anonymisierte Beiträge aus privaten Repositories enthalten, wenn diese Einstellung aktiviert ist; Repository-Namen und Details werden nicht angezeigt.",
      fr: "Le calendrier public du profil GitHub peut inclure des contributions anonymisées provenant de dépôts privés lorsque cette option est activée ; les noms et les détails des dépôts ne sont pas affichés.",
      hi: "GitHub के सार्वजनिक प्रोफ़ाइल कैलेंडर में, यह सेटिंग चालू होने पर, निजी रिपॉज़िटरी के अनाम योगदान शामिल हो सकते हैं; रिपॉज़िटरी के नाम और विवरण नहीं दिखाए जाते।",
      mr: "GitHub च्या सार्वजनिक प्रोफाइल कॅलेंडरमध्ये, ही सेटिंग सुरू असल्यास, खाजगी रिपॉझिटरीमधील अनामिक योगदानांचा समावेश होऊ शकतो; रिपॉझिटरीची नावे आणि तपशील दाखवले जात नाहीत.",
    })
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

  it('describes the public Kilo fork accurately without overstating qualification', () => {
    const kilo = PROJECTS.find(project => project.id === 'kilo')
    expect(kilo?.name).toBe('Kilo Code fork')
    expect(kilo?.tags).toContain('NVIDIA NIM (experimental)')
    expect(en.detail_kilo).toContain('The public Kilo Code fork contains committed fork-specific specialist-agent and swarm implementation')
    expect(en.detail_kilo).toContain('M2 durable-state foundation has one passing focused workflow on an earlier commit dated 24 October 2026')
    expect(en.detail_kilo).toContain('M3 remains under qualification')
    expect(en.detail_kilo).toContain('NVIDIA NIM routing remains experimental')
    expect(en.p_kilo).toContain('M3 remains under qualification')
    expect(en.p_kilo).toContain('NVIDIA NIM routing remains experimental')
  })

  it('provides the reader views and safe console in every maintained locale', () => {
    const dictionaries = { en, de, fr, hi, mr }
    const keys = [
      'reader_kicker', 'reader_label', 'reader_balanced', 'reader_overview',
      'reader_engineering', 'reader_research', 'reader_desc_balanced',
      'reader_desc_overview', 'reader_desc_engineering', 'reader_desc_research',
      'console_title', 'console_intro', 'console_command_label', 'console_run',
      'console_placeholder', 'console_help', 'console_about', 'console_projects',
      'console_principles', 'console_omni', 'console_selfhost', 'console_unknown',
      'console_sudo', 'console_42', 'console_constellation',
    ] as const
    for (const [language, dictionary] of Object.entries(dictionaries)) {
      for (const key of keys) {
        expect(dictionary[key], language + ':' + key).toBeTruthy()
        expect(dictionary[key], language + ':' + key).not.toBe(key)
      }
    }
  })

  it('keeps the portfolio console explicitly non-executing and maturity-aware', () => {
    for (const dictionary of [en, de, fr, hi, mr]) {
      expect(dictionary.console_intro.length).toBeGreaterThan(40)
      expect(dictionary.console_omni).toBeTruthy()
      expect(dictionary.console_selfhost).toBeTruthy()
      expect(dictionary.console_sudo).toBeTruthy()
      expect(dictionary.console_42).toBeTruthy()
      expect(dictionary.console_constellation).toBeTruthy()
    }
    expect(en.console_omni).toContain('Full-language qualification and self-hosting are not complete')
    expect(en.console_selfhost).toContain('not a completed capability')
    expect(en.console_sudo).toContain('no elevated privileges')
    expect(en.console_constellation).toContain('not a dependency graph')
  })


  it('provides reader-specific hero introductions in all maintained locales', () => {
    const dictionaries = { en, de, fr, hi, mr }
    const keys = ['reader_hero_overview', 'reader_hero_engineering', 'reader_hero_research'] as const
    for (const [language, dictionary] of Object.entries(dictionaries)) {
      for (const key of keys) {
        expect(dictionary[key], language + ':' + key).toBeTruthy()
        expect(dictionary[key], language + ':' + key).not.toBe(key)
      }
    }
    expect(en.reader_hero_engineering).toContain('architecture')
    expect(en.reader_hero_research).toContain('assumptions')
    expect(en.reader_hero_overview).toContain('experience')
  })

})
