import test from '@lib/BaseTest';

//Validation of copy paste in password field

test(` . @LowPriorityiExamCases Validation of copy paste in password field`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.enterCandidateCredetialonly();
    });
});