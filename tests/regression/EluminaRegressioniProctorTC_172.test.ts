import test from '@lib/BaseTest';
import test1 from '@lib/Fixtures';
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

/**Validation of Exam Section> Image Inline viewer   */

test(`Exam_Prerequisit_for_iProc_TC_ID_30. @iProctorRegression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaProctorExam, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaProctorExam.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExamwithoutFullscreen();
        await newtab.createSections("1", "30");
        await newtab.addVSAQQuestions();
    });
});

test(`Exam_Prerequisit_for_iProc_TC_ID_30. @iProctorRegression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaProctorReg, eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });

    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
        await newtab.logoutClick();
    });
});


test(`iProc_TC_ID_30. @iProctorRegression Validation of Exam Section> Image Inline viewer `, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
        await eluminaProctorCand.clickOnAllLink();

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
        await newPage.waitForTimeout(3000);
        await newPage.close();
        await page1.close();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartOneVSAQwithViewer();
    });

});


test(`iProc_TC_ID_142A. @iProctorRegression Validation of iProctor Extension Troubleshoot link validation.TC-73`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
        await eluminaProctorCand.clickOnStartExamLink1();
        await eluminaProctorCand.clickOniProctorExtensionTroubleshoot()
        await eluminaCandPage.waitforTime3();
    });
});

test1(`iProc_TC_ID_142B. @iProctorRegression Validation of iProctor Extension Troubleshoot link validation`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaProctorCand.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
        await eluminaProctorCand.clickOnAllLink();
        await eluminaCandPage.waitforTime3();
    });

});     
