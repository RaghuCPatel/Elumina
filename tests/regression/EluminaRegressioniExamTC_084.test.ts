import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

/** Validation of Creating survey section in Exam */
test(`@Regression Verify Elumina Create Exam with survey section - TC_084`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam with survey section`, async () => {
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestion();
        await newtab.createSurveySection();
        await newtab.createSurveyPage();
        
    });
});

test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaLoginPage.navigateToURL();
        });
        await test.step(`Login to Elumina application`, async () => {
            await eluminaLoginPage.loginToApplication();
        });
        await test.step(`Navigate to exam Tab and Create New user`, async () => {
            const newtab = await eluminaRegPage.iAuthorPageNavigations();
            await newtab.registrationTabNavigation();
            await newtab.addUserDetails();
            await newtab.downloadUserDetails();
        });
    });
    
    /**Validate Survey screen where candidate can provide feedback in comment section */
    test(`@Regression Verify Validation of Candidate answering survey questions - TC_085 `, async ({ eluminaCandPage,webActions }) => {
        await test.step(`Navigate to Application`, async () => {
            await eluminaCandPage.candidateNavigateToURL();
        });
        await test.step(`Candidate Login to application`, async () => {
            await eluminaCandPage.candidateLoginToApplication();
            await eluminaCandPage.candidateSurveyStartOneMCQ();
            await eluminaCandPage.candidateAnsSurveyQuestion();
       
        });
        
    });


