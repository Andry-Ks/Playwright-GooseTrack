import { test, expect } from '@playwright/test';

test.describe("Main page", () => {
  test("Visit main page", async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/register"]')).toBeVisible();
    await expect(page.locator('a[href="/login"]')).toBeVisible();
  });
});
