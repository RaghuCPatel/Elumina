import test from '@lib/BaseTest';

/**Validation of password Field*/

test(`@RegressionA Validation of password Field`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithoutPassword();
    });
});
