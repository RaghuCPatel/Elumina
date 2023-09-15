import test from '@lib/BaseTest';

//Validation of Browser back button after Exam Starts

test(`@iExamRegression Verify Validation of Browser back button after Exam Starts`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.navigateBack();
        await eluminaCandPage.examSectionValidation()
    });


});