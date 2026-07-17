import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  retries: 1,
  reporter: 'list',

  use: {
    baseURL: 'http://127.0.0.1:1244',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /**
   * Start mock intake API + Next.js dev server before running tests.
   * Reuses existing servers when already running locally.
   */
  webServer: [
    {
      command: 'node scripts/intake-mock-server.mjs',
      url: 'http://127.0.0.1:8000/health',
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: 'npm run dev -- -p 1244',
      url: 'http://127.0.0.1:1244',
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});
