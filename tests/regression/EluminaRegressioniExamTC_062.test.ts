import test from '@lib/BaseTest';

//Validation of the following in the Exam Section Exam name, Candidate name, Exam timer, no of questions as per exam created

//content section exam

test(`@Regression Create a Exam and add MCQ Questions`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createExam();
        await newtab.createContentSection();
        await newtab.createContentPage();
        await newtab.createSection();
        await newtab.addMCQQuestions();
        //await newtab.addQuestionsInExam();
    });
});


test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    // await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
    //     await eluminaLoginPage.verifyProfilePage();
    // });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});    

test(`@Regression Verify Validation of the following in the Exam Section
Exam name, Candidate name, Exam timer, no of questions as per exam created`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
       await eluminaCandPage.candidateContentSectionValidation();
       
    });
    
    
});