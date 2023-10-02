import test from '@lib/BaseTest';


/**Validation of Candidate Attending Exam in Online (Abort and Resume Exam) */

test(`iEX_TC_ID_60. @LowPriorityiExamCases Verify candidate adds and saves Notes EluminaRegressioniExamTC_038`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.AddingNotesToQuestionSinglelastandclickPrevious();
    });

});

/**Candidate while attending exam - Online - try to press any F1 to F12 keys */

test(` . @LowPriorityiExamCases Candidate while attending exam - Online - try to press any F1 to F12 keys TC-201`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKey(false, 'F6');
    });


});

test(` . @LowPriorityiExamCases No other key combinations could cause the candidates to logout and/or lose data TC-205`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.functionKeyWithControl_Shift_R();
    });
});

/**Validation of Candidate Attending Exam in Online (Abort and Resume Exam) */


test(` . @LowPriorityiExamCases Validation of Candidate Attending Exam in Online (Abort and Resume Exam)`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam and abort', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
        await eluminaCandPage.candidateAttendsAllQVSAQ(100);
        await eluminaCandPage.candidateStartISAWE();
        await eluminaCandPage.candidateStartTypeX();
        await eluminaCandPage.waitforTime2();
    });
});

test(` . @LowPriorityiExamCases Validation Candidate Login again`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
});



/**Validation of Review Exam page  > Chat App*/

test(` . @LowPriorityiExamCases Verify Validation of Review Exam page  > Chat App TC-173`, async ({ eluminaCadInvPage, eluminaCandPage, webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(3, "bulkUserCredentialForAllTypeQutnExamwithContent.xlsx");
    });
    await test.step('Candidate start the exam', async () => {
        await eluminaCadInvPage.enterInvgilatorPaswordAndClickOnNext();
    });
    await test.step('Candidate start the exam and abort', async () => {
        await eluminaCandPage.candidateStartOneMCQ();
    });
    await test.step('Candidate uses chat app in Review exam page', async () => {
        await eluminaCandPage.enterFieldsInChatApp(false);
    });
});  