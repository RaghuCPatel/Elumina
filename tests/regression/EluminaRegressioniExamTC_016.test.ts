import test from '@lib/BaseTest';

/**Validation of multiple candidate trying to login to same Exam*/

test(` . @iExamRegression Validation of multiple candidate trying to login to same Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(8, "bulk_user_details.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.examSectionValidation();
    });

});
