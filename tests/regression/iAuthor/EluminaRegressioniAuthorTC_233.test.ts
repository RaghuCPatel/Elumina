import test from '@lib/BaseTest';
import { EluminaApproverPage } from '@pages/EluminaApproverPage';

/**Images-Upload image/file*/

test(`iAU_TC_ID_252. @RegressionA (iAU_TC_ID_152)Prerequisite Validation of Exam Workflow"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.imageUpload();
    });

});
