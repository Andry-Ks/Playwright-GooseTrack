import { test, expect, request } from '@playwright/test';
import { validEmail, validPassword } from '../../playwright.config';

test.describe('Get user info tests', () => {
    let accessToken: string;

    test.beforeAll(async ({ request }) => {
        const backendURL = test.info().config.metadata.backendURL;
        const response = await request.post(`${backendURL}/user/login`, {
            data: {
                email: validEmail,
                password: validPassword,
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        accessToken = responseBody.data.accessToken;
    });

    test('Get info. Positive test', async ({ request }) => {
        const backendURL = test.info().config.metadata.backendURL;
        const response = await request.get(`${backendURL}/user/info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, 
            },
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('User info:', responseBody);
    });

});