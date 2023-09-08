import test from '@lib/BaseTest';

/** Validate candidate attending All Question type */

test(`Exam_Prerequisit_for_iEX_TC_ID_109. , iEX_TC_ID_115. @RegressionP Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createContentSection();
        await newtab.createContentPage();
        await newtab.createSection();
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();

    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_109. , iEX_TC_ID_115. @RegressionP Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
        await newtab.addExistingUsers();
        await newtab.logoutClick();
    });
});

test(`iEX_TC_ID_109. , iEX_TC_ID_115. @RegressionP Validation of Candidate attending Exam in Online - Offline and submit in Offline Mode`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime3();
        await eluminaCandPage.waitforTime3();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateContentSectionVerifications();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.setOffline(true);
        await eluminaCandPage.candidateAttendsAllQVSAQ();
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ();
        await eluminaCandPage.candidateStartSJTReviewandSubmit();
        await eluminaCandPage.setOffline(false);
        await eluminaCandPage.refreshPage();
        await eluminaCandPage.waitforTime2();
        await eluminaCandPage.waitforTime4();

    });
});



