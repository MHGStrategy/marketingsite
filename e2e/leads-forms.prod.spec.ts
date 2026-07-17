import { test, expect } from '@playwright/test';

const MARKER = `BETATEST-${Date.now()}`;
const TEST_EMAIL = `betatest+ui@mhgstrategy.com`;

test.describe('Production lead forms', () => {
  test('webops: form fields, no pricing badge, success on submit', async ({ page }) => {
    await page.goto('/webops/#contact');
    await expect(page.getByText('Starting at $600/month')).toHaveCount(0);
    await page.locator('#webops-fullName').fill(MARKER);
    await page.locator('#webops-email').fill(TEST_EMAIL);
    await page.locator('#webops-websiteUrl').fill('https://betatest.example.com');
    await page.locator('#webops-phone').fill('925-555-0199');
    await page.locator('#webops-message').fill(`${MARKER} UI test`);
    await page.locator('#webops-industry').selectOption('other');
    await page.getByRole('button', { name: 'Get My Free Assessment' }).click();
    await expect(page.getByText(`Thank you, ${MARKER}!`)).toBeVisible({ timeout: 15_000 });
  });

  test('revops: revenue challenge dropdown and success on submit', async ({ page }) => {
    await page.goto('/revops/#lead-form');
    await expect(page.getByText("What's your biggest revenue challenge?")).toBeVisible();
    await expect(page.getByText('What CRM do you use?')).toHaveCount(0);
    await page.locator('#revops-fullName').fill(MARKER);
    await page.locator('#revops-workEmail').fill(TEST_EMAIL);
    await page.locator('#revops-phone').fill('925-555-0199');
    await page.locator('#revops-companyName').fill(`${MARKER} Co`);
    await page.locator('#revops-role').fill('Beta Tester');
    await page.locator('#revops-revenueChallenge').selectOption('Pipeline visibility and forecasting');
    await page.getByRole('button', { name: 'Book My RevOps Review' }).click();
    await expect(page.getByText(`Thank you, ${MARKER}!`)).toBeVisible({ timeout: 15_000 });
  });

  test('managed-ops: same form shape and success on submit', async ({ page }) => {
    await page.goto('/managed-ops/#lead-form');
    await expect(page.getByText("What's your biggest revenue challenge?")).toBeVisible();
    await page.locator('#managedops-fullName').fill(MARKER);
    await page.locator('#managedops-workEmail').fill(TEST_EMAIL);
    await page.locator('#managedops-phone').fill('925-555-0199');
    await page.locator('#managedops-companyName').fill(`${MARKER} Co`);
    await page.locator('#managedops-role').fill('Beta Tester');
    await page.locator('#managedops-revenueChallenge').selectOption("Not sure — I just know it's not working");
    await page.getByRole('button', { name: 'Book My Managed Ops Review' }).click();
    await expect(page.getByText(`Thank you, ${MARKER}!`)).toBeVisible({ timeout: 15_000 });
  });

});

test.describe('Navigation', () => {
  test('about menu does not include Get Started', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: /about us/i }).first().hover();
    await expect(page.getByRole('link', { name: 'Get Started' })).toHaveCount(0);
    await expect(
      page.locator('nav').getByRole('link', { name: 'Contact', exact: true }),
    ).toBeVisible();
  });
});
