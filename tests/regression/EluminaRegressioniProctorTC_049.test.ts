import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

/**Validation of  non- Safe Exam Browser */

test(`@Regression Verify Validation of candidate navigating to multiple window`, async ({ eluminaProctorCand, eluminaCandPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {

        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();

    });

    await test.step('Invigilator logging into Application in another window', async () => {


        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testConfig.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testConfig.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        console.log("Candidate is able to navigate to another window")



});

});