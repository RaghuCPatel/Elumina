import test from '@lib/BaseTest';

//Validation of  function keys after Exam Starts

test(`iEX_TC_ID_224. @Regression Verify Validation of  function keys after Exam Starts`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKey(false,'F7');
    });
    
    
});