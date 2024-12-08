import { test, expect } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('Open calendar page', () => {
  test('Main functions', async ({ page, baseURL }) => {
    if (!validEmail || !validPassword) {
      throw new Error('Email or password is not defined in the configuration');
    }
    await page.goto(baseURL!);
    await page.click('a[href="/login"]');
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button[type="submit"]');
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    console.log(currentMonth);
    const calendarHeader = await page.locator('.css-y0zn1c > .MuiBox-root > .MuiTypography-root');
    await expect(calendarHeader).toHaveText(currentMonth);

    await page.click('.MuiList-root > :nth-child(2) > .MuiButtonBase-root'); // Arrow >
    await page.click('.MuiList-root > :nth-child(1) > .MuiButtonBase-root'); // Arrow <

    const themeToggler = page.locator('.themeToggler__icon');
    await themeToggler.click();
    await themeToggler.click();

    await page.click('button[aria-label="day"]');
    await page.click('button[aria-label="month"]');
  });
  test.afterEach(async ({ page }) => {
    await page.click('span:has-text("Log out")');
  });
});
