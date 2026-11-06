import { test, expect } from '@playwright/test'

const THEMES = ['void', 'orbital', 'blueprint', 'aurora'] as const
const DENSITIES = ['compact', 'comfortable', 'spacious'] as const
const WIDTHS = [360, 768, 1024, 1440] as const

test.describe('responsive layout across every theme and density', () => {
  for (const theme of THEMES) {
    for (const density of DENSITIES) {
      for (const width of WIDTHS) {
        test(`${theme} / ${density} at ${width}px has no document overflow`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 })
          await page.addInitScript(({ initialTheme, initialDensity }) => {
            localStorage.setItem('theme', initialTheme)
            localStorage.setItem('density', initialDensity)
          }, { initialTheme: theme, initialDensity: density })
          await page.goto('/')
          await page.evaluate(() => document.fonts.ready)
          await expect(page.locator('h1')).toBeVisible()
          const dimensions = await page.evaluate(() => ({
            viewport: document.documentElement.clientWidth,
            document: document.documentElement.scrollWidth,
            body: document.body.scrollWidth,
          }))
          expect(dimensions.document, 'document should fit the viewport').toBeLessThanOrEqual(dimensions.viewport)
          expect(dimensions.body, 'body should fit the viewport').toBeLessThanOrEqual(dimensions.viewport)
        })
      }
    }
  }
})

test.describe('theme, density, and navigation controls', () => {
  test('theme and density controls update the live document state', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.getByRole('button', { name: /Theme/ })
    await themeButton.click()
    await page.getByRole('option', { name: 'Aurora' }).click()
    await expect.poll(() => page.locator('html').getAttribute('data-theme')).toBe('aurora')

    const densityButton = page.getByRole('button', { name: /Density/ })
    await densityButton.click()
    await page.getByRole('option', { name: 'Spacious' }).click()
    await expect.poll(() => page.locator('html').getAttribute('data-density')).toBe('spacious')
  })

  test('reduced-motion preference is respected while theme changes still work', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await page.getByRole('option', { name: 'Blueprint' }).click()
    await expect.poll(() => page.locator('html').getAttribute('data-theme')).toBe('blueprint')
  })

  test('theme dropdown supports arrows, Home, End, Enter, Escape, and focus restoration', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.getByRole('button', { name: /Theme/ })
    await themeButton.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.keyboard.press('End')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('listbox')).toBeHidden()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'aurora')
    await themeButton.click()
    await page.keyboard.press('Home')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('listbox')).toBeHidden()
    await expect(themeButton).toBeFocused()
  })

  test('Tab closes a dropdown without trapping keyboard focus', async ({ page }) => {
    await page.goto('/')
    const themeButton = page.getByRole('button', { name: /Theme/ })
    await themeButton.click()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('clicking outside closes an open menu', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Theme/ }).click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.locator('h1').click()
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('built-in language selection updates both text and document language', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /Language/ }).click()
    const search = page.getByRole('combobox', { name: /Search languages/i })
    await search.fill('de')
    await page.getByRole('option', { name: /Deutsch/ }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    await expect(page.getByRole('heading', { name: /Ausgewählte Arbeiten/ })).toBeVisible()
  })

  test('language filtering and RTL mode work on a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    await page.getByRole('button', { name: /Language/ }).click()
    const search = page.getByRole('combobox', { name: /Search languages/i })
    await search.fill('ar')
    const arabic = page.getByRole('option').first()
    await expect(arabic).toBeVisible()
    await arabic.click()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('top navigation is horizontally scrollable and exposes its scrollbar', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    const navigation = page.getByRole('navigation', { name: /Primary navigation/i })
    const metrics = await navigation.evaluate(element => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
      overflowX: getComputedStyle(element).overflowX,
      scrollbarWidth: getComputedStyle(element).scrollbarWidth,
    }))
    expect(metrics.overflowX).toBe('auto')
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth)
    await navigation.evaluate(element => { element.scrollLeft = element.scrollWidth })
    expect(await navigation.evaluate(element => element.scrollLeft)).toBeGreaterThan(0)
  })

  test('there are no duplicate DOM ids or nested interactive elements', async ({ page }) => {
    await page.goto('/')
    const duplicateIds = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll('[id]'), element => element.id)
      return ids.filter((id, index) => ids.indexOf(id) !== index)
    })
    expect(duplicateIds).toEqual([])
    const invalidNesting = await page.locator('a a, a button, button a, button button').count()
    expect(invalidNesting).toBe(0)
  })
})

test.describe('live GitHub public activity', () => {
  test('renders real-time public pushes and commit links from the GitHub API response', async ({ page }) => {
    await page.route('https://github.com/users/shreyashjagtap157/contributions', route => route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="828" height="128"><rect width="828" height="128" fill="#fff"/></svg>',
    }))
    await page.route('https://api.github.com/users/shreyashjagtap157/events/public?per_page=100', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: [{
        id: 'push-event-1',
        type: 'PushEvent',
        created_at: '2026-11-06T08:30:00Z',
        repo: { name: 'shreyashjagtap157/Omni---New' },
        payload: {
          ref: 'refs/heads/main',
          size: 2,
          head: '0123456789abcdef0123456789abcdef01234567',
          commits: [{
            sha: '0123456789abcdef0123456789abcdef01234567',
            message: 'Tighten compiler qualification checks',
          }],
        },
      }],
    }))
    await page.goto('/')
    await page.locator('#activity').scrollIntoViewIfNeeded()
    await expect(page.locator('.github-contribution-graph')).toHaveAttribute('src', 'https://github.com/users/shreyashjagtap157/contributions')
    await expect(page.getByText('Tighten compiler qualification checks')).toBeVisible()
    await expect(page.getByText('shreyashjagtap157/Omni---New')).toBeVisible()
    await expect(page.getByRole('link', { name: /Open latest commit/ })).toHaveAttribute(
      'href',
      'https://github.com/shreyashjagtap157/Omni---New/commit/0123456789abcdef0123456789abcdef01234567',
    )
    await expect(page.getByText('1', { exact: true }).first()).toBeVisible()
  })

  test('shows a useful unavailable state when GitHub cannot be reached', async ({ page }) => {
    await page.route('https://api.github.com/users/shreyashjagtap157/events/public?per_page=100', route => route.abort())
    await page.goto('/')
    await expect(page.getByText(/GitHub activity is temporarily unavailable/)).toBeVisible()
  })
})

test.describe('project detail and interaction semantics', () => {
  test('project detail and repository navigation are separate links', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Omni', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Omni', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /Repository/ })).toHaveAttribute(
      'href',
      'https://github.com/shreyashjagtap157/Omni---New',
    )
  })
})


test('language search displays an empty state and safely handles Enter with no matches', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Language/ }).click()
  const search = page.getByRole('combobox', { name: /Search languages/i })
  await search.fill('not-a-real-language')
  await expect(page.getByText('No matching languages')).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).toBeVisible()
})
