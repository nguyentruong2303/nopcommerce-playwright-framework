import { test} from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test.describe("Search Functionality", () => {
    test.beforeEach(async ({ menuFooter, authenticatedUser }) => {
        // Navigate to the search page before each test
        await menuFooter.openSearchPage();
        await authenticatedUser; // Ensure user is authenticated
    });

    test("TC_0001: Should display warning message for empty search input", async ({ searchPage }) => {
        await searchPage.clickSearchButton();
        const warningMessage = await searchPage.warningMessage.textContent();
        expect(warningMessage).toContain("Search term minimum length is 3 characters");
    });

    test("TC_0002:Should display 'No products found' for non-matching search term", async ({ searchPage }) => {
        await searchPage.enterSearchKeyword("NonExistentProduct123");
        await searchPage.clickSearchButton();
        const noProductsMessage = await searchPage.noProductsFoundMessage.textContent();
        expect(noProductsMessage).toContain("No products were found that matched your criteria.");
    });

    test("TC_0003: Should return results for valid search term", async ({ searchPage }) => {
        await searchPage.enterSearchKeyword("Lenovo");
        await searchPage.clickSearchButton();
        await searchPage.isProductFoundByName("Lenovo IdeaCentre");// Expecting some products to be found
        await searchPage.isProductFoundByName("Lenovo Thinkpad Carbon Laptop");
    });

    test("TC_0004: Search return results for valid search term with filters", async ({ searchPage }) => {
        await searchPage.enterSearchKeyword("Lenovo Thinkpad Carbon Laptop");
        await searchPage.clickSearchButton();
        await searchPage.isProductFoundByName("Lenovo Thinkpad Carbon Laptop");
    });

    test("TC_0005: Advance search with parent categories only", async ({ searchPage }) => {
        await searchPage.enterSearchKeyword("Apple MacBook Pro");
        await searchPage.clickAdvanceSearchCheckbox();
        await searchPage.selectCategory("Computers");
        await searchPage.clickSearchButton();
        const noProductsMessage = await searchPage.noProductsFoundMessage.textContent();
        expect(noProductsMessage).toContain("No products were found that matched your criteria.");
    });
});