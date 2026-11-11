import { test, expect } from '@playwright/test'

const THEMES = ['void', 'orbital', 'blueprint', 'aurora'] as const
const DENSITIES = ['compact', 'comfortable', 'spacious'] as const
const WIDTHS = [360, 768, 1024, 1440] as const

test.describe('responsive layout across themes and densities', () => {
  for (const theme of THEMES) {
    for (const density of DENSITIES) {
      for (const width of WIDTHS) {
        test(`${theme} / ${density} at ${width}px fits the viewport`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 })
          await page.addInitScript(({ initialTheme, initialDensity }) => {
            localStorage.setItem('theme', initialTheme)
            localStorage.setItem('density', initialDensity)
          }, { initialTheme: theme, initialDensity: density })
          await page.goto('/')
          await page.evaluate(() => document.fonts.ready)
          await expect(page.locator('h1')).toBeVisible()
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
          await expect(page.locator('html')).toHaveAttribute('data-density', density)
          const metrics = await page.evaluate(() => ({
            viewport: document.documentElement.clientWidth,
            document: document.documentElement.scrollWidth,
            body: document.body.scrollWidth,
          }))
          expect(metrics.document).toBeLessThanOrEqual(metrics.viewport)
          expect(metrics.body).toBeLessThanOrEqual(metrics.viewport)
        })
      }
    }
  }
})


test('desktop first viewport shows a balanced hero and the start of selected work', async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 785 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)

  const metrics = await page.evaluate(() => {
    const heroCopy = document.querySelector<HTMLElement>('.hero-copy')
    const heroVisual = document.querySelector<HTMLElement>('.viz')
    const selectedWorkHeading = document.querySelector<HTMLElement>('#work h2')
    if (!heroCopy || !heroVisual || !selectedWorkHeading) {
      throw new Error('The hero or selected-work section is missing from the page.')
    }
    const copy = heroCopy.getBoundingClientRect()
    const visual = heroVisual.getBoundingClientRect()
    const work = selectedWorkHeading.getBoundingClientRect()
    return {
      viewportHeight: window.innerHeight,
      copyWidth: copy.width,
      copyBottom: copy.bottom,
      visualLeft: visual.left,
      visualRight: visual.right,
      workHeadingTop: work.top,
      workHeadingBottom: work.bottom,
    }
  })

  expect(metrics.copyWidth).toBeGreaterThan(560)
  expect(metrics.copyBottom).toBeLessThan(metrics.viewportHeight)
  expect(metrics.visualLeft).toBeGreaterThan(0)
  expect(metrics.visualRight).toBeLessThan(1648)
  expect(metrics.workHeadingTop).toBeLessThan(metrics.viewportHeight)
  expect(metrics.workHeadingBottom).toBeLessThan(metrics.viewportHeight)
})

test.describe('theme, density and dropdown interactions', () => {
  test('theme and density changes persist after reload', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await page.getByRole('option', { name: 'Aurora' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'aurora')
    await page.getByRole('button', { name: /Density/ }).click()
    await page.getByRole('option', { name: 'Spacious' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-density', 'spacious')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'aurora')
    await expect(page.locator('html')).toHaveAttribute('data-density', 'spacious')
  })

  test('keyboard navigation supports arrows, Home, End, Enter, Escape, and focus restoration', async ({ page }) => {
    await page.goto('/')
    const theme = page.getByRole('button', { name: /Theme/ })
    await theme.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.keyboard.press('End')
    await page.keyboard.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'aurora')
    await expect(page.getByRole('listbox')).toBeHidden()
    await expect(theme).toBeFocused()
    await theme.click()
    await page.keyboard.press('Home')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('Tab closes a dropdown without trapping keyboard focus', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('clicking outside closes a dropdown', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.locator('h1').click()
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('language search selects an RTL locale and updates document direction', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    await page.getByRole('button', { name: /^Language:/ }).click()
    await page.getByRole('combobox', { name: /Search languages/i }).fill('ar')
    await page.getByRole('option').first().click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth }))
    expect(widths.page).toBeLessThanOrEqual(widths.viewport)
  })

  test('empty language search is safe when Enter is pressed', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /^Language:/ }).click()
    await page.getByRole('combobox', { name: /Search languages/i }).fill('not-a-real-language')
    await expect(page.getByText('No matching languages')).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('listbox')).toBeVisible()
  })

  test('reduced-motion mode still allows theme switching without animated transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await page.getByRole('option', { name: 'Blueprint' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'blueprint')
  })
})

test.describe('navigation and project behavior', () => {
  test('top navigation is horizontally scrollable with a visible scrollbar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Primary navigation' })
    const metrics = await nav.evaluate(element => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      overflowX: getComputedStyle(element).overflowX,
      scrollbarWidth: getComputedStyle(element).scrollbarWidth,
    }))
    expect(metrics.overflowX).toBe('auto')
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth)
    expect(metrics.scrollbarWidth).toBe('thin')
    await nav.evaluate(element => { element.scrollLeft = element.scrollWidth })
    expect(await nav.evaluate(element => element.scrollLeft)).toBeGreaterThan(0)
  })

  test('About is the first primary navigation item and targets the hero statement', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Primary navigation' })
    await expect(nav.getByRole('link').first()).toHaveText('About')
    await expect(nav.getByRole('link').first()).toHaveAttribute('href', '#about')
    await expect(page.locator('#about h1')).toBeVisible()
  })

  
test('desktop navigation remains scrollable until the complete row fits', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const nav = page.getByRole('navigation', { name: 'Primary navigation' })
  const controls = page.locator('.toolbar-in .controls')
  for (const width of [1100, 1200, 1360]) {
    await page.setViewportSize({ width, height: 900 })
    const metrics = await page.evaluate(() => {
      const navElement = document.querySelector<HTMLElement>('.toolbar-in .primary-nav')!
      const controlsElement = document.querySelector<HTMLElement>('.toolbar-in .controls')!
      const navRect = navElement.getBoundingClientRect()
      const controlsRect = controlsElement.getBoundingClientRect()
      return { overflowX:getComputedStyle(navElement).overflowX, scrollbarWidth:getComputedStyle(navElement).scrollbarWidth, navRight:navRect.right, controlsLeft:controlsRect.left }
    })
    expect(metrics.overflowX).toBe('auto')
    expect(metrics.scrollbarWidth).toBe('thin')
    expect(metrics.navRight).toBeLessThanOrEqual(metrics.controlsLeft + 1)
  }
  await page.setViewportSize({ width: 1440, height: 900 })
  const wide = await nav.evaluate(element => ({ overflowX:getComputedStyle(element).overflowX, scrollbarWidth:getComputedStyle(element).scrollbarWidth, scrollWidth:element.scrollWidth, clientWidth:element.clientWidth }))
  expect(wide.overflowX).toBe('auto')
  expect(wide.scrollbarWidth).toBe('none')
  expect(wide.scrollWidth).toBeLessThanOrEqual(wide.clientWidth + 1)
  await expect(controls).toBeVisible()
})

test.describe('localized project case studies', () => {
  const locales = [
    { locale:'en', omni:'Omni — language and compiler engineering', intro:'Rust compiler and toolchain', mosaic:'Mosaic-µ — byte-exact tokenization', mosaicIntro:'exact source-byte preservation' },
    { locale:'de', omni:'Omni — Sprach- und Compilerentwicklung', intro:'Rust-Compiler und eine Toolchain', mosaic:'Mosaic-µ — bytegenaue Tokenisierung', mosaicIntro:'exakte Bewahrung der Quellbytes' },
    { locale:'fr', omni:'Omni — conception de langage et de compilateur', intro:'compilateur Rust et une chaîne d’outils', mosaic:'Mosaic-µ — tokenisation exacte des octets', mosaicIntro:'préservation exacte des octets source' },
    { locale:'hi', omni:'Omni — भाषा और कंपाइलर इंजीनियरिंग', intro:'Rust compiler और toolchain', mosaic:'Mosaic-µ — बाइट-सटीक टोकनाइज़ेशन', mosaicIntro:'मूल source bytes को अक्षुण्ण रखना' },
    { locale:'mr', omni:'Omni — भाषा आणि कंपायलर अभियांत्रिकी', intro:'Rust compiler आणि toolchain', mosaic:'Mosaic-µ — बाइट-अचूक टोकनायझेशन', mosaicIntro:'मूळ source bytes अचूक जतन करण्यावर' },
  ] as const
  for (const item of locales) {
    test(`Omni and Mosaic case studies use the ${item.locale} dictionary`, async ({ page }) => {
      await page.addInitScript(locale => localStorage.setItem('lang', locale), item.locale)
      await page.goto('/')
      await expect(page.locator('.case-study-active h3')).toHaveText(item.omni)
      await expect(page.locator('.case-study-intro')).toContainText(item.intro)
      await page.locator('#case-study-project').selectOption('mosaic')
      await expect(page.locator('.case-study-active h3')).toHaveText(item.mosaic)
      await expect(page.locator('.case-study-intro')).toContainText(item.mosaicIntro)
    })
  }
})


test.describe('localized contact links', () => {
  const locales = [
    { locale:'en', linkedin:'LinkedIn — professional profile', linkedinDescription:'Career background, professional connections, and direct messaging.', github:'GitHub — shreyashjagtap157', githubDescription:'Source repositories, project history, code, and public contributions.', phone:'Phone', phoneDescription:'Direct telephone contact for relevant professional conversations.' },
    { locale:'de', linkedin:'LinkedIn — berufliches Profil', linkedinDescription:'Beruflicher Werdegang, professionelle Kontakte und direkte Nachrichten.', github:'GitHub — shreyashjagtap157', githubDescription:'Quellcode-Repositories, Projektverlauf, Code und öffentliche Beiträge.', phone:'Telefon', phoneDescription:'Direkter telefonischer Kontakt für relevante berufliche Gespräche.' },
    { locale:'fr', linkedin:'LinkedIn — profil professionnel', linkedinDescription:'Parcours professionnel, relations professionnelles et messages directs.', github:'GitHub — shreyashjagtap157', githubDescription:'Dépôts de code source, historique des projets, code et contributions publiques.', phone:'Téléphone', phoneDescription:'Contact téléphonique direct pour les échanges professionnels pertinents.' },
    { locale:'hi', linkedin:'LinkedIn — पेशेवर प्रोफ़ाइल', linkedinDescription:'करियर की जानकारी, पेशेवर संपर्क और सीधे संदेश।', github:'GitHub — shreyashjagtap157', githubDescription:'सोर्स रिपॉज़िटरी, प्रोजेक्ट इतिहास, कोड और सार्वजनिक योगदान।', phone:'फ़ोन', phoneDescription:'प्रासंगिक पेशेवर बातचीत के लिए सीधे टेलीफ़ोन पर संपर्क करें।' },
    { locale:'mr', linkedin:'LinkedIn — व्यावसायिक प्रोफाइल', linkedinDescription:'कारकिर्दीची माहिती, व्यावसायिक संपर्क आणि थेट संदेश.', github:'GitHub — shreyashjagtap157', githubDescription:'सोर्स रिपॉझिटरी, प्रकल्पाचा इतिहास, कोड आणि सार्वजनिक योगदान.', phone:'फोन', phoneDescription:'संबंधित व्यावसायिक चर्चांसाठी थेट दूरध्वनी संपर्क.' },
  ] as const
  for (const item of locales) {
    test(`contact-link copy uses the ${item.locale} dictionary`, async ({ page }) => {
      await page.addInitScript(locale => localStorage.setItem('lang', locale), item.locale)
      await page.goto('/')
      const links = page.locator('.contact-link-group')
      await expect(links.nth(0).getByRole('link')).toHaveText(item.linkedin)
      await expect(links.nth(0).locator('small')).toHaveText(item.linkedinDescription)
      await expect(links.nth(1).getByRole('link')).toHaveText(item.github)
      await expect(links.nth(1).locator('small')).toHaveText(item.githubDescription)
      await expect(links.nth(2).getByRole('link')).toContainText(item.phone)
      await expect(links.nth(2).locator('small')).toHaveText(item.phoneDescription)
    })
  }
})

test('case studies cover implemented and actively developed projects', async ({ page }) => {
  await page.goto('/')
  const selector = page.getByLabel('Choose a project case study')
  const expectedCases = ['omni', 'nexus', 'kilo', 'uep', 'mosaic', 'dnc', 'tensor']
  await expect(selector.locator('option')).toHaveCount(expectedCases.length)
  await expect(selector.locator('option[value="helios"]')).toHaveCount(0)

  for (const projectId of expectedCases) {
    await selector.selectOption(projectId)
    await expect(page.locator('.case-study-active h3')).toBeVisible()
    await expect(page.locator('.case-study-intro')).not.toBeEmpty()
    await expect(page.locator('.case-study article')).toHaveCount(3)
  }
})

  test('project visuals are diagrams rather than initial-based placeholders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.project-card .project-diagram')).toHaveCount(14)
    await expect(page.locator('.project-card .visual-symbol')).toHaveCount(0)
  })

  test('project detail and repository links remain independent', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Omni', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Omni', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /Repository/ })).toHaveAttribute(
      'href', 'https://github.com/shreyashjagtap157/Omni---New',
    )
  })

  test('every project title opens its detail card below the sticky toolbar', async ({ page }) => {
  const projects = [
    { id: 'omni', name: 'Omni' },
    { id: 'helios', name: 'Helios' },
    { id: 'nexus', name: 'NexusAgent' },
    { id: 'aether', name: 'AetherOS' },
    { id: 'mosaic', name: 'Mosaic-µ' },
    { id: 'kilo', name: 'Kilo Code fork' },
    { id: 'dnc', name: 'Dynamic Neural Computation' },
    { id: 'tensor', name: 'Tensor Ring Decomposition' },
    { id: 'uep', name: 'Universal Education Platform' },
    { id: 'iot', name: 'Decentralized IoT Network' },
    { id: 'acts', name: 'ACTSConnect' },
    { id: 'oah', name: 'OldAgeHome' },
    { id: 'milky', name: 'MilkyWay' },
    { id: 'aios', name: 'AI-OS' },
  ] as const

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  for (const project of projects) {
    await page.locator(`a.project-title[href="#project/${project.id}"]`).click()
    const detail = page.locator('#project-detail')
    await expect(detail.getByRole('heading', { name: project.name, exact: true })).toBeVisible()

    const offset = async () => detail.evaluate(element => {
      const toolbar = document.querySelector<HTMLElement>('.toolbar')
      return element.getBoundingClientRect().top - (toolbar?.getBoundingClientRect().bottom ?? 0)
    })
    await expect.poll(offset).toBeGreaterThanOrEqual(8)
    await expect.poll(offset).toBeLessThan(40)

    await page.locator('.back-link').click()
    await expect(page.locator(`a.project-title[href="#project/${project.id}"]`)).toBeVisible()
  }
})

test('category filters update the visible project collection', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('.project-card')
    await expect(cards).toHaveCount(14)
    await page.getByRole('button', { name: /AI and agents/ }).click()
    await expect(cards).toHaveCount(5)
    const showAll = page.locator('.selected-work-toolbar').getByRole('button')
    await expect(showAll).toHaveAttribute('aria-pressed', 'false')
    await showAll.click()
    await expect(showAll).toHaveAttribute('aria-pressed', 'true')
    await expect(cards).toHaveCount(14)
  })

  test('there are no duplicate IDs or nested interactive elements', async ({ page }) => {
    await page.goto('/')
    const duplicateIds = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll('[id]'), element => element.id)
      return ids.filter((id, index) => ids.indexOf(id) !== index)
    })
    expect(duplicateIds).toEqual([])
    expect(await page.locator('a a, a button, button a, button button').count()).toBe(0)
  })
})

test.describe('Cloudflare-backed GitHub activity', () => {
  test('renders structured contribution cells and public push commit links', async ({ page }) => {
    await page.route('**/api/github/activity**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        summary: '42 contributions in the last year',
        updatedAt: '2026-11-06T12:00:00Z',
        partial: false,
        contributions: Array.from({ length: 14 }, (_, index) => ({
          date: '2026-10-' + String(index + 1).padStart(2, '0'),
          level: index % 5,
        })),
        pushes: [{
          id: 'push-event-1',
          repo: 'shreyashjagtap157/Omni---New',
          createdAt: '2026-11-06T11:30:00Z',
          branch: 'main',
          message: 'Tighten compiler qualification checks',
          url: 'https://github.com/shreyashjagtap157/Omni---New/commit/0123456789abcdef0123456789abcdef01234567',
        }],
      },
    }))
    await page.goto('/')
    await page.locator('#activity').scrollIntoViewIfNeeded()
    await expect(page.getByText('42 contributions in the last year')).toBeVisible()
    await expect(page.getByText('Tighten compiler qualification checks')).toBeVisible()
    await expect(page.getByText('shreyashjagtap157/Omni---New')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open commit' })).toHaveAttribute(
      'href',
      'https://github.com/shreyashjagtap157/Omni---New/commit/0123456789abcdef0123456789abcdef01234567',
    )
    await expect(page.locator('.activity-grid .activity-cell')).toHaveCount(14)
  })

  test('shows an unavailable message when the Worker endpoint fails', async ({ page }) => {
    await page.route('**/api/github/activity**', route => route.abort())
    await page.goto('/')
    await page.locator('#activity').scrollIntoViewIfNeeded()
    await expect(page.getByText('GitHub activity could not be refreshed. Try again later.')).toBeVisible()
    await expect(page.getByText('The contribution calendar is temporarily unavailable.')).toBeVisible()
  })

  test('explains when GitHub can only provide a partial activity response', async ({ page }) => {
    await page.route('**/api/github/activity**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        summary: '42 contributions in the last year',
        updatedAt: '2026-11-06T12:00:00Z',
        partial: true,
        stale: true,
        contributions: [{ date: '2026-11-06', level: 2 }],
        pushes: [],
      },
    }))
    await page.goto('/')
    await page.locator('#activity').scrollIntoViewIfNeeded()
    await expect(page.getByText('Some activity data is temporarily stale because GitHub did not return every source.')).toBeVisible()
  })

  test('manual refresh asks the Cloudflare Worker to refresh its cached activity', async ({ page }) => {
    const requests: string[] = []
    await page.route('**/api/github/activity**', async route => {
      requests.push(route.request().url())
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          summary: '1 contribution in the last year',
          updatedAt: '2026-11-06T12:00:00Z',
          contributions: [],
          pushes: [],
        },
      })
    })
    await page.goto('/')
    await page.locator('#activity').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Refresh' }).click()
    await expect.poll(() => requests.some(url => url.includes('refresh=1'))).toBe(true)
  })
})


test.describe('audience-adaptive reading views', () => {
  test('reorders the same complete content and persists the selected reading lens', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-reader-lens', 'balanced')
    const originalUrl = page.url()
    const readOrder = () => page.locator('main .section').evaluateAll(elements => elements.map(element => element.id))

    expect(await readOrder()).toEqual(['work', 'case', 'skills', 'approach', 'activity', 'exp', 'contact'])
    await page.getByRole('button', { name: /Reading view: Balanced/ }).click()
    await page.getByRole('button', { name: /Overview/ }).click()
    await expect(page.locator('html')).toHaveAttribute('data-reader-lens', 'overview')
    expect(page.url()).toBe(originalUrl)
    expect(await readOrder()).toEqual(['exp', 'work', 'skills', 'approach', 'case', 'activity', 'contact'])
    await expect(page.locator('.project-card')).toHaveCount(14)

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-reader-lens', 'overview')
    await page.getByRole('button', { name: /Reading view: Overview/ }).click()
    await page.getByRole('button', { name: /Engineering/ }).click()
    expect(await readOrder()).toEqual(['work', 'case', 'skills', 'approach', 'activity', 'exp', 'contact'])

    await page.getByRole('button', { name: /Reading view: Engineering/ }).click()
    await page.getByRole('button', { name: /Research/ }).click()
    expect(await readOrder()).toEqual(['approach', 'case', 'work', 'skills', 'activity', 'exp', 'contact'])
    await expect(page.locator('.project-card')).toHaveCount(14)
  })

  test('reading views remain usable when local storage is blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() { throw new DOMException('Storage is blocked', 'SecurityError') },
      })
    })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-reader-lens', 'balanced')
    await page.getByRole('button', { name: /Reading view: Balanced/ }).click()
    await page.getByRole('button', { name: /Overview/ }).click()
    await expect(page.locator('html')).toHaveAttribute('data-reader-lens', 'overview')
    await expect(page.locator('#exp')).toBeVisible()
  })
})

test.describe('portfolio console easter egg', () => {
  test('runs only predefined local responses and supports Escape/focus restoration', async ({ page }) => {
    await page.goto('/')
    const launcher = page.getByRole('button', { name: 'Portfolio console' })
    await launcher.click()
    const dialog = page.getByRole('dialog', { name: 'Portfolio console' })
    await expect(dialog).toBeVisible()
    const command = dialog.getByRole('textbox', { name: 'Command' })
    const log = dialog.getByRole('log')

    await command.fill('help')
    await command.press('Enter')
    await expect(log).toContainText('Commands: help, about, projects, constellation, principles, omni, selfhost.')

    await command.fill('constellation')
    await command.press('Enter')
    await expect(log).toContainText('Systems: Omni, AetherOS, Mosaic-µ, AI-OS.')
    await expect(log).toContainText('AI and agents: Helios, NexusAgent, Kilo Code fork, Dynamic Neural Computation, Tensor Ring Decomposition.')
    await expect(log).toContainText('Platforms and web: Universal Education Platform, Decentralized IoT Network, ACTSConnect, OldAgeHome, MilkyWay.')

    for (const unsafeName of ['rm -rf /', 'constructor', 'toString', '__proto__']) {
      await command.fill(unsafeName)
      await command.press('Enter')
      await expect(log).toContainText('Unknown command. Type help to see the available commands.')
    }

    await command.fill('sudo make portfolio-awesome')
    await command.press('Enter')
    await expect(log).toContainText('Permission denied: this portfolio accepts evidence, not privilege escalation.')

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(launcher).toBeFocused()
  })

  test('the question-mark shortcut opens the same touch-accessible console', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('?')
    await expect(page.getByRole('dialog', { name: 'Portfolio console' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Portfolio console' })).toBeHidden()
  })
})


test('reader lens labels and options are localized in all five maintained locales', async ({ page }) => {
  const locales = [
    { code: 'en', label: 'Reading view' },
    { code: 'de', label: 'Lesemodus' },
    { code: 'fr', label: 'Mode de lecture' },
    { code: 'hi', label: 'पठन दृश्य' },
    { code: 'mr', label: 'वाचन दृश्य' },
  ] as const

  await page.goto('/')
  for (const locale of locales) {
    await page.evaluate(code => localStorage.setItem('lang', code), locale.code)
    await page.reload()
    const trigger = page.getByRole('button', { name: new RegExp(locale.label) })
    await expect(trigger).toBeVisible()
    await trigger.click()
    await expect(page.getByRole('group', { name: locale.label })).toBeVisible()
    await expect(page.locator('.reader-lens-menu button')).toHaveCount(4)
    await page.keyboard.press('Escape')
    await expect(page.getByRole('group', { name: locale.label })).toBeHidden()
  }
})


test('portfolio console responses are localized across all five maintained locales', async ({ page }) => {
  const locales = [
    { code: 'en', label: 'Portfolio console', response: 'Commands:' },
    { code: 'de', label: 'Portfolio-Konsole', response: 'Befehle:' },
    { code: 'fr', label: 'Console du portfolio', response: 'Commandes :' },
    { code: 'hi', label: 'पोर्टफोलियो कंसोल', response: 'कमांड:' },
    { code: 'mr', label: 'पोर्टफोलिओ कन्सोल', response: 'आदेश:' },
  ] as const
  await page.goto('/')
  for (const locale of locales) {
    await page.evaluate(code => localStorage.setItem('lang', code), locale.code)
    await page.reload()
    await page.getByRole('button', { name: locale.label }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.getByRole('textbox').fill('help')
    await dialog.getByRole('textbox').press('Enter')
    await expect(dialog.getByRole('log')).toContainText(locale.response)
    await page.keyboard.press('Escape')
  }
})
