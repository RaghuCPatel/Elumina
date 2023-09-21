import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

/** Validation of extending exam for the candidate by invigilator */

test(` iProc_TC_ID_76. @iProctorRegression extending exam for the candidate by invigilator`, async ({ eluminaProctorCand, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();
    });

    await test.step('Candidate start the exam', async () => {
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
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
        await newPage.waitForTimeout(5000);

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input').click();
        await newPage.locator('//div[@title="Extend Exam for all Candidates"]').click();
        await newPage.locator('(//button[text()="Yes"])[2]').click();
        await newPage.waitForTimeout(5000);
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//div[@class="btn-selected-list"]').click();
        await newPage.locator('(//li[@class="open"]//div[@class="open container-left-padding"]//span[@class="open"])[3]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[2]').click();
        await newPage.locator('//div[@class="col-12 nested"]//span[@class="col-8"]//input[1]').type('1');
        await newPage.locator('//button[@class="theme-btn theme-primary-btn"]').click();
        await newPage.waitForTimeout(5000);
        console.log("Candidate is able to see the exam timer is extended")
        await newPage.close();
        await page1.close();

    });
    await test.step('Candidate start the exam', async () => {
        await eluminaProctorCand.againCandidateLogin();
    });

});