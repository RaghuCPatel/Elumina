import test from '@lib/BaseTest';
import { EluminaExamPage } from '@pages/EluminaExamPage';

/**Validation of Candidate dashboard > With No Actions in AM and PM Exams*/

/**AM */

test(`Exam_Prerequisit_for_iEX_TC_ID_25. @Regression Validation of Candidate dashboard > With No Actions in AM and PM Exams`, async ({ eluminaLoginPage, eluminaMultipleExamsForAMPage, eluminaCandPage, webActions }) => {
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

test(`Exam_Prerequisit_for_iEX_TC_ID_25. @Regression Verify Elumina Registration for AM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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


// Below 3 test are added to check "Not Booked" Exam not displayed for candidate 

test(`Exam_Prerequisit_for_iEX_TC_ID_235A. @Regression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage,eluminExamianvPage, webActions }) => {
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

test(`Exam_Prerequisit_for_iEX_TC_ID_235b. @Regression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addExistingUserswithNotBooked('Not Booked');
        await newtab.downloadUserDetails();
    });
});

test(`iEX_TC_ID_235. @Regression Validation of Candidate dashboard > with Unassigned / Cancelled Exam `, async ({ eluminaCandPage,eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application and check Not Booked exam not displayed`, async () => {
        await eluminaCandPage.enterCandidateCredetial();
        await eluminaExamPage.TimeFetch();
    });
});

/**PM */

test(`Exam_Prerequisit_for_iEX_TC_ID_25. @Regression Validation of Candidate dashboard > With No Actions in PM`, async ({ eluminaLoginPage, eluminaMultipleExamsForPMPage, eluminaCandPage, webActions }) => {
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

test(`Exam_Prerequisit_for_iEX_TC_ID_25. @Regression Verify Elumina Registration for PM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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

test(`iEX_TC_ID_25. @Regression Verify Login Application for PM`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetial();
    });

});    


