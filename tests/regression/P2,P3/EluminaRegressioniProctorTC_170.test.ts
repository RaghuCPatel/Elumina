import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
const devTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/staging/testData.json')));

let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
} 

//Validation of Exam content section >  Chat App

// test(`@Regression Create iProctor exam with password`, async ({ eluminaLoginPage, eluminaProctorExam, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
//         const newtab = await eluminaProctorExam.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createExam();
//         await newtab.createSections();
//         await newtab.addMCQQuestions();
//     });
// });

// test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaProctorReg.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.addUserDetails();
//         await newtab.downloadUserDetails();
//         await newtab.addExistingUsers();
//         await newtab.logoutClick();
//     });
// });       

// test(`@Regression Validation of Exam content section >  Chat App`, async ({ eluminaProctorCand,webActions }) => {
//     await test.step('Candidate logging into application', async () => {
//         await eluminaProctorCand.candidateNavigateToURL();
//         await eluminaProctorCand.candidateLoginToApplications();

//     });

//     await test.step('Invigilator  logging into Application', async () => {
//         await eluminaProctorCand.clickOnAllLink();
//         const browser = await chromium.launch();
//         const context1 = await browser.newContext();
//         const page1 = await context1.newPage();
//         await page1.goto('/');
//         await page1.waitForLoadState();
//         await page1.locator('(//input)[1]').type(testData.invigilatorUsername);
//         await page1.locator('(//input)[2]').type(testData.invigilatorPassword);
//         await page1.locator('//*[@class="submit-butn"]').click();

//         const [newPage] = await Promise.all([
//             context1.waitForEvent('page'),

//             await page1.locator('//div[text()="iAuthor"]').click()

//           ]);
//         await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
//         await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
//         await newPage.locator('//a[@class="dropdown-toggle"]').click();
//         await newPage.locator('//p[text()="Verify Identity"]').click();
//         await newPage.locator('(//button[text()="Yes"])[1]').click();
//         await newPage.waitForTimeout(3000);

//         await newPage.close();
//         await page1.close();
//     });
   
//     await test.step('Verify Validation of Changing Font Size to Decrease on the Dashboard', async () => {
//         await eluminaProctorCand.againCandidateLogin();
//         await eluminaProctorCand.enterInvigilatorPassword();
//         await eluminaProctorCand.chatApp();
//     });
    
// });


test(`@Regression Validation of Candidate Proctoring Exam pheripheral checkup page - Chat App TC-169`, async ({ eluminaProctorCand,webActions }) => {
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
   
    await test.step('Validation of Candidate Proctoring Exam pheripheral checkup page - Chat App', async () => {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.chatAppMessageSent();
    });
    
});