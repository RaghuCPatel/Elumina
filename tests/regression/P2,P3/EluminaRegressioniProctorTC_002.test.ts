import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';

const devTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../../enviroment-variables/staging/testData.json')));

let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
}


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
        await newtab.createContentSection();
        await newtab.createContentPage()
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
        await newtab.logoutClick();
    });
});       

//Validation of Admin > Proctoring > Video Recording (Toggle Button)
test(`@Regression Validation of Admin > Proctoring > Video Recording (Toggle Button) TC-`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        await newtab.clickOnVideoToggleButton();
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

//Validation of Admin> Proctoring > Terms And Condition
test(`@Regression Validation of Admin> Proctoring > Terms And Condition TC-009`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam,webActions }) => {
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
        await newtab.enterTermAndCondition();
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

//Validation of Internet Connection Check
test(`@Regression Validation of Internet Connection Check TC-068`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        await newtab.clickOnInternetConnectionCheck();
        
    });
}); 

//Validation of Internet Upload Speed
test(`@Regression Validation of Internet Upload Speed TC-069`, async ({ eluminaLoginPage, eluminaHomePage, eluminaProctorExam, webActions }) => {
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
        await newtab.InternetSpeedCheck();
        
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

//Verify Validation of Exam section page  > Chat App
test(`@Regression Verify Validation of Exam section page  > Chat App TC-171`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await test.step('Candidate logging into application', async () => {
            await eluminaProctorCand.candidateNavigateToURL();
            await eluminaCandPage.waitforTime3();
            await eluminaProctorCand.candidateLoginToApplications();
            });   
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
            const context1 = await browser.newContext();
            const page1 = await context1.newPage();
            await page1.goto('/');
            await page1.waitForLoadState();
            await page1.locator('(//input)[1]').type(testData.UserEmail);
            await page1.locator('(//input)[2]').type(testData.UserPassword);
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
            await newPage.locator('//a[text()="Registration"]').click();
            await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
            await newPage.locator('//a[text()="Live Monitor"]').click();

            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(3000);
             await newPage.close();
            await page1.close();
    })
    await test.step('Candidate uses chat app in Submit exam page',async ()=> {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.enterFieldsInChatApp();        
    });
});  

//Validation of Review Exam page  > Chat App
test(`@Regression Verify Validation of Review Exam page  > Chat App TC-172`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await test.step('Candidate logging into application', async () => {
            await eluminaProctorCand.candidateNavigateToURL();
            await eluminaProctorCand.candidateLoginToApplications();
            });   
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
            const context1 = await browser.newContext();
            const page1 = await context1.newPage();
            await page1.goto('/');
            await page1.waitForLoadState();
            await page1.locator('(//input)[1]').type(testData.UserEmail);
            await page1.locator('(//input)[2]').type(testData.UserPassword);
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
            await newPage.locator('//a[text()="Registration"]').click();
            await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
            await newPage.locator('//a[text()="Live Monitor"]').click();

            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(3000);
             await newPage.close();
            await page1.close();
           
    });
    await test.step('Candidate uses chat app in Review exam page',async ()=> {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartMCQ();
        await eluminaCandPage.enterFieldsInChatApp();        
    });
});     

//Validation of textbox capabilities of chat app.
test(`@Regression Validation of textbox capabilities of chat app. TC-174`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {
  
    await test.step(`Navigate to Application`, async () => {
        await test.step('Candidate logging into application', async () => {
            await eluminaProctorCand.candidateNavigateToURL();
            await eluminaProctorCand.candidateLoginToApplications();
            });   
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
            const context1 = await browser.newContext();
            const page1 = await context1.newPage();
            await page1.goto('/');
            await page1.waitForLoadState();
            await page1.locator('(//input)[1]').type(testData.UserEmail);
            await page1.locator('(//input)[2]').type(testData.UserPassword);
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
            await newPage.locator('//a[text()="Registration"]').click();
            await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
            await newPage.locator('//a[text()="Live Monitor"]').click();

            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(3000);
             await newPage.close();
            await page1.close();
    })
    await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
       // await eluminaCandPage.candidateContentSection();
        await eluminaCandPage.chatApp();
    });
    
});

//Verify Validation of Submit Exam page  > Chat App
test(`@Regression Verify Validation of Submit Exam page  > Chat App TC-173`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await test.step('Candidate logging into application', async () => {
            await eluminaProctorCand.candidateNavigateToURL();
            await eluminaProctorCand.candidateLoginToApplications();
            });   
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.clickOnAllLink();
        const browser = await chromium.launch();
            const context1 = await browser.newContext();
            const page1 = await context1.newPage();
            await page1.goto('/');
            await page1.waitForLoadState();
            await page1.locator('(//input)[1]').type(testData.UserEmail);
            await page1.locator('(//input)[2]').type(testData.UserPassword);
            await page1.locator('//*[@class="submit-butn"]').click();
            const [newPage] = await Promise.all([
                context1.waitForEvent('page'),
                await page1.locator('//div[text()="iAuthor"]').click()
              ]);
            await newPage.locator('//a[text()="Registration"]').click();
            await newPage.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a').click();
            await newPage.locator('//a[text()="Live Monitor"]').click();

            await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
            await newPage.locator('//a[@class="dropdown-toggle"]').click();
            await newPage.locator('//p[text()="Verify Identity"]').click();
            await newPage.locator('(//button[text()="Yes"])[1]').click();
             await newPage.waitForTimeout(3000);
             await newPage.close();
            await page1.close();
    })
    await test.step('Candidate uses chat app in Submit exam page',async ()=> {
        await eluminaProctorCand.againCandidateLogin();
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaCandPage.candidateStartMCQAndSubmit();
        await eluminaCandPage.enterFieldsInChatApp();        
    });
});  


