import { Page } from "@playwright/test";
import { MyAccountSideBarPage } from "./MyAccountSideBarPage";

export class MyProductReviewsPage extends MyAccountSideBarPage {
    constructor(page: Page) {
        super(page);
    }

    get productReviewTitles() {
        return this.page.locator(".review-title strong");
    }

    get productReviewContents() {
        return this.page.locator(".review-content .review-text");
    }

    get productReviewInfoNamesProducts() {
        return this.page.locator(".review-info a");
    }

    get productReviewInfoDates() {
        return this.page.locator(".review-info .date span");
    }

    async getProductReviewTitleByIndex(index: number): Promise<string | null> {
        return this.productReviewTitles.nth(index).textContent();
    }

    async getProductReviewContentByIndex(index: number): Promise<string | null> {
        return this.productReviewContents.nth(index).textContent();
    }

    async getProductReviewInfoNameProductByIndex(index: number): Promise<string | null> {
        return this.productReviewInfoNamesProducts.nth(index).textContent();
    }

    async getProductReviewInfoDateByIndex(index: number): Promise<string | null> {
        return this.productReviewInfoDates.nth(index).textContent();
    }
}