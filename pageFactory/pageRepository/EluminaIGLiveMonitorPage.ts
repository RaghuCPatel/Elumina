
import { Page, BrowserContext, Locator, expect } from '@playwright/test';

import { WebActions } from "@lib/WebActions";

import { testConfig } from 'testConfig';        

    let webActions: WebActions;

     

    export class EluminaIGLiveMonitorPage {

       

            readonly page: Page;

            readonly context: BrowserContext;

            readonly InvUsername:Locator;

            readonly InvPssword:Locator;

            readonly InvLoginBtn:Locator;

            readonly AUTHOR: Locator;

            readonly ClickOnExam:Locator;

            readonly CheckExamStatus:Locator;

            readonly AllCandCheckbox:Locator;

            readonly OneCandCheckbox:Locator;

            readonly IsPresentYes:Locator;

            readonly IsPresentNo:Locator;

            readonly LockExam:Locator;

            readonly SelectLocation:Locator;

            readonly LocationDrop:Locator;

            readonly LocationSubmit:Locator;

            readonly SelectAll:Locator;

            readonly dropDown:Locator;




   




            constructor(page: Page, context: BrowserContext) {

                this.page = page;

                this.context = context;

                webActions = new WebActions(this.page, this.context);

                this.InvUsername=page.locator('(//input)[1]');

                this.InvPssword=page.locator('(//input)[2]');

                this.InvLoginBtn=page.locator('//*[@class="submit-butn"]');

                this.AUTHOR = page.locator('//div[text()="iAuthor"]');

                this.ClickOnExam=page.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]');

                this.CheckExamStatus=page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span');

                this.AllCandCheckbox=page.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input');

                this.OneCandCheckbox=page.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input');

                this.IsPresentYes=page.locator('//select');

                this.IsPresentNo=page.locator('//tbody//tr//td//select//option[1]');

                this.LockExam=page.locator('//div[@title="Lock Exam for all Candidates"]');

                this.SelectLocation=page.locator('//input[@placeholder="Select Location"]');

                this.LocationDrop=page.locator('(//span[@class="open"][text()="Elumina Chennai"])[1]');

                this.LocationSubmit=page.locator('//div[@title="Submit"]');

                this.SelectAll=page.locator('//span[@class="thtext"]//input[@type="checkbox"]')

                this.dropDown=page.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[2]')

       

            }

           

            async invigilatorLogin():Promise<void>{

                await this.page.goto("/");

                await this.InvUsername.type('divyashree.r@igsindia.net');

                await this.InvPssword.type('Aa6!2M#y');

                await this.InvLoginBtn.click();

            }

       

            async iAuthorPageNavigation() {

                const [newPage] = await Promise.all([

                    this.context.waitForEvent('page'),

                    await this.AUTHOR.click()

                  ]);

                  await newPage.waitForLoadState();

                  return new exports.EluminaIGLiveMonitorPage(newPage);

            }




            async iAuthorPageVerification() {

               await this.ClickOnExam.click();

            //    await this.SelectAll.check();

            //    await this.dropDown.click();

            //    await this.LocationDrop.click();

            //    await this.page.waitForTimeout(5000);




        //         const attendance=await this.page.$$('//select[1]');




        //         console.log(attendance.length)




        //         for(let i=0;i<=attendance.length-1;i++)




        // {




        //     await attendance[i].click();




        //     await attendance[i].selectOption('Yes');




        // }

            }




            async markAllAttendance() {

                let markattd1=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');




                await markattd1.click();




                await markattd1.selectOption('Yes');




                let markattd2=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');




                await markattd2.click();




                await markattd2.selectOption('Yes');




                await this.page.waitForTimeout(2000);

                // await this.page.waitForSelector('//table[@class="table table-spacing"]//tbody//tr//td[3]//select',{timeout:5000});

                // const attendance=await this.page.$$('//table[@class="table table-spacing"]//tbody//tr//td[3]//select');

                // console.log(attendance.length)

                // for(let i=0;i<=attendance.length;i++)

                // {

                //    await attendance[i].click();

                //    await this.page.waitForTimeout(2000);

                //    await attendance[i].selectOption('Yes');

                //    await this.page.waitForTimeout(2000);  

                // }

            }




            async oneCandCheckbox() {

                await this.OneCandCheckbox.click();

            }




            async isPresentYes() {




                let markattd1=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');




                await markattd1.click();




                await markattd1.selectOption('Yes');




                await this.page.waitForTimeout(5000);




            }

           




            async isPresentNo() {

                await this.IsPresentNo.click();

            }




            async lockExamBtn() {

                await this.LockExam.click();

            }




            async selectLocation() {

               await this.SelectAll.check();

               await this.dropDown.click();

               await this.LocationDrop.click();

               await this.LocationSubmit.click();

               await this.page.waitForTimeout(5000);

            }




            async locationDrop() {

                await this.LocationDrop.click();

                await this.page.waitForTimeout(5000);

       

            }

           

            async locationSubmit() {

                await this.LocationSubmit.click();

            }  

     

          async validateExamStatus(){

            let Examstatus=await this.CheckExamStatus.textContent();

             console.log(Examstatus);

                await this.CheckExamStatus.isVisible();

          }

     

      }