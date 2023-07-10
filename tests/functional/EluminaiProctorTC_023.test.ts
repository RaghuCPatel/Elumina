import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';


/*Validation of Navigating to an exam from the dashboard to invigilate*/

test(`@Smoke Validation of Navigating to an exam from the dashboard to invigilate`, async ({ eluminaCadInvPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(); 
    });

    await test.step('Candidate start the exam',async ()=> {
       // await eluminaCadInvPage.candidateStartExamsValidationInv();
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

        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[1]//span)[1]').click();
        await newPage.locator('//*[@class="proctoringImg"]').click();
        await newPage.screenshot({ path: 'screenshot.png', fullPage: true });
        
    });

});