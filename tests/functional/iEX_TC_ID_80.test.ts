import test from '@lib/BaseTest';

//Validation of Review Section


test(`iEX_TC_ID_80. @Smoke Verify Validation of Review Section`, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartMCQ();
    });

});