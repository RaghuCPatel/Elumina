import test from '@lib/BaseTest';

/**Validation of Candidate Start Exam*/

test(`@Regression Validation of Candidate Start Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime()
    });
    await test.step(`Candidate Login to application with and start exam`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.examSectionValidation();
    });

});