import test from '@lib/BaseTest';

/**Validation of Assess App URL */

test(`iAU_TC_ID_01. @RegressionA Validation of Assess App URL`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
});
