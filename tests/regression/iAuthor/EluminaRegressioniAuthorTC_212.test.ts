import test from '@lib/BaseTest';

/**Validation of Delivery --> Live Monitor*/

test(` iAU_TC_ID_212. @RegressionA Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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

test(` iAU_TC_ID_212. @RegressionA Pre-Request "Validation of Delivery --> Add New Users"`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigation();
        await newtab.addMultipleUserDetails(1);
        await newtab.BulkDownloadUserDetails("bulk_user_details.xlsx");
        await newtab.addInv();
        await newtab.searchUserForAddingInv(2, "bulk_user_details.xlsx");
        await newtab.logoutClick();
    });
});

test(`iAU_TC_ID_212.,iAU_TC_ID_213. @RegressionA Validation of Delivery --> Live Monitor `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.liveMonitor();
    });
});

test(`iAU_TC_ID_215. @RegressionA Validation of Delivery--> Live Monitor all exam status  `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.liveMonitorExamStatus();
    });
});