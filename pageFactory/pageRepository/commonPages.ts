import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));


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
let webActions: WebActions;

export class commonPages{
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
    readonly page: Page;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
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
    }

/**Method to Add User Details */
async ClientUserDetails():Promise<void>{
    await this.EnterClientID.type(testData.clientId+Math.floor(Math.random()*899998+100200));
    await this.ChooseTitle.click();
    await this.ChooseTitle.selectOption(testData.clientGender);
    await this.TypeUsername.type(testData.clientUsername+Math.floor(Math.random()*89123+1078));
    await this.TypeFirstName.type(testData.clientFirstname);
    await this.TypeLastName.type(testData.clientLastname);
    await this.TypeEmail.type(testData.clientEmail+Math.floor(Math.random()*899999+1001)+'@gmail.com');
    await this.TypePhone.type(testData.clientPhone+Math.floor(Math.random()*899999999+100));
    await this.page.waitForTimeout(5000);
    await this.SelectRole.click();
    await this.SelectRole.selectOption(testData.clientRole);
    await this.page.waitForTimeout(5000);
    await this.SelectEligible.click();
    await this.SelectEligible.selectOption(testData.clientEligableOption);
    await this.page.waitForTimeout(5000);
    await this.SelectVenue.click();
    await this.SelectVenue.type(testData.clientVenue);
    await this.page.waitForTimeout(5000);
    await this.SelectBookingStatus.click();
    await this.SelectBookingStatus.selectOption(testData.clientBookingStatus);
}

}