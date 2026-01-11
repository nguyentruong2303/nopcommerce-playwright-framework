import { Page } from "@playwright/test";


export class MenuFooter {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get searchLink() {
        return this.page.locator("a[href='/search']");
    }

    async openSearchPage() {
        await this.searchLink.click();
    }
}