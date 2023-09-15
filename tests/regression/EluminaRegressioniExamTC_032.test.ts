import test from '@lib/BaseTest';

/**Validate Candidate while attending exam - Candidate abruptly closed the browser */

test(`@iExamRegression Verify Validation of abrupt closure of browser`, async ({ eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate starts and closes the page after attending two questions in the exam', async () => {
        await eluminaCandPage.candidateStartTwoMCQ();
    });
});


test(`@iExamRegression Verify Candidate is able to close the broswer and answered questions are saved after logging in again`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQwithoutReviewe();
        console.log("Candidate is able to close the broswer and answered questions are saved after logging in again")

    });
});
