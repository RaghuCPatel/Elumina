import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class EluminaHomePage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly EXAMSMENU: Locator;
    readonly Registraion:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]');
        this.Registraion=page.locator('//a[text()="Registration"]');
    }

    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaHomePage(newPage);
    }

    async iAuthorPageVerification() {
          await expect(this.EXAMSMENU).toBeVisible();
          await expect(this.Registraion).toBeVisible();
    }

}