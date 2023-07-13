import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';


let webActions: WebActions;

export class EluminaProctorCandidatePage {
    readonly page: Page;
    readonly page1:Page;
    readonly context: BrowserContext;
    readonly context1: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly SIGNOUT_BUTTON: Locator;
    readonly ClickStartExamLink:Locator;
    readonly ClickDiffStartExamLink:Locator;
    readonly EnterExaPassword:Locator;
    readonly ClickOnStartExamBtn:Locator;
    readonly ClickOnNextBtn:Locator;
    readonly ClickOnRevieweBtn:Locator;
    readonly ClickOnSubmitBtn:Locator;

    readonly ClickOnUnderstand:Locator;
    readonly ClickOnCheckBox:Locator;
    readonly ClickOnNextBtnPrct:Locator;
    readonly ClickOnVerifyIdentityBtn:Locator;
    readonly verifyErrorMsg:Locator;

    readonly verifyExamName:Locator;
    readonly verifyCandidateName:Locator;
    readonly verifyCandidateID:Locator;
    readonly verifyClientID:Locator;
    readonly verifyExamTimer:Locator;
    readonly verifyRecord:Locator;
    readonly examTimer:Locator;

    readonly ansMCQQuestions:Locator;

    readonly ansVSAQQuestion:Locator;
    readonly ClickOnNotepad:Locator;
    readonly textareafill:Locator;
    readonly saveButton:Locator;
    readonly CloseNotepad:Locator;

    readonly flagForReviewQuestions:Locator;
    readonly clickOnPreviousBtn:Locator;

    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly INVALIDLOGINBUTTON: Locator;
   
 

    constructor(page: Page, context: BrowserContext/*page1:Page,context1: BrowserContext*/) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');

        this.SIGNOUT_BUTTON = page.locator('//div[@class="signout"]');

        this.ClickStartExamLink=page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.ClickDiffStartExamLink=page.locator('//table[@class="table-container"]//tr[3]//td[6]');
        this.EnterExaPassword=page.locator('//input[contains(@class,"password")]');
        this.ClickOnStartExamBtn=page.locator('//div[@class="btn parent-body-container btn-primary"]');

        this.ClickOnNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn=page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn=page.locator('(//div[text()=" Submit "])[1]');

        this.ClickOnUnderstand=page.locator('//div[text()="I UNDERSTAND, OPEN MY WEBCAM "]');
        this.ClickOnCheckBox=page.locator('//input[@id="check"]');
        this.ClickOnNextBtnPrct=page.locator('//div[@class="button button-blue"]');
        this.ClickOnVerifyIdentityBtn=page.locator('//div[@class="authbutton btn-auth"]');
        this.verifyErrorMsg=page.locator('//div[text()="Authentication failed. Please retry again"]');

        this.verifyExamName=page.locator('(//div[@class="txt"])[1]');
        this.verifyCandidateName=page.locator('(//div[@class="txt"])[2]//label[1]');
        this.verifyCandidateID=page.locator('(//div[@class="txt"])[2]//label[3]');
        this.verifyClientID=page.locator('(//div[@class="txt"])[2]//label[4]');
        this.verifyExamTimer=page.locator('//div[@class="clock-text timer-icon-red"]');
        this.examTimer=page.locator('//div[@class="clock-text"]');
        this.verifyRecord=page.locator('//div[@id="cameraRecIcon"]');

        this.ansMCQQuestions=page.locator('(//label[@class="labelEmpty"])[1]');
        this.flagForReviewQuestions=page.locator('//div[text()="Flag for Review"]');
        this.clickOnPreviousBtn=page.locator('//div[@class="btn parent-body-container btn-primary"][normalize-space()="Previous"]');

        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.INVALIDLOGINBUTTON = page.locator('//*[@class="submit-butn"]');

        this.ansVSAQQuestion=page.frameLocator('iframe[class="tox-edit-area__iframe"]').locator('html');
        this.ClickOnNotepad=page.locator('//div[@class="toolIcon"]');
        this.textareafill=page.locator('//div[@class="notepad-content"]//textarea');
        this.CloseNotepad=page.locator('//label[@class="closeIcon"]');
        this.saveButton=page.locator('//div[@class="action-btn-container"]//div[text()="Save"]');

    }

    /**Method to Navigate to Candidate URL */
    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testConfig.cadidateURL);
    }

    /**Method to for Candidate to Login to Application */
    async candidateLoginToApplications(): Promise<void> {

        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        //const fileName = './User_details (30).xlsx';
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
    }

    async candidateSignOut(){
        await this.page.waitForTimeout(5000);
        await this.SIGNOUT_BUTTON.click();

    }

    /**Method to do Invalid Login */
    async InvalidCandidatelogin(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill('anonymouslogin@gmail.com');
        await this.PASSWORD_EDITBOX.fill('mrinvalid');
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(3000);
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });

    }

    /**Method to do Exam Validation */
    async examSectionValidation(){
        console.log('Exam Name-'+await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-'+await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-'+await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-'+await this.verifyClientID.textContent());
        //await expect(this.verifyExamTimer).toBeVisible();
        // console.log('Exam Timer-'+await this.verifyExamTimer.textContent());
        await expect(this.verifyRecord).toBeVisible();
        console.log('REC text-'+await this.verifyRecord.textContent())
    }

    /**Method to Click on All Links */
    async clickOnAllLink(){
        await this.ClickStartExamLink.click();
        await this.ClickOnUnderstand.click();
        await this.page.waitForTimeout(1000);
        await this.ClickOnCheckBox.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnNextBtnPrct.click();
        await this.ClickOnVerifyIdentityBtn.click();
        await expect(this.verifyErrorMsg).toBeVisible();
        console.log('Error Message'+await this.verifyErrorMsg.textContent());
    }
/**Method to click on All links for Diff Zone Exam */
    async clickOnAllLinkForDiffExamZone(){
        await this.ClickDiffStartExamLink.click();
        await this.ClickOnUnderstand.click();
        await this.page.waitForTimeout(1000);
        await this.ClickOnCheckBox.click();
        await this.page.waitForTimeout(5000);
        await this.ClickOnNextBtnPrct.click();
        await this.ClickOnVerifyIdentityBtn.click();
        await expect(this.verifyErrorMsg).toBeVisible();
        console.log('Error Message'+await this.verifyErrorMsg.textContent());
    }

    /**Method to Enter Invigilator Password */
    async enterInvigilatorPassword(){
       await this.page.bringToFront();
       await this.EnterExaPassword.click();
       await this.page.waitForTimeout(1000);
       await this.EnterExaPassword.type('ABC09');
       await this.ClickOnStartExamBtn.click();
       await this.page.waitForTimeout(3000);
    }

    /**Method to start Candidate Exam and click on Next without answering questions*/
    async candidateStartExams(): Promise<void>{
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
    }

    /**Method to Answer the MCQ Quetions */
    async candidateStartMCQ(){

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-3;i++)
        {
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

    /**Method to Flag for Review the MCQ Quetions */
    async candidateStartFlagForReviewMCQ(){

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.flagForReviewQuestions.click();
            await this.ClickOnNextBtn.click();
        }
            await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
            await this.flagForReviewQuestions.click();
            await this.ClickOnRevieweBtn.click();
    }
    
    /**Method to Click on Previous Button */
    async clickonPrevious(){
         await this.clickOnPreviousBtn.click();
         await this.page.waitForTimeout(1000);
    }
    
    /**Method to Login from Invigilator to Candidate  */
    async  againCandidateLogin():Promise<void>{
        await this.page.bringToFront();
        await this.page.waitForTimeout(3000);
    }

    async  redirectedToCandidatePageAndTerminate():Promise<void>{
        await this.page.bringToFront();
        await this.page.waitForTimeout(3000);
        await this.page.close();
    }


    /**Method to Enter Invaild Exam Password */
    async enterInvalidExamPassword():Promise<void>{
        await this.ClickStartExamLink.click();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(5000);
        await this.EnterExaPassword.type('ABCD09');
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();

           }
           await this.page.locator('//div[@class="question-number-container"]//div//p').last().click(); 
    }

        /**Method to Verify the the Dashboard timer */
        async verifyExamDashboardTimer(){
            await this.page.waitForTimeout(5000);
            await expect(this.examTimer).toBeVisible();
            await this.page.waitForTimeout(5000);
            console.log('Exam Timer-'+await this.examTimer.textContent());
            await this.page.waitForTimeout(2000);
         }

     /**Method to Navigate to back */
     async navigateBack(){
        await this.page.goBack();
        console.log("Clicked on Back Navigation icon");
    }

     /**Method to click on refresh page */
     async refreshPage(){
        await this.page.reload();
        console.log("Page Refreshed");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on function keys */
    async functionKey(){
        await this.page.keyboard.press('F3');
        console.log("Key Pressed");
        await this.page.waitForTimeout(5000);
    }

     /**Method to validate notes added in the question */
     async AddingNotesToQuestion(){
        
        await this.ClickOnStartExamBtn.click();
        await this.ansVSAQQuestion.click();
        await this.ClickOnNotepad.click();
        await this.page.waitForTimeout(1000);
        await this.textareafill.type('abc');
        await this.page.waitForTimeout(1000);
        await this.saveButton.click();
        await this.page.waitForTimeout(1000);
        await this.CloseNotepad.click();
        await this.ClickOnRevieweBtn.click();
    
   
}


}