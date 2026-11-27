const { test, expect } = require('@playwright/test');

const localeRoutes = [
  { name: 'English', path: '/' },
  { name: 'Persian', path: '/?lang=fa' },
  { name: 'Turkish', path: '/tr/' },
  { name: 'Spanish', path: '/es/' },
  { name: 'French', path: '/fr/' }
];

for (const locale of localeRoutes) {
  test(`${locale.name} homepage responds and renders`, async ({ page }) => {
    const response = await page.goto(locale.path);
    expect(response, `No HTTP response for ${locale.path}`).not.toBeNull();
    expect(response.status(), `${locale.path} returned an unsuccessful status`).toBeLessThan(400);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/\S+/);
  });
}

test('homepage has no uncaught JavaScript errors during initial load', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(pageErrors).toEqual([]);
});
