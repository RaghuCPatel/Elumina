import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of "Mark Attendance" (All Candidates) (Proctor)

test(`@Smoke Verify Validation of "Mark Attendance" (All Candidates) Proctor`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
        
    });
    await test.step('Candidate start the exam',async ()=> {

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testConfig.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testConfig.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);
          
        
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
       
        await newPage.waitForSelector('//select[1]',{timeout:10000});
        const attendance=await newPage.$$('//select[1]');
        console.log(attendance.length)
        for(let i=0;i<=attendance.length-1;i++)
        {
           await attendance[i].click();
            await attendance[i].selectOption('Yes');
        }
       

    });
   

    
});