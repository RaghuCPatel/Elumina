import test from '@lib/BaseTest';


    test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
        await test.step('Invigilator logging into application', async () => {
            await eluminaInvPage.invigilatorLogin();
        });

        await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
            const newtab = await eluminaInvPage.iAuthorPageNavigation();
            await newtab.invClickOnExam();  
        });   
     });
