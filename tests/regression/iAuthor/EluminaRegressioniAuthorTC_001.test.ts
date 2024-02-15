import test from '@lib/BaseTest';
import { zephyrTc } from '@pages/api_zephyrPage'


/**Validation of Assess App URL*/

test(`QA-T2783. @RegressionA Validation of Assess App URL iAU_TC_ID_01`, async ({ eluminaLoginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
});

test.afterEach("@API zephyr testcase updation", async ({ request }, testInfo) => {
    zephyrTc;
});