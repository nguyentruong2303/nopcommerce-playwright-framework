import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { BASE_URL } from '../constants/urls';
import * as allure from "allure-js-commons";


test.describe('User Registration Tests', () => {


    test('Unsuccessful registration with empty data shows error messages', async ({ registerPage }) => {
        await allure.description('Unsuccessful registration with empty data shows error messages');

        await allure.step('Navigate to the registration page', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const firstNameError = await registerPage.getFirstNameErrorMessage();
        const lastNameError = await registerPage.getLastNameErrorMessage();
        const emailError = await registerPage.getEmailErrorMessage();
        const confirmPasswordError = await registerPage.getConfirmPasswordErrorMessage();

        await allure.step('Verify error messages are displayed for required fields', async () => {
            expect(firstNameError).toBe('First name is required.');
            expect(lastNameError).toBe('Last name is required.');
            expect(emailError).toBe('Email is required.');
            expect(confirmPasswordError).toBe('Password is required.');
        });
    });

    // test('Unsuccessful registration with invalid email format shows error message', async ({ registerPage }) => {
    //     await allure.description('Unsuccessful registration with invalid email format shows error message');

    //     await allure.step('Navigate to the registration page', async () => {
    //         await registerPage.clickOnRegisterButton();
    //     });
    //     await allure.step('Fill the registration form with invalid email format', async () => {
    //         await registerPage.fillForm({
    //             firstName: 'John',
    //             lastName: 'Doe',
    //             email: 'invalid-email-format',
    //             company: 'Test Company',
    //             password: 'Password123',
    //             confirmPassword: 'Password123'
    //         });
    //     });

    //     await allure.step('Submit the registration form', async () => {
    //         await registerPage.clickOnRegisterButton();
    //     });

    //     const emailError = await registerPage.getEmailErrorMessage();

    //     await allure.step('Verify error message is displayed for invalid email format', async () => {
    //         expect(emailError).toBe('Wrong email');
    //     });
    //});

}); 