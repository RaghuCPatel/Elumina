import test from '@lib/BaseTest';

/**"Validation of Choose Question

Scenario- 3 -  Add 1x Session (i.e AM Session) and
Add 3 sections (i.e. Content + Exam Section + Survey Section)"*/

test(`iAU_TC_ID_134 @RegressionA "Validation of Choose Question Scenario- 3 -  Add 1x Session (i.e AM Session) and
Add 3 sections (i.e. Content + Exam Section + Survey Section)"`, async ({ eluminaLoginPage, eluminaBlueprintsPage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to iAuthor blueprint`, async () => {
        const newtab = await eluminaBlueprintsPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.clickOnCreateExam();
        await newtab.verifyExamPage()
        await newtab.clickOnScratchFromExam()
        await newtab.createExam()
        await newtab.selectAllTools()
        await newtab.createContentSection("1");
        await newtab.createContentPage();
        await newtab.createSection("1", "30")
        await newtab.settingPassPercentage()
        await newtab.clickOnSave()
        await newtab.addVSAQQuestionswithoutNext()
        await newtab.createSurveySection("6");
        await newtab.createSurveyPage();
        await newtab.logoutClick()
    });
});