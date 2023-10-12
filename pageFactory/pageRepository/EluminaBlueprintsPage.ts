import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { parseForESLint } from '@typescript-eslint/parser';


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
let Title: string;
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

    readonly saveButtonOnModify: Locator;
    readonly saveDraftOnWorkFlow: Locator;
    readonly editNumRequired: Locator;
    readonly removeFromCart: Locator;
    readonly clickOnRemoveCartBtn: Locator;
    readonly saveBtnOnRemoveCart: Locator;
    readonly cancelBtnOnRemoveCart: Locator;
    readonly cartItemIsZero: Locator;
    readonly saveDraftText: Locator;



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

    readonly workFlowFieldDropDown: Locator;
    readonly chooseApproveWorkFlow: Locator;
    readonly reviewerDropDown: Locator;
    readonly chooseReviewer: Locator;
    readonly approverDropDown: Locator;
    readonly chooseApprover: Locator;
    readonly submitForReviewBtn: Locator;
    readonly morebtnOnWorkFlow: Locator;

    readonly clickonQuestion: Locator;
    readonly ClickOnCancelBtn: Locator;
    readonly confirmationPopUp: Locator;
    readonly ClickOnNoBtn: Locator;
    readonly ClickOnBackArrowBtn: Locator;
    readonly btnAutofill: Locator;
    readonly btnRemoveFromCart: Locator;
    readonly btnCancel: Locator;
    readonly qutnsRemovedMsgPopup: Locator;
    readonly clickOnMoreOption: Locator;
    readonly clickOnArchive: Locator;
    readonly clickOnArchiveYes: Locator;
    readonly verifyArchivePopup: Locator;
    readonly fetchTitle: Locator;
    readonly searchBlueprint: Locator;
    readonly clickOnSelectBtn: Locator;
    readonly Choosehrs: Locator;
    readonly ClickOnAddQuestion: Locator;
    readonly ClickOnSearchQuestion: Locator;
    readonly ClickOnAddBtn: Locator;
    readonly ClickOnSubmitAndApproveBtn: Locator;
    readonly clickOnViewBtn: Locator;
    readonly fetchblueprintTitle: Locator;
    readonly clickOnLeftArrow: Locator;
    readonly previewPageTitle: Locator;
    readonly clickOnComparisionBtn: Locator;
    readonly comparisionPageTitle: Locator;
    readonly copyExisting: Locator;
    readonly copyTemplate: Locator;
    readonly examPageTitle: Locator;
    readonly ExamTools: Locator;
    readonly SelectNotepad: Locator;
    readonly SelectCalculator: Locator;
    readonly SelectHighlighter: Locator;
    readonly EnterInvigilatorPswd: Locator;
    readonly clickOnCloseIcon: Locator;
    readonly clickOnMinusicon: Locator;


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
        this.closeButton = page.locator('(//button[@type="button"][normalize-space()="×"])[2]');
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
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[2]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[contains(text(),"Status has been updated successfuly")]')
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
        this.copyExisting = page.locator('//p[normalize-space()="Copy an Existing Exam"]')
        this.copyTemplate = page.locator('//p[normalize-space()="Copy from Template"]')
        this.examPageTitle = page.locator('//div[@class="exams-title"]')

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

        this.saveButtonOnModify = page.locator('//div[@class="dropdownbtn"]');
        this.saveDraftOnWorkFlow = page.locator('(//div[@class="sub--right-menu ng-star-inserted"]//button)[1]')
        this.saveDraftText = page.locator('//button[text()="Save Draft"]')
        this.editNumRequired = page.locator('(//div[@class="ngx-dnd-item custom-trow ng-star-inserted"]//div)[5]//input')
        this.removeFromCart = page.locator('(//div//button[@class="btn primarybtn"])[2]')
        this.clickOnRemoveCartBtn = page.locator('//div[@class="cartMinus-btn ng-star-inserted"]')
        this.saveBtnOnRemoveCart = page.locator('(//div//button[@class="btn primarybtn"])[3]')
        this.cancelBtnOnRemoveCart = page.locator('(//button[@class="btn btn-default"])[1]')
        this.cartItemIsZero = page.locator('(//table//tbody//tr//td)[2]')

        this.workFlowFieldDropDown = page.locator('//ul[@class="ng-star-inserted"]')
        this.chooseApproveWorkFlow = page.locator('(//span[@class="open"])[1]')
        this.reviewerDropDown = page.locator('(//*[@class="input-wrap"])[2]')
        this.chooseReviewer = page.locator('//input[@type="checkbox"]')
        this.approverDropDown = page.locator('(//div[@class="input-wrap"])[3]')
        this.chooseApprover = page.locator('(//li[@class="open ng-star-inserted"])[4]')
        this.submitForReviewBtn = page.locator('//button[@class="theme-btn theme-primary-btn ng-star-inserted"]')
        this.morebtnOnWorkFlow = page.locator('//button[@class="btn btn-default dotbutton"]')

        this.clickonQuestion = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnCancelBtn = page.locator('//button[@class="theme-btn theme-default-btn"]')
        this.confirmationPopUp = page.locator('//div[normalize-space()="Are you sure you want to discard your changes?"]')
        this.ClickOnNoBtn = page.locator('//div[@class="modal-dialog cancel-confirmation"]//button[normalize-space()="No"]')
        this.ClickOnBackArrowBtn = page.locator('//i[@class="iconBg leftArrow"]')
        this.btnAutofill = page.locator('//button[normalize-space()="Auto fill"]')
        this.btnRemoveFromCart = page.locator('//button[normalize-space()="Remove from cart"]')
        this.btnCancel = page.locator('//button[@class="btn btn-default"][normalize-space()="Cancel"]')
        this.qutnsRemovedMsgPopup = page.locator('//div[@class="content-side"]//span')
        this.clickOnMoreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[1]//a')
        this.clickOnArchive = page.locator('(//p[contains(text(),"Archive")])[1]')
        this.clickOnArchiveYes = page.locator('//div[@id="archiveModal"]//button[@type="button"][normalize-space()="Yes"]')
        this.verifyArchivePopup = page.locator('//div[@class="content-side"]//span')
        this.fetchTitle = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a')
        this.searchBlueprint = page.locator('//input[@class="topbandSearchInpt ng-untouched ng-pristine ng-valid"]')
        this.clickOnSelectBtn = page.locator('(//button[@class="btn btn-blue"])[1]')
        this.Choosehrs = page.locator('//body//app-root//select[1]');
        this.ClickOnAddQuestion = page.locator('//i[@title="Create Exam Question"]');
        this.ClickOnSearchQuestion = page.locator('//input[@placeholder="Search Question(s)"]');
        this.ClickOnAddBtn = page.locator('//button[normalize-space()="Add"]');
        // this.ClickOnSave = page.locator('//button[normalize-space()="Save"]');
        // this.ClickOnNextBtn = page.locator('//button[normalize-space()="Next"]');
        this.ClickOnSubmitAndApproveBtn = page.locator('//button[normalize-space()="Submit & Approve"]');
        this.clickOnViewBtn = page.locator('(//button[@class="btn btn-default"])[1]')
        this.fetchblueprintTitle = page.locator('//input[@class="textField ng-touched ng-dirty ng-valid"]')
        this.clickOnLeftArrow = page.locator('//i[@class="iconBg leftArrow"]')
        this.previewPageTitle = page.locator('(//h4[text()="Preview"])[2]')
        this.clickOnComparisionBtn = page.locator('//button[@class="theme-btn theme-primary-btn"]')
        this.comparisionPageTitle = page.locator('(//h4[@class="modal-title"])[5]')
        this.ExamTools = page.locator('(//div[@class="input-wrap"])[6]');
        this.SelectNotepad = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[2]//span[text()="Notepad"]');
        this.SelectCalculator = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[1]//span[text()="Calculator"]');
        this.SelectHighlighter = page.locator('(//div[@class="dropdown-main"])[6]//ul//li[3]//span[text()="Highlighter"]');
        this.EnterInvigilatorPswd = page.locator('//input[@name="examInviglator"]');
        this.clickOnCloseIcon = page.locator('(//span[@class="msdd-close"])[1]')
        this.clickOnMinusicon = page.locator('//div[@class="minus-btn"]')

    }
    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
        await this.EXAMSMENU.click();
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

    /**Method to  click on Create Exam button */
    async clickOnCreateExam() {
        await this.EXAMSMENU.click();
        await expect(this.CREATEEXAMS).toBeVisible();
        await this.CREATEEXAMS.click();
    }

    async searchAndSelectBlueprintQtn() {
        //await this.searchBlueprint.fill(blueprintTitle)
        //await this.page.waitForTimeout(2000)
        await this.clickOnViewBtn.click()
        await this.page.waitForTimeout(2000)
        Title = await this.fetchblueprintTitle.textContent();
        console.log(Title);
        await this.clickOnLeftArrow.click()
        await this.page.waitForTimeout(2000)
        await this.clickOnSelectBtn.click()
        await this.page.waitForTimeout(2000)
    }

    /**Method to click on scratch from exam */
    async clickOnScratchFromExam() {
        await this.STARTFROMSCRATCH.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Please fill all the mandatory fields!")
        await this.page.waitForTimeout(5000)
    }
    /*Create a Exam*/
    async createExam() {
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

        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
    }

    /*Method to without selecting Date*/
    async withoutSelectingDate() {
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Exam End Date/Time should be greater than Exam Start Date/Time")
    }

    /*Method to without click on add button*/
    async withoutClickOnAdd() {
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

        await this.clickOnCloseIcon.click()
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
        await this.ClickOnAdd.click();
        await this.clickOnMinusicon.click()
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("The exam venue field is required.")
    }

    /*Method to click on add*/
    async clickOnAddandclickOnNext() {
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

        await this.clickOnCloseIcon.click()
        await this.SELECTBANK.click();
        await this.SELECTBANK.type(testData.TestBank2);
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO' + Math.floor(Math.random() * 899999 + 100000));
        await this.EXAMCODE.type('D' + Math.floor(Math.random() * 89 + 100));


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
        await this.ClickOnAdd.click();
        await this.clickOnMinusicon.click()
        await this.ClickOnExamVenue.click();
        await this.ChooseExamVenue.click();
        await this.ClickOnAdd.click();
        await this.EnterNoOfCandidates.click();
        await this.EnterNoOfCandidates.clear();
        await this.EnterNoOfCandidates.type('30');
        await this.ClickOnAdd.click();
    }


    /*Create a Exam with All Tools*/
    async selectAllTools() {
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.page.waitForTimeout(5000);
        await this.ExamTools.click();
        await this.SelectCalculator.click();
        await this.SelectNotepad.click();
        await this.SelectHighlighter.click();
        await this.ClickOnNextBtn.click();
        await expect(this.verifyArchivePopup).toHaveText("Exam created successfully")
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    /**Create Exam Section */
    async createSection(hr, mins): Promise<void> {
        // EluminaExamPage.examID = await this.fectchExamID.textContent();
        // console.log("Exam ID:" + EluminaExamPage.examID);
        await this.CliCKOnCreateSection.click();
        await this.ClickOnCreateExamSection.click();
        await this.EnterSectionName.type('Exam-' + Math.floor(Math.random()) * 89 + 10);
        await this.page.waitForTimeout(5000);
        await this.DescriptionMessage.click();
        await this.DescriptionMessage.type(testData.DescriptionMessage);
        await this.page.waitForTimeout(5000);
        await this.Choosehrs.selectOption(hr);
        await this.SelectTime.selectOption(mins);
        await this.ClickOnSave.click();
        await this.page.waitForTimeout(5000);
        // return EluminaExamPage.examID;
    }

    async addVSAQQuestions(): Promise<void> {
        await this.ClickOnAddQuestion.click();
        await this.ClickOnSearchQuestion.click()
        await this.ClickOnSearchQuestion.type('VSAQ');
        await this.page.waitForTimeout(5000);
        await this.page.locator('(//input[@type="checkbox"])[2]').click();
        await this.ClickOnAddBtn.click()
        await this.ClickOnSave.click();
        await this.ClickOnNextBtn.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnSubmitAndApproveBtn.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(5000);
    }

    async searchDraftBlueprintQueation() {
        // await this.SearchDraftQuestions.type('Draft')
        // await this.page.waitForTimeout(3000)
        // await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 2; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000)
    }

    /**Method to Blueprint archive */
    async blueprintArchive() {
        await this.SearchDraftQuestions.type('Approved')
        await this.page.waitForTimeout(10000)
        // blueprintTitle = await this.fetchTitle.textContent();
        await this.clickOnMoreOption.click()
        await this.clickOnArchive.click()
        await this.clickOnArchiveYes.click()
        await this.page.waitForTimeout(5000)
        await expect(this.verifyArchivePopup).toHaveText('Blueprint has been archived')
    }

    /**Method to Blueprint archive */
    async blueprintArchiveErrorMsg() {
        await this.SearchDraftQuestions.type(Title)
        await this.page.waitForTimeout(10000)
        await this.clickOnMoreOption.click()
        await this.clickOnArchive.click()
        await this.clickOnArchiveYes.click()
        await this.page.waitForTimeout(5000)
        await expect(this.verifyArchivePopup).toHaveText('Blueprint can not be archived since its used in upcoming exam')
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
        await this.editNumRequired.fill('1')
        await this.page.waitForTimeout(3000)
        await this.ClickOnAddCartBtn.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < 1; i++) {
            await checks[i].click()
        }
        await this.ClickOnToCart.click()
        await this.page.waitForTimeout(3000)
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(4000)
    }

    /**Method to verify Version */
    async verifyVersion() {
        await this.page.waitForSelector('//div[@class="verticalStepperCard verticalStepperCard__circle verticalStepperCard__circle--defualt"]')
        const circles = await this.page.$$('//div[@class="verticalStepperCard verticalStepperCard__circle verticalStepperCard__circle--defualt"]')
        for (let i = 0; i < 2; i++) {
            await circles[i].click()
        }
        await this.clickOnComparisionBtn.click();
        await this.page.waitForTimeout(20000);
        await expect(this.comparisionPageTitle).toBeVisible()
        await this.page.waitForTimeout(2000);

    }

    /**Method to verify Exam Page */
    async verifyExamPage() {
        await expect(this.STARTFROMSCRATCH).toBeVisible()
        await expect(this.copyExisting).toBeVisible()
        await expect(this.copyTemplate).toBeVisible()
        await expect(this.examPageTitle).toHaveText("How do you want to get started?")


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
        await this.page.waitForTimeout(2000);
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
        await this.page.waitForTimeout(3000);
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()
    }

    /**Method to search a question */
    async searchBlueprintQuestion() {
        await this.SearchDraftQuestions.click();
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.clickonQuestion.click()
        await this.typeTitle.click()
        await this.typeTitle.type("8");
    }
    /**Method to click on cancel Button Validation */
    async clickOnCancelBtn() {
        await this.ClickOnCancelBtn.click()
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }
    /**Method to click on other module validation */
    async validationOfClickOnOtherModule() {
        await this.EXAMSMENU.click();
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }
    /**Method to click on Back button validation */
    async validationOfBackArrowBtn() {
        await this.ClickOnBackArrowBtn.click();
        await expect(this.confirmationPopUp).toBeVisible()
        await this.ClickOnNoBtn.click()
    }
    /**Mrthod to validate close tab */
    async closeTabValidation() {
        await this.page.keyboard.press('Control+KeyW')
        await this.page.waitForTimeout(8000)
    }

    async approveBluePrintId() {
        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(4000);
        if (await this.saveDraftText.textContent() == "Save Draft") {
            this.saveDraftOnWorkFlow.click()
        }
        await this.page.waitForTimeout(3000);
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);

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

    /**Method to verify Preview Page */
    async verifyPreviewPage() {
        await expect(this.previewPageTitle).toHaveText("Preview")
        await this.page.waitForTimeout(30000)
    }

    /**Method to remove questions from cart*/
    async removeQutnsFromCart() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

        await this.removeCartButtonClick.click();
        await this.page.waitForTimeout(10000)
        await expect(this.btnAutofill).toBeVisible()
        await expect(this.btnRemoveFromCart).toBeVisible()
        await expect(this.btnCancel).toBeVisible()
        await this.btnAutofill.click()
        await this.page.waitForTimeout(3000)
        await this.page.waitForSelector('(//table[@class="table"])[2]//tbody//tr//td[1]')
        const checks = await this.page.$$('(//table[@class="table"])[2]//tbody//tr//td[1]')
        for (let i = 0; i < checks.length; i++) {
            await checks[i].click()
        }
        await this.btnRemoveFromCart.click()
        await expect(this.qutnsRemovedMsgPopup).toHaveText("Question(s) removed from cart")
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


    async reviewToReviewer() {
        await this.SearchDraftQuestions.type('Draft')
        await this.page.waitForTimeout(3000)
        await this.ClickOnQuestionID.click()
        await this.page.waitForTimeout(2000)

        await this.ClickOnWorkFlow.click();
        await this.page.waitForTimeout(3000);

        await this.workFlowFieldDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseApproveWorkFlow.click();
        await this.page.waitForTimeout(3000);
        await this.reviewerDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseReviewer.click();
        await this.page.waitForTimeout(2000);
        await this.morebtnOnWorkFlow.click();
        await this.page.waitForTimeout(2000);
        await this.approverDropDown.click();
        await this.page.waitForTimeout(2000);
        await this.chooseApprover.click();
        await this.page.waitForTimeout(2000);
        await this.submitForReviewBtn.click();
        await this.page.waitForTimeout(5000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.page.waitForTimeout(5000);

    }



}