import test from '@lib/BaseTest';

/**Validation of User Id Field */

test(`iAU_TC_ID_04. @RegressionA Validation of User Id Field`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithoutUsername();
    });
});
