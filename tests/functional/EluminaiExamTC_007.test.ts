import test from '@lib/BaseTest';

//Validation of Candidate able to answer the Question and the answer being saved

/*test(`@Smoke Verify Create Exam With Content Section ans Content Section Page`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createContentSection();
        await newtab.createContentPage();
        await newtab.createSection();
        await newtab.addMCQQuestions();
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
}); */

test(`@Smoke Verify Validation of Candidate able to answer the Question and the answer being saved`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        //await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.clickonPrevious();
    });
    
});