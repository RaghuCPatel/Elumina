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
let StartBookingDate = currentDate.getDate().toString();
let EndExamDate = (currentDate.getDate() + 1).toString();

let hour = currentDate.getHours();
let period = '';

if (hour >= 12) {
    period = 'PM';
    if (hour > 12) {
        hour -= 12;
    }
} else {
    period = 'AM';
    if (hour === 0) {
        hour = 12;
    }
}

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
    readonly selectFilter: Locator;
    readonly selectFilter1: Locator;
    readonly selectFilter2: Locator;
    readonly tickIconClick: Locator;
    readonly SaveButtonClick: Locator;
    readonly FilterSuccessMessage: Locator;
    readonly closeButton: Locator;
    readonly ClickOnAddCartBtn2: Locator;
    readonly ClickOnVersionHistory: Locator;
    readonly SaveButtonClick: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly removeCartButtonClick: Locator;
    readonly cancelButtonClick: Locator;
    readonly moreOptionClick: Locator;
    readonly convertToExam: Locator;
    readonly ClickOnCancelButton: Locator;
    readonly previewButtonClick: Locator;
    readonly previewCloseButtonClick: Locator;
    readonly clickFirstBluePrint: Locator;
    readonly DuplicateButtonClick: Locator;
    readonly DeleteButtonClick: Locator;
    readonly yesButtonClick: Locator;
    readonly submitButtonClick: Locator;
    readonly yesButtonClicks: Locator;
    readonly saveDropdownButton: Locator;
    readonly saveAsNewVersion: Locator;
    readonly textAreaType: Locator;
    readonly saveClick: Locator;
    readonly saveNewVersionSuccessMessage: Locator;

    readonly EXAMSMENU: Locator;
    readonly CREATEEXAMS: Locator;
    readonly STARTFROMSCRATCH: Locator;
    readonly SELECTBANK: Locator;
    readonly TESTBANK: Locator;
    readonly EXAMNAME: Locator;
    readonly EXAMCODE: Locator;
    readonly BookingStartCalender: Locator;
    readonly BookingStartDate: Locator;
    readonly BookingStartHrs: Locator;
    readonly BooingStartMins: Locator;
    readonly ChooseBookingStartSession: Locator;
    readonly BookingOK: Locator;
    readonly BookingEndCalender: Locator;
    readonly BookingEndDate: Locator;
    readonly ExamStartCalender: Locator;
    readonly ExamStartDate: Locator;
    readonly ExamEndCalender: Locator;
    readonly ExamEndDate: Locator;
    readonly ClickOnExamVenue: Locator;
    readonly ChooseExamVenue: Locator;
    readonly ClickOnAdd: Locator;
    readonly EnterNoOfCandidates: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly VerifyExam_details: Locator;
    readonly VerifyChoose_Question: Locator;
    readonly VerifyChoose_Workflow: Locator;
    readonly VerifyChoose_Confirmation: Locator;
    readonly CliCKOnCreateSection: Locator;
    readonly ClickOnCreateExamSection: Locator;
    readonly ClickOnCreateSurveySection: Locator;
    readonly ClickOnAddSurveyQuestion: Locator;
    readonly EnterSectionName: Locator;
    readonly DescriptionMessage: Locator;
    readonly SelectTime: Locator;
    readonly ClickOnSave: Locator;
    readonly ChooseBookingStartSessions: Locator;
    readonly nextButton: Locator;
    readonly Oneclick: Locator;
    readonly checkBoxClick: Locator;

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
        this.ClickOnCancelButton = page.locator('(//button[text()="Cancel"])[2]')
        this.ClickOnMoreIcon = page.locator('//div[@class="plus-btn"]')
        this.EnterCartItem = page.locator('(//input[@class="inputtxt ng-untouched ng-pristine ng-valid ng-star-inserted"])[3]')
        this.EnterNumberReq = page.locator('(//div[@class="custom-tbdata item-required"]//input)[2]')
        this.ClickOnAddFilter = page.locator('(//button[@class="btn btn-blue"])[2]')
        this.SaveButtonClick = page.locator('(//button[text()="Save"])[3]');
        this.closeButton = page.locator('(//button[@type="button"][text()="×"])[1]');
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[text()="Status has been updated successfully."]')
        this.ClickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]')
        this.cancelButtonClick = page.locator('(//button[text()="Cancel"])[2]');
        this.moreOptionClick = page.locator('//button[normalize-space()="..."]');
        this.convertToExam = page.locator('//a[normalize-space()="Convert to exam"]');
        this.previewButtonClick = page.locator('//a[text()="Preview"]');
        this.previewCloseButtonClick = page.locator('(//button[@type="button"][normalize-space()="×"])[11]');
        this.clickFirstBluePrint = page.locator('(//table[@class="table"]//tbody//tr//td[3])[1]');
        this.DuplicateButtonClick = page.locator('//a[text()="Duplicate"]');
        this.DeleteButtonClick = page.locator('//a[text()="Delete"]');
        this.yesButtonClick = page.locator('(//button[text()="Yes"])[3]');
        this.yesButtonClicks = page.locator('(//button[text()="Yes"])[2]');
        this.submitButtonClick = page.locator('//button[text()="Submit"]');
        this.saveDropdownButton = page.locator('//span[@class="arrow-after"]');
        this.saveAsNewVersion = page.locator('//a[normalize-space()="Save as New Version"]');
        this.textAreaType = page.locator('//textarea[@name="comments"]');
        this.saveClick = page.locator('(//button[text()="Save"])[3]');
        this.saveNewVersionSuccessMessage = page.locator('//span[text()="Blueprint has been saved as new version"]');

        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.CREATEEXAMS = page.locator('//button[normalize-space()="Create Exam"]')
        this.STARTFROMSCRATCH = page.locator('//p[normalize-space()="Start from Scratch"]')

        this.SELECTBANK = page.locator('//input[@placeholder="Select Bank"]');
        this.TESTBANK = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]')
        this.EXAMNAME = page.locator('(//input[@name="inputbox"])[1]')
        this.EXAMCODE = page.locator('(//input[@name="inputbox"])[2]')
        this.BookingStartCalender = page.locator('//div[@id="exam_booking_start_date_time"]//i[@class="glyphicon glyphicon-calendar"]');
        this.BookingStartDate = page.locator('#exam_booking_start_date_time').getByText(StartBookingDate, { exact: true });
        this.BookingStartHrs = page.getByRole('spinbutton').first();
        this.BooingStartMins = page.getByRole('spinbutton').nth(1);
        this.ChooseBookingStartSession = page.getByLabel(period);
        this.ChooseBookingStartSessions = page.getByLabel('PM');
        this.BookingOK = page.locator('.dtpc-ok-svg');

        this.BookingEndCalender = page.locator('#exam_booking_end_date_time i');
        this.BookingEndDate = page.locator('#exam_booking_end_date_time').getByText(StartBookingDate, { exact: true });

        this.ExamStartCalender = page.locator('#exam_start_date_time i');
        this.ExamStartDate = page.locator('#exam_start_date_time').getByText(StartBookingDate, { exact: true });

        this.ExamEndCalender = page.locator('#exam_end_date_time i');
        this.ExamEndDate = page.locator('#exam_end_date_time').getByText(EndExamDate, { exact: true });

        this.ClickOnExamVenue = page.getByPlaceholder('Select Exam Venue');
        this.ChooseExamVenue = page.getByRole('listitem').filter({ hasText: testData.ChooseChennaiVenue }).locator('div');
        this.ClickOnAdd = page.getByRole('button', { name: 'Add' });
        this.EnterNoOfCandidates = page.getByRole('spinbutton');

        this.ClickOnNextBtn = page.locator('//button[normalize-space()="Next"]');
        this.VerifyExam_details = page.locator('//label[normalize-space()="1. Exam Details"]');
        this.VerifyChoose_Question = page.locator('//label[normalize-space()="2. Choose Questions"]');
        this.VerifyChoose_Workflow = page.locator('//label[normalize-space()="3. Choose Workflow"]');
        this.VerifyChoose_Confirmation = page.locator('//label[normalize-space()="4. Confirmation"]');

        this.CliCKOnCreateSection = page.locator('//i[@title="Create Section"]');
        this.ClickOnCreateExamSection = page.getByText('Create Exam Section');
        this.EnterSectionName = page.locator('#section_name').getByRole('textbox');
        this.DescriptionMessage = page.frameLocator('iframe[title="Rich Text Area\\. Press ALT-F9 for menu\\. Press ALT-F10 for toolbar\\. Press ALT-0 for help"]').locator('html');
        this.SelectTime = page.getByRole('combobox').nth(1);
        this.ClickOnSave = page.locator('//button[normalize-space()="Save"]');
        this.nextButton = page.locator('//li[@class="next"]');
        this.Oneclick = page.locator('(//li//span[text()="1"])[1]');
        this.checkBoxClick = page.locator('((//table[@class="table"])[2]//tbody//tr//td[1])[1]')
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

    async addQuestionsToCart() {
        await this.ClickOnMoreIcon.click()
        await this.EnterCartItem.click()
        await this.EnterCartItem.type('Item4')
        await this.page.waitForTimeout(5000)
        await this.EnterNumberReq.click()
        await this.EnterNumberReq.type("3")
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
        for (let i = 0; i < 3; i++) {
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

    /**Method to create blueprint */
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

    /**Method to edit blueprint */
    async EditBlueprintQuestion() {

        let currentDate = new Date();
        let datecurrent = currentDate.getDate();
        console.log(datecurrent);
        let pm = currentDate.getHours() >= 12;
        let hour12 = currentDate.getHours() % 12;
        if (!hour12)
            hour12 += 12;
        let minute = currentDate.getMinutes();
        console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

        let StartBookingMin = currentDate.getMinutes() + 2;
        let EndBookingMin = currentDate.getMinutes() + 3;
        let StartExamMin = currentDate.getMinutes() + 4;
        let EndExamMin = currentDate.getMinutes() + 15;

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

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));

        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));

        await this.BookingStartCalender.click();
        await this.BookingStartDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartBookingMin >= 60) {
            let SBM = StartBookingMin.toString();
            SBM = "02";
            await this.BooingStartMins.type(SBM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();

        await this.BookingEndCalender.click();
        await this.BookingEndDate.click();
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndBookingMin >= 60) {
            let EBM = EndBookingMin.toString();
            EBM = "03";
            await this.BooingStartMins.type(EBM);
            //Hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();
            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(EndBookingMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }

        await this.BookingOK.click();

        await this.ExamStartCalender.click();
        await this.ExamStartDate.click();

        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (StartExamMin >= 60) {
            let SEM = StartExamMin.toString();
            SEM = "04"
            await this.BooingStartMins.type(SEM);
            //hrs+1
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            let BSH = hour12 + 1;
            if (BSH == 12) {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSessions.check();

            }
            else if (BSH >= 13) {
                BSH = 1;
                await this.BookingStartHrs.type(BSH.toString());
            }
            else {
                await this.BookingStartHrs.type(BSH.toString());
                await this.ChooseBookingStartSession.check();
            }
        }
        else {
            await this.BooingStartMins.type(StartExamMin.toString());
            //hrs
            await this.BookingStartHrs.click();
            await this.BookingStartHrs.clear();
            await this.BookingStartHrs.type(hour12.toString());
            await this.ChooseBookingStartSession.check();
        }
        await this.BookingOK.click();
        await this.ExamEndCalender.click();

        if (EndExamDate >= "30") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else if (EndExamDate >= "31") {
            console.log("Exam end date:" + EndExamDate);
            await this.page.waitForSelector('//li[@class="next"]');
            await this.nextButton.click();
            await this.Oneclick.click();
        }
        else {
            console.log("Exam end date:" + EndExamDate);
            await this.ExamEndDate.click();
        }
        await this.BookingStartHrs.click();
        await this.BookingStartHrs.clear();
        await this.BookingStartHrs.type(hour12.toString());
        await this.BooingStartMins.click();
        await this.BooingStartMins.clear();
        if (EndExamMin >= 60) {
            EndExamMin = 1;
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        else {
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        await this.ChooseBookingStartSession.check();
        await this.BookingOK.click();

        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('10');
        await this.ClickOnAdd.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnNextBtn.click();
    }

    /**Method to edit blueprint with preview */
    async EditBlueprintQuestionwithPreview() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

        await this.ClickOnAddCartBtn.click();
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        //const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        await this.checkBoxClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnToCart.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnCancelButton.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.previewButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.previewCloseButtonClick.click();
        await this.page.waitForTimeout(2000)
    }

    /**Method to Delete the blueprint */
    async DeleteBluePrint() {
        await this.clickFirstBluePrint.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.DeleteButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.yesButtonClicks.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to Duplicate the blueprint */
    async DuplicateBluePrint() {
        await this.clickFirstBluePrint.click();
        await this.page.waitForTimeout(2000);
        await this.moreOptionClick.click();
        await this.page.waitForTimeout(2000);
        await this.DuplicateButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.yesButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.submitButtonClick.click();
        await this.page.waitForTimeout(2000);

    }

    /**Method to save as a new version */
    async SaveAsNewVersion() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.saveDropdownButton.click();
        await this.page.waitForTimeout(2000)
        await this.saveAsNewVersion.click();
        await this.page.waitForTimeout(2000)
        await this.textAreaType.type("New Verison");
        await this.page.waitForTimeout(2000)
        await this.saveClick.click();
        await this.page.waitForTimeout(2000)
        await expect(this.saveNewVersionSuccessMessage).toHaveText("Blueprint has been saved as new version");
    }



}