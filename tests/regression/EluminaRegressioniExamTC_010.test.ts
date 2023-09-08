import test from '@lib/BaseTest';

/**Validation of Login using valid credentials with Client Id and  Password*/

test(`@iEX_TC_ID_010  Regression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
    await newtab.clickonNextBtnInExam();
    // await newtab.createContentSection();
    // await newtab.createContentPage();
    await newtab.createSection();
    await newtab.addMCQQuestions();

});
});


test(`@Regression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegInvPage,eluminaRegPage,webActions }) => {
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

test(`@Regression Validation of Sign out at Exam Start Page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        // await eluminaCandPage.waitforTime();
        // await eluminaCandPage.waitforTime2();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginWithValidCredentials();
    });

});