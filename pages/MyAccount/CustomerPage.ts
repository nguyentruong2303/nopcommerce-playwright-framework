import { Page } from "@playwright/test";
import { MyAccountSideBarPage } from "./MyAccountSideBarPage";

export class CustomerPage extends MyAccountSideBarPage {
    constructor(page: Page) {
        super(page);
    }

    get genderMaleRadioButton() {
        return this.page.locator("#gender-male");
    }

    get genderFemaleRadioButton() {
        return this.page.locator("#gender-female");
    }

    get firstNameTextbox() {
        return this.page.locator("#FirstName");
    }

    get lastNameTextbox() {
        return this.page.locator("#LastName");
    }

    get emailTextbox() {
        return this.page.locator("#Email");
    }

    get companyNameTextbox() {
        return this.page.locator("#Company");
    }

    get saveButton() {
        return this.page.locator("//button[@name='save-info-button']");
    }

    get successMessage() {
        return this.page.locator("#bar-notification p");
    }

    async selectGender(gender: "male" | "female"): Promise<void> {
        if (gender === "male") {
            await this.genderMaleRadioButton.check();
        } else {
            await this.genderFemaleRadioButton.check();
        }
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameTextbox.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameTextbox.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailTextbox.fill(email);
    }

    async enterCompanyName(companyName: string): Promise<void> {
        await this.companyNameTextbox.fill(companyName);
    }

    async clickOnSaveButton(): Promise<void> {
        await this.saveButton.click();
    }

    async getSuccessMessage(): Promise<string | null> {
        return this.successMessage.textContent();
    }

    async updateCustomerInfo(firstName: string, lastName: string, email: string, companyName: string, gender: "male" | "female"): Promise<void> {
        await this.selectGender(gender);
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterCompanyName(companyName);
        await this.clickOnSaveButton();
    }

    async getGender(): Promise<string> {
        if (await this.genderMaleRadioButton.isChecked()) {
            return "male";
        } else {
            return "female";
        }
    }

    async getFirstName(): Promise<string> {
        return this.firstNameTextbox.inputValue();
    }

    async getLastName(): Promise<string> {
        return this.lastNameTextbox.inputValue();
    }

    async getEmail(): Promise<string> {
        return this.emailTextbox.inputValue();
    }

    async getCompanyName(): Promise<string> {
        return this.companyNameTextbox.inputValue();
    }
}