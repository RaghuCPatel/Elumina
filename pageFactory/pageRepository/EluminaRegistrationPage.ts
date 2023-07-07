import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { EluminaHomePage } from './EluminaHomePage';

let webActions: WebActions;

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
        this.ClickOnDropdown=page.locator('(//a[@class="icon dropdown-toggle"])[1]');
        this.ClickOnDownloadUserDeatils=page.locator('(//p[text()="Download User details"])[1]');

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
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to Add User Details */
    async addUserDetails():Promise<void>{
       await this.EnterClientID.type('Deem'+Math.floor(Math.random()*899+100));
       await this.page.waitForTimeout(8000);
       await this.ChooseTitle.click();
       await this.ChooseTitle.selectOption('Mr');
       await this.TypeUsername.type('veer'+Math.floor(Math.random()*89+10));
       await this.TypeFirstName.type('Virat');
       await this.TypeLastName.type('sing');
       await this.TypeEmail.type('veer'+Math.floor(Math.random()*899+100)+'@gmail.com');
       await this.TypePhone.type('6'+Math.floor(Math.random()*899999999+100));
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
        await this.EnterClientID.type('Dee'+Math.floor(Math.random()*899+100));
        await this.page.waitForTimeout(1000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');

        await this.TypeUsername.clear();
        await this.TypeUsername.type('Sharukh'+Math.floor(Math.random()*89+10));

        await this.TypeFirstName.clear();
        await this.TypeFirstName.type('Sharukh');

        await this.TypeLastName.clear();
        await this.TypeLastName.type('Khan');

        await this.TypeEmail.clear();
        await this.TypeEmail.type('Sharukh'+Math.floor(Math.random()*899+100)+'@gmail.com');

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
     async downloadMyltipleUserDetails():Promise<void>{
        for(let i=0;i<=2;i++){
        await this.ClickOnDropdown.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
       // Wait for the download process to complete.
        console.log(await download.path());
        const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(2000);
     }
    }

}