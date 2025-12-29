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

        expect(firstNameError).toBe('First name is required.');
        expect(lastNameError).toBe('Last name is required.');
        expect(emailError).toBe('Email is required.');
        expect(confirmPasswordError).toBe('Password is required.');
    });

}); 