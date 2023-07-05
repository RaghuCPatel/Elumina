import test from '@lib/BaseTest';

test(`@Regression Verify Validation of the following in the Exam Section
Exam name, Candidate name, Exam timer, no of questions as per exam created`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAndValidateDashboard();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.refreshPage();
    });
    
});