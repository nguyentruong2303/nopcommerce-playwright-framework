import { Page } from "@playwright/test"


export class SearchPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get searchKeywordInput() {
        return this.page.locator('.search-text');
    }

    get advanceSearchCheckbox() {
        return this.page.locator("//label[text()='Advanced search']//preceding-sibling::input");
    }

    get searchButton() {
        return this.page.locator("//main[@id='main']//button[text()='Search']");
    }

    get categoryDropdown() {
        return this.page.locator("//label[text()='Category:']//following-sibling::select");
    }

    get automationSearchSubCategoryOption() {
        return this.page.locator("//label[text()='Automatically search sub categories']//preceding-sibling::input");
    }

    get manufacturersDropdown() {
        return this.page.locator("//label[text()='Manufacturer:']//following-sibling::select");
    }

    get searchInProductDescriptionsOption() {
        return this.page.locator("//label[text()='Search In product descriptions']//preceding-sibling::input");
    }

    get searchInProductTagsOption() {
        return this.page.locator("//label[text()='Search In product tags']//preceding-sibling::input");
    }

    get warningMessage() {
        return this.page.locator("//div[@class='warning']");
    }

    get noProductsFoundMessage() {
        return this.page.locator("//div[@class='no-result']");
    }

    async enterSearchKeyword(keyword: string) {
        await this.searchKeywordInput.fill(keyword);
    }

    async clickAdvanceSearchCheckbox() {
        await this.advanceSearchCheckbox.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async selectCategory(category: string) {
        await this.categoryDropdown.selectOption(category);
    }

    async selectManufacturer(manufacturer: string) {
        await this.manufacturersDropdown.selectOption(manufacturer);
    }

    async clickAutomationSearchSubCategoryOption() {
        await this.automationSearchSubCategoryOption.click();
    }

    async clickSearchInProductDescriptionsOption() {
        await this.searchInProductDescriptionsOption.click();
    }

    async clickSearchInProductTagsOption() {
        await this.searchInProductTagsOption.click();
    }

    async getWarningMessageText() {
        return await this.warningMessage.textContent();
    }

    async getNoProductsFoundMessageText() {
        return await this.noProductsFoundMessage.textContent();
    }

    async isProductFoundByName(productName: string) {
        const productLocator = this.page.locator(`//h2[@class='product-title']/a[text()='${productName}']`);
        return await productLocator.isVisible();
    }
}