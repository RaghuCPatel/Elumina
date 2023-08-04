import test from '@lib/BaseTest';


/**Validation of Candidate Attending Exam in Online (Abort and Resume Exam) */

test(`@Regression Verify candidate adds and saves Notes EluminaRegressioniExamTC_038`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.AddingNotesToQuestionSinglelastandclickPrevious();
    });
    
});

/**Candidate while attending exam - Online - try to press any F1 to F12 keys */

test(`@Regression Candidate while attending exam - Online - try to press any F1 to F12 keys TC-201`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKey();
    });
    
    
});
