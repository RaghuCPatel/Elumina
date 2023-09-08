import test from '@lib/BaseTest';

/**Validation of Candidate dashboard > With No Actions in AM and PM Exams*/
//EluminaRegressioniExamTC_087(iEX_TC_ID_25,iEX_TC_ID_199).test.ts

/**AM */
test(`iEX_TC_ID_25. @Regression Validation of Candidate dashboard > With No Actions in AM and PM Exams`, async ({ eluminaLoginPage, eluminaMultipleExamsForAMPage, eluminaCandPage, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForAMPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createAMExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});


test(`iEX_TC_ID_25A. @Regression Verify Elumina Registration for AM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigationAMExamPage();
        await newtab.addUserDetailsdiffTime();
    });
});


/**PM */
test(`iEX_TC_ID_25B. @Regression Validation of Candidate dashboard > With No Actions in PM`, async ({ eluminaLoginPage, eluminaMultipleExamsForPMPage, eluminaCandPage, webActions }) => {
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
        const newtab = await eluminaMultipleExamsForPMPage.iAuthorPageNavigation();
        await newtab.createPMExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`iEX_TC_ID_25C. @Regression Verify Elumina Registration for PM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigationPMExamPage();
        await newtab.addExistingUsersdifftime();
        await newtab.downloadUserDetails();
    });
});

test(`iEX_TC_ID_25D. @Regression Verify Login Application for PM`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetial();
    });
});


test(`iEX_TC_ID_199. @Regression Validate auto response when chat is initiated out of working hours.`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetial();
    });
    await test.step('Candidate uses chat app in Review exam page', async () => {
        await eluminaCandPage.enterFieldsInChatAppForOutOfOfficeHours(false);
    });
});