import test from '@lib/BaseTest';

/**Validation of Exam section page.*/

test(`@Regression  Verify Elumina Login and create exam `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection();
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();
    });
});


test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});

test(`iEX_TC_ID_54. @Regression Validation of Exam section page.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.examSectionValidation();
        await eluminaCandPage.verifyExamDashboardTimer()
        await eluminaCandPage.verifyColours()
        await eluminaCandPage.verifyNoOfQutn()
        await eluminaCandPage.verifyFlagForReview()
        await eluminaCandPage.validationOfAllTools();
        await eluminaCandPage.validationOfNextBtn()
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.validatePreviousBtn()
        await eluminaCandPage.candidateAttendsAllQVSAQ();
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ();
        await eluminaCandPage.candidateStartSJT();
    });

});

test(`iEX_TC_ID_61. @Regression Validation of Exam Section > Font Size `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.increaseFontSize();
        await eluminaCandPage.decreaseFontSize()
        await eluminaCandPage.verifyNoOfQutn()
    });

});

test(`iEX_TC_ID_64. @Regression Validation of Exam Section > Highlighter tool highlights save scenario 1`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ();
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ();
        await eluminaCandPage.UsingHighlighterForQuestions();
        await eluminaCandPage.candidateStartSJT()
        await eluminaCandPage.clickonPrevious()
    });

});

test(`iEX_TC_ID_76. @Regression Validation of Exam section > Candidate attend the exam in normal flow `, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ();
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ();
        await eluminaCandPage.candidateStartSJTReviewandSubmit()
        //await eluminaCandPage.confirmationOkBtn()
        await eluminaCandPage.clickOnLogoutBtn()
        await eluminaCandPage.validationOfLogo();

    });

});
