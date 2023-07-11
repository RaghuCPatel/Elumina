import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';



test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaProctorCand, webActions }) => {

    await test.step('Candidate logging into application', async () => {

        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();

    });

    await test.step('Invigilator  logging into Application', async () => {

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


        await newPage.close();
        await page1.close();

    });
   

    await test.step('Invigilator marks attendance for all candidate', async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.candidateStartMCQ();

    });

});