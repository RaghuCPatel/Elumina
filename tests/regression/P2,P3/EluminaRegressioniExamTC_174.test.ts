import test from '@lib/BaseTest';

//Validation of textbox capabilities of chat app.
test(`@Regression Validation of textbox capabilities of chat app.`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime3();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        //await eluminaCandPage.waitforTime3();
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.chatApp();
    });
    
});