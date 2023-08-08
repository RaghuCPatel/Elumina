import test from '@lib/BaseTest';


/**Validation of Candidate Dashboard page - Chat App */


test(`@Regression Validation of Candidate Dashboard page - Chat App`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.validsationOfChatApp();
    });
});
