import test from '@lib/BaseTest';

import { chromium } from '@playwright/test';

test(`@Smoke Verify Validation of "Lock Exam" from Live monitor Proctor `, async ({eluminaCandPage, eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();

        
    });
    await test.step('Candidate start the exam',async ()=> {
       // await eluminaCadInvPage.candidateStartExamsValidationInv();
        await eluminaCandPage.candidateStartMCQ();

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
          await newPage.waitForTimeout(5000);
          await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
          //await newPage.waitForTimeout(5000);
          await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
           //await newPage.waitForTimeout(5000);
          //await newPage.locator('//div[@title="Start Exam for all Candidates"]').click();
  
          await newPage.locator('(//button[text()="Yes"])[2]').click();
          await newPage.waitForTimeout(5000);
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
        await newPage.close();
        await page1.close();

    });

    await test.step(`Redirected to Candidate page`, async () => {
        //await eluminaCadInvPage.candidateStartExams();
        await eluminaCadInvPage.againCandidateLogin();

    });




   

});