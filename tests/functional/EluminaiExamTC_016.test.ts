import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

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
        await page1.locator('(//input)[1]').type(testConfig.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testConfig.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);
        
          await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
          await newPage.waitForTimeout(5000);
          await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();
          //await newPage.waitForTimeout(5000);
          await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
          await newPage.locator('(//button[text()="Yes"])[2]').click();
          await newPage.waitForTimeout(5000);

        await newPage.close();
        await page1.close();

    });

    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaCadInvPage.againCandidateLogin();

    });




   

});