import test from '@lib/BaseTest';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';

test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaLiveMonitorPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaLiveMonitorPage.invigilatorLogin();
    });

    await test.step('Invigilator marks attendance for all candidate', async () => {
        const newtab = await eluminaLiveMonitorPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.markAllAttendance();
        //await newtab.isPresentYes();

    });
});