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
    readonly Optional: Locator;
    readonly ClickOnOptionBRadioBtn: Locator;
    readonly ClickOnSJT: Locator;
    readonly ClickOnAppropriateRadioBtn: Locator;
    readonly EnterMarksInSJT: Locator;



    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.ClickOnQuestionTab = page.locator('//a[@data-tour="Questions"]')
        this.Questions = page.locator('//a[@data-tour="Questions"]');
        this.CreateQuestion = page.locator('//button[text()="Create Question"]');
        this.MCQQuestionsClick = page.locator('//p[text()="MCQ"]');
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
        this.AddImage = page.locator('//div[@class="btn-addimg"]')
        this.ClickOnUploadImageBtn = page.locator('//button[normalize-space()="Upload Image/File"]')
        this.ClickOnInsertImageFile = page.locator('//div[@class="dz-text"]')
        this.EnterAnsKey = page.locator('//div[@class="midcontent"]//input')
        this.ClickOnSaveDraft = page.locator('//button[normalize-space()="Save Draft"]')
        this.ClickOnEditQuestion = page.locator('//button[normalize-space()="Edit this Question"]')
        this.ClickOnWorkFlow = page.locator('//p[normalize-space()="Workflow"]')
        this.ClickOnApprove = page.locator('//button[normalize-space()="Approve"]')
        this.ValidateSuccessfulPopMessage = page.locator('//span[text()="Status has been updated successfully."]')
        this.ClickOnTypeB = page.locator('//p[normalize-space()="Type B"]')
        this.ClickOnOptionBRadioBtn = page.locator('(//div[@class="control__indicator"])[3]')
        this.ClickOnSJT = page.locator('//p[normalize-space()="SJT"]')
        this.ClickOnAppropriateRadioBtn = page.locator('//div[@class="col-5 col-xlg-6 ng-star-inserted"]//div[2]//qms-radio-button[1]//label[1]//div[1]');
        this.EnterMarksInSJT = page.locator('//div[@class="mark-input-box ng-star-inserted"]//input[@type="number"]')

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
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.InvalidAdminUserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.InvalidAdminUserPassword);
        await this.LOGIN_BUTTON.click();
    }

    async QuestionsMenuClick(): Promise<void> {
        await this.Questions.click();
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

    /**Method to creayte Question and Search */
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

    async createQuestions(): Promise<void> {
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
        await this.QuestionAims.type('Sample MCQ Questions');
        await this.page.waitForTimeout(2000);
        await this.Question.click();
        await this.Question.type('National Fruit of India');
        await this.page.waitForTimeout(2000);
        await this.ControlIndicator.click();
        await this.page.waitForTimeout(2000);
        await this.OptionA.click();
        await this.OptionA.type('Mango');
        await this.page.waitForTimeout(2000);
        await this.OptionB.click();
        await this.OptionB.type('Pineapple');
        await this.page.waitForTimeout(2000);
        await this.OptionC.click();
        await this.OptionC.type('Apple');
        await this.page.waitForTimeout(2000);
        await this.OptionD.click();
        await this.OptionD.type('Grapes');
        await this.page.waitForTimeout(2000);
        await this.OptionE.click();
        await this.OptionE.type('None');
        await this.page.waitForTimeout(2000);
        await this.NextButtonClick.click();
        await this.page.waitForTimeout(2000);
        await this.SubmitAndApprove.click();
        await this.page.waitForTimeout(5000);
        console.log(await this.SuccessMessage.textContent());
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
}