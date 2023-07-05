import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class EluminaLoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly AUTHOR: Locator;
    readonly EXAMSMENU: Locator;

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

    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testConfig.username);
        await this.PASSWORD_EDITBOX.fill(decipherPassword);
        await this.LOGIN_BUTTON.click();
    }

    async verifyProfilePage(): Promise<void> {
        await expect(this.HOMEPAGE).toBeVisible();
    }

}