import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';
import { testConfig } from '../../testConfig';

//Validation of Proctoring Exam Event > Viewed Exam instruction .
test(`@Regression Validation of Proctoring Exam Event > Viewed Exam instruction.`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {
    await test.step('Candidate logging into application', async () => {

        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaProctorCand.candidateLoginToApplications();

    });   

    await test.step('Invigilator  logging into Application', async () => {

        await eluminaProctorCand.clickOnAllLink();

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
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('//*[@class="proctoringImg"]').click();
        await newPage.locator('(//div[@class="candidate-name"]//div[1])[1]').click();
        await newPage.waitForSelector('//div[@class="event-item"]',{timeout:10000});
        let events=await newPage.$$('//div[@class="event-item"]');
        const Ttl=events.length-1;
        for(let i=0;i<=events.length-1;i++)
        {
           let event=await events[i].textContent();
           console.log(event);
        }
        await newPage.waitForTimeout(3000); 
        await newPage.close();
        await page1.close();
    });   
    
});