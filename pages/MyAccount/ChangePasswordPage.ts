import { Page } from "@playwright/test";
import { MyAccountSideBarPage } from "./MyAccountSideBarPage";


export class ChangePasswordPage extends MyAccountSideBarPage {
    constructor(page: Page) {
        super(page);
    }

    get oldPasswordTextbox() {
        return this.page.locator("#OldPassword");
    }

    get newPasswordTextbox() {
        return this.page.locator("#NewPassword");
    }

    get confirmPasswordTextbox() {
        return this.page.locator("#ConfirmNewPassword");
    }

    get changePasswordButton() {
        return this.page.locator(".change-password-button");
    }

    get changePasswordSuccessMessage() {
        return this.page.locator("#bar-notification p");
    }       

    get oldPasswordErrorMessage() {
        return this.page.locator("#OldPassword-error");     
    }

    get newPasswordErrorMessage() {
        return this.page.locator("#NewPassword-error");
    }

    get confirmPasswordErrorMessage() {
        return this.page.locator("#ConfirmNewPassword-error");
    }

    get oldPasswordDoesNotMatchErrorMessage() {
        return this.page.locator(".change-password-page li");
    }

    async enterOldPassword(oldPassword: string): Promise<void> {
        await this.oldPasswordTextbox.fill(oldPassword);
    }

    async enterNewPassword(newPassword: string): Promise<void> {
        await this.newPasswordTextbox.fill(newPassword);
    }   

    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordTextbox.fill(confirmPassword);
    }   

    async clickOnChangePasswordButton(): Promise<void> {        
        await this.changePasswordButton.click();
    }

    async getChangePasswordSuccessMessage(): Promise<string | null> {
        return this.changePasswordSuccessMessage.textContent();
    }   

    async getOldPasswordErrorMessage(): Promise<string | null> {
        return this.oldPasswordErrorMessage.textContent();
    }

    async getNewPasswordErrorMessage(): Promise<string | null> {
        return this.newPasswordErrorMessage.textContent();
    }

    async getConfirmPasswordErrorMessage(): Promise<string | null> {
        return this.confirmPasswordErrorMessage.textContent();
    }   

    async getOldPasswordDoesNotMatchErrorMessage(): Promise<string | null> {
        return this.oldPasswordDoesNotMatchErrorMessage.textContent();
    }
}