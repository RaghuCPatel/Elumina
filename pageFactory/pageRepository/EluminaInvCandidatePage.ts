import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';


let webActions: WebActions;
//let webActions2: WebActions;


export class EluminaInvCandidatePage {
    readonly page: Page;
    readonly page1:Page;
    readonly context: BrowserContext;
    readonly context1: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink:Locator;
    readonly EnterExaPassword:Locator;
    readonly ClickOnStartExamBtn:Locator;
    readonly ClickOnNextBtn:Locator;
   readonly ClickOnRevieweBtn:Locator;
   readonly ClickOnSubmitBtn:Locator;
 

    constructor(page: Page, context: BrowserContext/*page1:Page,context1: BrowserContext*/) {
        this.page = page;
       // this.page1 = page1;
        this.context = context;
        //this.context1 = context1;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');
        this.ClickStartExamLink=page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.EnterExaPassword=page.locator('//input[contains(@class,"password")]');
        this.ClickOnStartExamBtn=page.locator('//div[@class="btn parent-body-container btn-primary"]');
       // this.NumberOfQutns=page.$$('//div[@class="question-number-container"]//div//p');
        this.ClickOnNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn=page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn=page.locator('(//div[text()=" Submit "])[1]');

        //webActions2 = new WebActions(this.page2, this.context2);


    }

    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto("https://sandboxcandidate.assessapp.com.au/");
        //await this.page2.goto("/");
    }

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

    async candidateLoginToApplicationsByEnteringUsername(): Promise<void> {

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

    }

    async candidateStartExams(): Promise<void>{
        await this.ClickStartExamLink.click();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(5000);
        await this.EnterExaPassword.type('ABC09');
        await this.ClickOnStartExamBtn.click();
       // await this.page1.bringToFront()
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();

           }
           await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
           await this.ClickOnRevieweBtn.click();
           //await this.ClickOnSubmitBtn.click();
           //await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
           //await this.page.bringToFront();
           //await this.page.waitForTimeout(5000);
           //await this.page.close();


        }

     async  againCandidateLogin():Promise<void>{
        await this.page.bringToFront();
        await this.page.waitForTimeout(10000);
        //await this.page.close();
     }


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
           await this.ClickOnRevieweBtn.click();
           await this.ClickOnSubmitBtn.click();
           await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    async candidateStartExamsValidationInv(): Promise<void>{
        await this.ClickStartExamLink.click();
    }
   

}