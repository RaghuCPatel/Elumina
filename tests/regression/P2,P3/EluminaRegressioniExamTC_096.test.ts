import test from '@lib/BaseTest';


/**Validation of Candidate Attending Exam in Online (Abort and Resume Exam) */


test(`@RegressionP Validation of Candidate Attending Exam in Online (Abort and Resume Exam)`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam and abort',async ()=> {
        await eluminaCandPage.candidateStartMCQandAbort();
    });
});

test(`@RegressionP Validation Candidate Login again`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Click on Login without Username and Password`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
});
