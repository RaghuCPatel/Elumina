import test from '@lib/BaseTest';

//Validation of Exam content page - Timer Validation (Before Timer Expires)

test(`@Regression1 Verify Validation of Exam content page - Timer Validation (Before Timer Expires)`, async ({ eluminaCandPage, eluminaProctorCand, webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyContentSectionTimer();
    });

});