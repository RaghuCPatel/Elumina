import test from '@lib/BaseTest';

//Validation of password entered after clicking on "Start Exam"

test(`@Smoke Verify Create Exam with password`, async ({eluminaLoginPage,eluminExamianvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminExamianvPage.iAuthorPageNavigationss();
        await newtab.examTabNavigations();
        await newtab.createInvExam();
        await newtab.createSections();
        await newtab.addQuestionsInInvExam();
        
    });
});

test(`@Smoke Verify Elumina RegistrationInv and add user and Invigilator`, async ({ eluminaLoginPage,eluminaRegInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegInvPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});

test(`@Smoke Verify Validation of password entered after clicking on "Start Exam"`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCadInvPage.candidateStartExams();
    });
    
});