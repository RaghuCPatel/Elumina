import test from '@lib/BaseTest';

/**Validation of Manage Delivery --> Delete Users*/

test(` iAU_TC_ID_181. @Pre-Request Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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

test(` iAU_TC_ID_181.,iAU_TC_ID_183. @Pre-Request Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage, eluminaRegInvPage, eluminaRegPage, webActions }) => {
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
        await newtab.DeleteUserFromMoreOptionPositive();
        // await newtab.addInv();
        // await newtab.searchUserForAddingInv(3, "bulk_user_details.xlsx")
    });
});

test(`iAU_TC_ID_181. @RegressionA Validation of Manage Delivery --> Delete Users `, async ({ eluminaRegPage, eluminaLoginPage, eluminaCreateQuestionsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.DeleteUser();
    });
});

test(`iAU_TC_ID_182. @RegressionA Validation of Manage Delivery--> Delete Users (Negative Scenario) `, async ({ eluminaRegPage, eluminaLoginPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.clickOnCreatedExam();
        await newtab.DeleteUserFromMoreOption();
    });
});