import test from '@lib/BaseTest';
import { commonPages } from '@pages/commonPages';

//Validation of Candidate dashboard > with Unassigned / Cancelled Exam 

test(`Exam_Prerequisit_for_iEX_TC_ID_235A. @Smoke Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage,eluminExamianvPage, webActions }) => {
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
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
        
    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_235b. @Smoke Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetailsNotBooked('Not Booked');
        await newtab.downloadUserDetails();
        await newtab.logoutClick();
    });
});

test(`iEX_TC_ID_235. @Regression Verify Validation of  function keys after Exam Starts`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Check the availablity of exam',async ()=> {
        await eluminaCandPage.verifyExamDashboard();
    });
    
});