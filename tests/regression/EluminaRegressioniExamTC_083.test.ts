import test from '@lib/BaseTest';

//Validation of Invigilator Dashboard

test(`@Regression Verify Validation of Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        //await newtab.iAuthorPageVerification();
        await newtab.invDashboardValidations();
        //await newtab.validateExamStatus();
        
    });
});