import test from '@lib/BaseTest';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';

//Invigilator marks attendance for individual candidate

test(`@Smoke Verify Elumina Invigilator marks attendance for individual candidate`, async ({ eluminaLiveMonitorPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaLiveMonitorPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for individual candidate', async () => {
        const newtab = await eluminaLiveMonitorPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.isPresentYes();

    });
});