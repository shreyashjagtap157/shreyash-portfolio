import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PORTFOLIO_PRODUCTION_URL
  ?? 'https://shreyash-portfolio.ssjagtap2016.workers.dev'

if (!baseURL.startsWith('https://')) {
  throw new Error('PORTFOLIO_PRODUCTION_URL must be an HTTPS URL.')
}

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  timeout: 30_000,
  expect: { timeout: 7_500 },
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [{
    name: 'production-chromium',
    use: { ...devices['Desktop Chrome'] },
  }],
})
