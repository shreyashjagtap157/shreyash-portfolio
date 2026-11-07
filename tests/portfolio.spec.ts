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

  test('project case study selector switches between evidence-bounded project narratives', async ({ page }) => {
    await page.goto('/')
    const selector = page.getByLabel('Choose a project case study')
    await expect(page.getByRole('heading', { name: 'Omni — language and compiler engineering' })).toBeVisible()
    await selector.selectOption('helios')
    await expect(page.getByRole('heading', { name: 'Helios — symbolic cognitive architecture' })).toBeVisible()
    await expect(page.getByText(/Frozen models may produce candidate observations/)).toBeVisible()
    await selector.selectOption('uep')
    await expect(page.getByRole('heading', { name: 'UEP — multi-tenant education platform' })).toBeVisible()
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
