import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';


/*Validation of all the events generated on the RHS of the Candidate page*/

test(`@Smoke Verify Validation of "Start Exam" (All Candidates)`, async ({ eluminaCadInvPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplications(); 
    });

    await test.step('Candidate start the exam',async ()=> {
        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type(testConfig.invigilatorUsername);
        await page1.locator('(//input)[2]').type(testConfig.invigilatorPassword);
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);

        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[1]//span)[1]').click();
        await newPage.locator('//*[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[1]').click();
     
        const events=  newPage.locator('(//*[@class="title"])[6]');
        console.log(await events.textContent());

        /* for(let i=0;i<=events.length;i++)
        {
            //await events[i].
            let eventslist = await events[i].textContent();
            //console.log(eventslist);
        } */
    
        await newPage.waitForTimeout(5000);
        await newPage.screenshot({ path: 'screenshot.png', fullPage: true });
        
    });

});