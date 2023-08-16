import test from '@lib/BaseTest';


/**Validation of Exam content page -> (Terms & Conditions) Font size validation */

test(`@RegressionP Verify Elumina Login and create exam `, async ({ eluminaLoginPage,eluminaCandPage,eluminaExamPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application with Inactive Userid and password TC-12`, async () => {
        await eluminaLoginPage.loginToApplicationwithInactiveId();
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
        await newtab.selectAllToolswithInvPwd();
        await newtab.createContentSection();
        await newtab.createContentPage();
        await newtab.createSection();
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestions();

    });
});


test(`@RegressionP Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
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
        await newtab.addExistingUsers();
        await newtab.logoutClick();
    });
});

test(`@RegressionP Validation of Login using Invalid credentials Scenario 1 TC-09`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateInvalidLoginUsername();
    });
});

test(`@RegressionP Validation of Login using Invalid credentials Scenario 2 TC-10`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateInvalidLoginPassword();
    });
});

test(`@RegressionP Validation of Sign out at Candidate Dashboard Page TC-14`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAppandSignout();
    });
});

test(`@RegressionP Validation of Sign out at Exam Start Page TC-15`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAppStartExamandSignout();
    });
});

test(`@RegressionP Validation of Sign out at Exam Start Page TC-210`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAppStartExam();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToAppStartExam();
        await eluminaCandPage.enterInvigilatorPassword();
        await eluminaCandPage.logoutClick();
    });

});


test(`@RegressionP Validation of Candidate dashboard > Exam Start page Font size validation. TC-27`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.enterInvigilatorPassword();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.increaseFontSize();
        await eluminaCandPage.decreaseFontSize();
    });
});

test(`@RegressionP Validation of Exam content page -> (Terms & Conditions) Font size validation TC-33`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.termsandconditionsclick();
    });
});

