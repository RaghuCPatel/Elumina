import test from '@lib/BaseTest';


/**Validation of Exam content page -> Questions download at content section-> Browser shut down */


test(`@Regression Validation of Exam content page -> Questions download at content section-> Browser shut down`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.candidateContentSectionVerification();
    });
});
