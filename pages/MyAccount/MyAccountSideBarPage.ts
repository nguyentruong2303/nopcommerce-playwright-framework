import { Page } from "@playwright/test"


export class MyAccountSideBarPage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get customerInfoLink() {
        return this.page.locator("//a[text()='Customer info']");
    }

    get addressesLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Addresses']");
    }

    get ordersLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Orders']");
    }

    get changePasswordLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Change password']");
    }

    get recurringPaymentsLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Recurring payments']");
    }

    get downloadableProductsLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Downloadable products']");
    }

    get backInStockSubscriptionsLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Back in stock subscriptions']");
    }

    get rewardPointsLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Reward points']");
    }

    get myProductReviewsLink() {
        return this.page.locator("//ul[@class='list']//a[text()='My product reviews']");
    }

    get requestsForQuoteLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Requests for quote']");
    }

    get quotesLink() {
        return this.page.locator("//ul[@class='list']//a[text()='Quotes']");
    }

    async clickOnCustomerInfoLink() {
        await this.customerInfoLink.click();
    }

    async clickOnAddressesLink() {
        await this.addressesLink.click();
    }

    async clickOnOrdersLink() {
        await this.ordersLink.click();
    }

    async clickOnChangePasswordLink() {
        await this.changePasswordLink.click();
    }

    async clickOnRecurringPaymentsLink() {
        await this.recurringPaymentsLink.click();
    }

    async clickOnDownloadableProductsLink() {
        await this.downloadableProductsLink.click();
    }

    async clickOnBackInStockSubscriptionsLink() {
        await this.backInStockSubscriptionsLink.click();
    }

    async clickOnRewardPointsLink() {
        await this.rewardPointsLink.click();
    }

    async clickOnMyProductReviewsLink() {
        await this.myProductReviewsLink.click();
    }

    async clickOnRequestsForQuoteLink() {
        await this.requestsForQuoteLink.click();
    }

    async clickOnQuotesLink() {
        await this.quotesLink.click();
    }
}