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


/** Validation of submitting when the Candidate has not answered all Questions*/
test(`@Smoke Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createProctorExam();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();
    });
});

test(`@Smoke Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});

test(`iProc_TC_ID_11. @Smoke Validation of "I Authorise" checkbox - To access Webcam, Microphone & Terms & Condition`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
    });

    await test.step('Candidate start the exam', async () => {
        await eluminaProctorCand.clickOnStartExamLink();
        await eluminaProctorCand.clickOnUnderstandBtn();
        await eluminaProctorCand.verifyPeripherialInCand()


    });

});

test(`iProc_TC_ID_34. @Smoke Validation of Exam section page (Offline Exam validation)`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step(' logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.UserEmail);
        await page1.locator('(//input)[2]').type(testData.UserPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);
        await newPage.locator('//a[text()="Delivery"]').click();
        await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
        await newPage.locator('//a[text()="Live Monitor"]').click();

        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ(100);
        await eluminaCandPage.candidateStartSJT();

    });
});

test(`iProc_TC_ID_39. @Smoke Validation of submitting when the Candidate has not answered all Questions`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testData.UserEmail);
        await page1.locator('(//input)[2]').type(testData.UserPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
        ]);
        await newPage.locator('//a[text()="Delivery"]').click();
        await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
        await newPage.locator('//a[text()="Live Monitor"]').click();

        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);

        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.NotAnsweringQuestion();
    });


});