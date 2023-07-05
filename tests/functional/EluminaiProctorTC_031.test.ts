import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';


//Validation of "Time Remaining" pop-up when the just before the exam time runs out(Proctor)



test(`@Smoke Verify Create Exam With Content Section and Content Section Page`, async ({ eluminaLoginPage,eluminaProctorExam,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
      await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
     const newtab = await eluminaProctorExam.iAuthorPageNavigation();
     await newtab.examTabNavigation();
     await newtab.createExam();
     await newtab.createContentSection();
     await newtab.createContentPage();
     await newtab.createSection();
     await newtab.addMCQQuestions();
    });
});

test(`@Smoke Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });

    // await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {

    //     await eluminaLoginPage.verifyProfilePage();

    // });

    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});       

 test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaProctorCand,eluminaCandPage, webActions }) => {
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
            await page1.locator('(//input)[1]').type('divyashree.r@igsindia.net');
            await page1.locator('(//input)[2]').type('Aa6!2M#y');
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
              //await newPage.waitForLoadState();
            
            await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
            await newPage.waitForTimeout(2000);
            //let Examstatus=await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').textContent();
            //console.log(Examstatus);
            //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').isVisible();
            //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            //await newPage.locator('//div[@class="action-item control-item pause-exam"]').click();
            //await newPage.locator('(//button[text()="Yes"])[3]').click();
            //await newPage.locator('//a[@class="dropdown-toggle"]').click();
            //await newPage.locator('//p[text()="Reset Login"]').click();
            //await newPage.locator('(//button[text()="Yes"])[1]').click();
            //await newPage.waitForLoadState();
            await newPage.close();
            await page1.close();
        });
        await test.step('Validation of Time Remaining pop-up when the just before the exam time runs out', async () => {
            await eluminaProctorCand.againCandidateLogin();
            await eluminaProctorCand.enterInvigilatorPassword();
            await eluminaCandPage.candidateContentSection();
            await eluminaCandPage.candidateStartMCQ();
            await eluminaCandPage.clickonPrevious();
        });

});


 