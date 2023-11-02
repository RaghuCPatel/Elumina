import test from '@lib/BaseTest';

/**Validation of password Field*/

test(`iAU_TC_ID_05. @RegressionA Validation of password Field`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithoutPassword();
    });
});
