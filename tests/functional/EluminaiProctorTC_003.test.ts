import test from '@lib/BaseTest';

/*Validation of user authentication by valid Candidate Creadentials*/

test(`@SmokeValidation of user authentication by valid Candidate Creadentials
`, async ({ eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with valid password`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
        await eluminaCadInvPage.logoutClick();
    });
});