import test from '@lib/BaseTest';
import { EluminaIGLiveMonitorPage } from '@pages/EluminaIGLiveMonitorPage';

test(`@Smoke Verify Elumina Invigilator Dashboard`, async ({ eluminaLiveMonitorPage, webActions }) => {
    await test.step('Invigilator logging into application', async () => {
        await eluminaLiveMonitorPage.invigilatorLogin();
    });

    await test.step('Invigilator filters candidate based on Location', async () => {
        const newtab = await eluminaLiveMonitorPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.selectLocation();
    });
});