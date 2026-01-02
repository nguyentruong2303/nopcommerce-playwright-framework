import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as testData from "../test-data/register-data.json";
import { before } from "node:test";

test.describe('User Login Tests with invalid data', () => {


    const loginData = {
        email: faker.internet.email(),
        password: testData.defaultPassword
    };

    test('TC_001: Unsuccessful login with empty data shows error messages', async ({ loginPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful login with empty data shows error messages'
        });
        await test.step('Click on the login button without filling any data', async () => {
            await loginPage.clickOnLoginButton();
        });
        const emailError = await loginPage.getEmailErrorMessage();
        await test.step('Verify error message is displayed for email field', async () => {
            expect(emailError).toBe('Please enter your email');
        });
    });

    test('TC_002: Unsuccessful login with invalid email formatshows error message', async ({ loginPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful login with invalid email format  shows error message'
        });
        await test.step('Fill the login form with invalid email format  and submit', async () => {
            await loginPage.login('invalid-email', 'invalid-password');
        });
        const emailError = await loginPage.getEmailErrorMessage();
        await test.step('Verify error message is displayed for invalid email format', async () => {
            expect(emailError).toBe('Please enter a valid email address.');
        });
    });

    test('TC_003: Unsuccesful login with email not existing in the system shows error message', async ({ loginPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccesful login with email not existing in the system shows error message'
        });
        await test.step('Fill the login form with non-existing email and submit', async () => {
            await loginPage.login(loginData.email, loginData.password);
        });
        const unsuccessfulLoginMessage = await loginPage.getUnsuccessfulLoginMessage();
        await test.step('Verify error message is displayed for non-existing email', async () => {
            expect(unsuccessfulLoginMessage).toContain('Login was unsuccessful. Please correct the errors and try again.');
        });
    });
});

test.describe('Login tests with registered user', () => {
    let registerData: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        password: string;
        confirmPassword: string;
    };

    test.beforeEach(async ({ registerPage, menuHeader, page }) => {
        // Generate new user data for each test
        registerData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            company: testData.companyName,
            password: testData.defaultPassword,
            confirmPassword: testData.defaultPassword
        };
        
        await registerPage.fillForm(registerData);
        await registerPage.clickOnRegisterButton();
        // Logout after registration to test login scenarios
        await menuHeader.clickLogout();
        // Navigate to login page
        await menuHeader.openLoginPage();
    });

    test('TC_004: Unsuccesful login with incorrect password shows error message', async ({ loginPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccesful login with incorrect password shows error message'
        });

        await test.step('Fill the login form with correct email and empty password and submit', async () => {
            await loginPage.login(registerData.email, '');
        });

        const unsuccessfulLoginMessage = await loginPage.getUnsuccessfulLoginMessage();
        await test.step('Verify error message is displayed for incorrect password', async () => {
            expect(unsuccessfulLoginMessage).toContain('Login was unsuccessful. Please correct the errors and try again.');
        });
    });

    test('TC_005: Unsuccesful login with correct email and incorrect password shows error message', async ({ loginPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccesful login with correct email and incorrect password shows error message'
        });

        await test.step('Fill the login form with correct email and incorrect password and submit', async () => {
            await loginPage.login(registerData.email, 'WrongPassword123!');
        });

        const unsuccessfulLoginMessage = await loginPage.getUnsuccessfulLoginMessage();
        await test.step('Verify error message is displayed for incorrect password', async () => {
            expect(unsuccessfulLoginMessage).toContain('Login was unsuccessful. Please correct the errors and try again.');
        });
    });

    test('TC_006: Successful login with valid credentials', async ({ loginPage, menuHeader }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Successful login with valid credentials'
        });
        await test.step('Fill the login form with valid credentials and submit', async () => {
            await loginPage.login(registerData.email, registerData.password);
        });
        await test.step('Verify that the user is logged in by checking the presence of the logout option', async () => {
            expect(await menuHeader.isMyAccountLinkVisible()).toBeTruthy();
        });
    });
});




