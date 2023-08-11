import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';

//Validation of Admin > Proctoring > Audio Recording  (Toggle Button)

test(`@Regression Create iProctor exam with password`, async ({ eluminaLoginPage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam();
        await newtab.createSections();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaProctorReg,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaProctorReg.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});             

test(`@Regression Validation of Admin > Proctoring > Audio Recording  (Toggle Button)`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.clickOnAudioToggleButton();
          await newtab.logoutClick();
    });
});  

//Validation of Admin > Proctoring > Enable Screenshot
test(`@Regression Validation of Admin > Proctoring > Enable Screenshot TC-003`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.clickOnScreenshotToggleButton();
          await newtab.logoutClick();
    });
});  

//Validation of Admin > Proctoring > Camera Link
test(`@Regression Validation of Admin > Proctoring > Camera Link TC-005`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.enterCameraLink();
          await newtab.logoutClick();
    });
});  

//Validation of Admin > Proctoring > Microphone Link
test(`@Regression Validation of Admin > Proctoring > Microphone Link TC-006`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.enterMicrophoneLink();
          await newtab.logoutClick();
    });
});  


//Validation of Admin > Proctoring > Browser Check Link
test(`@Regression Validation of Admin > Proctoring > Browser Check Link TC-007`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.enterBrowserLink();
          await newtab.logoutClick();
    });
}); 

// //Validation of Admin > Proctoring > Internet Connection Check Link
// test(`@Regression Validation of Admin > Proctoring > Internet Connection Check Link TC-008`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
//         const newtab = await eluminaProctorExam.AdminPageNavigation();
//         await newtab.clickOnProctoringInAdmin();
//         await newtab.enterInternetConnectionLink();
//         await newtab.logoutClick();
//     });
// }); 

//Validation of Enable iProctor Extension

test(`@Regression Validation of Enable iProctor Extension TC-010`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.validationOfProctorExtension();
        await newtab.logoutClick();
    });
});  

//Validation of Admin > Proctoring > Video Fragment Size

test(`@Regression Validation of Admin > Proctoring > Video Fragment Size TC-066`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.setVideoFragmentSize();
        await newtab.logoutClick();
    });
});  

//Validation  of Prompt Candidate

test(`@Regression Validation of Prompt Candidate TC-71`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to proctoring and setting up Prompt Candidate Message`, async () => {
        const newtab = await eluminaProctorExam.AdminPageNavigation();
        await newtab.clickOnProctoringInAdmin();
        await newtab.validationOfPromptCandidateMessage();
        await newtab.logoutClick();
    });
});  

//Validation of iProctor Extension Troubleshoot link validation.
// test(`@Regression Validation of iProctor Extension Troubleshoot link validation.TC-73`, async ({ eluminaProctorCand,eluminaCandPage,webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//     await eluminaProctorCand.candidateNavigateToURL();
// });
// await test.step(`Candidate Login to application`, async () => {
//     await eluminaProctorCand.candidateLoginToApplications();
//     await eluminaProctorCand.clickOnStartExamLink1();
//     await eluminaProctorCand.clickOniProctorExtensionTroubleshoot()
//     await eluminaCandPage.waitforTime3();

// });

// });
