import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of "Lock Exam" from Live monitor (Proctor)

test(`@Smoke Verify Validation of "Lock Exam" from Live monitor Proctor`, async ({ eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();

        
    });
    await test.step('Candidate start the exam',async ()=> {
       // await eluminaCadInvPage.candidateStartExamsValidationInv();
       await eluminaProctorCand.clickOnAllLink();

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
          await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
          await newPage.locator('//a[@class="dropdown-toggle"]').click();
          await newPage.locator('//p[text()="Verify Identity"]').click();
          await newPage.locator('(//button[text()="Yes"])[1]').click();
          await newPage.waitForTimeout(3000);

          await eluminaProctorCand.enterInvigilatorPassword();
          await eluminaProctorCand.examSectionValidation();

        
       await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click()
       await newPage.waitForTimeout(8000);
        await newPage.locator('//span[@class="thtext"]//input[@type="checkbox"]').click();
        await newPage.waitForTimeout(1000);
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[5]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();

        
        await newPage.close();
        await page1.close();

    });
    await test.step(`Redirected to Candidate page`, async () => {
        await eluminaProctorCand.againCandidateLogin(); 
    });

    
});