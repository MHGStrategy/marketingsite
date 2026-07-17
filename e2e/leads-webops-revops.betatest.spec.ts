import { test, expect } from '@playwright/test';

const MARKER = `BETATEST-${Date.now()}`;
const TEST_EMAIL = 'shaun@mhgstrategy.com';

test.describe('WebOps + RevOps beta test', () => {
  test('webops: all fields filled, submits successfully', async ({ page }) => {
    await page.goto('/webops/#contact');
    await page.locator('#webops-fullName').fill(`${MARKER} WebOps`);
    await page.locator('#webops-email').fill(TEST_EMAIL);
    await page.locator('#webops-websiteUrl').fill('https://betatest.mhgstrategy.com');
    await page.locator('#webops-phone').fill('925-290-8604');
    await page.locator('#webops-message').fill(`${MARKER} WebOps beta test — all fields filled.`);
    await page.locator('#webops-industry').selectOption('home-services');
    await page.getByRole('button', { name: 'Get My Free Assessment' }).click();
    await expect(page.getByText(`Thank you, ${MARKER} WebOps!`)).toBeVisible({ timeout: 15_000 });
  });

  test('revops: all fields filled, submits successfully', async ({ page }) => {
    await page.goto('/revops/#lead-form');
    await page.locator('#revops-fullName').fill(`${MARKER} RevOps`);
    await page.locator('#revops-workEmail').fill(TEST_EMAIL);
    await page.locator('#revops-phone').fill('925-290-8604');
    await page.locator('#revops-companyName').fill(`${MARKER} Co`);
    await page.locator('#revops-role').fill('President');
    await page.locator('#revops-revenueChallenge').selectOption('Pipeline visibility and forecasting');
    await page.getByRole('button', { name: 'Book My RevOps Review' }).click();
    await expect(page.getByText(`Thank you, ${MARKER} RevOps!`)).toBeVisible({ timeout: 15_000 });
  });
});
