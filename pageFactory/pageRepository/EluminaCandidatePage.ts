import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaExamPage } from './EluminaExamPage';

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

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;

    }
    return result;

}

export class EluminaCandidatePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink: Locator;
    readonly ClickOnStartExamBtn: Locator;
    readonly ClickOnNextBtn: Locator;
    readonly ClickOnRevieweBtn: Locator;
    readonly ClickOnSubmitBtn: Locator;
    readonly verifyExamName: Locator;
    readonly verifyCandidateName: Locator;
    readonly verifyCandidateID: Locator;
    readonly verifyClientID: Locator;
    readonly verifyExamTimer: Locator;
    readonly verifyRecord: Locator;

    readonly verifyCloud: Locator;
    readonly ansVSAQQuestion: Locator;
    readonly ansSingleVSAQQuestion: Locator;
    readonly ansISAWEQuestion: Locator;
    readonly ans2ISAWEQuestion: Locator;
    readonly ansTypeXQuestion: Locator;
    readonly ans2TypeXQuestion: Locator;

    readonly ansTypeBQuestion: Locator;
    readonly ansSAQQuestion: Locator;
    readonly ansSJTQuestion: Locator;

    readonly ClickOnCalculator: Locator;
    readonly ClickOnHighlighter: Locator;
    readonly HighlightQuestion: Locator;

    readonly EnternumberOne: Locator;
    readonly EnterPlus: Locator;
    readonly EnternumberTwo: Locator;
    readonly EnterEqualto: Locator;
    readonly CloseCalculator: Locator;
    readonly CloseNotepad: Locator;
    readonly ansMCQQuestions: Locator;
    readonly flagForReviewQuestions: Locator;
    readonly clickOnTermAndCondition: Locator;
    readonly popupOK: Locator;
    readonly clickonNextBtn: Locator;
    readonly clickOnPreviousBtn: Locator;
    readonly InvalidDetailsAlert: Locator;
    readonly inceaseSize: Locator;
    readonly decreaseSize: Locator;
    readonly decreaseSizePro: Locator;
    readonly signOutBtn: Locator;
    readonly ViewResult: Locator;
    readonly flagForReviewColor: Locator;
    readonly notAnweredQuestion: Locator;
    readonly ClickOnNotepad: Locator;
    readonly ClickOnNotepadOne: Locator;
    readonly textareafill: Locator;
    readonly saveButton: Locator;
    readonly noteQuestions: Locator;
    readonly verifyContentSectionTime: Locator;
    readonly inProgressColor: Locator;
    readonly ConfirmationToSubmit: Locator;
    readonly CandidateLogout: Locator;
    readonly clickOnAutoOkPopup: Locator;
    readonly cloudUpdatedIcon: Locator;
    readonly clickOnLastVSAQ: Locator;
    readonly clearButton: Locator;
    readonly clickOnVSAQQuestions: Locator;
    readonly checklogo: Locator;
    readonly txtLogin: Locator;
    readonly txtUserIdPlaceholder: Locator;
    readonly txtPassword: Locator;

    readonly clickChatApp: Locator;
    readonly chatAppTxtArea: Locator;
    readonly clickOnSendicon: Locator;

    readonly clickOnOptionsInChatApp: Locator;
    readonly enterNameInChatApp: Locator;
    readonly clickOnNextChatApp: Locator;
    readonly enterExamInChatApp: Locator;
    readonly clickOnSendInChatApp: Locator;
    readonly EnterExaPassword: Locator;
    readonly RatelimitLogin: Locator;
    readonly HighlightQuestions: Locator;
    readonly ZoominIconClick: Locator;
    readonly ZoomOutIconClick: Locator;
    readonly RotateRight: Locator;
    readonly RotateLeft: Locator;
    readonly FullScreenClick: Locator;
    readonly FullScreenExit: Locator;
    readonly CloseIconClick: Locator;
    readonly offlineMessage: Locator;

    readonly clickOnOptionInChatApp: Locator;
    readonly examPwd: Locator;
    readonly clickOnOk: Locator;
    readonly DownloadRecoveryFile: Locator;
    readonly DownloadButtonClick: Locator;
    readonly DownloadSuccessMessage: Locator;
    readonly LogoutButtonClick: Locator;
    readonly StartExameTimer: Locator;
    readonly UserIDText: Locator;
    readonly PasswordIDText: Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');
        this.ClickStartExamLink = page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.ClickOnStartExamBtn = page.locator('//div[@class="btn parent-body-container btn-primary"]');
        this.ClickOnNextBtn = page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn = page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn = page.locator('(//div[text()=" Submit "])[1]');
        this.verifyExamName = page.locator('(//div[@class="txt"])[1]');
        this.verifyCandidateName = page.locator('(//div[@class="txt"])[2]//label[1]');
        this.verifyCandidateID = page.locator('(//div[@class="txt"])[2]//label[3]');
        this.verifyClientID = page.locator('(//div[@class="txt"])[2]//label[4]');
        this.verifyExamTimer = page.locator('//div[@class="clock-text"]');
        this.verifyRecord = page.locator('id="cameraRecIcon"');
        this.verifyCloud = page.locator('//div[@title="All data updated."]');
        this.ansMCQQuestions = page.locator('(//label[@class="labelEmpty"])[1]');
        this.ansVSAQQuestion = page.frameLocator('//iframe[@class="tox-edit-area__iframe"]').locator('html');
        this.ansSingleVSAQQuestion = page.locator('(//div[@class="question-number-container"]//div//p)[2]');
        this.ansISAWEQuestion = page.frameLocator('(//iframe[@class="tox-edit-area__iframe"])[1]').locator('//html[@data-mce-style="height: auto;"]');
        this.ans2ISAWEQuestion = page.frameLocator('(//iframe[@class="tox-edit-area__iframe"])[2]').locator('//html[@data-mce-style="height: auto;"]');
        this.ansTypeXQuestion = page.locator('(//div[@class="inputGroup question-preview--mc"]//label[@class="labelEmpty"])[1]');
        this.ans2TypeXQuestion = page.locator('(//div[@class="inputGroup question-preview--mc"]//label[@class="labelEmpty"])[4]');
        this.ansTypeBQuestion = page.locator('(//label[@class="labelEmpty"])[2]');
        this.ansSAQQuestion = page.frameLocator('//iframe[@class="tox-edit-area__iframe"]').locator('html');
        this.ansSJTQuestion = page.locator('(//label[@class="labelEmpty"])[1]');
        this.flagForReviewQuestions = page.locator('//div[text()="Flag for Review"]');
        this.clickOnTermAndCondition = page.locator('//input[@id="terms"]');
        this.popupOK = page.locator('//div[text()="OK"]');
        this.clickonNextBtn = page.locator('(//div[text()=" Next "])[1]');
        this.clickOnPreviousBtn = page.locator('//div[@class="btn parent-body-container btn-primary"][normalize-space()="Previous"]');
        this.InvalidDetailsAlert = page.locator('//*[@class="container error-bg"]//div[text()="Invalid User Id and Password."]');
        this.inceaseSize = page.locator('//em[@title="Increase Font Size"]');
        this.decreaseSize = page.locator('//em[@title="Decrease Font Size"]');
        this.decreaseSizePro = page.locator('//div[@class="font-container"]//em[@class="textfont fontSmall"]');
        this.signOutBtn = page.locator('//div[@class="signout"]');
        this.ViewResult = page.locator('//div[@class="logout practiceBtn parent-body-container"]//label');
        this.flagForReviewColor = page.locator('//p[@class="parent-body-container menuColor3"]');
        this.notAnweredQuestion = page.locator('//p[@class="parent-body-container menuColor1"]');

        this.ClickOnNotepad = page.locator('(//div[@class="toolIcon"])[2]');
        this.ClickOnCalculator = page.locator('(//div[@class="toolIcon"])[1]');
        this.ClickOnHighlighter = page.locator('(//div[@class="toolIcon"])[3]');

        this.ClickOnNotepadOne = page.locator('(//div[@class="toolIcon"])[1]');

        this.HighlightQuestion = page.locator('//div[@class="question-content clearfix"]');
        this.HighlightQuestions = page.locator('//p[@class="earseM-0 inner-question-section marker highlighter-context"]')
        this.textareafill = page.locator('//div[@class="notepad-content"]//textarea');
        this.EnternumberOne = page.locator('//button[@value="7"]');
        this.EnterPlus = page.locator('//button[@value="+"]');
        this.EnternumberTwo = page.locator('//button[@value="7"]');
        this.EnterEqualto = page.locator('//button[@value="="]');
        this.CloseCalculator = page.locator('//label[@class="closeIcon"]');
        this.CloseNotepad = page.locator('//label[@class="closeIcon"]');
        this.saveButton = page.locator('//div[@class="action-btn-container"]//div[text()="Save"]');
        this.noteQuestions = page.locator('//p[@class="parent-body-container menuColor1 menuColor5"]');
        this.verifyContentSectionTime = page.locator('//div[@class="clock-text timer-icon-red"]');
        this.ConfirmationToSubmit = page.locator('//div[text()="OK"]');
        this.CandidateLogout = page.locator('//label[text()="Logout"]');
        this.clickOnAutoOkPopup = page.locator('//div[@title="OK"]');
        this.inProgressColor = page.locator('//p[@class="parent-body-container menuActive menuColor1"]');
        this.cloudUpdatedIcon = page.locator('//div[@class="cloud"]//div');
        this.clickOnLastVSAQ = page.locator('//div[@class="question-number-container"]//div//p').last();
        this.clearButton = page.locator('//div[@class="action-btn-container"]//div[text()="Clear"]');
        this.clickOnVSAQQuestions = page.locator('(//div[@class="question-number"])[2]');
        this.checklogo = page.locator('//div[@class="logo-container"]//div[@class="logo"]');
        this.txtLogin = page.locator('//div[text()="Login"]');
        this.txtUserIdPlaceholder = page.locator('//label[text()="User Id"]')
        this.txtPassword = page.locator('//label[text()="Password"]');

        this.clickChatApp = page.frameLocator('//iframe[@title="Button to launch messaging window"]').locator('html');
        this.chatAppTxtArea = page.frameLocator('iframe[name="Messaging window"]').getByPlaceholder('Type a message');
        this.clickOnSendicon = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Send message' });

        this.clickOnOptionsInChatApp = page.frameLocator('iframe[name="Messaging window"]').locator('//button[normalize-space()="Hardware checks not working"]');
        this.clickOnOptionInChatApp = page.frameLocator('iframe[name="Messaging window"]').locator('(//button[@class="sc-as5ded-1 kreHQj sc-htpNat kbREso"])[2]');
        this.enterNameInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByLabel('Name');
        this.clickOnNextChatApp = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Next' })
        this.enterExamInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByLabel('Exam Name');
        this.clickOnSendInChatApp = page.frameLocator('iframe[name="Messaging window"]').getByRole('button', { name: 'Send' })
        this.EnterExaPassword = page.locator('//input[@placeholder="Enter Exam Password"]');
        this.RatelimitLogin = page.locator('//div[text()="Attempts exceeded the Limit"]');
        this.ZoominIconClick = page.locator('//div[@class="zoom-in icon"]');
        this.ZoomOutIconClick = page.locator('//div[@class="zoom-out icon"]');
        this.RotateRight = page.locator('//div[@class="rotate-right icon"]');
        this.RotateLeft = page.locator('//div[@class="rotate-left icon"]');
        this.FullScreenClick = page.locator('//div[@class="fullview icon"]');
        this.FullScreenExit = page.locator('//div[@class="full-close icon"]');
        this.CloseIconClick = page.locator('//label[@class="closeIcon"]');
        this.offlineMessage = page.locator('//div[@class="message-txt"]');

        this.examPwd = page.locator('//input[@placeholder="Enter Password"]');
        this.clickOnOk = page.locator('//div[text()="OK"]');
        this.DownloadRecoveryFile = page.locator('//label[text()="Download Recovery File"]');
        this.DownloadButtonClick = page.locator('//button[normalize-space()="Download"]');
        this.DownloadSuccessMessage = page.locator('//div[normalize-space()="Download Completed"]');
        this.LogoutButtonClick = page.locator('//div[normalize-space()="Log Out"]');
        this.StartExameTimer = page.locator('(//div[@class="exam-list"]//table//tr[@class="body-row"]//td//div//div)[2]');
        this.UserIDText = page.locator('//*[@class="container error-bg"]//div[text()="User Id is required."]');
        this.PasswordIDText = page.locator('//*[@class="container error-bg"]//div[text()="Password is required."]');
    }

    /**Method to Navigate to candidate dashboard */
    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testData.cadidateURL);
    }

    /**Method to Enter Candidate Credentials and to verify if start exam link is visible */
    async candidateLoginToApplication(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForTimeout(5000);

    }

    /**Method to set offline */
    async setOffline(offlineValue) {
        await this.context.setOffline(offlineValue);
        await this.page.waitForTimeout(5000);
    }

    /**Method to Enter Invaild Candidate Credentials */
    async candidateInvalidLoginCredential(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
            await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }


    /**Method to Enter Invaild Username Candidate Credentials */
    async candidateInvalidLoginUsername(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }

    /**Method to Enter Invaild Password Candidate Credentials */
    async candidateInvalidLoginPassword(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }


    /**
     * Method to Enter Candidate Credentials and to verify the offline message
     */
    async candidateLoginToApplicationoffline(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.context.setOffline(true);
        await this.LOGIN_BUTTON.click();
        await this.offlineMessage.isVisible();
    }

    /**Method to validation of client logo */
    async validationOfLogo() {
        await expect(this.checklogo).toBeVisible();
        console.log(await this.checklogo.textContent());
        console.log("Login page title:", await this.txtLogin.textContent());
        console.log("User Id Placeholder:", await this.txtUserIdPlaceholder.textContent())
        console.log("Password Placeholder:", await this.txtPassword.textContent())
        console.log("Login button:", await this.LOGIN_BUTTON.textContent())
    }

    /**Method to Enter Candidate Credentials */
    async candidateLoginToAndValidateDashboard(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(3000);
    }

    /**
     * Method to Enter Candidate Credentials
     */
    async enterCandidateCredetial() {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(20000);
    }


    /**Method to Enter Candidate Credentials only*/
    async enterCandidateCredetialonly() {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(3000);
    }

    /**Method to Click on Start Exam */
    async clickOnStartExam() {
        await this.ClickStartExamLink.click();
    }

    /**Method to Increase Font Size */
    async increaseFontSize() {
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.page.waitForTimeout(5000);
    }
    /**method to handle pop up */
    async popup() {
        await this.popupOK.click();
        await this.page.waitForTimeout(3000);
    }
    /**Method to Decrease font size */
    async decreaseFontSize() {
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.page.waitForTimeout(1000);
    }
    /**Methods to decrease font size in proctor */
    async decreaseFontSizePro() {
        await this.page.waitForTimeout(5000);
        await this.decreaseSizePro.click();
        await this.decreaseSizePro.click();
        await this.decreaseSizePro.click();
        await this.page.waitForTimeout(1000);
    }

    /**Method to click on content section checkbox */
    async clickOnContentSectionCheckBox() {
        await this.clickOnTermAndCondition.click();
    }

    /**Method to verify the candidate section if all the headers and values are displayed */
    async candidateContentSectionValidation() {
        console.log('Exam Name-' + await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-' + await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-' + await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-' + await this.verifyClientID.textContent());
    }

    /**Method to do horizontal scroll action */
    async HorizontalScrollAction() {
        let hor = await this.page.locator('//div[@class="contentWrapper"]');
        await hor.click();
        for (let i = 1; i <= 100; i++) {
            await this.page.keyboard.press("ArrowRight")[i];
        }
        await this.page.waitForTimeout(3000);

    }

    /**Method to Verify the the Candidate content section */

    async candidateContentSection() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(60000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();
    }

    /**Method to verify the exam section if all the headers and values are displayed */
    async examSectionValidation() {
        console.log('Exam Name-' + await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-' + await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-' + await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-' + await this.verifyClientID.textContent());
    }

    /**Method to send message in chat app */

    async chatAppMessageSent() {
        await this.page.waitForTimeout(8000);
        await this.clickChatApp.click();
        await this.chatAppTxtArea.click();
        await this.chatAppTxtArea.fill("Hi Chatbot");
        await this.clickOnSendicon.click();
        await this.page.waitForTimeout(5000);
    }

    async waitforTime() {
        await this.page.waitForTimeout(60000);
    }

    async waitforTime1() {
        await this.page.waitForTimeout(17000);
    }

    async waitforTime2() {
        await this.page.waitForTimeout(12000);
    }
    async waitforTime4() {
        await this.page.waitForTimeout(5000);
    }

    async waitforTime3() {
        await this.page.waitForTimeout(19000);
    }

    async updatedCloudIcon() {
        await this.page.waitForTimeout(5000);
        await expect(this.cloudUpdatedIcon).toBeVisible();
        console.log("Status Updated")
    }

    /**Method to Verify the the Dashboard timer */
    async verifyExamDashboardTimer() {
        await this.page.waitForTimeout(5000);
        await expect(this.verifyExamTimer).toBeVisible();
        await this.page.waitForTimeout(5000);
        console.log('Exam Timer-' + await this.verifyExamTimer.textContent());
    }
    /**Method to Verify the Exam Vailability */
    async verifyExamDashboard() {
        await this.page.waitForTimeout(5000);
        if (expect(this.verifyExamTimer).toBeHidden()) {
            console.log('Exam is not displayed to the candidate');
        } else {
            await expect(this.verifyExamTimer).toBeHidden();
            console.log('Exam is displayed for the user');
        }
    }

    /**Method to Verify the content section timer */
    async verifyContentSectionTimer() {
        await this.page.waitForTimeout(5000);
        await expect(this.verifyContentSectionTime).toBeVisible();
        await this.page.waitForTimeout(5000);
        console.log('Exam Timer-' + await this.verifyContentSectionTime.textContent());
    }

    /**Method to Navigate to back */
    async navigateBack() {
        await this.page.goBack();
        console.log("Clicked on Back Navigation icon");
    }

    /**Method to click on refresh page */
    async refreshPage() {
        await this.page.reload();
        console.log("Page Refreshed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async functionKey(Offlinevalue, keyword) {
        await this.context.setOffline(Offlinevalue);
        await this.page.keyboard.press(keyword);
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async functionKeyWithControl_Shift_R() {
        await this.page.keyboard.press('Control+Shift+R');
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to Enter Candidate Credentials and to verify if start exam link is visible */
    async candidateLoginToApplicationwithoutclickingLogin(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async HotKeyPress() {
        await this.page.keyboard.press('Alt+Shift+Q');
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to type Exam recovery Pwd */
    async examRecoveryPassword() {
        await this.examPwd.click();
        await this.examPwd.type('123456');
        await this.clickOnOk.click();
        await this.DownloadRecoveryFile.click();
        await this.DownloadButtonClick.click();
        await this.page.waitForTimeout(5000);
        await expect(this.DownloadSuccessMessage).toHaveText("Download Completed");
        await this.LogoutButtonClick.click();
    }

    async examSectionCloudValidation() {
        await this.page.waitForTimeout(30000);
        await expect(this.verifyCloud).toBeVisible();
        console.log('cloud symbol is Updated');
    }

    /**Method to Navigate to all questions without answering*/
    async candidateStartExam(): Promise<void> {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async clickOnAutoSubmitOKPopup() {
        await this.clickOnAutoOkPopup.click();
        await this.page.waitForTimeout(5000);
    }

    async submitButtonClick() {
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Answer the MCQ questions and click on review button */
    async candidateStartMCQ() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i < 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();

    }

    /**Method to Answer the MCQ questions and click on review & submit button */
    async candidateStartMCQAndSubmit() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Answer the MCQ Quetions */
    async candidateStartMCQwithoutReviewe() {

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        // await this.page.locator('(//div[@class="question-number-container"]//div//p)[4]').click();
        // await this.flagForReviewQuestions.click();
        // await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        //await this.ClickOnRevieweBtn.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        // await this.ClickOnRevieweBtn.click();
        // await this.ClickOnSubmitBtn.click();
    }


    /**Method to Answer the MCQ Quetions */
    async candidateStartMCQandSAQ_RevieweandSubmit() {

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        // await this.page.locator('(//div[@class="question-number-container"]//div//p)[4]').click();
        // await this.flagForReviewQuestions.click();
        // await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        //await this.ClickOnRevieweBtn.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candidateStartTwoMCQ() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();

        }
        await this.page.close();
    }
    async clickOnPrevious() {
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateStartOneMCQ() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 0; i < 5; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();

        }
    }

    async candidateSurveyStartOneMCQ() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
        await this.page.waitForTimeout(20000);
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }

    async candidateAnsSurveyQuestion() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
        await this.page.waitForTimeout(2000);
        await this.ClickOnSubmitBtn.click();


    }

    async candidateStartVSAQ() {
        await this.page.waitForTimeout(2000);
        await this.clickOnLastVSAQ.click();
        await this.ansVSAQQuestion.click();
        await this.ansVSAQQuestion.type(makeid(100));
        await this.page.waitForTimeout(2000);
        await this.ClickOnRevieweBtn.click();
        // await this.ClickOnSubmitBtn.click();
    }

    async candidateAttendsAllQVSAQ() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 5; i < 8; i++) {
            await qutns[i].click();
            await this.ansVSAQQuestion.click();
            await this.ansVSAQQuestion.type(makeid(100));
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
    }

    async candidateStartISAWE() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 8; i < 10; i++) {
            await qutns[i].click();
            await this.ansISAWEQuestion.click();
            await this.ansISAWEQuestion.type(makeid(100));
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
    }


    async candidateStartTypeX() {

        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 10; i < 15; i++) {
            await qutns[i].click();
            await this.ansTypeXQuestion.click();
            await this.ans2TypeXQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candidateStartTypeB() {

        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 15; i < 20; i++) {
            await qutns[i].click();
            await this.ansTypeBQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candidateStartSAQ() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 20; i < 25; i++) {
            await qutns[i].click();
            //await this.page.waitForTimeout(2000);
            await this.ansSAQQuestion.click();
            await this.ansSAQQuestion.type(makeid(100));
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);

    }

    async candidateStartSJT() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
    }

    async candidateStartSJTAns() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[29]').click();
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
    }

    async candidateStartSJTReviewandSubmit() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        for (let i = 25; i < 28; i++) {
            await qutns[i].click();
            await this.ansSJTQuestion.click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.waitForTimeout(2000);
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[28]').click()
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[29]').click();
        await this.ansSJTQuestion.click();
        await this.ClickOnNextBtn.click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
    }


    async candidateFlagForReviewAllQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            // await this.ansMCQQuestions.click();
            await this.flagForReviewQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnRevieweBtn.click();
        //await this.ClickOnSubmitBtn.click();

    }


    /**Method to Confirmation Submit popup */
    async confirmationOkBtn() {
        await this.ConfirmationToSubmit.click();
    }
    /**Method to Candidate  Logout */
    async clickOnLogoutBtn() {
        await this.page.waitForTimeout(2000);
        await this.CandidateLogout.click();
    }

    /**Method to navigate from review page to candidate exam page */
    async clickonPrevious() {
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(1000);
    }


    async againCandidateLogin(): Promise<void> {
        await this.page.bringToFront();
        await this.page.waitForTimeout(1000);
        //await this.page.close();
    }

    async AddingNotesToQuestion() {
        {
            await this.ansVSAQQuestion.click();
            await this.ClickOnNotepad.click();
            await this.page.waitForTimeout(1000);
            await this.textareafill.type('abc');
            await this.page.waitForTimeout(1000);
            await this.saveButton.click();
            await this.page.waitForTimeout(1000);
            await this.CloseNotepad.click();
        }

    }

    async UsingCalculatorForQuestions() {
        {

            await this.ClickOnCalculator.click();
            await this.page.waitForTimeout(1000);
            await this.EnternumberOne.click();
            await this.page.waitForTimeout(1000);
            await this.EnterPlus.click();
            await this.page.waitForTimeout(1000);
            await this.EnternumberTwo.click();
            await this.page.waitForTimeout(1000);
            await this.EnterEqualto.click();
            await this.page.waitForTimeout(1000);
            await this.CloseCalculator.click();
        }
    }

    async UsingHighlighterForQuestions() {
        {
            await this.clickOnLastVSAQ.click();
            await this.ansVSAQQuestion.click();
            await this.ClickOnHighlighter.click();
            await this.page.waitForTimeout(1000);
            await this.HighlightQuestions.dblclick()
            await this.HighlightQuestions.click()
            await this.page.waitForTimeout(1000);
        }
    }

    async flagForQuestion() {
        await this.clickOnLastVSAQ.click();
        await this.flagForReviewQuestions.click();

    }


    /**Method to Login to candidate app without vaild username and pwd */
    async logintoAppwithoutUserPwd(): Promise<void> {
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to signout of the exam after candidate logged in and clicked on start exam */
    async candidateLoginToAppStartExamandSignout(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to signout of the exam after candidate logged in and clicked on start exam */
    async candidateLoginToAppStartExam(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        if (this.ClickStartExamLink.isVisible()) {
            await this.ClickStartExamLink.click();
        }
    }

    /**Method to Enter Invigilator Password */
    async enterInvigilatorPassword() {
        await this.page.bringToFront();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(1000);
        await this.EnterExaPassword.type('ABC09');
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to Enter Invigilator Password multiple times*/
    async enterInvigilatorPasswordMultipletimes() {
        for (let i = 0; i <= 9; i++) {
            await this.page.bringToFront();
            await this.EnterExaPassword.click();
            await this.page.waitForTimeout(1000);
            await this.EnterExaPassword.type('ABC08');
            await this.ClickOnStartExamBtn.click();
            await this.page.waitForTimeout(3000);
        }
        await this.RatelimitLogin.isVisible();
        console.log(await this.RatelimitLogin.textContent());
    }


    /**Method to add MCQ Questions for Practise exam */
    async candidateStartMCQPractise() {

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i < qutns.length - 2; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.ClickOnNextBtn.click();
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnSubmitBtn.click();
        await this.ConfirmationToSubmit.click();
        await this.page.waitForTimeout(5000);
        await this.ViewResult.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to signout of the exam after candidate logged in */
    async candidateLoginToAppandSignout(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
            const ws = wb.getWorksheet('Worksheet');
            console.log(ws.actualRowCount)
            console.log(ws.getRow(2).getCell(1).value)
            console.log(ws.getRow(2).getCell(4).value)
            await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
            await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to check if Red colour is displayed for questions which is marked for Falg for review */
    async flagForReview() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
        await this.flagForReviewColor.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Red Color is Displayed when Flagged for Review")
    }

    /**Method to check if Gray colour is displayed for questions while taking the exam */
    async NotAnsweringQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.notAnweredQuestion.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Gray Color is Displayed When Questions are Not Answered")
    }

    /**Method to Add notes to the question during exam */
    async AddingNotesToQuestions() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNotepad.click();
            await this.page.waitForTimeout(1000);
            await this.textareafill.type('abc');
            await this.page.waitForTimeout(1000);
            await this.saveButton.click();
            await this.page.waitForTimeout(1000);
            await this.ClickOnNextBtn.click();
        }
        await this.noteQuestions.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Pink Color is Displayed When added Notes to the Questions")
    }

    async AddingNotesToQuestionandclickNext() {
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.ClickOnNextBtn.click();
    }

    async AddingNotesToQuestionSingle() {
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }


    async AddingNotesToQuestionSinglelast() {
        await this.clickOnLastVSAQ.click();
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }

    async AddingNotesToQuestionSinglelastandclickPrevious() {
        await this.clickOnVSAQQuestions.click();
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.clearButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.clickOnPreviousBtn.click()
        await this.ClickOnNextBtn.click();
        await this.ClickOnNotepadOne.click();
        await this.page.waitForTimeout(1000);
    }

    async AddingNotesValidate() {
        await this.ansMCQQuestions.click();
        await this.ClickOnNotepadOne.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
    }


    async NotAnsweringQuestion() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.notAnweredQuestion.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Exam is submitted When Questions are Not Answered")
    }

    /**Method to check if Orange colour is displayed for questions when it is in progress */
    async InProgressQuestions() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            //await this.page.waitForTimeout(5000);
            //await this.ClickOnNextBtn.click();
        }
        await this.inProgressColor.isVisible();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log("Orange Color is Displayed When Questions are in Progress")
    }

    /**Method to click on start exam for Minial time */
    async candidateStartExamforMinimalTime(): Promise<void> {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        await this.page.waitForTimeout(5000);
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    /**Method for Logout */
    async logoutClick(): Promise<void> {
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to click on terms & condtion */
    async termsandconditionsclick() {
        await this.clickOnTermAndCondition.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.page.waitForTimeout(5000);
        await this.popupOK.click();
        await this.page.waitForTimeout(2000);
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on terms & condtion in content section */
    async candidateContentSectionVerification() {
        await this.popupOK.click();
        await this.page.waitForTimeout(25000);
        await this.clickOnTermAndCondition.click();
        await expect(this.verifyCloud).toBeVisible();
        console.log('cloud symbol is Updated');
        await this.clickonNextBtn.click();
        await this.page.waitForTimeout(2000);

    }

    async candidateContentSectionVerificationwithoutnext() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(2000);
        await this.popupOK.click();
        await this.page.waitForTimeout(2000);
    }

    async candidateContentSectionVerifications() {
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(2000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();
    }

    async validsationOfChatApp() {
        await expect(this.clickChatApp).toBeVisible();
    }

    async chatApp() {
        await this.clickChatApp.click();
        await this.chatAppTxtArea.click();
        await this.chatAppTxtArea.fill("Hello");
        await this.clickOnSendicon.click();
        await this.page.waitForTimeout(5000);
    }

    async enterFieldsInChatApp(setOffline) {
        await this.clickChatApp.click();
        await this.clickOnOptionsInChatApp.click();
        await this.enterNameInChatApp.type('Raghu')
        await this.clickOnNextChatApp.click();
        await this.context.setOffline(setOffline);
        await this.enterExamInChatApp.type('Rag123')
        await this.clickOnSendInChatApp.click();
        await this.page.waitForTimeout(5000);
    }

    async enterFieldsInChatAppForOutOfOfficeHours(setOffline) {
        await this.clickChatApp.click();
        await this.clickOnOptionInChatApp.click();
        await this.enterNameInChatApp.type('Raghu')
        await this.clickOnNextChatApp.click();
        await this.context.setOffline(setOffline);
        await this.enterExamInChatApp.type('Rag123')
        await this.clickOnSendInChatApp.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Answer the MCQ questions and Abort in middle */
    async candidateStartMCQandAbort() {
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p', { timeout: 10000 });
        const qutns = await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-' + qutns.length);
        const Ttl = qutns.length - 1;
        for (let i = 0; i <= qutns.length - 3; i++) {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
        await this.flagForReviewQuestions.click();
    }

    async candidateStartOneMCQwithViewer() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
    }

    async candidateStartOneMCQwithMultipleViewerOptions() {
        await this.page.waitForTimeout(2000);
        await this.ansMCQQuestions.click();
        await this.page.waitForTimeout(2000);
        await this.ZoominIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.ZoomOutIconClick.click();
        await this.page.waitForTimeout(2000);
        await this.RotateRight.click();
        await this.page.waitForTimeout(2000);
        await this.RotateLeft.click();
        await this.page.waitForTimeout(2000);
        await this.FullScreenClick.click();
        await this.page.waitForTimeout(2000);
        await this.FullScreenExit.click();
        await this.page.waitForTimeout(2000);
        await this.CloseIconClick.click();
        await this.page.waitForTimeout(5000);
    }


    /**
     * To Validate the Exam availability in Candidate page by checking the exam start time xpath
     */
    async ExamAvailabilityCheck()  {
        await expect(this.StartExameTimer).toBeHidden();
        console.log('Exam is not visiable after time ends');
    }

    /**
     * To check the User name pop up mesage in candidate screen
     */
    async candidateUserNamePopUp(): Promise<void> {
        await this.CandidatePassword.fill(testData.InvalidCandidatePassword);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
        await this.UserIDText.isVisible();
    }

    /**
     * To check the User name pop up mesage in candidate screen
     */
    async candidatePasswordPopUp(): Promise<void> {
        await this.CandidateUsername.fill(testData.InvalidCandidateUsername);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(2000);
        await this.PasswordIDText.isVisible();
    }

    /**
     * Method to check user not Navigated back and check the assertion
     */
    async navigateBackFromExamattendPage() {
        await this.page.waitForTimeout(5000);
        await this.page.goBack();
        console.log("Clicked on Back Navigation icon");
        await this.ClickOnRevieweBtn.isDisabled();
    }

    /**
     * To Validate each component displayed in the MCQ Section
     * 
     */
    async McqPageValidation(){
        await expect(this.verifyExamTimer).toBeVisible();
        let Time = await this.verifyExamTimer.textContent();
        console.log('Time displaye' +Time);
    }
}
