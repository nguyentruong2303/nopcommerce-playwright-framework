import { RegisterPage } from "../pages/RegisterPage";
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MenuHeader } from "../pages/MenuHeader";
import { HomePage } from "../pages/HomePage";
import { BASE_URL } from "../constants/urls";
import { MyAccountSideBarPage } from "../pages/MyAccount/MyAccountSideBarPage";
import { CustomerPage } from "../pages/MyAccount/CustomerPage";
import { AddressPage } from "../pages/MyAccount/AddressPage";
import { ChangePasswordPage } from "../pages/MyAccount/ChangePasswordPage";
import { MyProductReviewsPage } from "../pages/MyAccount/MyProductReviewsPage";
import { faker } from "@faker-js/faker";
import * as testData from "../test-data/register-data.json";
import { ComputersPage } from "../pages/Products/ComputersPage";
import { DesktopsPage } from "../pages/Products/DesktopsPage";
import { ProductDetailPage } from "../pages/Products/ProductDetailPage";
import { MenuFooter } from "../pages/MenuFooter";
import { SearchPage } from "../pages/SearchPage";

type UserData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

type Fixtures = {
    // Page Objects - chỉ khởi tạo
    registerPage: RegisterPage;
    loginPage: LoginPage;
    menuHeader: MenuHeader;
    homePage: HomePage;
    menuFooter: MenuFooter;

    // My Account pages - cần user authenticated
    myAccountSideBarPage: MyAccountSideBarPage;
    customerPage: CustomerPage;
    addressPage: AddressPage;
    changePasswordPage: ChangePasswordPage;
    myProductReviewsPage: MyProductReviewsPage;
    searchPage: SearchPage;

    // Product pages
    computersPage: ComputersPage;
    desktopsPage: DesktopsPage;
    productsDetailsPage: ProductDetailPage;

    // Helper fixtures
    authenticatedUser: UserData;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    menuHeader: async ({ page }, use) => {
        await use(new MenuHeader(page));
    },

    menuFooter: async ({ page }, use) => {
        await use(new MenuFooter(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    authenticatedUser: async ({ page, menuHeader, registerPage }, use) => {
        const userData = {
            email: faker.internet.email(),
            password: testData.defaultPassword,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        };
        await page.goto(BASE_URL);
        await menuHeader.openRegisterPage();
        await registerPage.fillForm({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            company: testData.companyName,
            password: userData.password,
            confirmPassword: userData.password
        });

        await registerPage.clickOnRegisterButton();
        await use(userData);
    },

    myAccountSideBarPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before accessing My Account
        await use(new MyAccountSideBarPage(page));
    },

    customerPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before accessing Customer Info
        await use(new CustomerPage(page));
    },

    addressPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before accessing Addresses
        await use(new AddressPage(page));
    },

    changePasswordPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before changing password
        await use(new ChangePasswordPage(page));
    },

    myProductReviewsPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before accessing Product Reviews
        await use(new MyProductReviewsPage(page));
    },

    searchPage: async ({ page, authenticatedUser }, use) => {
        // authenticatedUser ensures user is logged in before accessing Search
        await use(new SearchPage(page));
    },

    computersPage: async ({ page }, use) => {
        await use(new ComputersPage(page));
    },

    desktopsPage: async ({ page }, use) => {
        await use(new DesktopsPage(page));
    },
    productsDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
});