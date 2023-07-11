import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

import { WebActions } from '@lib/WebActions';
import { EluminaProctorCandidatePage } from '@pages/EluminaProctorCandidatePage';
import { EluminaCandidatePage } from '@pages/EluminaCandidatePage';
import { EluminaLoginPage } from '@pages/EluminaLoginPage';
import { EluminaHomePage } from '@pages/EluminaHomePage';
import { EluminaExamPage } from '@pages/EluminaExamPage';
import { EluminaRegistrationForProctoringPage } from '@pages/EluminaRegistrationForProctoringPage';
import { EluminaProctorExamPage } from '@pages/EluminaProctorExamPage';
import { EluminaCandidateRevieweAndSubmitPage } from '@pages/EluminaCandidateRevieweAndSubmitPage';
import { EluminaMultipleExamsForAMPage } from '@pages/EluminaMultipleExamsForAMPage';
import { EluminaMultipleExamsForPMPage } from '@pages/EluminaMultipleExamsForPMPage'


export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;

  webActions: WebActions;
  eluminaProctorCand:EluminaProctorCandidatePage;
  eluminaCandPage: EluminaCandidatePage;
  eluminaLoginPage: EluminaLoginPage;
  eluminaHomePage: EluminaHomePage;
  eluminaExamPage: EluminaExamPage;
  eluminaProctorReg:EluminaRegistrationForProctoringPage;
  eluminaProctorExam:EluminaProctorExamPage;
  eluminaCandidateRevieweAndSubmitPage:EluminaCandidateRevieweAndSubmitPage;
  eluminaMultipleExamsForPMPage:EluminaMultipleExamsForPMPage;
  eluminaMultipleExamsForAMPage:EluminaMultipleExamsForAMPage;
  


}>({

  

  context: async ({ }, use) => {                              
    const pathToExtension = path.join(__dirname, '/extensions/agjngcdfhdplchpgmalcfjhgginnljdc/1.0.2_0');
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      permissions: ['microphone', 'camera'],
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        "--use-fake-device-for-media-stream",
        "--use-fake-ui-for-media-stream",
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    /*
    // for manifest v2:
    let [background] = context.backgroundPages()
    if (!background)
      background = await context.waitForEvent('backgroundpage')
    */

    // for manifest v3:
    let [background] = context.serviceWorkers();
    if (!background)
      background = await context.waitForEvent('serviceworker');

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
  eluminaProctorCand: async ({ page, context }, use) => {
    await use(new EluminaProctorCandidatePage(page, context));
},
eluminaCandPage: async ({ page, context }, use) => {
  await use(new EluminaCandidatePage(page, context));
},
eluminaLoginPage: async ({ page, context }, use) => {
  await use(new EluminaLoginPage(page, context));
},
eluminaHomePage: async ({ page, context }, use) => {
  await use(new EluminaHomePage(page, context));
},
eluminaExamPage: async ({ page, context }, use) => {
  await use(new EluminaExamPage(page, context));
},
eluminaProctorReg: async ({ page, context }, use) => {
  await use(new EluminaRegistrationForProctoringPage(page, context));
},
eluminaProctorExam: async ({ page, context }, use) => {
  await use(new EluminaProctorExamPage(page, context));
},
eluminaCandidateRevieweAndSubmitPage: async ({ page, context }, use) => {
  await use(new EluminaCandidateRevieweAndSubmitPage(page, context));
},
eluminaMultipleExamsForPMPage: async ({ page, context }, use) => {
  await use(new EluminaMultipleExamsForPMPage(page, context));
},
eluminaMultipleExamsForAMPage: async ({ page, context }, use) => {
  await use(new EluminaMultipleExamsForAMPage(page, context));
}


});
export default test;