import test from '@lib/BaseTest';

/**Validation of Password Masking*/

test(`iAU_TC_ID_06. @RegressionA Validation of Password Masking`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.loginToApplicationwithpasswordMasked();
    });
});
