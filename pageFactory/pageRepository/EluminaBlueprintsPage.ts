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
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

let currentDate = new Date();

export class EluminaBlueprintsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly Blueprint: Locator;
    readonly clickCreateBlueprint: Locator;
    readonly typeTitle: Locator;
    readonly SelectBank: Locator;
    readonly cartName: Locator;
    readonly cartItemsRequired: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.Blueprint = page.locator('//a[@data-tour="Blueprints"]');
        this.clickCreateBlueprint = page.locator('//button[text()="Create Blueprint"]');
        this.typeTitle = page.locator('//input[@class="textField ng-dirty ng-invalid ng-touched"]');
        this.SelectBank = page.locator('//input[@placeholder="Select Bank"]');
        this.cartName = page.locator('//input[@placeholder="Cart"]');
        this.cartItemsRequired = page.locator('(//input[@placeholder="0"])[2]');
    }

    /**Method for Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaBlueprintsPage(newPage);
    }

    /**Method for Blueprint Menu click on Menu bar */
    async BlueprintMenuClick(): Promise<void> {
        await this.Blueprint.click();
    }

    async createBluePrint() {
        await this.clickCreateBlueprint.click();
        await this.typeTitle.click();
        await this.typeTitle.type(testData.BluePrintTitle + currentDate);
        await this.SelectBank.click();
        await this.SelectBank.type(testData.TestBank2);
        await this.cartName.click();
        await this.cartName.type(testData.cartName);
        await this.cartItemsRequired.click();
        await this.cartItemsRequired.type(testData.cartItems);

    }
}