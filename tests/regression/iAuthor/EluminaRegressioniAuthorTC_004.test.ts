import test from '@lib/BaseTest';

/**Validation of User Id Field */

test(`[T2786] @RegressionA1 Validation of User Id Field`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithoutUsername();
    });
});
