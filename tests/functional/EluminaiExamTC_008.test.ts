import test from '@lib/BaseTest';

//The candidate should be able to "Review" at any point of the exam time



test(`@Smoke Verify The candidate should be able to Review at any point of the exam time`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.candidateStartMCQ();
    });
    
    
});