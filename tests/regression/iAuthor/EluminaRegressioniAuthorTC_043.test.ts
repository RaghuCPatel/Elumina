import test from '@lib/BaseTest';

/**Validation of Create Question (Type-X) */

test(`@RegressionA Validation of Create Question (Type-X)`, async ({ eluminaLoginPage, eluminaCreateQuestionsPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaCreateQuestionsPage.iAuthorPageNavigation();
        await newtab.QuestionsMenuClick();
        await newtab.createTypeXQuestion();
        await newtab.logoutClick()

    });

});
