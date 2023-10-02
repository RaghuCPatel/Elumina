import test from '@lib/BaseTest';

/**Validation of Candidate App Dashboard Details*/

test(` . @iExamRegression Validation of Candidate App Dashboard Details`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToApplication(6, "bulk_user_details.xlsx");
        await eluminaCandPage.candidateContentSectionValidation();
    });

});