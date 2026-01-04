import { test as base, test } from "../../fixtures/fixtures";
import { RegisterPage } from "../../pages/RegisterPage";
import { LoginPage } from "../../pages/LoginPage";
import { MenuHeader } from "../../pages/MenuHeader";
import { HomePage } from "../../pages/HomePage";
import { MyAccountSideBarPage } from "../../pages/MyAccount/MyAccountSideBarPage";
import { CustomerPage } from "../../pages/MyAccount/CustomerPage";
import { faker } from "@faker-js/faker";

test.describe("My Account - Customer Info", () => {

    const customerInfo = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        companyName: "Test Company",
        gender: "male" as "male" | "female"
    }

    test("TC_001: Verify that Customer Info is updated with correct user information", async ({ myAccountSideBarPage, customerPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify that Customer Info page displays correct user information"
        });

        await test.step("Update customer info with valid data", async () => {
            await customerPage.updateCustomerInfo(
                customerInfo.firstName,
                customerInfo.lastName,
                customerInfo.email,
                customerInfo.companyName,
                customerInfo.gender
            );
        });

        await test.step("Verify success message is displayed after saving customer info", async () => {
            const successMessage = await customerPage.successMessage.textContent();
            test.expect(successMessage).toContain("The customer info has been updated successfully.");

        });

        await test.step("Verify that the updated customer info is displayed correctly", async () => {
            const firstName = await customerPage.firstNameTextbox.inputValue();
            const lastName = await customerPage.lastNameTextbox.inputValue();
            const email = await customerPage.emailTextbox.inputValue();
            const companyName = await customerPage.companyNameTextbox.inputValue();
            const gender = await customerPage.getGender();

            test.expect(firstName).toBe(customerInfo.firstName);
            test.expect(lastName).toBe(customerInfo.lastName);
            test.expect(email).toBe(customerInfo.email);
            test.expect(companyName).toBe(customerInfo.companyName);
            test.expect(gender).toBe(customerInfo.gender);
        });
    });
});
