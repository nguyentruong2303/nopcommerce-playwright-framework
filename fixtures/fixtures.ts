import { RegisterPage } from "../pages/RegisterPage";
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MenuHeader } from "../pages/MenuHeader";
import { HomePage } from "../pages/HomePage";
import { BASE_URL } from "../constants/urls";

type Fixtures = {
    registerPage: RegisterPage;
    loginPage: LoginPage;
    menuHeader: MenuHeader;
    homePage: HomePage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    menuHeader: async ({ page }, use) => {
        await use(new MenuHeader(page));
    },  

    registerPage: async ({ homePage, menuHeader, page }, use) => {
        const registerPage = new RegisterPage(page);
        await page.goto(BASE_URL)
        await menuHeader.openRegisterPage();
        await homePage.selectCurrency("US Dollar");
        await homePage.selectLanguage("English");
        await use(registerPage);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },


});