import test from '@lib/BaseTest';

//Validation of Browser back button on Candidate Dashboard

test(`@iExamRegression Verify Validation of Browser back button on Candidate Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.navigateBack();
        await eluminaCandPage.validationOfDashboardTitleInCandPage()
    });

});
