import test from '@lib/BaseTest';

/**Validation of "Flag for Review" option */

test(` . @iExamRegression Verify Validation of Flag for Review`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate marks flag for review to all questions in the exam',async ()=> {
        await eluminaCandPage.candidateFlagForReviewAllQuestions();
    });

});  

/**Validation of Adding & Saving notes */
test(`iEX_TC_ID_59. @iExamRegression Verify candidate adds and saves Notes EluminaRegressioniExamTC_038`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.AddingNotesToQuestionSinglelast();
        console.log("Candidate is able to use Notepad")
    });
    
});

/**Validate Candidate using Calculator in Exam */
test(` . @iExamRegression Verify Validation of using Calculator EluminaRegressioniExamTC_039 `, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.UsingCalculatorForQuestions();
        console.log("Candidate is able to use Calculator")
    });
    
});

/**Validate Candidate using Highlighter in Exam */

test(` . @iExamRegression Verify Validation of using Highlighter EluminaRegressioniExamTC_040 `, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.UsingHighlighterForQuestions();
        console.log("Candidate is able to use Highlighter")
    });
    
});

test(` . @iExamRegression Verify Validation of VSAQ Question type EluminaRegressioniExamTC_043`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartVSAQ();
    });

});

//Validation of Candidate dashboard - Exam scheduled Date / Time is over.  

test(` . @iExamRegression Verify Validation of Candidate dashboard - Exam scheduled Date / Time is over EluminaRegressioniExamTC_024`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.candidateStartMCQandSAQ_RevieweandSubmit();
       // await eluminaCandPage.candidateStartVSAQ();
        await eluminaCandPage.confirmationOkBtn();
        await eluminaCandPage.clickOnLogoutBtn();
    });
    await test.step(`Navigate to Application again`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application again`, async () => {
        await eluminaCandPage.enterCandidateCredetial();
    });
    
});