import test from '@lib/BaseTest';

/**Validation of Create Question (MCQ/Type A)-Negative Scenario. */
test(`iAU_TC_ID_33. @RegressionA Validation of Create Question (MCQ/Type A)-Negative Scenario. `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.validationOfMCQ();
        await newtab.selectBank()
        await newtab.enterRemainingMCQField();
        await newtab.validateWorkFlow()
        await newtab.logoutClick()

    });
});