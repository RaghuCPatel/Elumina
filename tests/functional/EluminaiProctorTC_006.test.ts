import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';


test(`@Smoke Verify The candidate should be able to "Review" at any point of the exam time`, async ({ eluminaProctorCand,eluminaCandidateRevieweAndSubmitPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
   
    eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.clickOnAllLink();
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
         
         await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
         //await newPage.waitForTimeout(5000);
         await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
         await newPage.locator('//div[@class="dropdown closed more-btn--width"]').click();
         await newPage.locator('//p[text()="Verify Identity"]').click();
         await newPage.locator('(//button[text()="Yes"])[1]').click();
         await newPage.waitForTimeout(5000);
       
         await newPage.close();
         await page1.close();
 
     });
     await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.candidateStartMCQ();
    });
});