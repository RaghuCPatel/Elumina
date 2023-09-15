import test from '@lib/BaseTest';

//Validation of Questions, Videos & audio being downloaded as soon as the Exam Started - Cloud Symbol Validation

test(`@iExamRegression Verify Validation of Updated cloud symbol`, async ({ eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.examSectionValidation();
        await eluminaCandPage.examSectionCloudValidation();
    });
});