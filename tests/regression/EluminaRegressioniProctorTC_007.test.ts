import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard*/

test(` iProc_TC_ID_7. @iProctorRegression Verify Validation of Candidate App Dashboard`, async ({ eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(2, 'User_details.xlsx');
    });

});