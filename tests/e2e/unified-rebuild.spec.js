const { test, expect } = require('@playwright/test');

test.describe('NIAZ NET unified rebuild preview', () => {
  test('homepage renders the shared shell and all 26 service cards', async ({ page }) => {
    await page.goto('/rebuild/');
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('.service-grid .service-card')).toHaveCount(26);
    await expect(page.locator('#contact')).toBeAttached();
    await expect(page.locator('.language-select option')).toHaveCount(5);
  });

  test('API catalogue preserves all 239 records and supports search and sorting', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fapi-supply.html');
    await expect(page.locator('.api-count')).toContainText('239 / 239');
    await expect(page.locator('.api-tools select').first().locator('option')).toHaveCount(8);
    const search = page.locator('.api-tools input[type="search"]');
    const sort = page.locator('.api-tools select').nth(1);
    await search.fill('Atropine Sulphate');
    await expect(page.locator('.api-table tbody tr')).toHaveCount(1);
    await search.fill('');
    await sort.selectOption('name-asc');
    let names = await page.locator('.api-table tbody tr td:first-child').allTextContents();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    await sort.selectOption('name-desc');
    names = await page.locator('.api-table tbody tr td:first-child').allTextContents();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
    await sort.selectOption('category');
    const rows = await page.locator('.api-table tbody tr').evaluateAll(items =>
      items.map(row => [row.cells[1].textContent, row.cells[0].textContent])
    );
    expect(rows).toEqual([...rows].sort((a, b) =>
      a[0].localeCompare(b[0]) || a[1].localeCompare(b[1])
    ));
  });

  test('language switcher routes to the French homepage', async ({ page }) => {
    await page.goto('/rebuild/');
    await page.locator('.language-select').selectOption('fr');
    await expect(page).toHaveURL(/page=%2Ffr%2F/);
    await expect(page.locator('.main-nav')).toContainText('Accueil');
  });

  test('FCM/CMO downloads use direct file URLs and the anchor exists', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fcontract-manufacturing.html');
    await expect(page.locator('#fcm-downloads')).toBeVisible();
    await expect(page.locator('a[href="/downloads/fcm-cmo/solid-en.rtf"]')).toHaveCount(1);
    const response = await page.request.get('http://127.0.0.1:4173/downloads/fcm-cmo/solid-en.rtf');
    expect(response.status()).toBe(200);
  });

  test('contact form and official external references are retained', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fcontact.html');
    await expect(page.locator('form.form-grid')).toBeVisible();
    await expect(page.locator('form.form-grid input, form.form-grid textarea, form.form-grid select').first()).toBeVisible();
    await page.goto('/rebuild/?page=%2Fkenya-market.html');
    const ppb = page.locator('a[href="https://ppb.go.ke/"]');
    await expect(ppb).toHaveAttribute('target', '_blank');
    await expect(ppb).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('API controls remain visible on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/rebuild/?page=%2Fapi-supply.html');
    await expect(page.locator('.api-tools input[type="search"]')).toBeVisible();
    await expect(page.locator('.api-tools select')).toHaveCount(2);
    await expect(page.locator('.table-wrap')).toBeVisible();
  });
  test('shared slideshow manifest renders matching dots and no arrow controls', async ({ page }) => {
    await page.goto('/rebuild/');
    const slideshow = page.locator('.slideshow');
    await expect(slideshow).toHaveCount(1);
    const slideCount = await slideshow.locator('.slide').count();
    expect(slideCount).toBeGreaterThan(0);
    await expect(slideshow.locator('.slide-dot')).toHaveCount(slideCount);
    await expect(slideshow.locator('button[aria-label*="previous"], button[aria-label*="next"]')).toHaveCount(0);
    const firstImage = slideshow.locator('.slide.is-active img');
    await expect.poll(() => firstImage.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await slideshow.locator('.slide-dot').nth(1).click();
    await expect(slideshow.locator('.slide').nth(1)).toHaveClass(/is-active/);
  });

  test('reduced-motion preference disables slideshow autoplay', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/rebuild/');
    const activeBefore = await page.locator('.slideshow .slide.is-active').count();
    await page.waitForTimeout(5200);
    const activeAfter = await page.locator('.slideshow .slide.is-active').count();
    expect(activeBefore).toBe(1);
    expect(activeAfter).toBe(1);
  });

});
