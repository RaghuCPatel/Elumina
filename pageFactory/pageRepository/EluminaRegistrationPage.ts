import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
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

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export class EluminaRegistrationPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly RegistrationMenu: Locator;
    readonly ClickOnCreatedExam:Locator;
    readonly ClickOnAddNewUsers:Locator;

    readonly EnterClientID:Locator;
    readonly ChooseTitle:Locator;
    readonly TypeUsername:Locator;
    readonly TypeFirstName:Locator;
    readonly TypeLastName:Locator;
    readonly TypeEmail:Locator;
    readonly TypePhone:Locator;
    readonly SelectRole:Locator;
    readonly SelectEligible:Locator;
    readonly SelectVenue:Locator;
    readonly SelectBookingStatus:Locator;
    readonly ClickOnSaveBtn:Locator;
    readonly LeftArrow:Locator;
    readonly ClickOnDropdown:Locator;
    readonly ClickOnDownloadUserDeatils:Locator; 
    readonly searchExam:Locator;
    readonly clickbulkdropdown:Locator;
    readonly clickonbulkdownload:Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.RegistrationMenu = page.locator('//a[text()="Registration"]');
        this.ClickOnCreatedExam=page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnAddNewUsers=page.locator('//a[normalize-space()="Add New Users"]');

        this.EnterClientID=page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//input');
        this.ChooseTitle=page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//select');
        this.TypeUsername=page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//input');
        this.TypeFirstName=page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//input');
        this.TypeLastName=page.locator('//table[@class="table"]//tbody//tr[1]//td[6]//input');
        this.TypeEmail=page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//input');
        this.TypePhone=page.locator('//table[@class="table"]//tbody//tr[1]//td[8]//input');
        this.SelectRole=page.locator('//table[@class="table"]//tbody//tr[1]//td[9]//select');
        this.SelectEligible=page.locator('//table[@class="table"]//tbody//tr[1]//td[10]//select');
        this.SelectVenue=page.locator('//table[@class="table"]//tbody//tr[1]//td[11]//select');
        this.SelectBookingStatus=page.locator('//table[@class="table"]//tbody//tr[1]//td[12]//select');
        this.ClickOnSaveBtn=page.locator('//button[@class="theme-btn theme-primary-btn"]');
        this.LeftArrow=page.locator('//i[@class="iconBg leftArrow"]');
        this.ClickOnDropdown=page.locator('//a[@class="icon dropdown-toggle"]');
        this.ClickOnDownloadUserDeatils=page.locator('(//p[text()="Download User details"])[1]');
        this.searchExam=page.locator('//input[@placeholder="Search Exam(s)"]');

        this.clickbulkdropdown=page.locator('//button[@class="btn dotbutton btn-default"]');
        this.clickonbulkdownload=page.locator('//a[text()="Bulk Download User Details"]');

        const examId:string=String(EluminaExamPage.examID);
        console.log(examId);
    }

    /**Method for Page Navigation */
    async iAuthorPageNavigations() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaRegistrationPage(newPage);
    }

     /**Method to register for the exam */
     async registrationTabNavigation():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }
    /**Method to Add User Details */
    async addUserDetails():Promise<void>{
        await this.EnterClientID.type(makeid(testData.clientId)+Math.floor(Math.random()*899+100));
        await this.page.waitForTimeout(8000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername)+Math.floor(Math.random()*89+10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail)+Math.floor(Math.random()*899+100)+'@gmail.com');
        await this.TypePhone.type(testData.clientPhone+Math.floor(Math.random()*899999999+100));
        await this.page.waitForTimeout(8000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption('Candidate');
        await this.page.waitForTimeout(8000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption('Yes');
        await this.page.waitForTimeout(8000);
        await this.SelectVenue.click();
        await this.SelectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(7000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption('Booked');
        await this.page.waitForTimeout(7000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(8000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown.click();
    }

    /**Method to Download the User Details */
    async downloadUserDetails():Promise<void>{
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
       // Wait for the download process to complete.
       console.log(await download.path());
       const suggestedFileName = download.suggestedFilename();
       const filePath = 'download/' + suggestedFileName
       await download.saveAs(filePath)
       await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
       await this.page.waitForTimeout(20000);
    }

    /**Method to Add Multiple User Details */
    async addMultipleUserDetails():Promise<void>{
        await this.page.waitForSelector('//table[@class="table"]//tbody//tr',{timeout:10000});
        let rowss=await this.page.$$('//table[@class="table"]//tbody//tr');
        for(let i=0;i<=2;i++)
        {
        
        await rowss[i].isVisible()
        await this.EnterClientID.clear();
        await this.EnterClientID.type(makeid(testData.clientId)+Math.floor(Math.random()*899+100));
        await this.page.waitForTimeout(1000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.clear();
        await this.TypeUsername.type(makeid(testData.clientUsername)+Math.floor(Math.random()*89+10));
        await this.TypeFirstName.clear();
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.clear();
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.clear();
        await this.TypeEmail.type(makeid(testData.clientEmail)+Math.floor(Math.random()*899+100)+'@gmail.com');
        await this.TypePhone.clear();
        await this.TypePhone.type('6'+Math.floor(Math.random()*899999999+100));
        await this.page.waitForTimeout(1000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption('Candidate');
        await this.page.waitForTimeout(1000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption('Yes');
        await this.page.waitForTimeout(1000);
        await this.SelectVenue.click();
        await this.SelectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(1000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption('Booked');
        await this.page.waitForTimeout(1000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000); 
        }
        await this.LeftArrow.click();
     }

    /**Method to Download the Multiple User Details */
    async downloadMultipleUserDetails():Promise<void>{
       
        await this.clickbulkdropdown.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickonbulkdownload.click();
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(15000);
        
    }
    //  /**Method to Download the Multiple User Details */
    //  async downloadMyltipleUserDetails():Promise<void>{
    //     await this.page.waitForSelector('//a[@class="icon dropdown-toggle"]');
    //     let clickdropdown = await this.page.$$('//a[@class="icon dropdown-toggle"]'); 

    //     for(let i=0;i<=clickdropdown.length-1;i++)  {
    //     await clickdropdown[i].click();
    //     console.log(clickdropdown.length-1);

    //     const downloadPromise = this.page.waitForEvent('download');
    //     await this.page.waitForSelector('(//p[text()="Download User details"])');

    //     let clickonUserdropdown = await this.page.$$('(//p[text()="Download User details"])')

    //         for(let i=0;i<=clickonUserdropdown.length-1;i++){

    //             console.log(clickonUserdropdown.length-1);
    //             //const downloadPromise = this.page.waitForEvent('download');
    //             await clickonUserdropdown[i].click();
    //             const download = await downloadPromise;
    //             // Wait for the download process to complete.
    //             console.log(await download.path());
    //             const suggestedFileName = download.suggestedFilename();
    //             const filePath = 'download/' + suggestedFileName
    //             await download.saveAs(filePath)
    //     }
    // }
    // await this.page.waitForTimeout(8000);
    // }

}