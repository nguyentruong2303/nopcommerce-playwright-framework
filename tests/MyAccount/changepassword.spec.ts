import { test } from "../../fixtures/fixtures";
import { ChangePasswordPage } from "../../pages/MyAccount/ChangePasswordPage";
import { faker } from "@faker-js/faker";
import { expect, Page } from "@playwright/test";
import * as testData from "../../test-data/register-data.json";

test.describe("My Account - Change Password", () => {
    const newPasswordData = {
        currentPassword: testData.defaultPassword,
        newPassword: testData.newPassword,
        confirmPassword: testData.newPassword
    };

    test("TC_001: Verify the error message when empty data is submitted in Change Password form", async ({ myAccountSideBarPage, changePasswordPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify the error message when empty data is submitted in Change Password form"
        });

        await test.step("Open Change Password form", async () => {
            await changePasswordPage.clickOnChangePasswordButton();
        });

        await test.step("Verify error messages are displayed for mandatory fields", async () => {
            const currentPasswordError = await changePasswordPage.getOldPasswordErrorMessage();
            const confirmPasswordError = await changePasswordPage.getConfirmPasswordErrorMessage();

            expect(currentPasswordError).toBe("Old password is required.");
            expect(confirmPasswordError).toBe("Password is required.");
        });
    });

    test("TC_002: Verify the error message when old password is incorrect in Change Password form", async ({ myAccountSideBarPage, changePasswordPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify the error message when old password is incorrect in Change Password form"
        });

        await test.step("Fill Change Password form with incorrect old password and submit", async () => {
            await changePasswordPage.enterOldPassword("IncorrectOldPassword");
            await changePasswordPage.enterNewPassword(newPasswordData.newPassword);
            await changePasswordPage.enterConfirmPassword(newPasswordData.newPassword);
            await changePasswordPage.clickOnChangePasswordButton();
        });

        await test.step("Verify error message is displayed for incorrect old password", async () => {
            const oldPasswordError = await changePasswordPage.getOldPasswordDoesNotMatchErrorMessage();
            expect(oldPasswordError).toBe("Old password doesn't match");
        });
    });

    test("TC_004: Verify the error message when new password less than 6 characters is submitted in Change Password form", async ({ myAccountSideBarPage, changePasswordPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify the error message when new password less than 6 characters is submitted in Change Password form"
        });

        await test.step("Fill Change Password form with new password less than 6 characters and submit", async () => {
            await changePasswordPage.enterOldPassword(newPasswordData.currentPassword);
            await changePasswordPage.enterNewPassword("123");
            await changePasswordPage.enterConfirmPassword("123");
            await changePasswordPage.clickOnChangePasswordButton();
        });

        await test.step("Verify error message is displayed for new password less than 6 characters", async () => {
            const newPasswordError = await changePasswordPage.getNewPasswordErrorMessage();
            expect(newPasswordError).toBe("Password must meet the following rules:  must have at least 6 characters and not greater than 64 characters");
        });
    });

    test("TC_005: Verify the error message when new password and confirm password do not match in Change Password form", async ({ myAccountSideBarPage, changePasswordPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify the error message when new password and confirm password do not match in Change Password form"
        });

        await test.step("Fill Change Password form with mismatched new password and confirm password and submit", async () => {

            await changePasswordPage.enterOldPassword(newPasswordData.currentPassword);
            await changePasswordPage.enterNewPassword(newPasswordData.newPassword);
            await changePasswordPage.enterConfirmPassword("12345678"); // Mismatched confirm password
            await changePasswordPage.clickOnChangePasswordButton();
        });

        await test.step("Verify error message is displayed for mismatched new password and confirm password", async () => {
            const confirmPasswordError = await changePasswordPage.getConfirmPasswordErrorMessage();
            expect(confirmPasswordError).toBe("The new password and confirmation password do not match.");
        });
    });

    test("TC_006: Verify that the password is changed successfully with valid data in Change Password form", async ({ menuHeader, loginPage, changePasswordPage }) => {
        test.info().annotations.push({
            type: "description",
            description: "Verify that the password is changed successfully with valid data in Change Password form"
        });

        await test.step("Fill Change Password form with valid data and submit", async () => {
            await changePasswordPage.enterOldPassword(newPasswordData.currentPassword);
            await changePasswordPage.enterNewPassword(newPasswordData.newPassword);
            await changePasswordPage.enterConfirmPassword(newPasswordData.newPassword);
            await changePasswordPage.clickOnChangePasswordButton();
        });

        await test.step("Verify success message is displayed after changing password", async () => {
            const successMessage = await changePasswordPage.getChangePasswordSuccessMessage();
            expect(successMessage).toContain("Password was changed");
        });
    });
});