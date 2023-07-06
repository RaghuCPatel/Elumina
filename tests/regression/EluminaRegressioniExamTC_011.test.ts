import test from '@lib/BaseTest';

/**Validation of Candidate Start Practice Exam*/

test(`@Regression Validation of Candidate Start Practice Exam`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToAppStartExamandSignout();
    });
    
});