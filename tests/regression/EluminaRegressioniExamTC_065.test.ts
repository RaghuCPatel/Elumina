import test from '@lib/BaseTest';

//Validation of the following in the Exam Section Exam name, Candidate name, Exam timer, no of questions as per exam created.

test(`@Regression Verify Validation of the following in the Exam Section
Exam name, Candidate name, Exam timer, no of questions as per exam created`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
       await eluminaCandPage.clickOnContentSectionCheckBox();
    });
    
    
});