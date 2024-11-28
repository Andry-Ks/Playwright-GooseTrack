import { test, expect } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('Positive login test', () => {
  test('Login with valid data', async ({ page, baseURL }) => {

    if (!validEmail || !validPassword) {
        throw new Error('Email or password is not defined in the configuration.');
      }

    await page.goto(baseURL!);
    await page.click('a[href="/login"]');
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await page.click('button[type="submit"]');
    await page.waitForURL('**/calendar/month/*');
  });
});