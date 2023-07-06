import test from '@lib/BaseTest';
test(`@Smoke Verify Validation of Invigilator Dashboard Proctor`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invalidInvigilatorLogin();
    });
    
   
});