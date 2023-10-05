import test from '@lib/BaseTest';

/**Validation of multiple candidate trying to login to same Exam*/

test(` . @LowPriorityiExamCases Validation of multiple candidate trying to login to same Exam`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication(29, "bulk_user_details.xlsx");
    });
    await test.step('Candidate Atted the Exam in Offline', async () => {
        await eluminaCandPage.canddiateRecovery();
    });

});

