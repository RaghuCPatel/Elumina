import test from '@lib/BaseTest';

/**Validation of Submit Exam page  > Chat App*/          

test(`@RegressionP Verify Validation of Submit Exam page  > Chat App`, async ({ eluminaCandPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQAndSubmit();
    });
    await test.step('Candidate uses chat app in Submit exam page',async ()=> {
        await eluminaCandPage.enterFieldsInChatApp();        
    });
});  