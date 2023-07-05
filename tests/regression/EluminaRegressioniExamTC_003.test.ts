import test from '@lib/BaseTest';

/**Validation of Empty Field validation */

test(`@Regression Validation of Empty Field validation`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Click on Login without Username and Password`, async () => {
        await eluminaCandPage.logintoAppwithoutUserPwd();
    });
});
