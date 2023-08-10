import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let webActions: WebActions;
let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
} 

export class EluminaLoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly AUTHOR: Locator;
    readonly EXAMSMENU: Locator;
    readonly InactiveUseralert:Locator;
    readonly RatelimitLogin:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.LOGIN_BUTTON = page.locator('//*[@class="submit-butn"]');
        this.HOMEPAGE = page.locator('//*[@title="Question Management System"]');
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.InactiveUseralert=page.locator('//div[text()="Your account has been deactivated, Kindly contact your system administrator to activate your account."]');
        this.RatelimitLogin=page.locator('//div[text()="Attempts exceeded the Limit"]');
    }

    /**Navigate to login URL */
    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    /**Navigate to Login Application */
    async loginToApplication(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Navigate to Login Application */
    async loginToApplicationwithInactiveId(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.InactiveUsername);
        await this.PASSWORD_EDITBOX.fill(testData.InactivePassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InactiveUseralert.isVisible();
        console.log(await this.InactiveUseralert.textContent());
       
        //await expect(this.InactiveUseralert).toHaveText('Your account has been deactivated, Kindly contact your system administrator to activate your account."]');
    }

    /**Navigate to Login Application */
    async Rateloginattemptcheck(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        for(let i=1;i<4;i++){
        await this.USERNAME_EDITBOX.clear();
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.clear();
        await this.PASSWORD_EDITBOX.fill(testData.InactivePassword);
        await this.LOGIN_BUTTON.click();
        }
        await this.RatelimitLogin.isVisible();
        console.log(await this.RatelimitLogin.textContent());
    }

    /**Method to Verify Profile page */
    async verifyProfilePage(): Promise<void> {
        await expect(this.HOMEPAGE).toBeVisible();
    }

}