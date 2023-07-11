import test from '@lib/BaseTest';

//Validation of Candidate able to answer the Question and the answer being saved



test(`@Smoke Verify Validation of Candidate able to answer the Question and the answer being saved`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.clickonPrevious();
    });
    
});