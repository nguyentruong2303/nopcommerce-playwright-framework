import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as testData from '../test-data/register-data.json';

test.describe('User Registration Tests - with invalid data', () => {


    //Create data for registration
    const registrationData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        company: testData.companyName,
        password: testData.defaultPassword,
        confirmPassword: testData.defaultPassword
    };

    test('TC_001: Unsuccessful registration with empty data shows error messages', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful registration with empty data shows error messages'
        });

        await test.step('Click on the register button without filling any data', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const firstNameError = await registerPage.getFirstNameErrorMessage();
        const lastNameError = await registerPage.getLastNameErrorMessage();
        const emailError = await registerPage.getEmailErrorMessage();
        const confirmPasswordError = await registerPage.getConfirmPasswordErrorMessage();

        await test.step('Verify error messages are displayed for required fields', async () => {
            expect(firstNameError).toBe('First name is required.');
            expect(lastNameError).toBe('Last name is required.');
            expect(emailError).toBe('Email is required.');
            expect(confirmPasswordError).toBe('Password is required.');
        });
    });

    test('TC_002: Unsuccessful registration with invalid email format shows error message', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful registration with invalid email format shows error message'
        });

        await test.step('Fill the registration form with invalid email format', async () => {
            await registerPage.fillForm({
                firstName: registrationData.firstName,
                lastName: registrationData.lastName,
                email: 'invalid-email-format',
                company: testData.companyName,
                password: testData.defaultPassword,
                confirmPassword: testData.defaultPassword
            });
        });

        await test.step('Submit the registration form', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const emailError = await registerPage.getEmailErrorMessage();

        await test.step('Verify error message is displayed for invalid email format', async () => {
            expect(emailError).toBe('Please enter a valid email address.');
        });
    });

    test('TC_004: Unsuccessful registration with password less than 6 characters shows error message', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful registration with password less than 6 characters shows error message'
        });

        await test.step('Fill the registration form with short password', async () => {
            await registerPage.fillForm({
                firstName: registrationData.firstName,
                lastName: registrationData.lastName,
                email: registrationData.email,
                company: testData.companyName,
                password: '123',
                confirmPassword: '123'
            });
        });

        await test.step('Submit the registration form', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const passwordError = await registerPage.getPasswordErrorMessage();

        await test.step('Verify error message is displayed for short password', async () => {
            expect(passwordError).toBe('Password must meet the following rules:  must have at least 6 characters and not greater than 64 characters');
        });
    });

    test('TC_005: Unsuccessful registration with mismatched password and confirmation shows error message', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful registration with mismatched password and confirmation shows error message'
        });

        await test.step('Fill the registration form with mismatched password and confirmation', async () => {
            await registerPage.fillForm({
                firstName: registrationData.firstName,
                lastName: registrationData.lastName,
                email: registrationData.email,
                company: testData.companyName,
                password: testData.defaultPassword,
                confirmPassword: 'mismatchedPassword'
            });
        });
        await test.step('Submit the registration form', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const confirmPasswordError = await registerPage.getConfirmPasswordErrorMessage();
        await test.step('Verify error message is displayed for mismatched password and confirmation', async () => {
            expect(confirmPasswordError).toBe('The password and confirmation password do not match.');
        });
    });

    test('TC_006: Successful registration with valid data shows success message', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Successful registration with valid data shows success message'
        });
        await test.step('Fill the registration form with valid data', async () => {
            await registerPage.fillForm(registrationData);
        });

        await test.step('Submit the registration form', async () => {
            await registerPage.clickOnRegisterButton();
        });
        const registrationResult = await registerPage.getRegistrationResultMessage();

        await test.step('Verify success message is displayed upon successful registration', async () => {
            expect(registrationResult).toContain('Your registration completed');
        });
    });
});
test.describe('User Registration Tests - with email existing in the system', () => {

    const registerData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),  // Unique email for pre-registration
        company: testData.companyName,
        password: testData.defaultPassword,
        confirmPassword: testData.defaultPassword
    };

    test.beforeEach(async ({ registerPage, menuHeader }) => {
        // Pre-register a user to ensure the email exists in the system
        await registerPage.fillForm(registerData);
        await registerPage.clickOnRegisterButton();
        await menuHeader.clickLogout();
        await menuHeader.openRegisterPage();
    });

    test('TC_003: Unsuccessful registration with email existing in the system shows error message', async ({ registerPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Unsuccessful registration with email existing in the system shows error message'
        });

        await test.step('Fill the registration form with an existing email', async () => {
            await registerPage.fillForm({
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email, // Existing email
                company: testData.companyName,
                password: testData.defaultPassword,
                confirmPassword: testData.defaultPassword
            });
        });

        await test.step('Submit the registration form', async () => {
            await registerPage.clickOnRegisterButton();
        });

        const emailError = await registerPage.getEmailAlreadyExistsErrorMessage();

        await test.step('Verify error message is displayed for existing email', async () => {
            expect(emailError).toBe('The specified email already exists');
        });
    });


});  