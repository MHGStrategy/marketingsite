import { test, expect, type Page } from '@playwright/test';
import { INTAKE_FORMS } from '../lib/intake/intakeForms';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fill all visible text / email / textarea inputs with a test value. */
async function fillTextFields(page: Page, name: string, email: string) {
  const textInputs = page.locator(
    'input[type="text"].intake-input, input[type="email"].intake-input, textarea.intake-textarea',
  );
  const count = await textInputs.count();
  for (let i = 0; i < count; i++) {
    const el = textInputs.nth(i);
    const type = await el.getAttribute('type');
    if (type === 'email') {
      await el.fill(email);
    } else {
      const isFirst = i === 0;
      await el.fill(isFirst ? name : 'Beta test response');
    }
  }
}

/** Select the first option in each radio group on the page. */
async function clickFirstRadio(page: Page) {
  const groups = page.locator('.intake-radio-group');
  const count = await groups.count();
  for (let i = 0; i < count; i++) {
    const firstRadio = groups.nth(i).locator('button.intake-radio-item').first();
    if ((await firstRadio.count()) > 0) {
      await firstRadio.click();
    }
  }
}

/** Click the first checkbox item on the page. */
async function clickFirstCheckbox(page: Page) {
  const checks = page.locator('button.intake-check-item');
  if ((await checks.count()) > 0) {
    await checks.first().click();
  }
}

/** Click the first tag item on the page. */
async function clickFirstTag(page: Page) {
  const tags = page.locator('button.intake-tag');
  if ((await tags.count()) > 0) {
    await tags.first().click();
  }
}

/** Select the first non-placeholder option in each select on the page. */
async function fillSelectFields(page: Page) {
  const selects = page.locator('select.intake-select');
  const count = await selects.count();
  for (let i = 0; i < count; i++) {
    const select = selects.nth(i);
    const options = select.locator('option');
    const optionCount = await options.count();
    for (let j = 0; j < optionCount; j++) {
      const value = await options.nth(j).getAttribute('value');
      if (value) {
        await select.selectOption(value);
        break;
      }
    }
  }
}

/**
 * Walk through every section of a form:
 *  - fill text/email/textarea fields
 *  - click first radio option (if present)
 *  - click first checkbox option (if present)
 *  - click Continue / Submit
 */
async function completeAllSections(
  page: Page,
  name: string,
  email: string,
  expectedSections: number,
) {
  for (let section = 0; section < expectedSections; section++) {
    await fillSelectFields(page);
    await clickFirstRadio(page);
    await clickFirstCheckbox(page);
    await clickFirstTag(page);
    await fillTextFields(page, name, email);

    const isLast = section === expectedSections - 1;
    const btnText = isLast ? /submit/i : /continue/i;
    const btn = page.locator('button.intake-btn-primary');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText(btnText);
    await btn.click();

    if (!isLast) {
      await expect(page.locator('.intake-section-label')).toBeVisible();
    }
  }
}

// ---------------------------------------------------------------------------
// Test data per form (section counts match *FormConfig.ts)
// ---------------------------------------------------------------------------

const FORMS = [
  { name: 'Ministry', path: '/webops/intake/ministry/', sections: 7 },
  { name: 'Ecommerce', path: '/webops/intake/ecommerce/', sections: 7 },
  { name: 'Real Estate', path: '/webops/intake/real-estate/', sections: 7 },
  { name: 'Logistics', path: '/webops/intake/logistics/', sections: 7 },
  {
    name: 'Storefront Entertainment',
    path: '/webops/intake/storefront-entertainment/',
    sections: 6,
  },
  { name: 'Junk Removal', path: '/webops/intake/junk-removal/', sections: 6 },
  { name: 'Warehousing', path: '/webops/intake/warehousing/', sections: 7 },
  { name: 'Insurance', path: '/webops/intake/insurance/', sections: 7 },
  { name: 'Restaurant', path: '/webops/intake/restaurant/', sections: 8 },
  { name: 'Catering', path: '/webops/intake/catering/', sections: 7 },
  { name: 'Consulting & Coaching', path: '/webops/intake/consulting/', sections: 7 },
  { name: 'Beauty & Wellness', path: '/webops/intake/beauty-wellness/', sections: 7 },
  { name: 'Accounting & Bookkeeping', path: '/webops/intake/accounting/', sections: 7 },
  { name: 'Home Services', path: '/webops/intake/home-services/', sections: 7 },
  { name: 'General Business', path: '/webops/intake/general-business/', sections: 6 },
  { name: 'Digital Discovery', path: '/intake/', sections: 8 },
] as const;

const TEST_NAME = 'Beta Tester';
const TEST_EMAIL = 'shaun@mhgstrategy.com';

const LIVE_FORMS = INTAKE_FORMS.filter((form) => form.status === 'live' && form.href);
const COMING_SOON_FORMS = INTAKE_FORMS.filter((form) => form.status === 'coming-soon');

// ---------------------------------------------------------------------------
// Hub page tests
// ---------------------------------------------------------------------------

test('intake hub — all live cards are links, no coming-soon cards remain', async ({ page }) => {
  await page.goto('/webops/intake/');

  const liveLinks = page.locator('a.block.rounded-xl');
  await expect(liveLinks).toHaveCount(LIVE_FORMS.length);

  for (const form of LIVE_FORMS) {
    await expect(page.locator(`a[href="${form.href}"]`)).toBeVisible();
    await expect(page.locator(`a[href="${form.href}"]`)).toContainText('Available');
    await expect(page.locator(`a[href="${form.href}"]`)).toContainText('Start questionnaire');
  }

  const disabledCards = page.locator('div[aria-disabled="true"]');
  await expect(disabledCards).toHaveCount(COMING_SOON_FORMS.length);
});

test('intake hub — every live form path loads', async ({ page }) => {
  for (const form of LIVE_FORMS) {
    await page.goto(form.href!);
    await expect(page.locator('.intake-brand-bar')).toBeVisible();
    await expect(page.locator('.intake-section-label')).toContainText('Section 1');
  }
});

// ---------------------------------------------------------------------------
// Validation smoke test (section 1 required fields)
// ---------------------------------------------------------------------------

for (const form of FORMS) {
  test(`${form.name} — blocks Continue without required fields`, async ({ page }) => {
    await page.goto(form.path);
    await page.locator('button.intake-btn-primary').click();
    await expect(page.locator('.intake-error').first()).toBeVisible();
    await expect(page.locator('.intake-section-label')).toContainText('Section 1');
  });
}

// ---------------------------------------------------------------------------
// Per-form end-to-end submission tests
// ---------------------------------------------------------------------------

for (const form of FORMS) {
  test(`${form.name} — fill all sections and reach completion screen`, async ({ page }) => {
    await page.goto(form.path);

    await expect(page.locator('.intake-brand-bar')).toBeVisible();
    await expect(page.locator('.intake-section-label')).toBeVisible();
    await expect(page.locator('.intake-section-label')).toContainText('Section 1');

    await completeAllSections(page, TEST_NAME, TEST_EMAIL, form.sections);

    const completionTitle = page.locator('.intake-complete-title');
    await expect(completionTitle).toBeVisible({ timeout: 30_000 });
    await expect(completionTitle).toContainText(/discovery complete/i);

    const summaryCards = page.locator('.intake-summary-card');
    await expect(summaryCards).toHaveCount(4);

    const completionSub = page.locator('.intake-complete-sub');
    await expect(completionSub).toBeVisible();
    const subText = await completionSub.innerText();
    const dashboardLink = page.locator('.intake-dashboard-link');
    const hasLink = (await dashboardLink.count()) > 0;

    const emailSuccess = subText.toLowerCase().includes('email');
    expect(emailSuccess || hasLink).toBe(true);
  });
}
