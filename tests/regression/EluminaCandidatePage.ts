import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

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


let webActions: WebActions;

export class EluminaCandidatePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink:Locator;
    readonly ClickOnStartExamBtn:Locator;
   // readonly NumberOfQutns:Locator;
   //readonly ClickOnLastQutn:Locator;
   readonly ClickOnNextBtn:Locator;
   readonly ClickOnRevieweBtn:Locator;
   readonly ClickOnSubmitBtn:Locator;

   readonly verifyExamName:Locator;
   readonly verifyCandidateName:Locator;
   readonly verifyCandidateID:Locator;
   readonly verifyClientID:Locator;
   readonly verifyExamTimer:Locator;
   readonly verifyRecord:Locator;

   readonly verifyCloud:Locator;

   readonly ansMCQQuestions:Locator;
   
   readonly ansVSAQQuestion:Locator;

   readonly flagForReviewQuestions:Locator;

   readonly clickOnTermAndCondition:Locator;
   readonly popupOK:Locator;
   readonly clickonNextBtn:Locator;

   readonly clickOnPreviousBtn:Locator;

   readonly InvalidDetailsAlert:Locator;

   readonly notAnweredQuestion:Locator;

   readonly ClickOnNotepad:Locator;
   readonly ClickOnCalculator:Locator;
   readonly ClickOnHighlighter:Locator;
   readonly HighlightQuestion:Locator;

   readonly textareafill:Locator;
   readonly EnternumberOne:Locator;
   readonly EnterPlus:Locator;
   readonly EnternumberTwo:Locator;
   readonly EnterEqualto:Locator;
   readonly CloseCalculator:Locator;
   readonly CloseNotepad:Locator;


   readonly saveButton:Locator;
   readonly noteQuestions:Locator;

 

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');
        this.ClickStartExamLink=page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.ClickOnStartExamBtn=page.locator('//div[@class="btn parent-body-container btn-primary"]');
       // this.NumberOfQutns=page.$$('//div[@class="question-number-container"]//div//p');
        //this.ClickOnLastQutn=page.locator('//div[@class="question-number-container"]//div//p').last();
        this.ClickOnNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn=page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn=page.locator('(//div[text()=" Submit "])[1]');

        this.verifyExamName=page.locator('(//div[@class="txt"])[1]');
        this.verifyCandidateName=page.locator('(//div[@class="txt"])[2]//label[1]');
        this.verifyCandidateID=page.locator('(//div[@class="txt"])[2]//label[3]');
        this.verifyClientID=page.locator('(//div[@class="txt"])[2]//label[4]');
        this.verifyExamTimer=page.locator('//div[@class="clock-text timer-icon-red"]');
        this.verifyRecord=page.locator('id="cameraRecIcon"');

        this.verifyCloud=page.locator('//div[@title="All data updated."]');

       // this.ansMCQQuestions=page.locator('(//input[@type="radio"])[1]');
       this.ansMCQQuestions=page.locator('(//label[@class="labelEmpty"])[1]');
       this.ansVSAQQuestion=page.frameLocator('iframe[class="tox-edit-area__iframe"]').locator('html');
        this.flagForReviewQuestions=page.locator('//div[text()="Flag for Review"]');

        this.clickOnTermAndCondition=page.locator('//input[@id="terms"]');
        this.popupOK=page.locator('//div[text()="OK"]');
        this.clickonNextBtn=page.locator('(//div[text()=" Next "])[1]');

        this.clickOnPreviousBtn=page.locator('//div[@class="btn parent-body-container btn-primary"][normalize-space()="Previous"]');
        
        this.InvalidDetailsAlert=page.locator('//*[@class="container error-bg"]//div[text()="Invalid User Id and Password."]');

        this.notAnweredQuestion=page.locator('//p[@class="parent-body-container menuColor1"]');

        this.ClickOnNotepad=page.locator('//div[@class="toolIcon"]');
        this.ClickOnCalculator=page.locator('//div[@class="toolIcon"]');
        this.ClickOnHighlighter=page.locator('//div[@class="toolIcon"]');
        this.HighlightQuestion=page.locator('//span[@class="CSkcDe"]');

        this.textareafill=page.locator('//div[@class="notepad-content"]//textarea');
        this.EnternumberOne=page.locator('//button[@value="7"]');
        this.EnterPlus=page.locator('//button[@value="+"]');
        this.EnternumberTwo=page.locator('//button[@value="7"]');
        this.EnterEqualto=page.locator('//button[@value="="]');
        this.CloseCalculator=page.locator('//label[@class="closeIcon"]');
        this.CloseNotepad=page.locator('//label[@class="closeIcon"]');
        

        this.saveButton=page.locator('//div[@class="action-btn-container"]//div[text()="Save"]');
        this.noteQuestions=page.locator('//p[@class="parent-body-container menuColor1 menuColor5"]');

    }

    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testConfig.cadidateURL);
    }

    async candidateLoginToApplication(): Promise<void> {

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
        await this.page.waitForTimeout(5000);

        if(this.ClickStartExamLink.isVisible())
        {
            await this.ClickStartExamLink.click();
        }
        await this.ClickOnStartExamBtn.click();
    }

    async candidateInvalidLoginCredential(): Promise<void> {

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
              await this.CandidateUsername.fill('Abcf12');
              await this.CandidatePassword.fill('shgadhjdgk');
        })

        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
        await this.page.waitForTimeout(5000);
        await this.InvalidDetailsAlert.isVisible();
        console.log(await this.InvalidDetailsAlert.textContent());

    }

    async candidateLoginToAndValidateDashboard(): Promise<void> {

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
        await this.page.waitForTimeout(5000);

        await this.ClickStartExamLink.isVisible();
        
    }

    async candidateContentSection(){
        await this.clickOnTermAndCondition.click();
        await this.page.waitForTimeout(60000);
        await this.popupOK.click();
        await this.clickonNextBtn.click();

    }

    async examSectionValidation(){
        console.log('Exam Name-'+await this.verifyExamName.textContent());
        await expect(this.verifyCandidateName).toBeVisible();
        console.log('Candidate Name-'+await this.verifyCandidateName.textContent());
        await expect(this.verifyCandidateID).toBeVisible();
        console.log('Candidate ID-'+await this.verifyCandidateID.textContent());
        await expect(this.verifyClientID).toBeVisible();
        console.log('Client ID-'+await this.verifyClientID.textContent());
        //await expect(this.verifyExamTimer).toBeVisible();
        //console.log('Exam Timer-'+await this.verifyExamTimer.textContent());
        await this.page.waitForTimeout(5000);

    }

    async examSectionCloudValidation(){
        await this.page.waitForTimeout(15000);
        await expect(this.verifyCloud).toBeVisible();
        console.log('cloud symbol is Updated');
    }
   

    async candidateStartExam(): Promise<void>{
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        //await this.ClickOnStartExamBtn.click();
        //await expect(this.verifyExamName).toBeVisible();
        


        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
          
            await this.ClickOnNextBtn.click();

           }
           //await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
           //await this.ClickOnRevieweBtn.click();
           //await this.ClickOnSubmitBtn.click();

    }

    async candidateStartMCQ(){
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        // await this.ClickOnStartExamBtn.click();

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
           //await this.ClickOnSubmitBtn.click();

    }


    async candidateStartTwoMCQ(){
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        // await this.ClickOnStartExamBtn.click();

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length;
        for(let i=0;i<=qutns.length-3;i++)
        {
            await qutns[i].click();
            await this.ansMCQQuestions.click();
          
            //await this.page.close();
           }
            //await this.page.locator('(//div[@class="question-number-container"]//div//p)[3]').click();
           //await this.flagForReviewQuestions.click();
          // await this.ClickOnNextBtn.click();
          await this.page.close();
           //await this.context.close();
          // await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
          // await this.ClickOnRevieweBtn.click();
           //await this.ClickOnSubmitBtn.click();

    }

    async candidateStartVSAQ(){
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        // await this.ClickOnStartExamBtn.click();

        //await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        //const qutns=await this.page.locator('//div[@class="question-number-container"]//div//p');
        
        
            await this.page.waitForTimeout(5000);
            await this.ansVSAQQuestion.click();
            await this.ansVSAQQuestion.type(makeid(100));
            await this.page.waitForTimeout(5000);
            await this.ClickOnRevieweBtn.click();
            await this.ClickOnSubmitBtn.click();
           
            

    }

    async candidateStartAllQuestion(){
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        // await this.ClickOnStartExamBtn.click();

        //await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        //const qutns=await this.page.locator('//div[@class="question-number-container"]//div//p');
        
        
            await this.page.waitForTimeout(5000);
            await this.ansVSAQQuestion.click();
            await this.ansVSAQQuestion.type(makeid(100));
            await this.page.waitForTimeout(5000);
            await this.ClickOnRevieweBtn.click();
            await this.ClickOnSubmitBtn.click();
           
            

    }

    async candidateFlagForReviewAllQuestions(){
        // if(this.ClickStartExamLink.isVisible())
        // {
        //     await this.ClickStartExamLink.click();
        // }
        //await this.ClickStartExamLink.click();
        // await this.ClickOnStartExamBtn.click();

        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        console.log('Number of questions-'+qutns.length);
        const Ttl=qutns.length-1;
        for(let i=0;i<=qutns.length-3;i++)
        {
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
   
    async clickonPrevious(){
        await this.clickOnPreviousBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async  againCandidateLogin():Promise<void>{
        await this.page.bringToFront();
        await this.page.waitForTimeout(10000);
        //await this.page.close();
     }

     async AddingNotesToQuestion(){
        // await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        // const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        // console.log('Number of questions-'+qutns.length);
        // const Ttl=qutns.length-1;
        // for(let i=0;i<=qutns.length-4;i++)
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

    async UsingCalculatorForQuestions(){
        // await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        // const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        // console.log('Number of questions-'+qutns.length);
        // const Ttl=qutns.length-1;
        // for(let i=0;i<=qutns.length-4;i++)
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

    async UsingHighlighterForQuestions(){

        {
    
            await this.ansVSAQQuestion.click();
            await this.ClickOnHighlighter.click();
            await this.page.waitForTimeout(1000);
            await this.HighlightQuestion.dblclick();
            await this.page.waitForTimeout(1000);
        }
    }

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
            await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
            await this.ClickOnRevieweBtn.click();
            await this.ClickOnSubmitBtn.click();
            await this.notAnweredQuestion.isVisible();
            await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
           console.log("Exam is submitted When Questions are Not Answered")
    }
   

}