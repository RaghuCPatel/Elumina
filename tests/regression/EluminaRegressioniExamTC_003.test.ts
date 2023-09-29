import test from '@lib/BaseTest';

/**Validation of Empty Field validation */
test(` . @iExamRegressionPre-Request Verify Elumina Login and Create Exam1`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExam();
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestionswithoutSave();
        await newtab.addVSAQQuestions();
    });
});

test(` . @iExamRegressionPre-Request Verify Elumina RegistrationInv and add User and Invigilator1`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(10)
        await newtab.addMultipleUserDetails(19);
        await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(21, "bulk_user_details.xlsx")
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////

test(` . @iExamRegressionPre-Request Verify Elumina Login and Create Exam2`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExam();
        await newtab.clickonNextBtnInExam();
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestions();
        await newtab.createSurveySection("10");
        await newtab.createSurveyPage();

    });
});

test(` . @iExamRegressionPre-Request Verify Elumina RegistrationInv and add User and Invigilator2`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(8);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForSurveyExam.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(10, "bulkUserCredentialForSurveyExam.xlsx")
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////

test(` . @iExamRegressionPre-Request Verify Elumina Login and create exam3 `, async ({ eluminaLoginPage, eluminaMinimalTimeExamPage, webActions }) => {
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
        const newtab = await eluminaMinimalTimeExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam(1);
        await newtab.createSection("0", "1");
        await newtab.addMCQQuestions();
    });
});

test(` . @iExamRegressionPre-Request Verify Elumina RegistrationInv and add User and Invigilator3`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigationforMinimaltime();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(4);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForMinimalTimeExam.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(6, "bulkUserCredentialForMinimalTimeExam.xlsxx")
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////

test(` . @iExamRegressionPre-Request Verify Elumina Login and create exam4 `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
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
        await newtab.selectAllTools();
        await newtab.createContentSection("1");
        await newtab.createContentPageWithMoreDescription();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();
    });
});


test(` . @iExamRegressionPre-Request Verify Elumina Registration4`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(11);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForMcqExamwithContentSection.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(13, "bulkUserCredentialForMcqExamwithContentSection.xlsx")
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////

test(` . @iExamRegressionPre-Request  Verify Elumina Login and create exam5 `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
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
        await newtab.selectAllTools();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();
    });
});


test(` . @iExamRegressionPre-Request Verify Elumina Registration5`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(6);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExam.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(8, "bulkUserCredentialForAllTypeQutnExam.xlsx")
    });
});
////////////////////////////////////////////////////////////////////////////////////////////

test(`Exam_Prerequisit_for_iEX_TC_ID_57. @iExamRegressionPre-Request Verify Elumina Login and Create Exam6`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExamWithViewer();
        await newtab.clickonNextBtnInExam();
        await newtab.createSection("1", "30");
        await newtab.addImageQuestion();
    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_57. @iExamRegressionPre-Request Verify Elumina RegistrationInv and add User and Invigilator6`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(1);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForImageViewerExam.xlsx");
        //await newtab.addInv();
        //await newtab.searchUserForAddingInv(2, "bulkUserCredentialForImageViewerExam.xlsx")

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////

test(` . @LowPriorityiExamCases Verify Elumina Login and create exam1P `, async ({ eluminaLoginPage, eluminaCandPage, eluminaExamPage, webActions }) => {
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
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestion();
        await newtab.addVSAQQuestion();
        await newtab.addISAWEQuestion();
        await newtab.addTypeXQuestion();
        await newtab.addTypeBQuestion();
        await newtab.addSAQQuestion();
        await newtab.addSJTQuestion();

    });
});


test(` . @LowPriorityiExamCases Verify Elumina Registration1P`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(3);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(5, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx")
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////


test(` . @LowPriorityiExamCases Verify Elumina Login and Create Exam2P`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExamWithViewer();
        await newtab.clickonNextBtnInExam();
        await newtab.createSection("1", "30");
        await newtab.addVSAQQuestions();
    });
});

test(` . @LowPriorityiExamCases Verify Elumina RegistrationInv and add User and Invigilator2P`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(1);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForImageViewerLowPriExam.xlsx");
        //await newtab.addInv();
        //await newtab.searchUserForAddingInv(2, "bulkUserCredentialForImageViewerLowPriExam.xlsx")
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////

test(` . @LowPriorityiExamCases Verify Elumina Login and Create Exam3P`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        await newtab.createCommonExam();
        await newtab.clickonNextBtnInExam();
        await newtab.createSection("1", "30");
        await newtab.addVSAQQuestions();
    });
});

test(` . @LowPriorityiExamCases Verify Elumina RegistrationInv and add User and Invigilator3P`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.clickaddMoreUsersIcon(1)
        await newtab.addMultipleUserDetails(1);
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForInlineViewerLowPriExam.xlsx");
        // await newtab.addInv();
        //await newtab.searchUserForAddingInv(2, "bulkUserCredentialForInlineViewerLowPriExam.xlsx")
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
/**AM */
test(`iEX_TC_ID_25. @iExamRegressionPre-Request Validation of Candidate dashboard > With No Actions in AM and PM Exams`, async ({ eluminaLoginPage, eluminaMultipleExamsForAMPage, eluminaCandPage, webActions }) => {
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
        await newtab.createSection("1", "30");
        await newtab.addMCQQuestions();
    });
});


test(`iEX_TC_ID_25A. @iExamRegressionPre-Request Verify Elumina Registration for AM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
test(`iEX_TC_ID_25B. @iExamRegressionPre-Request Validation of Candidate dashboard > With No Actions in PM`, async ({ eluminaLoginPage, eluminaMultipleExamsForPMPage, eluminaCandPage, webActions }) => {
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
        await newtab.createSection("0", "58");
        await newtab.addMCQQuestions();
    });
});

test(`iEX_TC_ID_25C. @iExamRegressionPre-Request Verify Elumina Registration for PM`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForAMandPMExam.xlsx");
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////


test(`Exam_Prerequisit_for_iEX_TC_ID_235A. @iExamRegressionPre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, eluminExamianvPage, webActions }) => {
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
        await newtab.createSection("2", "58");
        await newtab.addMCQQuestions();
    });
});

test(`Exam_Prerequisit_for_iEX_TC_ID_235b. @iExamRegressionPre-Request Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegPage, webActions }) => {
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
        await newtab.BulkDownloadUserDetails("bulkUserCredentialForNotBookedExam.xlsx");
    });
});