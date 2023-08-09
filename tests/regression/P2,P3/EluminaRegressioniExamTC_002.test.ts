import test from '@lib/BaseTest';

/**Validation of Client Logo and name, color, font size and font type of different elements in the login page*/


test(`@Regression Validation of Client Logo and name, color, font size and font type of different elements in the login page`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Click on Login without Username and Password`, async () => {
        await eluminaCandPage.validationOfLogo();
    });
});
