import test from '@lib/BaseTest';

/**Validation of Review Exam page  > Chat App*/

test(`@RegressionP Verify Validation of Review Exam page  > Chat App`, async ({ eluminaCandPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQ();
    });
    await test.step('Candidate uses chat app in Review exam page',async ()=> {
        await eluminaCandPage.enterFieldsInChatApp();        
    });
});  