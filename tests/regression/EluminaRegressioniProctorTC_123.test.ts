import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of Proctoring Exam Event > Awaiting Exam Start 

test(`@Regression Validation of Proctoring Exam Event > Awaiting Exam Start`, async ({ eluminaCandPage,eluminaLoginPage,eluminaProctorCand,eluminaProctorReg,webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();
        });   
        await test.step(`Navigate to Application`, async () => {
            await eluminaProctorCand.clickOnAllLink();
            const browser = await chromium.launch();
            const context1 = await browser.newContext();
            const page1 = await context1.newPage();
            await page1.goto('/');
            await page1.waitForLoadState();
            await page1.locator('(//input)[1]').type(testConfig.username1);
            await page1.locator('(//input)[2]').type(testConfig.password1);
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
            await newPage.locator('//a[text()="Registration"]').click();
            await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
            await newPage.locator('//a[text()="Live Monitor"]').click();

            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(3000);

             await eluminaProctorCand.againCandidateLogin();
             await eluminaCandPage.waitforTime1();

            await newPage.locator('//img[@class="proctoringImg"]').click();
            await newPage.locator('(//div[@class="candidate-name"]//div[1])[1]').click();
            await newPage.waitForTimeout(3000);
            let status=await newPage.locator('//div[@class="status"]').textContent();
            await newPage.waitForTimeout(3000);
            console.log("Candidate status:"+status);
            await newPage.close();
            await page1.close();
        });
       
});