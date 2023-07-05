import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';

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
        await page1.locator('(//input)[1]').type('divyashree.r@igsindia.net');
        await page1.locator('(//input)[2]').type('Aa6!2M#y');
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);
          //await newPage.waitForLoadState();
        
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
       
        await newPage.waitForSelector('//select[1]',{timeout:10000});
        const attendance=await newPage.$$('//select[1]');
        console.log(attendance.length)
        for(let i=0;i<=attendance.length-1;i++)
        {
           await attendance[i].click();
            await attendance[i].selectOption('Yes');
        }
       // await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        //await newPage.locator('//div[@title="Resume Exam for all Candidates"]').click();
        //await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
        //await newPage.locator('//div[@title="Start Exam for all Candidates"]').click();
        //await newPage.locator('(//button[text()="Yes"])[2]').click();

        //let Examstatus=await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').textContent();
        //console.log(Examstatus);
        //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').isVisible();
        //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        //await newPage.locator('//div[@class="action-item control-item pause-exam"]').click();
        //await newPage.locator('(//button[text()="Yes"])[3]').click();
        //await newPage.locator('//a[@class="dropdown-toggle"]').click();
        //await newPage.locator('//p[text()="Reset Login"]').click();
        //await newPage.locator('(//button[text()="Yes"])[1]').click();
        //await newPage.waitForLoadState();
      // await newPage.close();
      // await page1.close();

    });
   

    
});