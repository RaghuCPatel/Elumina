import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed in Pink, when Notes are added while answering */

test(`@Regression Verify Validate the Exam sheet where the Question numbers are displayed in Pink, when Notes are added while answering `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.AddingNotesValidate();
    });

});
