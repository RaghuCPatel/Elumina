import test from '@lib/BaseTest';
import { EluminaCandidatePage } from '@pages/EluminaCandidatePage';

//Validation of password entered after clicking on "Start Exam"


test(`iEX_TC_ID_21. @Smoke Verify Validation of password entered after clicking on "Start Exam"`, async ({ eluminaCandPage, eluminaCadInvPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
        await eluminaCadInvPage.logoutClick();
    });

});