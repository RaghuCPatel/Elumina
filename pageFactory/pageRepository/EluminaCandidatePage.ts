import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';


let webActions: WebActions;

export class EluminaCandidatePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink:Locator;
    readonly ClickOnStartExamBtn:Locator;
    readonly ClickOnNextBtn:Locator;
    readonly ClickOnRevieweBtn:Locator;
    readonly ClickOnSubmitBtn:Locator;
    readonly verifyExamName:Locator;
    readonly verifyCandidateName:Locator;
    readonly verifyCandidateID:Locator;
    readonly verifyClientID:Locator;
    readonly verifyExamTimer:Locator;
    readonly verifyRecord:Locator;
    readonly ansMCQQuestions:Locator;
    readonly flagForReviewQuestions:Locator;
    readonly clickOnTermAndCondition:Locator;
    readonly popupOK:Locator;
    readonly clickonNextBtn:Locator;
    readonly clickOnPreviousBtn:Locator;
    readonly InvalidDetailsAlert:Locator;
    readonly inceaseSize:Locator;
    readonly decreaseSize:Locator;
    readonly signOutBtn:Locator;
    readonly ViewResult:Locator;
    readonly flagForReviewColor:Locator;
    readonly notAnweredQuestion:Locator;
    readonly ClickOnNotepad:Locator;
    readonly textareafill:Locator;
    readonly saveButton:Locator;
    readonly noteQuestions:Locator;
    readonly verifyContentSectionTime:Locator;
    readonly inProgressColor:Locator;

   readonly ConfirmationToSubmit:Locator;

   readonly CandidateLogout:Locator;

   readonly clickOnAutoOkPopup:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');
        this.ClickStartExamLink=page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.ClickOnStartExamBtn=page.locator('//div[@class="btn parent-body-container btn-primary"]');
        this.ClickOnNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn=page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn=page.locator('(//div[text()=" Submit "])[1]');
        this.verifyExamName=page.locator('(//div[@class="txt"])[1]');
        this.verifyCandidateName=page.locator('(//div[@class="txt"])[2]//label[1]');
        this.verifyCandidateID=page.locator('(//div[@class="txt"])[2]//label[3]');
        this.verifyClientID=page.locator('(//div[@class="txt"])[2]//label[4]');
        this.verifyExamTimer=page.locator('//div[@class="clock-text"]');
        this.verifyRecord=page.locator('id="cameraRecIcon"');
        this.ansMCQQuestions=page.locator('(//label[@class="labelEmpty"])[1]');
        this.flagForReviewQuestions=page.locator('//div[text()="Flag for Review"]');
        this.clickOnTermAndCondition=page.locator('//input[@id="terms"]');
        this.popupOK=page.locator('//div[text()="OK"]');
        this.clickonNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.clickOnPreviousBtn=page.locator('//div[@class="btn parent-body-container btn-primary"][normalize-space()="Previous"]');
        this.InvalidDetailsAlert=page.locator('//*[@class="container error-bg"]//div[text()="Invalid User Id and Password."]');
        this.inceaseSize=page.locator('//em[@title="Increase Font Size"]');
        this.decreaseSize=page.locator('//em[@title="Decrease Font Size"]');
        this.signOutBtn=page.locator('//div[@class="signout"]');
        this.ViewResult=page.locator('//div[@class="logout practiceBtn parent-body-container"]//label');
        this.flagForReviewColor=page.locator('//p[@class="parent-body-container menuColor3"]');
        this.notAnweredQuestion=page.locator('//p[@class="parent-body-container menuColor1"]');
        this.ClickOnNotepad=page.locator('//div[@class="toolIcon"]');
        this.textareafill=page.locator('//div[@class="notepad-content"]//textarea');
        this.saveButton=page.locator('//div[@class="action-btn-container"]//div[text()="Save"]');
        this.noteQuestions=page.locator('//p[@class="parent-body-container menuColor1 menuColor5"]');
        this.verifyContentSectionTime=page.locator('//div[@class="clock-text timer-icon-red"]');
        this.ConfirmationToSubmit=page.locator('//div[text()="OK"]');
        this.CandidateLogout=page.locator('//label[text()="Logout"]');
        this.clickOnAutoOkPopup=page.locator('//div[@title="OK"]');
        this.inProgressColor=page.locator('//p[@class="parent-body-container menuActive menuColor1"]');
    }

    /**Method to Navigate to candidate dashboard */
    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testConfig.cadidateURL);
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
        if(this.ClickStartExamLink.isVisible())
        {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
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
              await this.CandidateUsername.fill('Abcf12');
              await this.CandidatePassword.fill('shgadhjdgk');
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

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

    /**Method to Enter Candidate Credentials */
    async enterCandidateCredetial(){
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

    /**Method to Click on Start Exam */
    async clickOnStartExam(){
        await this.ClickStartExamLink.click();
    }

    /**Method to Increase Font Size */
    async increaseFontSize(){
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.inceaseSize.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to Decrease font size */
    async decreaseFontSize(){
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.decreaseSize.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on content section checkbox */
    async clickOnContentSectionCheckBox(){
        await this.clickOnTermAndCondition.click();
    }

    /**Method to verify the candidate section if all the headers and values are displayed */
    async candidateContentSectionValidation(){
        console.log('Exam Name-'+await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-'+await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-'+await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-'+await this.verifyClientID.textContent());
    }

    async HorizontalScrollAction(){
        let hor=await this.page.locator('//div[@class="contentWrapper"]'); 
         await hor.click();
         for(let i=1;i<=100;i++){
         await this.page.keyboard.press("ArrowRight")[i];
         }
         await this.page.waitForTimeout(3000);
  
      }

    /**Method to Verify the the Candidate content section */

    async candidateContentSection(){
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(60000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();
    }

    /**Method to verify the exam section if all the headers and values are displayed */
    async examSectionValidation(){
        console.log('Exam Name-'+await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-'+await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-'+await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-'+await this.verifyClientID.textContent());
    }

    /**Method to Verify the the Dashboard timer */
    async verifyExamDashboardTimer(){
       await this.page.waitForTimeout(5000);
       await expect(this.verifyExamTimer).toBeVisible();
       await this.page.waitForTimeout(5000);
       console.log('Exam Timer-'+await this.verifyExamTimer.textContent());
    }
  
    /**Method to Verify the the content section timer */
    async verifyContentSectionTimer(){
        await this.page.waitForTimeout(5000);
        await expect(this.verifyContentSectionTime).toBeVisible();
        await this.page.waitForTimeout(5000);
        console.log('Exam Timer-'+await this.verifyContentSectionTime.textContent());
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
   
    /**Method to Navigate to all questions without answering*/
    async candidateStartExam(): Promise<void>{
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
           }
           await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
           await this.ClickOnRevieweBtn.click();
           await this.ClickOnSubmitBtn.click();
    }

    async clickOnAutoSubmitOKPopup(){
        await this.clickOnAutoOkPopup.click();
        await this.page.waitForTimeout(5000);
        }

    /**Method to Answer the MCQ questions and click on review button */
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

    /**Method to Answer the MCQ questions and click on review & submit button */
    async candidateStartMCQAndSubmit(){
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
           await this.ClickOnSubmitBtn.click();
           await this.page.waitForTimeout(20000);
    }
   

 //**Method to Confirmation Submit popup */
 async confirmationOkBtn(){
    await this.ConfirmationToSubmit.click();
}
//**Method to Candidate  Logout */
async clickOnLogoutBtn(){
    await this.CandidateLogout.click();
}

    /**Method to navigate from review page to candidate exam page */
    async clickonPrevious(){
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(2000);
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
        if(this.ClickStartExamLink.isVisible())
        {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to add MCQ Questions for Practise exam */
    async candidateStartMCQPractise(){

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
           await this.page.waitForTimeout(5000);
           await this.ClickOnSubmitBtn.click();
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
    async flagForReview(){
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
           await this.flagForReviewColor.isVisible();
           await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
           console.log("Red Color is Displayed when Flagged for Review")
    }

    /**Method to check if Gray colour is displayed for questions while taking the exam */
    async NotAnsweringQuestions(){
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-3;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();
        }
           await this.notAnweredQuestion.isVisible();
           await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
           console.log("Gray Color is Displayed When Questions are Not Answered")
    }

    /**Method to Add notes to the question during exam */
    async AddingNotesToQuestions(){
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-3;i++)
        {
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

    /**Method to check if Orange colour is displayed for questions when it is in progress */
    async InProgressQuestions(){
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-3;i++)
        {
            await qutns[i].click();
            await this.page.waitForTimeout(5000);
            //await this.ClickOnNextBtn.click();
        }
           await this.inProgressColor.isVisible();
           await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
           console.log("Orange Color is Displayed When Questions are in Progress")
    }


}