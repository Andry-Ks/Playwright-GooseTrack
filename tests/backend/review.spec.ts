import { test, expect } from '@playwright/test';

test.describe('Get reviews', () => {
  test('Get list of reviews', async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const response = await request.get(`${backendURL}/review/`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    console.log('Response Body:', responseBody);
  });
});
