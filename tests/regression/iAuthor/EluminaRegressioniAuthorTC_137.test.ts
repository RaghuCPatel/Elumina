import test from '@lib/BaseTest';

/**Validation of Create Exam – Copy an existing exam  */

test(`@RegressionA Validation of Create Exam – Copy an existing exam `, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.CopyExistingExams();
    });
});