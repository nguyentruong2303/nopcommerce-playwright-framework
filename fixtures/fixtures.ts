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
import { fa, faker } from "@faker-js/faker";
type Fixtures = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
    menuHeader: MenuHeader;
    homePage: HomePage;
    myAccountSideBarPage: MyAccountSideBarPage;
    customerPage: CustomerPage;
    addressPage: AddressPage;
    changePasswordPage: ChangePasswordPage;
    myProductReviewsPage: MyProductReviewsPage;
    closeBrowserAfterTest: void;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    menuHeader: async ({ page }, use) => {
        await use(new MenuHeader(page));
    },

    registerPage: async ({ menuHeader, page }, use) => {
        const registerPage = new RegisterPage(page);
        await page.goto(BASE_URL)
        await menuHeader.openRegisterPage();
        await use(registerPage);
    },
    loginPage: async ({ page, menuHeader }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(BASE_URL);
        await menuHeader.openLoginPage();
        await use(loginPage);
    },
    myAccountSideBarPage: async ({ page, registerPage, loginPage, menuHeader }, use) => {
        await menuHeader.openRegisterPage();
        await registerPage.fillForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            company: "Test Company",
            password: "Test@1234",
            confirmPassword: "Test@1234"
        });
        await registerPage.clickOnRegisterButton();

        await menuHeader.isMyAccountLinkVisible();
        await menuHeader.openMyAccountPage();
        await use(new MyAccountSideBarPage(page));
    },
    customerPage: async ({ page, myAccountSideBarPage }, use) => {
        await myAccountSideBarPage.clickOnCustomerInfoLink();
        await use(new CustomerPage(page));
    },
    addressPage: async ({ page, myAccountSideBarPage }, use) => {
        await myAccountSideBarPage.clickOnAddressesLink();
        await use(new AddressPage(page));
    },
    changePasswordPage: async ({ page, myAccountSideBarPage }, use) => {
        await myAccountSideBarPage.clickOnChangePasswordLink();
        await use(new ChangePasswordPage(page));
    },
    myProductReviewsPage: async ({ page, myAccountSideBarPage }, use) => {
        await myAccountSideBarPage.clickOnMyProductReviewsLink();
        await use(new MyProductReviewsPage(page));
    },

    closeBrowserAfterTest: async ({ page, context }, use) => {
        await use();
        await page.close();
        await context.close();
    }
});