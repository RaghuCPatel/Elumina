import test from '@lib/Fixtures';
import { chromium } from '@playwright/test';


//Validation of the following in the Exam Section Exam name, Candidate name, REC Symbol blinking, Exam timer, no of questions as per exam created(Proctor)


test(`@Smoke Verify CandidatesExam`, async ({ eluminaProctorCand,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
    eluminaProctorCand.candidateNavigateToURL();

    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaProctorCand.candidateLoginToApplications();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaProctorCand.clickOnAllLink();

        const browser = await chromium.launch();
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto('/');
        await page1.waitForLoadState();
        await page1.locator('(//input)[1]').type('divyashree.r@igsindia.net');
        await page1.locator('(//input)[2]').type('Aa6!2M#y');
        await page1.locator('//*[@class="submit-butn"]').click();
        const [newPage] = await Promise.all([
            context1.waitForEvent('page'),
            await page1.locator('//div[text()="iAuthor"]').click()
          ]);
          //await newPage.waitForLoadState();
        
        await newPage.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]').click();
        await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        await newPage.locator('//a[@class="dropdown-toggle"]').click();
        await newPage.locator('//p[text()="Verify Identity"]').click();
        await newPage.locator('(//button[text()="Yes"])[1]').click();
        await newPage.waitForTimeout(3000);
        //let Examstatus=await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').textContent();
        //console.log(Examstatus);
        //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span').isVisible();
        //await newPage.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]//input').click();
        //await newPage.locator('//div[@class="action-item control-item pause-exam"]').click();
        //await newPage.locator('(//button[text()="Yes"])[3]').click();
        //await newPage.locator('//a[@class="dropdown-toggle"]').click();
        //await newPage.locator('//p[text()="Reset Login"]').click();
        //await newPage.locator('(//button[text()="Yes"])[1]').click();
        //await newPage.waitForLoadState();
        await newPage.close();
        await page1.close();
        //await eluminaProctorCand.examSectionValidation();
        //await eluminaProctorCand.candidateStartExams();
    });
    await test.step(`Redirected to Candidate page and Validation of the following in the Exam Section Exam name, Candidate name, REC Symbol blinking, no of questions as per exam created`, async () => {
        await eluminaProctorCand.enterInvigilatorPassword();
        await eluminaProctorCand.examSectionValidation();


        
    });
    
});