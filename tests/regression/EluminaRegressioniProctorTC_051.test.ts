import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';


//**Validation of Invalid Candidate login/

test(`@Regression Verify CandidatesExam`, async ({ eluminaProctorCand,eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
    eluminaProctorCand.candidateNavigateToURL();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.InvalidCandidatelogin();
        console.log("Invalid ID and Password pop-up is shown")
    });

});