import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

/** Validation of Candidate> Enforce Hardware Check > True */

test(` iProc_TC_ID_101. @iProctorRegression Verify Candidate> Enforce Hardware Check > True`, async ({ eluminaProctorCand, eluminaCandPage, webActions }) => {

    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplication();
        await eluminaProctorCand.clickOnAllLinkForDiffExamZone();

    });

});