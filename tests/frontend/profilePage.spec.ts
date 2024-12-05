import { test, expect } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('Positive test. Update user data', () => {
  test('Edit user profile', async ({ page, baseURL }) => {
    if (!validEmail || !validPassword) {
      throw new Error('Email or password is not defined in the configuration.');
    }

    const validName = `TestPW_${Math.floor(Math.random() * 100)}F`;
    const validPhone = `+3801122233${Math.floor(Math.random() * 100)}`;
    const validSkype = `Nick_${Math.floor(Math.random() * 100)}F`;

    await page.goto(baseURL!);
    await page.click('a[href="/login"]');
    await page.fill('input[name="email"]', validEmail);
    await page.fill('input[name="password"]', validPassword);
    await page.click('button[type="submit"]');

    await page.click('a[href="/account"]');

    await page.waitForResponse((response) =>
      response.url().includes('/user/info') && response.status() === 200
    );

    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill(validName);
    await expect(nameInput).toHaveValue(validName);

    const phoneInput = page.locator('input[name="phone"]');
    await phoneInput.fill(validPhone);
    await expect(phoneInput).toHaveValue(validPhone);

    const skypeInput = page.locator('input[name="skype"]');
    await skypeInput.fill(validSkype);
    await expect(skypeInput).toHaveValue(validSkype);

    await page.click('button:has-text("Save changes")');
  });

  test.afterEach(async ({ page }) => {
    await page.click('span:has-text("Log out")');
  });
});
