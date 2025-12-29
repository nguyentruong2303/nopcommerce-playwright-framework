import { Page } from "@playwright/test";

export class HomePage {    
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get customerCurrencyDropdown() {
        return this.page.locator("#customerCurrency");
    }

    get customerLanguageDropdown() {
        return this.page.locator("#customerlanguage");
    }

    async selectCurrency(currency: string) {
        await this.customerCurrencyDropdown.selectOption(currency);
    }

    async selectLanguage(language: string) {
        await this.customerLanguageDropdown.waitFor({ state: "visible" });
        await this.customerLanguageDropdown.selectOption(language);
    }
}