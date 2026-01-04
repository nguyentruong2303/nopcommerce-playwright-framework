import { Page } from "@playwright/test";
import { MyAccountSideBarPage } from "./MyAccountSideBarPage";
import { th } from "@faker-js/faker";

export class AddressPage extends MyAccountSideBarPage {
    constructor(page: Page) {
        super(page);
    }
    get addNewButton() {
        return this.page.locator("//button[text()='Add new']");
    }

    get firstNameTextbox() {
        return this.page.locator("#Address_FirstName");
    }

    get lastNameTextbox() {
        return this.page.locator("#Address_LastName");
    }

    get emailTextbox() {
        return this.page.locator("#Address_Email");
    }

    get companyTextbox() {
        return this.page.locator("#Address_Company");
    }

    get countryDropdown() {
        return this.page.locator("#Address_CountryId");
    }

    get stateDropdown() {
        return this.page.locator("//select[@id='Address_StateProvinceId']");
    }

    get cityTextbox() {
        return this.page.locator("#Address_City");
    }

    get address1Textbox() {
        return this.page.locator("#Address_Address1");
    }

    get address2Textbox() {
        return this.page.locator("#Address_Address2");
    }

    get zipPostalCodeTextbox() {
        return this.page.locator("#Address_ZipPostalCode");
    }

    get phoneNumberTextbox() {
        return this.page.locator("#Address_PhoneNumber");
    }

    get faxNumberTextbox() {
        return this.page.locator("#Address_FaxNumber");
    }

    get saveButton() {
        return this.page.locator("//button[text()='Save']");
    }

    get lastNameErrorMessage() {
        return this.page.locator("#Address_LastName-error");
    }

    get firstNameErrorMessage() {
        return this.page.locator("#Address_FirstName-error");
    }

    get emailErrorMessage() {
        return this.page.locator("#Address_Email-error");
    }

    get cityErrorMessage() {
        return this.page.locator("#Address_City-error");
    }

    get stateProvinceErrorMessage() {
        return this.page.locator(".field-validation-error");
    }

    get address1ErrorMessage() {
        return this.page.locator("#Address_Address1-error");
    }   

    get zipPostalCodeErrorMessage() {
        return this.page.locator("#Address_ZipPostalCode-error");
    }

    get phoneNumberErrorMessage() {
        return this.page.locator("#Address_PhoneNumber-error");
    }

    get successMessage() {
        return this.page.locator("#bar-notification p");
    }

    get editButton() {
        return this.page.locator("//button[text()='Edit']");
    }

    get deleteButton() {
        return this.page.locator("//button[text()='Delete']");
    }

    get noAddressesMessage() {
        return this.page.locator("//div[contains(text(),'No addresses')]");
    }

    async clickOnAddNewButton() {
        await this.addNewButton.click();
    }

    async enterFirstName(firstName: string) {    
        await this.firstNameTextbox.fill(firstName);
    }

    async enterLastName(lastName: string) {    
        await this.lastNameTextbox.fill(lastName);
    }       

    async enterEmail(email: string) {    
        await this.emailTextbox.fill(email);
    }

    async enterCompany(company: string) {    
        await this.companyTextbox.fill(company);
    }

    async selectCountry(country: string) {    
        await this.countryDropdown.selectOption(country);
    }       

    async selectState(state: string) {   
        await this.page.waitForTimeout(500); 
        await this.stateDropdown.selectOption(state);
    }   

    async enterCity(city: string) {    
        await this.cityTextbox.fill(city);
    }

    async enterAddress1(address1: string) {    
        await this.address1Textbox.fill(address1);
    }   

    async enterAddress2(address2: string) {    
        await this.address2Textbox.fill(address2);
    }

    async enterZipPostalCode(zipPostalCode: string) {    
        await this.zipPostalCodeTextbox.fill(zipPostalCode);
    }

    async enterPhoneNumber(phoneNumber: string) {    
        await this.phoneNumberTextbox.fill(phoneNumber);
    }

    async enterFaxNumber(faxNumber: string) {    
        await this.faxNumberTextbox.fill(faxNumber);
    }

    async clickOnSaveButton() {
        await this.saveButton.click();
    }

    async getLastNameErrorMessage(): Promise<string | null> {
        return this.lastNameErrorMessage.textContent();
    }

    async getFirstNameErrorMessage(): Promise<string | null> {
        return this.firstNameErrorMessage.textContent();
    }

    async getEmailErrorMessage(): Promise<string | null> {
        return this.emailErrorMessage.textContent();
    }   

    async getStateProvinceErrorMessage(): Promise<string | null> {
        return this.stateProvinceErrorMessage.textContent();
    }

    async getCityErrorMessage(): Promise<string | null> {
        return this.cityErrorMessage.textContent();
    }

    async getAddress1ErrorMessage(): Promise<string | null> {
        return this.address1ErrorMessage.textContent();
    }       

    async getZipPostalCodeErrorMessage(): Promise<string | null> {
        return this.zipPostalCodeErrorMessage.textContent();
    }       

    async getPhoneNumberErrorMessage(): Promise<string | null> {
        return this.phoneNumberErrorMessage.textContent();
    }

    async fillAddressForm(firstName: string, lastName: string, email: string, company: string, country: string, state: string, city: string, address1: string, address2: string, zipPostalCode: string, phoneNumber: string, faxNumber: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);     
        await this.enterEmail(email);
        await this.enterCompany(company);
        await this.selectCountry(country);       
        await this.selectState(state);  
        await this.enterCity(city);
        await this.enterAddress1(address1);   
        await this.enterAddress2(address2);
        await this.enterZipPostalCode(zipPostalCode);       
        await this.enterPhoneNumber(phoneNumber);
        await this.enterFaxNumber(faxNumber);
    }

    async getFirstname(): Promise<string> {    
        return this.firstNameTextbox.inputValue();
    }

    async getLastname(): Promise<string> {    
        return this.lastNameTextbox.inputValue();
    }   

    async getEmail(): Promise<string> {    
        return this.emailTextbox.inputValue();
    }   

    async getCompany(): Promise<string> {    
        return this.companyTextbox.inputValue();
    }   

    async getCountry(): Promise<string> {    
        return await this.countryDropdown.locator('option:checked').textContent() || '';
    }   

    async getState(): Promise<string> {    
        return await this.stateDropdown.locator('option:checked').textContent() || '';
    }   

    async getCity(): Promise<string> {    
        return this.cityTextbox.inputValue();
    }   

    async getAddress1(): Promise<string> {    
        return this.address1Textbox.inputValue();
    }   

    async getAddress2(): Promise<string> {    
        return this.address2Textbox.inputValue();
    }   

    async getZipPostalCode(): Promise<string> {    
        return this.zipPostalCodeTextbox.inputValue();
    }   

    async getPhoneNumber(): Promise<string> {    
        return this.phoneNumberTextbox.inputValue();
    }   

    async getFaxNumber(): Promise<string> {    
        return this.faxNumberTextbox.inputValue();
    }   

    async clickOnEditButton() {
        await this.editButton.click();
    }

    async clickOnDeleteButton() {
        await this.deleteButton.click();
        await this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async isNoAddressesMessageDisplayed(): Promise<boolean> {
        return this.noAddressesMessage.isVisible();
    }

}