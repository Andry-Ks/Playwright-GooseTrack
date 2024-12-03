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
    await page.waitForTimeout(3000);
  });
});

test.describe('Negative login test', () => {
  const invalidEmails = [" ", ".automation@example.com", "automationexample.com", "test111@example.com"];
  invalidEmails.forEach((email) => {
    test(`Login with invalid email: ${email}`, async ({ page, baseURL }) => {
      if (!baseURL) throw new Error('Base URL is not defined in the configuration.');
      if (!validEmail || !validPassword) {
        throw new Error('Email or password is not defined in the configuration.');
      }
      await page.goto(baseURL);
      await page.click('a[href="/login"]');
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', validPassword);
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  const invalidPasswords = [" ", "12345", "Aabb1122", "Ab11111111111", "Ab1234567"];
  invalidPasswords.forEach((password) => {
    test(`Login with invalid password: ${password}`, async ({ page, baseURL }) => {
      if (!baseURL) throw new Error('Base URL is not defined in the configuration.');
      if (!validEmail || !validPassword) {
        throw new Error('Email or password is not defined in the configuration.');
      }
      await page.goto(baseURL);
      await page.click('a[href="/login"]');
      await expect(page.locator('button[type="submit"]')).toBeVisible();
      await page.fill('input[name="email"]', validEmail);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL(/\/login/);
    });
  });
});