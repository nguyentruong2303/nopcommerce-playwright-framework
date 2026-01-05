import { Page } from "@playwright/test";


export class LoginPage {

    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get emailTextbox() {
        return this.page.locator("#Email");
    }

    get passwordTextbox() {
        return this.page.locator("#Password");
    }

    get loginButton() {
        return this.page.locator("//button[text()='Log in']");
    }

    get emailErrorMessage() {
        return this.page.locator("#Email-error");
    }

    get unsuccessfulLoginMessage() {
        return this.page.locator(".message-error");
    }

    async login(email: string, password: string) {
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async getEmailErrorMessage(): Promise<string | null> {
        return this.emailErrorMessage.textContent();
    }

    async getUnsuccessfulLoginMessage(): Promise<string | null> {
        return this.unsuccessfulLoginMessage.textContent();
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

}
