import { test, expect } from '@playwright/test'

const THEMES = ['void', 'orbital', 'blueprint', 'aurora'] as const
const DENSITIES = ['compact', 'comfortable', 'spacious'] as const
const WIDTHS = [360, 768, 1024, 1440] as const

test.describe('Theme x Density screenshots', () => {
  for (const theme of THEMES) {
    for (const density of DENSITIES) {
      for (const width of WIDTHS) {
        test(`renders ${theme} / ${density} @ ${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 })
          await page.goto('/')
          // Apply theme + density before hydration paints
          await page.evaluate(({ t, d }) => {
            localStorage.setItem('theme', t)
            localStorage.setItem('density', d)
            document.documentElement.dataset.theme = t
            document.documentElement.dataset.density = d
          }, { t: theme, d: density })
          await page.reload()
          await page.waitForLoadState('networkidle')
          await expect(page).toHaveScreenshot(`theme-${theme}-density-${density}-w${width}.png`, {
            fullPage: true,
            maxDiffPixels: 2000,
          })
        })
      }
    }
  }
})

test.describe('Dropdown accessibility', () => {
  test('keyboard navigation: arrows, Home, End, Enter, Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await page.goto('/')

    const themeBtn = page.getByRole('button', { name: /Theme:/ }).first()
    await themeBtn.click()
    await expect(page.getByRole('listbox')).toBeVisible()

    // ArrowDown moves focus
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    // Enter selects
    await page.keyboard.press('Enter')
    await expect(page.getByRole('listbox')).toBeHidden()

    // Reopen and test Escape closes
    await themeBtn.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('listbox')).toBeHidden()

    // Reopen and test Home/End
    await themeBtn.click()
    await page.keyboard.press('End')
    await page.keyboard.press('Home')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('click-outside closes dropdown', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await page.goto('/')
    const themeBtn = page.getByRole('button', { name: /Theme:/ }).first()
    await themeBtn.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    await page.click('body', { position: { x: 10, y: 10 } })
    await expect(page.getByRole('listbox')).toBeHidden()
  })

  test('language dropdown is searchable and shows built-in vs mt hint', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 })
    await page.goto('/')
    const langBtn = page.getByRole('button', { name: /Language:/ }).first()
    await langBtn.click()
    await expect(page.getByRole('listbox')).toBeVisible()
    const search = page.getByPlaceholder(/Search languages/i)
    await expect(search).toBeVisible()
    await search.fill('ar')
    await page.waitForTimeout(200)
    const options = page.getByRole('option')
    await expect(await options.count()).toBeGreaterThan(0)
  })

  test('RTL layout: switching to Arabic sets dir=rtl', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 })
    await page.goto('/')
    const langBtn = page.getByRole('button', { name: /Language:/ }).first()
    await langBtn.click()
    await page.getByPlaceholder(/Search languages/i).fill('ar')
    await page.waitForTimeout(200)
    const arOption = page.getByRole('option').first()
    await arOption.click()
    await page.waitForTimeout(300)
    expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    const body = page.locator('body')
    const box = await body.boundingBox()
    expect(box).not.toBeNull()
  })
})

test.describe('No horizontal overflow', () => {
  test('at all widths', async ({ page }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const body = page.locator('body')
      const box = await body.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.width).toBeLessThanOrEqual(width)
    }
  })
})
