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
    readonly AddFilter: Locator;
    readonly selectFilter: Locator;
    readonly selectFilter1: Locator;
    readonly selectFilter2: Locator;
    readonly tickIconClick: Locator;
    readonly SaveButtonClicks: Locator;
    readonly FilterSuccessMessage: Locator;
    readonly closeButton: Locator;
    readonly nextButtonClick: Locator;
    readonly TestBank: Locator;
    readonly clickOnSaveDraft: Locator;
    readonly workflowSuccessMessage: Locator;
    readonly editBlueprint: Locator;
    readonly cartButtonClick: Locator;
    readonly addToCart: Locator;
    readonly saveButton: Locator;
    readonly saveSuccessMessage: Locator;
    readonly workflowclick: Locator;
    readonly approveButtonClick: Locator;
    readonly SearchDraftQuestions: Locator;
    readonly ClickOnQuestionID: Locator;
    readonly ClickOnAddCartBtn: Locator;
    readonly ClickOnAddCartBtn2: Locator;
    readonly ClickOnToCart: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly ClickOnMoreIcon: Locator;
    readonly EnterCartItem: Locator;
    readonly EnterNumberReq: Locator;
    readonly ClickOnAddFilter: Locator;
    readonly SaveButtonClick: Locator;
    readonly ClickOnVersionHistory: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly removeCartButtonClick: Locator;
    readonly cancelButtonClick: Locator;
    readonly moreOptionClick: Locator;
    readonly convertToExam: Locator;
    readonly saveButtonOnModify: Locator;
    readonly saveDraftOnWorkFlow: Locator;
    readonly editNumRequired: Locator;
    readonly removeFromCart: Locator;
    readonly clickOnRemoveCartBtn: Locator;
    readonly saveBtnOnRemoveCart: Locator;
    readonly cancelBtnOnRemoveCart: Locator;
    readonly cartItemIsZero: Locator;
    readonly saveDraftText: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.Blueprint = page.locator('//a[@data-tour="Blueprints"]');
        this.clickCreateBlueprint = page.locator('//button[text()="Create Blueprint"]');
        this.typeTitle = page.locator('//input[@name="inputbox"]');
        this.SelectBank = page.locator('//input[@placeholder="Select Bank"]');
        this.TestBank = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]')
        this.cartName = page.locator('//input[@placeholder="Cart"]');
        this.cartItemsRequired = page.locator('(//input[@placeholder="0"])[2]');
        this.AddFilter = page.locator('(//button[@class="btn btn-blue"])[1]');
        this.selectFilter = page.locator('//body//app-root//select[2]');
        this.selectFilter1 = page.locator('//body//app-root//select[3]');
        this.selectFilter2 = page.locator('//body//app-root//select[4]');
        this.tickIconClick = page.locator('//i[@class="tick-icon ng-star-inserted"]');
        this.SaveButtonClicks = page.locator('//button[text()="Save"]');
        this.FilterSuccessMessage = page.locator('//div[text()="Filter Saved Successfully"]');
        this.closeButton = page.locator('(//button[@type="button"][normalize-space()="×"])[1]');
        this.nextButtonClick = page.locator('//button[text()="Next"]');
        this.clickOnSaveDraft = page.locator('//button[text()="Save Draft"]');
        this.workflowSuccessMessage = page.locator('//span[text()="Workflow has been created successfuly"]');
        this.editBlueprint = page.locator('//button[text()="Edit this Blueprint"]');
        this.cartButtonClick = page.locator('//div[@class="cartAdd-btn ng-star-inserted"]');
        this.removeCartButtonClick = page.locator('//div[@class="cartMinus-btn ng-star-inserted"]');
        this.addToCart = page.locator('//button[text()="Add to cart"]');
        this.saveButton = page.locator('(//button[text()="Save"])[2]');
        this.saveSuccessMessage = page.locator('//span[text()="Cart Details updated successfully"]');
        this.workflowclick = page.locator('//p[text()="Workflow"]');
        this.approveButtonClick = page.locator('//button[text()="Approve"]');
        this.SearchDraftQuestions = page.locator('//input[@placeholder="Search Blueprint(s)"]')
        this.ClickOnQuestionID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a')
        this.ClickOnAddCartBtn = page.locator('//div[@class="cartAdd-btn ng-star-inserted"]');
        this.ClickOnAddCartBtn2 = page.locator('(//div[@class="cartAdd-btn ng-star-inserted"])[2]')
        this.ClickOnToCart = page.locator('//button[contains(text(),"Add to cart")]')
        this.ClickOnSaveBtn = page.locator('(//button[text()="Save"])[2]')
        this.ClickOnMoreIcon = page.locator('//div[@class="plus-btn"]')
        this.EnterCartItem = page.locator('(//input[@class="inputtxt ng-untouched ng-pristine ng-valid ng-star-inserted"])[3]')
        this.EnterNumberReq = page.locator('(//div[@class="custom-tbdata item-required"]//input)[2]')
        this.ClickOnAddFilter = page.locator('(//button[@class="btn btn-blue"])[2]')
        this.SaveButtonClick = page.locator('(//button[text()="Save"])[3]');
        this.closeButton = page.locator('(//button[@type="button"][text()="×"])[2]');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//div//button[@class="theme-btn theme-primary-btn ng-star-inserted"]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[contains(text(),"Status has been updated successfuly")]')
        this.ClickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]')
        this.cancelButtonClick = page.locator('(//button[text()="Cancel"])[2]');
        this.moreOptionClick = page.locator('//button[normalize-space()="..."]');
        this.convertToExam = page.locator('//a[normalize-space()="Convert to exam"]');
        this.saveButtonOnModify = page.locator('//div[@class="dropdownbtn"]');
        this.saveDraftOnWorkFlow = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[1]')
        this.saveDraftText = page.locator('//button[text()="Save Draft"]')
        this.editNumRequired = page.locator('(//div[@class="ngx-dnd-item custom-trow ng-star-inserted"]//div)[5]//input')
        // this.removeQuesOnCart=page.locator('(//table[@class="table"])[2]//tbody//tr//td//input')
        this.removeFromCart = page.locator('(//div//button[@class="btn primarybtn"])[2]')
        this.clickOnRemoveCartBtn = page.locator('//div[@class="cartMinus-btn ng-star-inserted"]')
        this.saveBtnOnRemoveCart = page.locator('(//div//button[@class="btn primarybtn"])[3]')
        this.cancelBtnOnRemoveCart = page.locator('(//button[@class="btn btn-default"])[1]')
        this.cartItemIsZero = page.locator('(//table//tbody//tr//td)[2]')

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

    async searchDraftBlueprintQueation() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 3; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
    }


    async searchDraftBlueprintQuestionToApprove() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(3000)
        //removeQuesOnCart
        await this.clickOnRemoveCartBtn.click()
        await this.page.waitForTimeout(2000);
        if (await this.cartItemIsZero.textContent() == "0") {
            console.log('dfsss:', 'noo');
            await this.page.waitForTimeout(3000);
            await this.cancelBtnOnRemoveCart.click();
        }
        else {
            console.log('SSSSSSSSSS: ', 'yesss');
            await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
            const checksToDelete = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
            for (let i = 0; i < checksToDelete.length; i++) {
                await checksToDelete[i].click()
            }
            await this.removeFromCart.click()
            await this.saveBtnOnRemoveCart.click()
        }
        await this.editNumRequired.click()
        await this.editNumRequired.clear()
        await this.editNumRequired.fill('3')
        await this.page.waitForTimeout(3000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 3; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(4000)
    }


    async addQuestionsToCart() {
        await this.ClickOnMoreIcon.click()
        await this.EnterCartItem.click()
        await this.EnterCartItem.type('Item4')
        await this.page.waitForTimeout(5000)
        await this.EnterNumberReq.click()
        await this.EnterNumberReq.type("1")
        await this.ClickOnAddFilter.click()
        await this.page.waitForTimeout(2000);
        await this.selectFilter.click();
        await this.selectFilter.selectOption('Type');
        await this.page.waitForTimeout(2000);
        await this.selectFilter1.click();
        await this.selectFilter1.selectOption('is equal to');
        await this.page.waitForTimeout(2000);
        await this.selectFilter2.click();
        await this.selectFilter2.selectOption('MCQ');
        await this.page.waitForTimeout(2000);
        await this.tickIconClick.click();
        await this.SaveButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.closeButton.click();
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn2.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()
    }


    async approveBluePrintId() {
        await this.ClickOnWorkFlow.click();
        // await this.saveDraftOnWorkFlow.click();
        await this.page.waitForTimeout(4000);
        if(await this.saveDraftText.textContent()=="Save Draft"){
            this.saveDraftOnWorkFlow.click()
        }
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);

    }

    async createBluePrint() {
        await this.clickCreateBlueprint.click();
        await this.typeTitle.click();
        await this.page.waitForTimeout(2000);
        await this.typeTitle.type(testData.BluePrintTitle + currentDate);
        await this.page.waitForTimeout(2000);
        await this.SelectBank.click();
        await this.SelectBank.type(testData.TestBank3);
        await this.TestBank.click();
        await this.page.waitForTimeout(2000);
        await this.cartName.click();
        await this.cartName.type(testData.cartName);
        await this.cartItemsRequired.click();
        await this.cartItemsRequired.type(testData.cartItems);
        await this.AddFilter.click();
        await this.page.waitForTimeout(2000);
        await this.selectFilter.click();
        await this.selectFilter.selectOption('Type');
        await this.page.waitForTimeout(2000);
        await this.selectFilter1.click();
        await this.selectFilter1.selectOption('is equal to');
        await this.page.waitForTimeout(2000);
        await this.selectFilter2.click();
        await this.selectFilter2.selectOption('MCQ');
        await this.page.waitForTimeout(2000);
        await this.tickIconClick.click();
        await this.SaveButtonClicks.click();
        await this.page.waitForTimeout(2000);
        await this.closeButton.click();
        await this.page.waitForTimeout(2000);
        await this.nextButtonClick.click();
        await this.page.waitForTimeout(3000);
        await this.clickOnSaveDraft.click();
        console.log(await this.workflowSuccessMessage.textContent());
        await expect(this.workflowSuccessMessage).toHaveText("Workflow has been created successfuly");
        await this.editBlueprint.click();
        await this.page.waitForTimeout(2000);
        await this.cartButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 4; i++) {
            await checks[i].click()
        }
        await this.addToCart.click();
        await this.page.waitForTimeout(2000);
        await this.saveButton.click();
        await this.page.waitForTimeout(2000);
        await expect(this.saveSuccessMessage).toHaveText("Cart Details updated successfully");
        await this.workflowclick.click();
        await this.page.waitForTimeout(2000);
        await this.approveButtonClick.click();
    }

    async EditBlueprintQuestion() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 4; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
        await this.removeCartButtonClick.click();
        await this.cancelButtonClick.click();
        await this.workflowclick.click();
        await this.page.waitForTimeout(2000);
        await this.approveButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.convertToExam.click();
        await this.page.waitForTimeout(2000);
    }

}