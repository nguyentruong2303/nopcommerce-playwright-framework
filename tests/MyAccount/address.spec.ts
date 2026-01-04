import { test as base, test } from "../../fixtures/fixtures";
import { MyAccountSideBarPage } from "../../pages/MyAccount/MyAccountSideBarPage";
import { AddressPage } from "../../pages/MyAccount/AddressPage";
import { fa, faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

test.describe("My Account - Address", () => {
    const addressData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),                                              
        companyName: "Test Company",
        country: "United States of America",
        state: "California",
        city: faker.location.city(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        zipPostalCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        faxNumber: faker.phone.number(),
    };

    test("TC_001: Verify the error messages when mandatory fields are empty in Add New Address form", async ({ myAccountSideBarPage, addressPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify the error messages when mandatory fields are empty in Add New Address form"
        }); 
        await test.step("Open Add New Address form", async () => {
            await addressPage.clickOnAddNewButton();
        });

        await test.step("Submit the Add New Address form without filling any data", async () => {
            await addressPage.clickOnSaveButton();
        });

        await test.step("Verify error messages are displayed for mandatory fields", async () => {
            const firstNameError = await addressPage.getFirstNameErrorMessage();
            const lastNameError = await addressPage.getLastNameErrorMessage();
            const emailError = await addressPage.getEmailErrorMessage();
            const cityError = await addressPage.getCityErrorMessage();
            const address1Error = await addressPage.getAddress1ErrorMessage();
            const zipPostalCodeError = await addressPage.getZipPostalCodeErrorMessage();
            const phoneNumberError = await addressPage.getPhoneNumberErrorMessage();

            expect(firstNameError).toBe("First name is required.");
            expect(lastNameError).toBe("Last name is required.");
            expect(emailError).toBe("Email is required.");
            expect(cityError).toBe("City is required");
            expect(address1Error).toBe("Street address is required");
            expect(zipPostalCodeError).toBe("Zip / postal code is required");
            expect(phoneNumberError).toBe("Phone is required");
        });
    });

    test('TC_002: Verify the error message when State/Province is not selected in Add New Address form', async ({ myAccountSideBarPage, addressPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Verify the error message when State/Province is not selected in Add New Address form'
        });

        await test.step('Open Add New Address form', async () => {
            await addressPage.clickOnAddNewButton();
        });

        await test.step('Submit the Add New Address form without selecting State/Province', async () => {
            await addressPage.fillAddressForm(
                addressData.firstName,
                addressData.lastName,
                addressData.email,
                addressData.companyName,
                addressData.country,
                "Select state", // Not selecting State/Province
                addressData.city,
                addressData.address1,
                addressData.address2,
                addressData.zipPostalCode,
                addressData.phoneNumber,
                addressData.faxNumber
            );
            await addressPage.clickOnSaveButton();
        });

        const stateProvinceError = await addressPage.getStateProvinceErrorMessage();

        await test.step('Verify error message is displayed for not selecting State/Province', async () => {
            expect(stateProvinceError).toBe('State / province is required.');
        });
    });

    test('TC_003: Verify the error message when invalid email format is entered in Add New Address form', async ({ myAccountSideBarPage, addressPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Verify the error message when invalid email format is entered in Add New Address form'
        }); 

        await test.step('Open Add New Address form', async () => {
            await addressPage.clickOnAddNewButton();
        });

        await test.step('Submit the Add New Address form with invalid email format', async () => {  
            await addressPage.fillAddressForm(
                addressData.firstName,
                addressData.lastName,       
                "invalid-email-format", // Invalid email format
                addressData.companyName,
                addressData.country,    
                addressData.state,
                addressData.city,
                addressData.address1,
                addressData.address2,
                addressData.zipPostalCode,
                addressData.phoneNumber,
                addressData.faxNumber
            );
            await addressPage.clickOnSaveButton();  
        });

        const emailError = await addressPage.getEmailErrorMessage();

        await test.step('Verify error message is displayed for invalid email format', async () => {
            expect(emailError).toBe('Please enter a valid email address.');
        });
    });

    test('TC_004: Verify that a new address is added successfully with valid data in Add New Address form', async ({ myAccountSideBarPage, addressPage }) => {
        test.info().annotations.push({
            type: 'description',
            description: 'Verify that a new address is added successfully with valid data in Add New Address form'
        }); 

        await test.step('Open Add New Address form', async () => {
            await addressPage.clickOnAddNewButton();
        });

        await test.step('Submit the Add New Address form with valid data', async () => {  
            await addressPage.fillAddressForm(
                addressData.firstName,  
                addressData.lastName,
                addressData.email,
                addressData.companyName,
                addressData.country,
                addressData.state,
                addressData.city,
                addressData.address1,
                addressData.address2,
                addressData.zipPostalCode,
                addressData.phoneNumber,
                addressData.faxNumber
            );
            await addressPage.clickOnSaveButton();  
        });

        const successMessage = await addressPage.successMessage.textContent();
        await test.step('Verify success message is displayed after adding new address', async () => {
            expect(successMessage).toContain('The new address has been added successfully.');
        });
        await test.step('Verify that the newly added address is displayed correctly in the address list', async () => {
            await addressPage.clickOnEditButton();
            const firstName = await addressPage.getFirstname();
            const lastName = await addressPage.getLastname();
            const email = await addressPage.getEmail();
            const company = await addressPage.getCompany();
            const country = await addressPage.getCountry();
            const state = await addressPage.getState();
            const city = await addressPage.getCity();
            const address1 = await addressPage.getAddress1();
            const address2 = await addressPage.getAddress2();
            const zipPostalCode = await addressPage.getZipPostalCode();
            const phoneNumber = await addressPage.getPhoneNumber();
            const faxNumber = await addressPage.getFaxNumber();

            expect(firstName).toBe(addressData.firstName);
            expect(lastName).toBe(addressData.lastName);
            expect(email).toBe(addressData.email);  
            expect(company).toBe(addressData.companyName);
            expect(country).toBe(addressData.country);
            expect(state).toBe(addressData.state);  
            expect(city).toBe(addressData.city);
            expect(address1).toBe(addressData.address1);        
            expect(address2).toBe(addressData.address2);
            expect(zipPostalCode).toBe(addressData.zipPostalCode);
            expect(phoneNumber).toBe(addressData.phoneNumber);
            expect(faxNumber).toBe(addressData.faxNumber);
        });
    });

    
});