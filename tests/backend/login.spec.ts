import { test, expect, request } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('Positive login test', () => {
  test('Login', async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const response = await request.post(`${backendURL}/user/login`, {
      data: {
        email: validEmail,
        password: validPassword,
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Login response:', responseBody);
  });
});

test.describe('Negative login tests', () => {
  test('Login with wrong email', async ({ request }) => {
    const backendURL = test.info().config.metadata.backendURL;
    const wrongEmail: string = "wrongemail123@gmail.com";
    const wrongPassword: string = "Wrongpass";
    const response = await request.post(`${backendURL}/user/login`, {
      data: {
        email: wrongEmail,
        password: validPassword,
      },
    });

    expect(response.status()).toBe(401);

  });
});