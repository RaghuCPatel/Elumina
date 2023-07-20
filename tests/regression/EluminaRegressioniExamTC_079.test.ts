import test from '@lib/BaseTest';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';
import { testConfig } from '../../testConfig';

/** Validation of Invigilator marks attendance for All candidates */

test(`@Regression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegInvPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});

test(`@Regression Verify Invigilator marks attendance for All candidates`, async ({ eluminaLiveMonitorPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaLiveMonitorPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for all candidate', async () => {
        const newtab = await eluminaLiveMonitorPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.markAllAttendance();
        //await newtab.isPresentYes();

    });
});