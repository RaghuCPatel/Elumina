import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

/**Validate When exam terminated  for candidate*/

test(`@Regression Verify Elumina Login`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});    

test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
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
    });
});    

test(`@Regression Verify Elumina Invigilator terminating exam for candidate`, async ({ eluminaProctorCand,eluminaCandPage, webActions }) => {

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
        // await newPage.waitForTimeout(3000);
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await newPage.locator('//div[@class="main-fx--container fx-left action-list"]//div[7]//div').click()
        await newPage.waitForTimeout(3000);
        await newPage.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input').click();;
        await newPage.locator('//div[@class="action-item control-item terminate-exam"]').click();;
        await newPage.locator('(//button[text()="Yes"])[2]').click();


        await newPage.close();
        await page1.close();
    });   
   
    await test.step('Verify Validation of exam terminated for candidate ', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();
        await eluminaProctorCand.candidateSignOut();
       
    });

});