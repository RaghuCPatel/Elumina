import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { isArrayEqual } from 'pdfjs-dist-es5/types/src/shared/util';

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

export class EluminaCreateQuestionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly Questions: Locator;
    readonly CreateQuestion: Locator;
    readonly MCQQuestionsClick: Locator;
    readonly NextButtonClick: Locator;
    readonly SelectQuestionBank: Locator;
    readonly SelectTestBank: Locator;
    readonly QuestionTopic: Locator;
    readonly QuestionAims: Locator;
    readonly Question: Locator;
    readonly ControlIndicator: Locator;
    readonly OptionA: Locator;
    readonly OptionB: Locator;
    readonly OptionC: Locator;
    readonly OptionD: Locator;
    readonly OptionE: Locator;
    readonly SubmitAndApprove: Locator;
    readonly SuccessMessage: Locator;
    readonly ClickOnQuestionTab: Locator;
    readonly VerifyquestionID: Locator;
    readonly VerifyquestioTitle: Locator;
    readonly VerifyquestionText: Locator;
    readonly VerifyquestionType: Locator;
    readonly VerifyquestionDescription: Locator;
    readonly VerifyquestionBank: Locator;
    readonly VerifyquestionCreatedBy: Locator;
    readonly VerifyquestionLastmodifiedBy: Locator;
    readonly VerifyquestionStatus: Locator;
    readonly VerifyquestionCreatedDate: Locator;
    readonly VerifyquestionLastDateUpdated: Locator;
    readonly VerifyquestionUsedInExams: Locator;
    readonly VerifyquestionUsedInBlueprints: Locator;
    readonly VerifyquestionMore: Locator;
    readonly ClickOnCreateQuestion: Locator;
    readonly SearchQuestion: Locator;
    readonly ClickOnSearchedQuestion: Locator;
    readonly ValidateCreateQuestionPage: Locator;
    readonly VerifyPopupWtoutselctQuestion: Locator;
    readonly VerifyNoRecordsFoundStatus: Locator;
    readonly ClickOnProfile: Locator;
    readonly ClickOnLogout: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly Invalidpopupmessage: Locator;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly ClickOnVSAQ: Locator;
    readonly ClickOnSAQ: Locator;
    readonly EnterMarks: Locator;
    readonly EnterMarksInAns: Locator;
    readonly AddImage: Locator;
    readonly ClickOnUploadImageBtn: Locator;
    readonly ClickOnInsertImageFile: Locator;
    readonly EnterAnsKey: Locator;
    readonly ClickOnSaveDraft: Locator;
    readonly ClickOnEditQuestion: Locator;
    readonly ClickOnWorkFlow: Locator;
    readonly ClickOnApprove: Locator;
    readonly ValidateSuccessfulPopMessage: Locator;
    readonly ClickOnTypeB: Locator;
    readonly ClickOnTypeX: Locator;
    readonly Optional: Locator;
    readonly ClickOnOptionBRadioBtn: Locator;
    readonly ClickOnSJT: Locator;
    readonly ClickOnAppropriateRadioBtn: Locator;
    readonly EnterMarksInSJT: Locator;
    readonly ISAWEQuestionsClick: Locator;
    readonly QuestionsText: Locator;
    readonly Answer: Locator;
    readonly AnswerKey: Locator;
    readonly AnswerKeys: Locator;
    readonly QuestionSuccessMessage: Locator;
    readonly Marks: Locator;
    readonly correctAnswerMarks: Locator;
    readonly MarkMarks: Locator;
    readonly SaveDraft: Locator
    readonly clickImage: Locator;
    readonly InsertImageClick: Locator;

    readonly ControlIndicator1: Locator;
    readonly ClickOnRadioButton1: Locator;
    readonly ClickOnRadioButton2: Locator;
    readonly ClickOnRadioButton3: Locator;
    readonly ClickOnRadioButton4: Locator;
    readonly ClickOnRadioButton5: Locator;
    readonly clickQuestionId: Locator;
    readonly clickMoreOption: Locator;
    readonly clickCheckout: Locator;
    readonly clickYes: Locator;
    readonly clickDelete: Locator;
    readonly clickYesDuplicate: Locator;
    readonly clickonDuplicate: Locator;
    readonly clickSubmit: Locator;
    readonly DuplicateSuccessMessgae: Locator;
    readonly clickonArchive: Locator;
    readonly ArchiveSuccessMessage: Locator;
    readonly clickonPreview: Locator;

    readonly ClickOnMoreOption: Locator;
    readonly ClickOnPreview: Locator;
    readonly ValidatePreviewPage: Locator;
    readonly ClickOnDuplicate: Locator;
    readonly ClickOnYesBtn: Locator;
    readonly ClickOnSubmitBtn: Locator;
    readonly ClickOnInappropriateRadioBtn: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly ClickOnVersionHistory: Locator;
    readonly ClickOnCheckout: Locator;
    readonly ClickOnYesBtnForCheckout: Locator;
    readonly ClickOnQuestionID: Locator;




    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.ClickOnQuestionTab = page.locator('//a[@data-tour="Questions"]')
        this.Questions = page.locator('//a[@data-tour="Questions"]');
        this.CreateQuestion = page.locator('//button[text()="Create Question"]');
        this.MCQQuestionsClick = page.locator('//p[text()="MCQ"]');
        this.ISAWEQuestionsClick = page.locator('//p[text()="ISAWE"]');
        this.NextButtonClick = page.locator('//button[text()="Next"]');
        this.SelectQuestionBank = page.locator('//input[@placeholder="Select Question Bank"]');
        this.SelectTestBank = page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]');
        this.QuestionTopic = page.locator('(//input[@name="inputbox"])[1]')
        this.QuestionAims = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[1]').locator('html');
        this.Question = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[2]').locator('html');
        this.OptionA = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[3]').locator('html');
        this.OptionB = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.OptionC = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[5]').locator('html');
        this.OptionD = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[6]').locator('html');
        this.OptionE = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[7]').locator('html');
        this.Optional = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[8]').locator('html');
        this.ControlIndicator = page.locator('(//div[@class="control__indicator"])[2]');
        this.ControlIndicator1 = page.locator('(//div[@class="control__indicator"])[3]');
        this.SubmitAndApprove = page.locator('//button[text()="Submit & Approve"]');
        this.SuccessMessage = page.locator('//div[@class="txtBox"]')
        this.ClickOnNextBtn = page.locator('//button[normalize-space()="Next"]');
        this.VerifyquestionID = page.locator('(//table[@class="table"]//thead//tr//th[2]//div//span[1])[1]')
        this.VerifyquestioTitle = page.locator('(//table[@class="table"]//thead//tr//th[3]//div//span[1])[1]')
        this.VerifyquestionText = page.locator('(//table[@class="table"]//thead//tr//th[4]//div//span[1])[1]')
        this.VerifyquestionType = page.locator('(//table[@class="table"]//thead//tr//th[5]//div//span[1])[1]')
        this.VerifyquestionDescription = page.locator('(//table[@class="table"]//thead//tr//th[6]//div//span[1])[1]')
        this.VerifyquestionBank = page.locator('(//table[@class="table"]//thead//tr//th[7]//div//span[1])[1]')
        this.VerifyquestionCreatedBy = page.locator('(//table[@class="table"]//thead//tr//th[8]//div//span[1])[1]')
        this.VerifyquestionLastmodifiedBy = page.locator('(//table[@class="table"]//thead//tr//th[9]//div//span[1])[1]')
        this.VerifyquestionStatus = page.locator('(//table[@class="table"]//thead//tr//th[10]//div//span[1])[1]')
        this.VerifyquestionCreatedDate = page.locator('(//table[@class="table"]//thead//tr//th[11]//div//span[1])[1]')
        this.VerifyquestionLastDateUpdated = page.locator('(//table[@class="table"]//thead//tr//th[12]//div//span[1])[1]')
        this.VerifyquestionUsedInExams = page.locator('(//table[@class="table"]//thead//tr//th[13]//div//span[1])[1]')
        this.VerifyquestionUsedInBlueprints = page.locator('(//table[@class="table"]//thead//tr//th[14]//div//span[1])[1]')
        this.VerifyquestionMore = page.locator('//table[@class="table"]//thead//tr//th[15]')
        this.ClickOnCreateQuestion = page.locator('//button[normalize-space()="Create Question"]')
        this.SearchQuestion = page.locator('//input[@placeholder="Search Question Type"]')
        this.ClickOnSearchedQuestion = page.locator('//div[@class="card-container"]//p')
        this.ValidateCreateQuestionPage = page.locator('//h4[@class="subMenu-txt"]')
        this.VerifyquestionID = page.locator('(//table[@class="table"]//thead//tr//th[2]//div//span[1])[1]')
        this.VerifyquestioTitle = page.locator('(//table[@class="table"]//thead//tr//th[3]//div//span[1])[1]')
        this.VerifyquestionText = page.locator('(//table[@class="table"]//thead//tr//th[4]//div//span[1])[1]')
        this.VerifyquestionType = page.locator('(//table[@class="table"]//thead//tr//th[5]//div//span[1])[1]')
        this.VerifyquestionDescription = page.locator('(//table[@class="table"]//thead//tr//th[6]//div//span[1])[1]')
        this.VerifyquestionBank = page.locator('(//table[@class="table"]//thead//tr//th[7]//div//span[1])[1]')
        this.VerifyquestionCreatedBy = page.locator('(//table[@class="table"]//thead//tr//th[8]//div//span[1])[1]')
        this.VerifyquestionLastmodifiedBy = page.locator('(//table[@class="table"]//thead//tr//th[9]//div//span[1])[1]')
        this.VerifyquestionStatus = page.locator('(//table[@class="table"]//thead//tr//th[10]//div//span[1])[1]')
        this.VerifyquestionCreatedDate = page.locator('(//table[@class="table"]//thead//tr//th[11]//div//span[1])[1]')
        this.VerifyquestionLastDateUpdated = page.locator('(//table[@class="table"]//thead//tr//th[12]//div//span[1])[1]')
        this.VerifyquestionUsedInExams = page.locator('(//table[@class="table"]//thead//tr//th[13]//div//span[1])[1]')
        this.VerifyquestionUsedInBlueprints = page.locator('(//table[@class="table"]//thead//tr//th[14]//div//span[1])[1]')
        this.VerifyquestionMore = page.locator('//table[@class="table"]//thead//tr//th[15]')

        this.ClickOnCreateQuestion = page.locator('//button[normalize-space()="Create Question"]')
        this.SearchQuestion = page.locator('//input[@placeholder="Search Question Type"]')
        this.ClickOnSearchedQuestion = page.locator('//div[@class="card-container"]//p')
        this.ValidateCreateQuestionPage = page.locator('//h4[@class="subMenu-txt"]')
        this.VerifyPopupWtoutselctQuestion = page.locator('//span[normalize-space()="Kindly choose any question type"]')
        this.VerifyNoRecordsFoundStatus = page.locator('//p[normalize-space()="No Record(s) found"]');
        this.ClickOnProfile = page.locator('//i[@class="menuIcons profileIcon"]')
        this.ClickOnLogout = page.locator('//a[normalize-space()="Log out"]')
        this.Invalidpopupmessage = page.locator('//div[text()="Invalid username or password."]');
        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.LOGIN_BUTTON = page.locator('//*[@class="submit-butn"]');
        this.HOMEPAGE = page.locator('//*[@title="Question Management System"]');
        this.ClickOnVSAQ = page.locator('//p[normalize-space()="VSAQ"]');
        this.EnterMarks = page.locator('(//span[@class="input-mark"])[1]//input')
        this.EnterMarksInAns = page.locator('(//span[@class="input-mark"])[2]//input')

        this.AddImage = page.locator('(//div[@class="btn-addimg"])[1]')
        this.ClickOnUploadImageBtn = page.locator('//button[normalize-space()="Upload Image/File"]')
        this.ClickOnInsertImageFile = page.locator('//div[@class="dz-text"]');
        this.InsertImageClick = page.locator('(//button[@class="btn primarybtn"])[2]');

        this.EnterAnsKey = page.locator('//div[@class="midcontent"]//input')
        this.ClickOnSaveDraft = page.locator('//button[normalize-space()="Save Draft"]')
        this.ClickOnEditQuestion = page.locator('//button[normalize-space()="Edit this Question"]')
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[text()="Status has been updated successfully."]')
        this.ClickOnTypeB = page.locator('//p[normalize-space()="Type B"]');
        this.ClickOnTypeX = page.locator('//p[normalize-space()="Type X"]');
        this.ClickOnSJT = page.locator('//p[normalize-space()="SJT"]')
        this.ClickOnAppropriateRadioBtn = page.locator('//div[@class="col-5 col-xlg-6 ng-star-inserted"]//div[2]//qms-radio-button[1]//label[1]//div[1]');
        this.ClickOnInappropriateRadioBtn = page.locator('//div[@class="col-5 col-xlg-6 ng-star-inserted"]//div[3]//qms-radio-button[1]//label[1]//div[1]')
        this.EnterMarksInSJT = page.locator('//div[@class="mark-input-box ng-star-inserted"]//input[@type="number"]')
        this.ClickOnOptionBRadioBtn = page.locator('(//div[@class="control__indicator"])[3]');
        this.ClickOnRadioButton1 = page.locator('(//span[@class="radio-check--image"])[1]');
        this.ClickOnRadioButton2 = page.locator('(//span[@class="radio-check--image"])[3]');
        this.ClickOnRadioButton3 = page.locator('(//span[@class="radio-check--image"])[6]');
        this.ClickOnRadioButton4 = page.locator('(//span[@class="radio-check--image"])[7]');
        this.ClickOnRadioButton5 = page.locator('(//span[@class="radio-check--image"])[9]');
        this.QuestionsText = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[3]').locator('html');
        this.Answer = page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.QuestionSuccessMessage = page.locator('//span[text()="Question created successfully"]');
        this.Marks = page.locator('//div[@id="parentAccord0"]//input[@type="number"]');
        this.correctAnswerMarks = page.locator('//div[@id="childAccord00"]//app-correct-answer-editor//input[@type="number"]');
        this.MarkMarks = page.locator('//div[@id="editing-view-port"]');
        this.SaveDraft = page.locator('//button[text()="Save Draft"]');
        this.clickImage = page.locator('(//img[@class="block-img"])[4]');

        this.ClickOnSAQ = page.locator('//p[normalize-space()="SAQ"]');
        this.clickQuestionId = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a');
        this.clickMoreOption = page.locator('//button[normalize-space()="..."]');
        this.clickCheckout = page.locator('//a[text()="Check Out"]');
        this.clickDelete = page.locator('//a[text()="Delete"]');
        this.clickYes = page.locator('(//button[@type="button"][normalize-space()="Yes"])[5]');
        this.clickYesDuplicate = page.locator('(//button[@type="button"][normalize-space()="Yes"])[4]');
        this.clickonDuplicate = page.locator('//a[text()="Duplicate"]');
        this.clickonArchive = page.locator('//a[text()="Archive"]')
        this.clickSubmit = page.locator('//button[text()="Submit"]');
        this.DuplicateSuccessMessgae = page.locator('//span[text()="Question duplicated successfully"]')
        this.ArchiveSuccessMessage = page.locator('//span[text()="Question has been archived successfully"]');
        this.clickonPreview = page.locator('//a[text()="Preview"]')

        this.ClickOnMoreOption = page.locator('//table[@class="table"]//tbody//tr[1]//td[15]//a');
        this.ClickOnQuestionID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//a')
        this.ClickOnPreview = page.locator('(//p[normalize-space()="Preview"])[1]');
        this.ValidatePreviewPage = page.locator('//h4[text()="Preview"]')
        this.ClickOnDuplicate = page.locator('(//p[normalize-space()="Duplicate"])[1]')
        this.ClickOnYesBtn = page.locator('//div[@id="duplicateModal"]//button[normalize-space()="Yes"]')
        this.ClickOnSubmitBtn = page.locator('//button[normalize-space()="Submit"]')
        this.ClickOnSaveBtn = page.locator('(//button[text()="Save"])[1]')
        this.ClickOnVersionHistory = page.locator('//p[normalize-space()="Version History"]')
        this.ClickOnCheckout = page.locator('(//p[normalize-space()="Check Out"])[1]')
        this.ClickOnYesBtnForCheckout = page.locator('//div[@id="checkoutModal"]//button[@type="button"][normalize-space()="Yes"]')

    }

    /**Method for Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaCreateQuestionsPage(newPage);
    }

    /**Method to validate Admin pop */
    async verifyInvalidUserPopup() {
        await expect(this.Invalidpopupmessage).toBeVisible();
    }

    /**Navigate to Invalid Login Application */
    async invalidloginCredential(): Promise<void> {
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.InvalidAdminUserPassword);
        await this.LOGIN_BUTTON.click();
    }


    /**Method for Question Menu click on Menu bar */
    async QuestionsMenuClick(): Promise<void> {
        await this.Questions.click();
    }

    /**Method to validate Preview Page */
    async validatePreviewPage() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnPreview.click();
        await expect(this.ValidatePreviewPage).toBeVisible();
    }

    /**Method to validate Edit Question */
    async validateEditQuestion() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnDuplicate.click();
        await this.ClickOnYesBtn.click();
        // await this.ClickOnSaveBtn.click();
        // await this.ClickOnInappropriateRadioBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.ClickOnSaveBtn.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()
    }


    /**Method to validate Question Checkout */
    async validateQuestionCheckout() {
        await this.ClickOnMoreOption.click();
        await this.ClickOnCheckout.click();
        await this.ClickOnYesBtnForCheckout.click();
        await this.ClickOnQuestionID.click()
        await this.ClickOnSaveBtn.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click();
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await this.ClickOnVersionHistory.click()

    }

    /**Method for Question Tab Navigation */
    async questionTabNavigation(): Promise<void> {
        await this.ClickOnQuestionTab.click();
    }

    /** Method to verify question page */
    async validateQuestionPageDetails() {
        await expect(this.VerifyquestionID).toBeVisible();
        console.log(await this.VerifyquestionID.textContent())
        await expect(this.VerifyquestioTitle).toBeVisible();
        console.log(await this.VerifyquestioTitle.textContent())
        await expect(this.VerifyquestionText).toBeVisible();
        console.log(await this.VerifyquestionText.textContent())
        await expect(this.VerifyquestionType).toBeVisible();
        console.log(await this.VerifyquestionType.textContent())
        await expect(this.VerifyquestionDescription).toBeVisible();
        console.log(await this.VerifyquestionDescription.textContent())
        await expect(this.VerifyquestionBank).toBeVisible();
        console.log(await this.VerifyquestionBank.textContent())
        await expect(this.VerifyquestionCreatedBy).toBeVisible();
        console.log(await this.VerifyquestionCreatedBy.textContent())
        await expect(this.VerifyquestionLastmodifiedBy).toBeVisible();
        console.log(await this.VerifyquestionLastmodifiedBy.textContent())
        await expect(this.VerifyquestionStatus).toBeVisible();
        console.log(await this.VerifyquestionStatus.textContent())
        await expect(this.VerifyquestionCreatedDate).toBeVisible();
        console.log(await this.VerifyquestionCreatedDate.textContent())
        await expect(this.VerifyquestionLastDateUpdated).toBeVisible();
        console.log(await this.VerifyquestionLastDateUpdated.textContent())
        await expect(this.VerifyquestionUsedInExams).toBeVisible();
        console.log(await this.VerifyquestionUsedInExams.textContent())
        await expect(this.VerifyquestionUsedInBlueprints).toBeVisible();
        console.log(await this.VerifyquestionUsedInBlueprints.textContent())
        await expect(this.VerifyquestionMore).toBeVisible();
        console.log(await this.VerifyquestionMore.textContent());
    }

    /**Method to create Question and Search */
    async createQuestionAndSearch() {
        await this.ClickOnCreateQuestion.click()
        await this.SearchQuestion.click()
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(2000);
        await this.ClickOnSearchedQuestion.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnNextBtn.click();
        await expect(this.ValidateCreateQuestionPage).toBeVisible();
        await this.page.waitForTimeout(3000);
    }

    /**Method to create Question and Search to validate popup */
    async validatePopupWithoutSelctAQuestion() {
        await this.ClickOnCreateQuestion.click()
        await this.ClickOnNextBtn.click();
        await expect(this.VerifyPopupWtoutselctQuestion).toBeVisible();
        await this.page.waitForTimeout(3000);
    }

    async searchValidValue() {
        await this.SearchQuestion.click()
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(2000);
        console.log("Valid text:", await this.ClickOnSearchedQuestion.textContent());
        await this.SearchQuestion.clear();
        await this.SearchQuestion.type("ABC")
        await this.page.waitForTimeout(2000);
        console.log("Invalid text", await this.VerifyNoRecordsFoundStatus.textContent())
        await this.SearchQuestion.clear();
        await this.SearchQuestion.type(testData.SearchQuestion)
        await this.page.waitForTimeout(2000);
        await this.ClickOnSearchedQuestion.click()
        await this.page.waitForTimeout(2000);
        await this.ClickOnNextBtn.click();
        await expect(this.ValidateCreateQuestionPage).toBeVisible();
        await this.page.waitForTimeout(3000);
    }


    /**Methods to logout as a admin */
    async adminLogout() {
        await this.ClickOnProfile.click();
        await this.ClickOnLogout.click()
    }

    /**Method to create MCQ Questions */
    async createMCQQuestions(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.MCQQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample MCQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.QuestionAims);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method to create VSAQ */
    async createVSAQQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnVSAQ.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample VSAQ Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        // await this.AddImage.click();
        // await this.ClickOnUploadImageBtn.click()
        // await this.page.waitForTimeout(5000);
        // await this.ClickOnInsertImageFile.setInputFiles('lib/Images/kohli.jpeg');
        // await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());

    }

    /**Methods to create Type-B Question */
    async createTypeBQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnTypeB.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample TypeB Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        // await this.EnterMarks.click()
        // await this.EnterMarks.clear()
        // await this.EnterMarks.type('2')
        // await this.page.waitForTimeout(2000);
        // await this.AddImage.click();
        // await this.ClickOnUploadImageBtn.click()
        // await this.page.waitForTimeout(5000);
        // await this.ClickOnInsertImageFile.setInputFiles('lib/Images/kohli.jpeg');
        // await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionA);
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionB);
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionC);
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionD);
        await this.page.waitForTimeout(2000);
        await this.Optional.click();
        await this.Optional.type(testData.OptionE);
        await this.page.waitForTimeout(2000);
        await this.ClickOnOptionBRadioBtn.click()
        // await this.EnterMarksInAns.click()
        // await this.EnterMarksInAns.clear()
        // await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());

    }

    /**Methods to create SJT Question */
    async createSJTQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSJT.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SJT Questions' + Math.floor(Math.random() * 8999 + 1000));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.TypeBStatement);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.ClickOnAppropriateRadioBtn.click();
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInSJT.click();
        await this.EnterMarksInSJT.clear();
        await this.EnterMarksInSJT.type("2");
        // await this.EnterMarksInAns.click()
        // await this.EnterMarksInAns.clear()
        // await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }


    /**Method to create ISAWEQuestions */
    async createISAWEQuestions(): Promise<void> {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ISAWEQuestionsClick.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Renewable Energy ISAWE' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Scenario);
        await this.page.waitForTimeout(2000);
        await this.AddImage.click();
        await this.page.waitForTimeout(2000);
        await this.clickImage.click()
        await this.page.waitForTimeout(2000);
        await this.InsertImageClick.click();
        await this.page.waitForTimeout(2000);
        await this.Marks.click();
        await this.Marks.type('2');
        await this.QuestionsText.click();
        await this.QuestionsText.type(testData.ISAWEQuestion);
        await this.page.waitForTimeout(2000);
        await this.Answer.click();
        await this.Answer.type(testData.AnswerISAWE);
        await this.page.waitForTimeout(2000);
        await this.correctAnswerMarks.click();
        await this.correctAnswerMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKeyISAWE)
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.AnswerKeyISAWE);
        await this.page.waitForTimeout(2000);
        await this.MarkMarks.click();
        await this.MarkMarks.type('2');
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await expect(this.QuestionSuccessMessage).toHaveText('Question created successfully');
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
        await expect(this.QuestionSuccessMessage).toHaveText('Status has been updated successfully.');
    }

    /**Method to create SAQ */
    async createSAQQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnSAQ.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample SAQ Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarks.click()
        await this.EnterMarks.clear()
        await this.EnterMarks.type('2')
        await this.page.waitForTimeout(2000);
        await this.EnterAnsKey.type(testData.AnswerKey)
        await this.OptionB.click();
        await this.OptionB.type(testData.Answer);
        await this.page.waitForTimeout(2000);
        await this.EnterMarksInAns.click()
        await this.EnterMarksInAns.clear()
        await this.EnterMarksInAns.type("2")
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Methods to create Type-X Question */
    async createTypeXQuestion() {
        await expect(this.CreateQuestion).toBeVisible();
        await this.CreateQuestion.click();
        await this.ClickOnTypeX.click();
        await this.NextButtonClick.click();
        await this.SelectQuestionBank.click();
        await this.SelectQuestionBank.type(testData.TestBank2);
        await this.SelectTestBank.click();
        await this.page.waitForTimeout(2000);
        await this.QuestionTopic.type('Sample TypeX Questions' + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(2000);
        await this.QuestionAims.click();
        await this.QuestionAims.type(testData.Question);
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type(testData.Subquestion);
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type(testData.OptionA);
        await this.ClickOnRadioButton1.click();
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type(testData.OptionB);
        await this.ClickOnRadioButton2.click();
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type(testData.OptionC);
        await this.ClickOnRadioButton3.click();
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type(testData.OptionD);
        await this.ClickOnRadioButton4.click();
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type(testData.OptionE);
        await this.ClickOnRadioButton5.click();
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSaveDraft.click();
        await this.ClickOnEditQuestion.click();
        await this.ClickOnWorkFlow.click()
        await this.ClickOnApprove.click()
        await this.page.waitForTimeout(3000);
        console.log(await this.ValidateSuccessfulPopMessage.textContent());
    }

    /**Method tp validate question delete */
    async validateQuestionDelete() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickCheckout.click();
        await this.clickYes.click();
        await this.page.waitForTimeout(5000);
        await this.clickMoreOption.click();
        await this.clickDelete.click();
        await this.clickYes.click();
    }

    /**Method to validate duplicate question */
    async ValidationQuestionDuplicate() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonDuplicate.click();
        await this.page.waitForTimeout(2000);
        await this.clickYesDuplicate.click();
        await this.page.waitForTimeout(2000);
        await this.clickSubmit.click();
        await this.page.waitForTimeout(2000);
        console.log(await this.DuplicateSuccessMessgae.textContent());
    }

    /**Method to Validation of Question Archive */
    async ValidationQuestionArchive() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonArchive.click();
        await this.page.waitForTimeout(2000);
        await this.clickYes.click();
        await this.page.waitForTimeout(2000);
        console.log(await this.ArchiveSuccessMessage.textContent());
    }

    /**Method to Validation of Question Preview */
    async ValidationQuestionPreview() {
        await this.clickQuestionId.click();
        await this.clickMoreOption.click();
        await this.clickonPreview.click();
        await this.page.waitForTimeout(2000);
    }

}