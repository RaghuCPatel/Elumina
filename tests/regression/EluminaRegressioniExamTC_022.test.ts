import test from '@lib/BaseTest';

//Validation of Changing Font Size to Decrease on the Dashboard

test(` . @iExamRegression Verify Validation of Changing Font Size to Decrease on the Dashboard`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard(13, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.clickOnStartExam();
        await eluminaCandPage.decreaseFontSize();
        await eluminaCandPage.validationOfDashboardTitleInCandPage()

    });

});