import test from '@lib/BaseTest';

//The candidate should be able to "Review" at any point of the exam time

/*test(`@Smoke Verify Elumina Login`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
        //await newtab.addQuestionsInExam();
    });
});


test(`@Smoke Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
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
});     */

test(`@Smoke Verify The candidate should be able to Review at any point of the exam time`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        //await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.candidateStartMCQ();
        //await eluminaCandPage.clickonPrevious();
    });
    
    
});