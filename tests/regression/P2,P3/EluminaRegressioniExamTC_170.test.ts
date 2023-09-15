import test from '@lib/BaseTest';


//Validation of Exam content section >  Chat App

test(` . @LowPriorityiExamCases Validation of Exam content section >  Chat App`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime3();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.chatApp();

    });

});