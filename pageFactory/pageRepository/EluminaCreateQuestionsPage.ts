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
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
} 

export class EluminaCreateQuestionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR:Locator;
    readonly Questions:Locator;
    readonly CreateQuestion:Locator;
    readonly MCQQuestionsClick:Locator;
    readonly NextButtonClick:Locator;
    readonly SelectQuestionBank:Locator;
    readonly SelectTestBank:Locator;
    readonly QuestionTopic:Locator;
    readonly QuestionAims:Locator;
    readonly Question:Locator;
    readonly ControlIndicator:Locator;
    readonly OptionA:Locator;
    readonly OptionB:Locator;
    readonly OptionC:Locator;
    readonly OptionD:Locator;
    readonly OptionE:Locator;
    readonly SubmitAndApprove:Locator;
    readonly SuccessMessage:Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.Questions=page.locator('//a[@data-tour="Questions"]');
        this.CreateQuestion=page.locator('//button[text()="Create Question"]');
        this.MCQQuestionsClick=page.locator('//p[text()="MCQ"]');
        this.NextButtonClick=page.locator('//button[text()="Next"]');
        this.SelectQuestionBank=page.locator('//input[@placeholder="Select Question Bank"]');
        this.SelectTestBank=page.locator('(//div[@class="dropdown-main"])[1]//li//span[@class="open"]');
        this.QuestionTopic=page.locator('(//input[@name="inputbox"])[1]')
        this.QuestionAims=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[1]').locator('html');
        this.Question=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[2]').locator('html');
        this.OptionA=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[3]').locator('html');
        this.OptionB=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[4]').locator('html');
        this.OptionC=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[5]').locator('html');
        this.OptionD=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[6]').locator('html');
        this.OptionE=page.frameLocator('(//iframe[@title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"])[7]').locator('html');
        this.ControlIndicator=page.locator('(//div[@class="control__indicator"])[2]');
        this.SubmitAndApprove=page.locator('//button[text()="Submit & Approve"]');
        this.SuccessMessage=page.locator('//div[text()="Question (NewtestExam) has been created successfully."]')
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

    async QuestionsMenuClick():Promise<void>{
        await this.Questions.click();
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
        await this.QuestionTopic.type('Sample MCQ Questions'+Math.floor(Math.random()*8999+1000));
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
        await this.page.waitForTimeout(15000);
        console.log(await this.SuccessMessage.textContent());
    }
}