import test from '@lib/BaseTest';

/**"Validation of Blueprint  Archive(only for Approved Blueprints)"*/

test(`iAU_TC_ID_118. @RegressionA ""Validation of Blueprint  Archive(only for Approved Blueprints)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.BlueprintMenuClick();
        await newtab.blueprintArchive();
    });
});
