import { test, expect } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('User logout test', () => {
  let accessToken: string;
  test.beforeAll(async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const loginResponse = await request.post(`${backendURL}/user/login`, {
      data: {
        email: validEmail,
        password: validPassword,
      },
    });

    expect(loginResponse.status()).toBe(200);

    const body = await loginResponse.json();
    accessToken = body.data.accessToken;
  });

  test('Positive test: Logout user', async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const logoutResponse = await request.get(`${backendURL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    expect(logoutResponse.status()).toBe(200);
  });

  test('Negative test: Logout user again with the same token', async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const logoutResponse = await request.get(`${backendURL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    expect(logoutResponse.status()).toBe(401); // Unauthorized
  });
});
