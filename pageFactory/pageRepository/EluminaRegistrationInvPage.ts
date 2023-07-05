import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { EluminaHomePage } from './EluminaHomePage';

let webActions: WebActions;

export class EluminaRegistrationInvPage {

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
    readonly ClickOnDropdown2:Locator;
    readonly ClickOnDownloadUserDeatils:Locator; 
    readonly ClickOnAssignInv:Locator;

    readonly ClickOnAddExistingUser:Locator;
    readonly SearchUsers:Locator;
    readonly CLickOnUser:Locator;
    readonly ChooseExistingRole:Locator;
    readonly SelectInvRole:Locator;
    readonly SelectExVenue:Locator;
    readonly SelectInvVenue:Locator;
    readonly SelectExEligible:Locator;
    readonly SelectInvEligible:Locator;
    readonly SelectExBookingStatus:Locator;
    readonly SelectInvBookingStatus:Locator;
    readonly AssignUsersToCand:Locator;
    readonly AssignInvToCand:Locator;
    readonly ClickOnInvSaveBtn:Locator;

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
        this.ClickOnDropdown2=page.locator('(//a[@class="icon dropdown-toggle"])[2]');
        this.ClickOnDownloadUserDeatils=page.locator('(//p[text()="Download User details"])[1]');
        this.ClickOnAssignInv=page.locator('(//p[text()="Assign Invigilator"])[1]');
        
        this.ClickOnAddExistingUser=page.locator('//a[normalize-space()="Add Existing Users"]');
        this.SearchUsers=page.locator('//input[@placeholder="Search User(s)"]');
        this.CLickOnUser=page.locator('//tbody/tr[1]/td[2]/input[1]');
        this.ChooseExistingRole=page.locator('//div[@class="btn-selected-list"]//div//ul');
        this.SelectInvRole=page.locator('//span[text()="Examiner-in-Charge"]');
        this.SelectExVenue=page.locator('//input[@placeholder="Select Venue"]');
        this.SelectInvVenue=page.locator('//span[text()="Elumina Chennai"]');
        this.SelectExEligible=page.locator('//input[@placeholder="Select Eligible"]');
        this.SelectInvEligible=page.locator('//span[text()="Yes"]');
        this.SelectExBookingStatus=page.locator('//input[@placeholder="Select Booking Status"]');
        this.SelectInvBookingStatus=page.locator('//span[text()="Booked"]');
        this.AssignUsersToCand=page.locator('//input[@placeholder="Select User(s)"]');
        this.AssignInvToCand=page.locator('//span[text()="Dinesh B"]');
        this.ClickOnInvSaveBtn=page.locator('(//button[text()="Save"])[2]');
        
        

    }


    async iAuthorPageNavigations() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaRegistrationInvPage(newPage);
    }

    async registrationTabNavigation():Promise<void> {
        await this.RegistrationMenu.click();
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    async addUserDetails():Promise<void>{
       await this.EnterClientID.type('Deem'+Math.floor(Math.random()*899+100));
       await this.ChooseTitle.click();
       await this.page.waitForTimeout(5000);
       await this.ChooseTitle.selectOption('Mr');
       await this.TypeUsername.type('rahulrcb'+Math.floor(Math.random()*89+10));
       await this.TypeFirstName.type('Rahul');
       await this.TypeLastName.type('Ka');
       await this.TypeEmail.type('rahulrcb'+Math.floor(Math.random()*899+100)+'@gmail.com');
       await this.TypePhone.type('6'+Math.floor(Math.random()*899999999+100));
       await this.SelectRole.click();
       await this.SelectRole.selectOption('Candidate');
       await this.SelectEligible.click();
       await this.SelectEligible.selectOption('Yes');
       await this.SelectVenue.click();
       await this.SelectVenue.type('Elumina Chennai');
       await this.SelectBookingStatus.click();
       await this.SelectBookingStatus.selectOption('Booked');
       await this.page.waitForTimeout(5000);
       await this.ClickOnSaveBtn.click();
       await this.page.waitForTimeout(5000);
       await this.LeftArrow.click();
       await this.ClickOnDropdown.click();
    }

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

    async addExistingUsers():Promise<void>{
       await this.ClickOnAddExistingUser.click();
       await this.SearchUsers.click();
       await this.SearchUsers.type('Dinesh');
       await this.page.waitForTimeout(6000);
       await this.CLickOnUser.click();
       await this.ChooseExistingRole.click();
       await this.SelectInvRole.click();
       await this.SelectExVenue.click();
       await this.SelectInvVenue.click();
       await this.SelectExEligible.click();
       await this.SelectInvEligible.click();
       await this.SelectExBookingStatus.click();
       await this.SelectInvBookingStatus.click();
       await this.ClickOnSaveBtn.click();
       await this.page.waitForTimeout(6000);
       await this.LeftArrow.click();
       await this.ClickOnDropdown2.click();
       await this.ClickOnAssignInv.click();
       await this.AssignUsersToCand.click();
       await this.AssignInvToCand.click();
       await this.ClickOnInvSaveBtn.click();
       await this.page.waitForTimeout(5000);




    }

}