import test from '@lib/BaseTest';

/**Survey section > validate exam name, candidate name, exam timer, no of questions is as per exam settings.*/

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
        await newtab.clickonNextBtnInExam();
        await newtab.createSection();
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestions();
        await newtab.createSurveySection();
        await newtab.createSurveyPage();
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

test(`iEX_TC_ID_91. @Regression Survey section > validate exam name, candidate name, exam timer, no of questions is as per exam settings.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.waitforTime4();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ();
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.waitforTime()
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.candidateStartTypeB();
        await eluminaCandPage.candidateStartSAQ();
        await eluminaCandPage.waitforTime()
        await eluminaCandPage.candidateStartSJTReviewandSubmit();
        await eluminaCandPage.examSectionValidation();
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.verifyNoOfQutn()
        // await eluminaCandPage.candidateAnsSurveyQuestion();


    });

});