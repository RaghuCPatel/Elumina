import test from '@lib/BaseTest';

/**Validation of Question > Choose question */
test(`@RegressionA Validation of Question > Choose question`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage,eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.questionTabNavigation();
        await newtab.createQuestionAndSearch();
        await newtab.adminLogout()
       
    });
});