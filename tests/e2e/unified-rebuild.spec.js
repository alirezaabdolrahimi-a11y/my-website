const { test, expect } = require('@playwright/test');

test.describe('NIAZ NET unified rebuild preview', () => {
  test('homepage renders the shared shell and all 26 service cards', async ({ page }) => {
    await page.goto('/rebuild/');
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('.services-grid .service-card')).toHaveCount(23);
    await expect(page.locator('.services-grid .import-export-card')).toHaveCount(1);
    await expect(page.locator('.vip-service-list .vip-service-link')).toHaveCount(3);
    await expect(page.locator('#contact')).toBeAttached();
    await expect(page.locator('.main-nav a')).toHaveCount(8);
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

  test('homepage preserves the live feature, project and office sections', async ({ page }) => {
    await page.goto('/rebuild/');
    await expect(page.locator('#about .reasons .reason')).toHaveCount(8);
    await expect(page.locator('#projects .project-card')).toHaveCount(12);
    await expect(page.locator('#offices .office-card')).toHaveCount(3);
    await expect(page.locator('#contact .home-cta')).toBeVisible();
  });

  test('Spanish navigation uses its local sections and working English contact fallback', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fes%2F');
    await expect(page.locator('.main-nav a').filter({ hasText: 'Quiénes somos' })).toHaveAttribute('href', '?page=%2Fes%2F#about');
    await expect(page.locator('.main-nav a').filter({ hasText: 'Proyectos' })).toHaveAttribute('href', '?page=%2Fes%2F#projects');
    await expect(page.locator('.main-nav a').filter({ hasText: 'Contacto' })).toHaveAttribute('href', '?page=%2Fcontact.html');
  });

  test('homepage retains partner strip, network map, project icons and contact details', async ({ page }) => {
    await page.goto('/rebuild/');
    await expect(page.locator('#partners .partner')).toHaveCount(11);
    await expect(page.locator('#about .network-map')).toBeVisible();
    await expect(page.locator('#about .network-routes circle')).toHaveCount(5);
    await expect(page.locator('#projects .project-card .project-symbol img')).toHaveCount(12);
    await expect(page.locator('#contact .home-contact-item')).toHaveCount(4);
    await expect(page.locator('#contact a[href="mailto:info@niaznet.net"]')).toBeVisible();
  });

  for (const route of ['/', '/tr/', '/es/', '/fr/', '/fa/']) {
    test(`homepage visual data is present for ${route}`, async ({ page }) => {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page.locator('#partners .partner')).toHaveCount(11);
      await expect(page.locator('#about .network-map')).toBeVisible();
      await expect(page.locator('#projects .project-card .project-symbol img')).toHaveCount(12);
      await expect(page.locator('#contact .home-contact-item')).toHaveCount(4);
    });
  }

  test('Persian homepage, contact, partner and projects routes are available', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Ffa%2F');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
    await expect(page.locator('.service-grid .service-card')).toHaveCount(26);
    await expect(page.locator('#partners .partner')).toHaveCount(11);
    await page.goto('/rebuild/?page=%2Ffa%2Fcontact.html');
    await expect(page.locator('form.form-grid')).toBeVisible();
    await expect(page.locator('form.form-grid input, form.form-grid textarea, form.form-grid select')).toHaveCount(7);
    await page.goto('/rebuild/?page=%2Ffa%2Fbecome-our-partner.html');
    await expect(page.locator('form.form-grid input, form.form-grid textarea, form.form-grid select')).toHaveCount(9);
    await page.goto('/rebuild/?page=%2Ffa%2Fprojects.html');
    await expect(page.locator('h1')).toContainText('پروژه‌ها');
  });

  test('language switcher uses translated Persian routes and preserves English fallback routes', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fabout.html');
    await page.locator('.language-select').selectOption('fa');
    await expect(page).toHaveURL(/page=%2Ffa%2Fabout.html/);
    await page.goto('/rebuild/?page=%2Fapi-supply.html');
    await page.locator('.language-select').selectOption('fa');
    await expect(page).toHaveURL(/page=%2Ffa%2Fapi-supply.html/);
    await expect(page.locator('h1')).toContainText('تأمین API');
    await page.goto('/rebuild/?page=%2Fproject-details.html');
    await page.locator('.language-select').selectOption('fa');
    await expect(page).toHaveURL(/page=%2Fproject-details.html/);
  });

  test('Persian homepage includes all three office cards', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Ffa%2F');
    await expect(page.locator('#offices .office-card')).toHaveCount(3);
  });

  test('Persian API catalogue and translated service pages are present', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Ffa%2Fapi-supply.html');
    await expect(page.locator('.api-count')).toContainText('239 / 239');
    await page.goto('/rebuild/?page=%2Ffa%2Fsports-nutrition.html');
    await expect(page.locator('.product-price-table')).toHaveCount(1);
    await expect(page.locator('.product-price-table tbody tr')).toHaveCount(6);
    await expect(page.locator('.product-price-table thead')).toContainText('قیمت / کیلوگرم');
    await page.goto('/rebuild/?page=%2Ffa%2Fcontract-manufacturing.html');
    await expect(page.locator('#fcm-downloads')).toBeVisible();
    await expect(page.locator('a[href="/downloads/fcm-cmo/solid-fa.html"]')).toHaveCount(1);
    await page.goto('/rebuild/?page=%2Ffa%2Fcosmoderma.html');
    await expect(page.locator('h1')).toContainText('کازمودرما');
    await page.goto('/rebuild/?page=%2Ffa%2Finfant-formula.html');
    await expect(page.locator('h1')).toContainText('شیرخشک');
    await page.goto('/rebuild/?page=%2Ffa%2Fimport-export.html');
    await expect(page.locator('h1')).toContainText('واردات و صادرات');
  });

  test('Persian brand, business development, CBD, chamber and agency pages are translated', async ({ page }) => {
    const cases = [
      ['/fa/brand-registration.html', 'ثبت برند'],
      ['/fa/business-development.html', 'توسعه کسب‌وکار'],
      ['/fa/cbd-products.html', 'CBD بدون THC'],
      ['/fa/chamber-of-commerce.html', 'اتاق بازرگانی'],
      ['/fa/exclusive-agency.html', 'نمایندگی انحصاری']
    ];
    for (const [route, heading] of cases) {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page.locator('h1')).toContainText(heading);
    }
  });

  test('Persian international markets, Kenya, licensing and market-entry routes render', async ({ page }) => {
    const cases = [
      ['/fa/international-business-development.html', 'توسعه کسب‌وکار بین‌المللی'],
      ['/fa/international-markets.html', 'بازارهای واردات و صادرات'],
      ['/fa/kenya-market.html', 'بازار دارویی و سلامت کنیا'],
      ['/fa/licensing-partnerships.html', 'راهبرد صدور مجوز'],
      ['/fa/market-entry.html', 'ورود به بازار']
    ];
    for (const [route, heading] of cases) {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page.locator('h1')).toContainText(heading);
    }
    await page.goto('/rebuild/?page=%2Ffa%2Fkenya-market.html');
    await expect(page.locator('a[href="https://ppb.go.ke/"]')).toHaveAttribute('target', '_blank');
  });

  test('Persian medical, nutraceutical, pet-food, pharmaceutical and private-label routes render', async ({ page }) => {
    const cases = [
      ['/fa/medical-devices.html', 'تجهیزات پزشکی'],
      ['/fa/nutraceuticals.html', 'نوتراسیوتیک‌ها'],
      ['/fa/pet-food.html', 'غذای حیوانات'],
      ['/fa/pharmaceutical-products.html', 'محصولات نهایی دارویی'],
      ['/fa/private-label.html', 'تولید با برند اختصاصی']
    ];
    for (const [route, heading] of cases) {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page.locator('h1')).toContainText(heading);
    }
  });

  test('Persian product registration, regulatory, South Africa, supply chain and technology-transfer routes render', async ({ page }) => {
    const cases = [
      ['/fa/product-registration.html', 'ثبت محصول'],
      ['/fa/regulatory-affairs.html', 'امور رگولاتوری'],
      ['/fa/south-africa-market.html', 'آفریقای جنوبی'],
      ['/fa/supply-chain-solutions.html', 'زنجیره تأمین'],
      ['/fa/technology-transfer.html', 'انتقال فناوری']
    ];
    for (const [route, heading] of cases) {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page.locator('h1')).toContainText(heading);
    }
    await page.goto('/rebuild/?page=%2Ffa%2Fsouth-africa-market.html');
    await expect(page.locator('a[href="https://www.sahpra.org.za/document/guideline-for-the-importation-and-exportation-of-medicines/"]')).toHaveAttribute('target', '_blank');
  });

  test('legacy Persian FCM form routes redirect to the unified category downloads', async ({ page }) => {
    const aliases = [
      ['/fa/fcm-cmo-fa-1.html', '#download-nonsterile'],
      ['/fa/fcm-cmo-fa-2.html', '#download-sterile'],
      ['/fa/fcm-cmo-fa-3.html', '#download-solid']
    ];
    for (const [route, hash] of aliases) {
      await page.goto('/rebuild/?page=' + encodeURIComponent(route));
      await expect(page).toHaveURL(new RegExp('page=%2Ffa%2Fcontract-manufacturing\.html' + hash.replace('#', '\\#') + '$'));
    }
  });

  test('API catalogue and FCM downloads render once without duplicated static sections', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fapi-supply.html');
    await expect(page.locator('#api-catalogue')).toHaveCount(1);
    await expect(page.locator('#api-catalogue h2')).toHaveCount(1);
    await expect(page.locator('.content-panel h2').filter({ hasText: 'API Sourcing Coordination' })).toHaveCount(1);
    await page.goto('/rebuild/?page=%2Fcontract-manufacturing.html');
    await expect(page.locator('#fcm-downloads .download-card')).toHaveCount(3);
    await expect(page.locator('#fcm-downloads .download-card p')).toHaveCount(3);
    await expect(page.locator('.content-panel h2').filter({ hasText: 'Download technical enquiry forms' })).toHaveCount(0);
  });

  test('contact and partner forms have one heading, one intro and one mail note', async ({ page }) => {
    await page.goto('/rebuild/?page=%2Fcontact.html');
    await expect(page.locator('form.form-grid')).toHaveCount(1);
    await expect(page.locator('.content-panel h2').filter({ hasText: 'Send an Enquiry' })).toHaveCount(1);
    await expect(page.locator('.form-note')).toHaveCount(1);
    await page.goto('/rebuild/?page=%2Fbecome-our-partner.html');
    await expect(page.locator('.content-panel h2').filter({ hasText: 'Partnership Application' })).toHaveCount(1);
    await expect(page.locator('.form-note')).toHaveCount(1);
  });

  test('desktop, tablet and mobile visual reference screenshots', async ({ page }, testInfo) => {
    const viewports = [
      ['desktop', 1440, 1000],
      ['tablet', 820, 1180],
      ['mobile', 390, 844]
    ];
    for (const [label, width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/rebuild/?page=%2F');
      await expect(page.locator('.site-header')).toBeVisible();
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('.services-layout')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(pageWidth).toBeLessThanOrEqual(width);
      await page.screenshot({ path: testInfo.outputPath('rebuild-' + label + '.png'), fullPage: true });
      try {
        const response = await page.goto('https://www.niaznet.net/', {
          waitUntil: 'domcontentloaded',
          timeout: 45000
        });
        if (!response || !response.ok()) {
          testInfo.annotations.push({
            type: 'live-reference',
            description: 'Live homepage returned ' + (response ? response.status() : 'no response')
          });
          continue;
        }
        await page.locator('body').waitFor({ state: 'visible' });
        await page.screenshot({ path: testInfo.outputPath('live-' + label + '.png'), fullPage: true });
      } catch (error) {
        testInfo.annotations.push({
          type: 'live-reference',
          description: 'Live homepage screenshot unavailable: ' + String(error).slice(0, 240)
        });
        break;
      }
    }
  });

});
