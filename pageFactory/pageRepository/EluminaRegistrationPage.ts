import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { EluminaExamPage } from './EluminaExamPage';
import { EluminaMultipleExamsForPMPage } from './EluminaMultipleExamsForPMPage';
import { EluminaMultipleExamsForAMPage } from './EluminaMultipleExamsForAMPage';
import { EluminaMinimalTimeExamPage } from './EluminaMinimalTimeExamPage';
const testENV = process.env.ENV;

const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let webActions: WebActions;
let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if (process.env.ENV == 'p7') {
    testData = p7TestData;
}
else if (process.env.ENV == 'production') {
    testData = productionTestData;
}
else if (process.env.ENV == 'qa') {
    testData = qaTestData;
}
else if (process.env.ENV == 'sandbox') {
    testData = sandboxTestData;
}
else if (process.env.ENV == 'staging') {
    testData = stagingTestData;
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
let candClientID: string;

export class EluminaRegistrationPage {
    static CandiateClientID: string;
    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly RegistrationMenu: Locator;
    readonly ClickOnCreatedExam: Locator;
    readonly ClickOnAddNewUsers: Locator;

    readonly EnterClientID: Locator;
    readonly ChooseTitle: Locator;
    readonly TypeUsername: Locator;
    readonly TypeFirstName: Locator;
    readonly TypeLastName: Locator;
    readonly TypeEmail: Locator;
    readonly TypePhone: Locator;
    readonly SelectRole: Locator;
    readonly SelectEligible: Locator;
    readonly SelectVenue: Locator;
    readonly SelectBookingStatus: Locator;
    readonly ClickOnSaveBtn: Locator;
    readonly LeftArrow: Locator;
    readonly ClickOnDropdown: Locator;
    readonly ClickOnDownloadUserDeatils: Locator;
    readonly searchExam: Locator;
    readonly clickbulkdropdown: Locator;
    readonly clickonbulkdownload: Locator;
    readonly ClickOnDropdown2: Locator;
    readonly ClickOnAssignInv: Locator;
    readonly ClickOnAddExistingUser: Locator;
    readonly SearchUsers: Locator;
    readonly CLickOnUser: Locator;
    readonly ChooseExistingRole: Locator;
    readonly SelectInvRole: Locator;
    readonly SelectExVenue: Locator;
    readonly SelectInvVenue: Locator;
    readonly SelectExEligible: Locator;
    readonly SelectInvEligible: Locator;
    readonly SelectExBookingStatus: Locator;
    readonly SelectInvBookingStatus: Locator;
    readonly AssignUsersToCand: Locator;
    readonly AssignInvToCand: Locator;
    readonly ClickOnInvSaveBtn: Locator;
    readonly captureUserClientID: Locator;
    readonly SelectCandRole: Locator;
    readonly MenuIconClick: Locator;
    readonly logoutbuttonClick: Locator;
    readonly bulkDownloadButton: Locator;
    readonly bulkdownloadbuttonclick: Locator;
    readonly SelectCadVenue: Locator;
    readonly DeliveryMenu: Locator;
    readonly SpecialArrangement: Locator;
    readonly BookingStatus1: Locator;
    readonly SelectBookingStatusExistinguser: Locator;
    readonly addMoreUsrs: Locator;
    readonly MarkingMenu: Locator;
    readonly AssignMarkers: Locator;
    readonly selectAllQuestions: Locator;
    readonly selectMarker: Locator;
    readonly arrowClick: Locator;
    readonly closeButton: Locator;
    readonly SelectMarkerRole: Locator;
    readonly DeleteUsers: Locator;
    readonly DeleteUsersPopup: Locator;
    readonly ClickOnDeleteUser: Locator;
    readonly clickOnYes: Locator;
    readonly DeleteUserPopUpfromOption: Locator;
    readonly editClientId: Locator;
    readonly editFirstName: Locator;
    readonly editLastName: Locator;
    readonly editEmail: Locator;
    readonly downloadUserDetailsPopUp: Locator;
    readonly bulkDownloadUserDetailsPopUp: Locator;
    readonly bulkDownloadPopUp: Locator;
    readonly GenerateTempid: Locator;
    readonly GenerateTempidUser: Locator;
    readonly generateTempIDPopUp: Locator;
    readonly AssignVenueBooking: Locator;
    readonly selectVenue: Locator;
    readonly selectBookingStatus: Locator;
    readonly saveButton: Locator;
    readonly selectVenueType: Locator;
    readonly selectBookingStatusType: Locator;
    readonly selectCheckBox: Locator;
    readonly invSuccessMessagePopup: Locator;
    readonly resetPassword: Locator;
    readonly resetPasswordCand: Locator;
    readonly resetPasswordPopup: Locator;
    readonly BulkCandResponse: Locator;
    readonly manageSpecialConsideration: Locator;
    readonly ManageSpecialConsiderationCheckbox: Locator;
    readonly manageSpecialConsiderationNotes: Locator;
    readonly manageSpecialConsiderationPopup: Locator;
    readonly AddUsersPopUp: Locator;
    readonly emailExistPopUp: Locator;
    readonly userNameExistPopup: Locator;
    readonly userAssignDifferentRolepopup: Locator;
    readonly okButtonClick: Locator;
    readonly VenueSummaryClick: Locator;
    readonly venueSummaryId: Locator;
    readonly venueSummaryName: Locator;
    readonly venueSummaryLocation: Locator;
    readonly venueSummaryAvailableSeats: Locator;
    readonly venueSummaryBookedSeats: Locator;
    readonly venueSummaryRemainingSeats: Locator;
    readonly selectCandidates: Locator;
    readonly users: Locator;
    readonly invCheckBox: Locator;
    readonly liveDashboardClick: Locator;
    readonly liveDashboardExamSession: Locator
    readonly liveDashboardTotalRegCandidates: Locator;
    readonly liveDashboardQuestionDownload: Locator;
    readonly liveDashboardNotYetStarted: Locator;
    readonly liveDashboardCompleted: Locator;
    readonly liveDashboardLocationClick: Locator;
    readonly liveDashboardVenueClick: Locator;
    readonly liveDashboardSubmit: Locator;
    readonly liveDashboardlocationselect: Locator;
    readonly liveDashboardvenueselect: Locator;
    readonly ClickOnEditUser: Locator;
    readonly ClickeditClientId: Locator;
    readonly clickeditUsername: Locator;
    readonly clickeditFirstname: Locator;
    readonly clickeditLastname: Locator;
    readonly clickeditemail: Locator;
    readonly clickeditphone: Locator;
    readonly selectRole: Locator;
    readonly closeXButton: Locator;
    readonly selectChooseRole: Locator;
    readonly spanX: Locator;
    readonly assignMarkerExamName: Locator;
    readonly assignMarkerSession: Locator;
    readonly assignMarkerCandidateName: Locator;
    readonly nomarkersAvailable: Locator;
    readonly liveDashboardOne: Locator;
    readonly liveDashboardZero: Locator
    readonly liveDashboradMoreOptions: Locator;
    readonly liveDashboardDisableCheck: Locator;
    readonly liveDashboradEnableCheck: Locator;
    readonly liveMonitorClick: Locator;
    readonly liveDashboradAutoRefresh: Locator;

    readonly StartExam: Locator;
    readonly PauseExam: Locator;
    readonly ResumeExam: Locator;
    readonly ExtendExam: Locator;
    readonly LockExam: Locator;
    readonly terminateExam: Locator;

    readonly Attendance: Locator;
    readonly clientId: Locator;
    readonly candidateId: Locator;
    readonly firstName: Locator
    readonly LastName: Locator;
    readonly ExamVenue: Locator;
    readonly Location: Locator;
    readonly specialConsideration: Locator;
    readonly ExamStatus: Locator;
    readonly questionDownloadStatus: Locator
    readonly currentSection: Locator;
    readonly examStatusandSection: Locator;
    readonly TimeRemaining: Locator;
    readonly DropDownToggle: Locator;
    readonly addNotes: Locator;
    readonly specialConsiderationNotes: Locator;
    readonly restoreExam: Locator;
    readonly downloadCandResponsePdf: Locator;
    readonly liveMonitorVenueselect: Locator;
    readonly liveMonitorExamStatusclick: Locator;




    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.RegistrationMenu = page.locator('//a[text()="Registration"]');
        this.ClickOnCreatedExam = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnAddNewUsers = page.locator('//a[normalize-space()="Add New Users"]');

        this.EnterClientID = page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//input');
        this.ChooseTitle = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//select');
        this.TypeUsername = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//input');
        this.TypeFirstName = page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//input');
        this.TypeLastName = page.locator('//table[@class="table"]//tbody//tr[1]//td[6]//input');
        this.TypeEmail = page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//input');
        this.TypePhone = page.locator('//table[@class="table"]//tbody//tr[1]//td[8]//input');
        this.SelectRole = page.locator('//table[@class="table"]//tbody//tr[1]//td[9]//select');
        this.SelectEligible = page.locator('//table[@class="table"]//tbody//tr[1]//td[10]//select');
        this.SelectVenue = page.locator('//table[@class="table"]//tbody//tr[1]//td[11]//select');
        this.SpecialArrangement = page.locator('//table[@class="table"]//tbody//tr[1]//td[12]//select');
        this.BookingStatus1 = page.locator('//table[@class="table"]//tbody//tr[1]//td[14]//select');
        this.SelectBookingStatus = page.locator('//table[@class="table"]//tbody//tr[1]//td[12]//select');
        this.ClickOnSaveBtn = page.locator('//button[@class="theme-btn theme-primary-btn"]');
        this.LeftArrow = page.locator('//i[@class="iconBg leftArrow"]');
        this.searchExam = page.locator('//input[@placeholder="Search Exam(s)"]');

        this.clickbulkdropdown = page.locator('//button[@class="btn dotbutton btn-default"]');
        this.clickonbulkdownload = page.locator('//a[text()="Bulk Download User Details"]');

        this.ClickOnDropdown = page.locator('(//a[@class="icon dropdown-toggle"])[1]');
        this.ClickOnDropdown2 = page.locator('(//a[@class="icon dropdown-toggle"])[2]');
        this.ClickOnDownloadUserDeatils = page.locator('(//p[text()="Download User details"])[1]');
        this.ClickOnAssignInv = page.locator('(//p[text()="Assign Invigilator"])[1]');

        this.ClickOnAddExistingUser = page.locator('//a[normalize-space()="Add Existing Users"]');
        this.SearchUsers = page.locator('//input[@placeholder="Search User(s)"]');
        this.CLickOnUser = page.locator('//tbody/tr[1]/td[2]/input[1]');
        this.ChooseExistingRole = page.locator('//div[@class="btn-selected-list"]//div//ul');

        this.SelectInvRole = page.locator('//span[normalize-space()="Invigilator"]');
        this.SelectMarkerRole = page.locator('(//span[normalize-space()="Marker"])[2]');

        this.SelectExVenue = page.locator('//input[@placeholder="Select Venue"]');
        this.SelectInvVenue = page.locator('//span[text()="Elumina Chennai"]');
        this.SelectExEligible = page.locator('//input[@placeholder="Select Eligible"]');
        this.SelectInvEligible = page.locator('//span[text()="Yes"]');
        this.SelectExBookingStatus = page.locator('//input[@placeholder="Select Booking Status"]');
        this.SelectInvBookingStatus = page.locator('//span[text()="Booked"]');
        this.AssignUsersToCand = page.locator('//input[@placeholder="Select User(s)"]');
        this.AssignInvToCand = page.locator('(//span[@class="open"])[5]');
        this.ClickOnInvSaveBtn = page.locator('(//button[text()="Save"])[2]');

        this.SelectCandRole = page.locator('//span[text()="Candidate"]');
        this.captureUserClientID = page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//div//div//span');
        this.searchExam = page.locator('//input[@placeholder="Search Exam(s)"]');
        this.bulkDownloadButton = page.locator('//button[normalize-space()="..."]');
        this.bulkdownloadbuttonclick = page.locator('//a[text()="Bulk Download User Details"]');
        this.SelectCadVenue = page.locator('//span[text()="Elumina Chennai"]')
        this.DeliveryMenu = page.locator('//a[text()="Delivery"]');
        this.SelectBookingStatusExistinguser = page.locator('//div[@class="dropdown-main"]//div//ul//li//div//span');

        const examId: string = String(EluminaExamPage.examID);
        console.log(examId);
        const examId1: string = String(EluminaMultipleExamsForPMPage.examID);
        const examId2: string = String(EluminaMultipleExamsForAMPage.examID);
        this.MenuIconClick = page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick = page.locator('//a[normalize-space()="Log out"]');
        this.addMoreUsrs = page.locator('//table[@class="table"]//thead//tr//th[14]//span');
        this.MarkingMenu = page.locator('//a[text()="Marking"]');
        this.AssignMarkers = page.locator('(//p[text()="Assign Markers"])[1]');
        this.selectAllQuestions = page.locator('//option[text()="All Questions"]');
        this.selectMarker = page.locator('//option[text()="Igs Marker"]');
        this.arrowClick = page.locator('//div[@class="showClass"]');
        this.closeButton = page.locator('//button[text()="Close"]');
        this.DeleteUsers = page.locator('//a[text()="Delete Users"]');
        this.GenerateTempid = page.locator('//a[text()="Generate Temp ID"]');
        this.GenerateTempidUser = page.locator('(//p[text()="Generate Temp ID"])[1]');
        this.resetPasswordCand = page.locator('(//p[text()="Reset Password"])[1]');
        this.DeleteUsersPopup = page.locator('//span[text()="Please select at least one user"]');
        this.ClickOnDeleteUser = page.locator('(//p[text()="Delete User"])[1]');
        this.clickOnYes = page.locator('(//button[text()="Yes"])[2]');
        this.DeleteUserPopUpfromOption = page.locator('//span[text()="Exam has already started. You cannot delete the user(s)"]');
        this.editClientId = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[1]');
        this.editFirstName = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[2]');
        this.editLastName = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[3]');
        this.editEmail = page.locator('(//input[@class="textField ng-untouched ng-dirty ng-valid"])[4]')
        this.downloadUserDetailsPopUp = page.locator('//span[text()="Downloading user details. Please check your computer for the completed download."]');
        this.bulkDownloadUserDetailsPopUp = page.locator('//span[text()="Your file is being currently prepared. Please wait ...."]');
        this.bulkDownloadPopUp = page.locator('//span[text()="File downloaded successfully."]');
        this.generateTempIDPopUp = page.locator('//span[text()="Exam id already generated for this User"]');
        this.AssignVenueBooking = page.locator('//a[text()="Assign Venue And Booking Status"]');
        this.selectVenue = page.locator('//input[@placeholder="Select Venue"]');
        this.selectBookingStatus = page.locator('//input[@placeholder="Select Booking Status"]');
        this.saveButton = page.locator('//button[text()="Save"]');
        this.selectVenueType = page.locator('(//div[@class="open container-left-padding"])[1]');
        this.selectBookingStatusType = page.locator('(//div[@class="open container-left-padding"])[2]');
        this.selectCheckBox = page.locator('//table[@class="table"]//thead//th[2]');
        this.invSuccessMessagePopup = page.locator('//span[text()="Invigilator has been assigned successfully"]');
        this.resetPassword = page.locator('//a[text()="Reset Password"]');
        this.resetPasswordPopup = page.locator('//span[text()="Password has been reset successfully"]');
        this.BulkCandResponse = page.locator('//a[text()="Bulk Candidate Response Download"]');
        this.manageSpecialConsideration = page.locator('(//p[text()="Manage Special Consideration"])[1]');
        this.ManageSpecialConsiderationCheckbox = page.locator('//input[@name="chkbx"]');
        this.manageSpecialConsiderationNotes = page.locator('//textarea[@name="txtara"]');
        this.manageSpecialConsiderationPopup = page.locator('//span[text()="Special Consideration has been updated successfully"]');
        this.AddUsersPopUp = page.locator('//span[text()="Please enter the details."]');
        this.emailExistPopUp = page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//span[@class="error_msg"]');
        this.userNameExistPopup = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//span[@class="error_msg"]');
        this.userAssignDifferentRolepopup = page.locator('(//div[@class="modal-body"])[3]');
        this.okButtonClick = page.locator('(//button[@class="theme-button-blue"])[3]');
        this.VenueSummaryClick = page.locator('//a[normalize-space()="Venue Summary"]');
        this.venueSummaryId = page.locator('//table[@class="table"]//tbody//tr[1]//td[3]');
        this.venueSummaryName = page.locator('//table[@class="table"]//tbody//tr[1]//td[4]');
        this.venueSummaryLocation = page.locator('//table[@class="table"]//tbody//tr[1]//td[6]');
        this.venueSummaryAvailableSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[9]');
        this.venueSummaryBookedSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[10]');
        this.venueSummaryRemainingSeats = page.locator('//table[@class="table"]//tbody//tr[1]//td[11]');
        this.selectCandidates = page.locator('//select[@id="candidate0"]//option[1]');
        this.users = page.locator('//input[@placeholder="Select Users(s)"]');
        this.invCheckBox = page.locator('//input[@class="open"]');
        this.liveDashboardClick = page.locator('//a[normalize-space()="Live Dashboard"]');
        this.liveDashboardExamSession = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[2]');
        this.liveDashboardTotalRegCandidates = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[5]');
        this.liveDashboardQuestionDownload = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[6]');
        this.liveDashboardNotYetStarted = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[9]');
        this.liveDashboardCompleted = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]');
        this.liveDashboardLocationClick = page.locator('//input[@placeholder="Select Location"]');
        this.liveDashboardVenueClick = page.locator('//input[@placeholder="Select Venue"]');
        this.liveDashboardSubmit = page.locator('//div[text()="Submit"]');
        this.liveDashboardlocationselect = page.locator('(//span[text()="Elumina Chennai"])[1]');
        this.liveDashboardvenueselect = page.locator('//input[@class="open"]');
        this.ClickOnEditUser = page.locator('(//p[text()="Edit User"])[2]');
        this.ClickeditClientId = page.locator('(//input[@name="inputbox"])[1]');
        this.clickeditUsername = page.locator('(//input[@name="inputbox"])[2]');
        this.clickeditFirstname = page.locator('(//input[@name="inputbox"])[3]')
        this.clickeditLastname = page.locator('(//input[@name="inputbox"])[4]');
        this.clickeditemail = page.locator('(//input[@name="inputbox"])[5]');
        this.clickeditphone = page.locator('(//input[@name="inputbox"])[6]');
        this.selectRole = page.locator('//input[@placeholder="Select Role"]');
        this.closeXButton = page.locator('(//button[text()="×"])[4]');
        this.selectChooseRole = page.locator('//input[@placeholder="Select Choose Role"]');
        this.spanX = page.locator('//span[text()="x"]');
        this.assignMarkerExamName = page.locator('(//span[@class="break-heading"])[1]');
        this.assignMarkerCandidateName = page.locator('(//span[@class="break-heading"])[2]');
        this.assignMarkerSession = page.locator('(//span[@class="break-heading"])[3]');
        this.nomarkersAvailable = page.locator('//option[text()="No markers available"]');
        this.liveDashboardOne = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[8]');
        this.liveDashboardZero = page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[10]');
        this.liveDashboradMoreOptions = page.locator('//table[@class="table table-spacing"]//thead//th[1]');
        this.liveDashboardDisableCheck = page.locator('//input[@value="Exam Session"]');
        this.liveDashboradEnableCheck = page.locator('//input[@value="Exam - In Progress"]');
        this.liveDashboradAutoRefresh = page.locator('//div[@class="switch-value"]');
        this.liveMonitorClick = page.locator('//a[normalize-space()="Live Monitor"]');
        this.StartExam = page.locator('//div[normalize-space()="Start Exam"]');
        this.PauseExam = page.locator('//div[normalize-space()="Pause Exam"]');
        this.ResumeExam = page.locator('//div[normalize-space()="Resume Exam"]');
        this.ExtendExam = page.locator('//div[normalize-space()="Extend Exam"]');
        this.LockExam = page.locator('//div[normalize-space()="Lock Exam"]');
        this.terminateExam = page.locator('//div[normalize-space()="Terminate Exam"]');
        this.Attendance = page.locator('//table[@class="table table-spacing"]//thead//th[3]');
        this.clientId = page.locator('//table[@class="table table-spacing"]//thead//th[4]');
        this.candidateId = page.locator('//table[@class="table table-spacing"]//thead//th[5]');
        this.firstName = page.locator('//table[@class="table table-spacing"]//thead//th[6]');
        this.LastName = page.locator('//table[@class="table table-spacing"]//thead//th[7]');
        this.ExamVenue = page.locator('//table[@class="table table-spacing"]//thead//th[8]');
        this.Location = page.locator('//table[@class="table table-spacing"]//thead//th[9]');
        this.specialConsideration = page.locator('//table[@class="table table-spacing"]//thead//th[10]');
        this.ExamStatus = page.locator('//table[@class="table table-spacing"]//thead//th[11]');
        this.questionDownloadStatus = page.locator('//table[@class="table table-spacing"]//thead//th[12]')
        this.currentSection = page.locator('//table[@class="table table-spacing"]//thead//th[1]');
        this.examStatusandSection = page.locator('//table[@class="table table-spacing"]//thead//th[14]');
        this.TimeRemaining = page.locator('//table[@class="table table-spacing"]//thead//th[15]');
        this.DropDownToggle = page.locator('(//a[@class="dropdown-toggle"])[1]');
        this.addNotes = page.locator('(//p[text()="Add Notes"])[1]');
        this.specialConsiderationNotes = page.locator('(//p[text()="Special Consideration Notes"])[1]');
        this.restoreExam = page.locator('(//p[text()="Restore Exam"])[1]');
        this.downloadCandResponsePdf = page.locator('(//p[text()="Download Candidate Response PDF"])[1]');
        this.liveMonitorVenueselect = page.locator('(//input[@class="open"])[20]');
        this.liveMonitorExamStatusclick = page.locator('//input[@placeholder="Select Exam Status"]');
        //this.liveMonitorstatus = page.locator('//input[@class="open"]');


    }

    /**Method for Page Navigation */
    async iAuthorPageNavigations() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
        ]);
        await newPage.waitForLoadState();
        return new exports.EluminaRegistrationPage(newPage);
    }

    /**Method to register for the exam */
    async registrationTabNavigation(): Promise<void> {
        await this.DeliveryMenu.click();
        let examid = EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();

    }


    /**Method to register for the exam */
    async registrationTabNavigationPMExamPage(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMultipleExamsForPMPage.examID;
        console.log(EluminaMultipleExamsForPMPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    async registrationTabNavigationAMExamPage(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMultipleExamsForAMPage.examID;
        console.log(EluminaMultipleExamsForAMPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to register for the exam */
    async registrationTabNavigationforMinimaltime(): Promise<void> {

        await this.DeliveryMenu.click();
        let examid = EluminaMinimalTimeExamPage.examID;
        console.log(EluminaMinimalTimeExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to Add User Details */
    async addUserDetails(): Promise<string> {

        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.page.waitForTimeout(8000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
        await this.TypePhone.type(testData.clientPhone + Math.floor(Math.random() * 899999999 + 100));
        await this.page.waitForTimeout(8000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption('Candidate');
        await this.page.waitForTimeout(8000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption('Yes');
        await this.page.waitForTimeout(8000);
        await this.SelectVenue.click();
        await this.SelectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(7000);
        if (testENV === "sandbox") {
            await this.SelectBookingStatus.click();
            await this.SelectBookingStatus.selectOption('Booked');
            await this.page.waitForTimeout(7000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(8000);
            await this.LeftArrow.click();
            candClientID = await this.captureUserClientID.textContent()
            console.log("Cand-ID :" + candClientID);
            EluminaRegistrationPage.CandiateClientID = await this.captureUserClientID.textContent();
            await this.ClickOnDropdown.click();
        }
        else if (testENV === "qa") {
            await this.SpecialArrangement.click();
            await this.SpecialArrangement.selectOption('No');
            await this.page.waitForTimeout(7000);
            await this.BookingStatus1.click();
            await this.BookingStatus1.selectOption('Booked');
            await this.page.waitForTimeout(7000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(8000);
            await this.LeftArrow.click();
            candClientID = await this.captureUserClientID.textContent()
            console.log("Cand-ID :" + candClientID);
            EluminaRegistrationPage.CandiateClientID = await this.captureUserClientID.textContent();
            await this.ClickOnDropdown.click();
        }
        return EluminaRegistrationPage.CandiateClientID;
    }

    /**Method to Download the User Details */
    async downloadUserDetails(): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(20000);
        await expect(this.downloadUserDetailsPopUp).toHaveText("Downloading user details. Please check your computer for the completed download.");
    }

    async clickaddMoreUsersIcon(addMoreUsers) {
        for (let i = 1; i <= addMoreUsers; i++) {
            await this.addMoreUsrs.click()
            await this.page.waitForTimeout(2000);

        }
    }

    /**Method to Add Multiple User Details */
    async addMultipleUserDetails(addUsers): Promise<void> {
        await this.page.waitForSelector('//table[@class="table"]//tbody//tr', { timeout: 10000 });
        let rowss = await this.page.$$('//table[@class="table"]//tbody//tr');
        for (let i = 0; i <= addUsers; i++) {

            await rowss[i].isVisible()
            await this.EnterClientID.clear();
            await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
            await this.page.waitForTimeout(1000);
            await this.ChooseTitle.click();
            await this.ChooseTitle.selectOption('Mr');
            await this.TypeUsername.clear();
            await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
            await this.TypeFirstName.clear();
            await this.TypeFirstName.type(makeid(testData.clientFirstname));
            await this.TypeLastName.clear();
            await this.TypeLastName.type(makeid(testData.clientLastname));
            await this.TypeEmail.clear();
            await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
            await this.TypePhone.clear();
            await this.TypePhone.type('6' + Math.floor(Math.random() * 899999999 + 100));
            await this.page.waitForTimeout(1000);
            await this.SelectRole.click();
            await this.SelectRole.selectOption('Candidate');
            await this.page.waitForTimeout(1000);
            await this.SelectEligible.click();
            await this.SelectEligible.selectOption('Yes');
            await this.page.waitForTimeout(1000);
            await this.SelectVenue.click();
            await this.SelectVenue.type('Elumina Chennai');
            await this.page.waitForTimeout(1000);
            await this.SelectBookingStatus.click();
            await this.SelectBookingStatus.selectOption('Booked');
            await this.page.waitForTimeout(1000);
            await this.ClickOnSaveBtn.click();
            await this.page.waitForTimeout(3000);
        }
        await this.LeftArrow.click();
        // await this.ClickOnDropdown.click();

    }


    /**Method for Bulk Download the User Details */
    async BulkDownloadUserDetails(file): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download');
        await this.bulkDownloadButton.click();
        await this.bulkdownloadbuttonclick.click();
        await expect(this.bulkDownloadUserDetailsPopUp).toHaveText("Your file is being currently prepared. Please wait ....");
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        //const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + file;
        await this.page.waitForTimeout(15000);
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await expect(this.bulkDownloadPopUp).toHaveText("File downloaded successfully.");
        await this.page.waitForTimeout(15000);
    }

    /**Method to Add invigilator to the exam */
    async addExistingUsers(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.invigilatorName);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown2.click();
        await this.ClickOnAssignInv.click();
        await this.AssignUsersToCand.click();
        await this.AssignInvToCand.click();
        await this.ClickOnInvSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async addInv() {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.invigilatorName);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
    }

    async searchUserForAddingInv(assignInv, file): Promise<void> {
        for (let i = 2; i <= assignInv; i++) {
            const ExcelJS = require('exceljs');
            const wb = new ExcelJS.Workbook();
            const fileName = './download/' + file;
            wb.xlsx.readFile(fileName).then(async () => {
                let data: any;
                const ws = wb.getWorksheet('users');
                console.log(ws.actualRowCount)
                console.log(ws.getRow(2).getCell(1).value)
                console.log(ws.getRow(2).getCell(4).value)
                await this.SearchUsers.click()
                await this.SearchUsers.clear()
                await this.SearchUsers.type(ws.getRow(i).getCell(1).value);

            })
            await this.page.waitForTimeout(3000);
            await this.ClickOnDropdown.click();
            await this.ClickOnAssignInv.click();
            await this.AssignUsersToCand.click();
            await this.AssignInvToCand.click();
            await this.ClickOnInvSaveBtn.click();
            await expect(this.invSuccessMessagePopup).toHaveText("Invigilator has been assigned successfully");
            await this.page.waitForTimeout(5000);
        }
    }

    /**Method to Add existing candidate to the exam */
    async addExistingUsers1(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.UserEmail);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await expect(this.userAssignDifferentRolepopup).toHaveText("User(s) (Divyashree) had already assigned as a (Exam Administrator) in the same bank, So assign the users in the same role");
        await this.page.waitForTimeout(3000);
        await this.okButtonClick.click();
        await this.page.waitForTimeout(5000);

        await this.LeftArrow.click();
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type('virat');
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**add Existing Candid */
    async addExistingUsersforMultiple(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(7000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForTimeout(2000);
        await this.ClickOnDropdown.click();
    }


    /**Method for logout */
    async logoutClick() {
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();

    }

    /**Method to Add User Details */
    async addUserDetailsdiffTime(): Promise<void> {
        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername) + Math.floor(Math.random() * 89 + 10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com');
        await this.TypePhone.type(testData.clientPhone + Math.floor(Math.random() * 899999999 + 100));
        await this.page.waitForTimeout(5000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption(testData.clientRole);
        await this.page.waitForTimeout(5000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption(testData.clientEligableOption);
        await this.page.waitForTimeout(5000);
        await this.SelectVenue.click();
        await this.SelectVenue.type(testData.clientVenue);
        await this.page.waitForTimeout(5000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption(testData.clientBookingStatus);
        await this.page.waitForTimeout(5000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(8000);
        await this.LeftArrow.click();
        candClientID = await this.captureUserClientID.textContent()
        console.log("Cand-ID :" + candClientID);
        //await this.ClickOnDropdown.click();
    }

    /**add Existing Cadidate In Diff Time Zone */
    async addExistingUsersdifftime(): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectCadVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(3000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(5000);
    }


    /**
     * add Existing Cadidate Booking status change to Not Booked
     * @param Bookingstatus 
     */
    async addExistingUserswithNotBooked(Bookingstatus): Promise<void> {
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectCadVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectBookingStatusExistinguser.getByText(Bookingstatus).click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(3000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to add Marker
     */
    async addMarker() {
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.MarkerUsername);
        await this.page.waitForTimeout(6000);
        await this.CLickOnUser.click();
        await this.page.waitForTimeout(2000);
        await this.spanX.click();
        await this.selectChooseRole.click();
        await this.selectChooseRole.type('Marker');
        await this.SelectMarkerRole.click();
        await this.page.waitForTimeout(6000);
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(6000);
        await this.LeftArrow.click();
    }

    /**Method to click on cteated exam */
    async clickOnCreatedExam(): Promise<void> {
        await this.DeliveryMenu.click();
        let examid = EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
    }

    /**Method to click on Delete Users from more option */
    async DeleteUser() {
        await this.bulkDownloadButton.click();
        await this.DeleteUsers.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on Delete Users from more option */
    async GenerateTempID() {
        await this.bulkDownloadButton.click();
        await this.GenerateTempid.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(5000);
        await this.ClickOnDropdown.click();
        await this.GenerateTempidUser.click();
        await this.clickOnYes.click();
        await expect(this.generateTempIDPopUp).toHaveText("Exam id already generated for this User");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async DeleteUserFromMoreOption() {
        await this.ClickOnDropdown.click();
        await this.ClickOnDeleteUser.click();
        await this.clickOnYes.click();
        await this.DeleteUserPopUpfromOption.isVisible();
        await expect(this.DeleteUserPopUpfromOption).toHaveText("Exam has already started. You cannot delete the user(s)");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async DeleteUserFromMoreOptionPositive() {
        await this.ClickOnDropdown.click();
        await this.ClickOnDeleteUser.click();
        await this.clickOnYes.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on more options from candidate and delete user */
    async AssignVenueBookingFromMoreOption() {
        await this.selectCheckBox.click();
        await this.bulkDownloadButton.click();
        await this.AssignVenueBooking.click();
        await this.selectVenue.click();
        await this.selectVenue.type('Elumina Chennai');
        await this.page.waitForTimeout(5000);
        await this.selectVenueType.click();
        await this.page.waitForTimeout(5000);
        await this.selectBookingStatus.click();
        await this.selectBookingStatus.type('Booked');
        await this.page.waitForTimeout(5000);
        await this.selectBookingStatusType.click();
        await this.page.waitForTimeout(5000);
        await this.saveButton.click();
    }

    /**Method to click on dropdown button */
    async dropdownButton() {
        await this.ClickOnDropdown.click();
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on Reset password from more option */
    async ResetPassword() {
        await this.bulkDownloadButton.click();
        await this.resetPassword.click();
        await this.page.waitForTimeout(3000);
        await expect(this.DeleteUsersPopup).toHaveText("Please select at least one user");
        await this.page.waitForTimeout(5000);
        await this.ClickOnDropdown.click();
        await this.resetPasswordCand.click();
        await expect(this.resetPasswordPopup).toHaveText("Password has been reset successfully");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on Bulk Candidate Response Download from more option */
    async BulkCandResponseDownload() {
        await this.bulkDownloadButton.click();
        await this.BulkCandResponse.click();
        await expect(this.bulkDownloadUserDetailsPopUp).toHaveText("Your file is being currently prepared. Please wait ....");
        await this.page.waitForTimeout(3000);
        await expect(this.bulkDownloadPopUp).toHaveText("File downloaded successfully.");
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on Bulk Candidate Response Download from more option */
    async ManageSpecialConsideration() {
        await this.ClickOnDropdown.click();
        await this.manageSpecialConsideration.click();
        await this.page.waitForTimeout(2000);
        await this.ManageSpecialConsiderationCheckbox.click();
        await this.manageSpecialConsiderationNotes.click();
        await this.manageSpecialConsiderationNotes.type('Hello');
        await this.page.waitForTimeout(2000);
        await this.ClickOnInvSaveBtn.click();
        await expect(this.manageSpecialConsiderationPopup).toHaveText("Special Consideration has been updated successfully");
        await this.page.waitForTimeout(3000);
    }

    /**Method to click on save button */
    async saveButtonClick() {
        await this.ClickOnSaveBtn.click();
        await expect(this.AddUsersPopUp).toHaveText("Please enter the details.");
        await this.page.waitForTimeout(3000);
        await this.EnterClientID.type(makeid(testData.clientId) + Math.floor(Math.random() * 899 + 100));
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.clear();
        await this.TypeUsername.type("deep");
        await this.page.waitForTimeout(3000);
        await expect(this.userNameExistPopup).toHaveText("*Username already exist!");
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.clear();
        await this.TypeEmail.type(testData.UserEmail);
        await this.page.waitForTimeout(3000);
        await expect(this.emailExistPopUp).toHaveText("*Email already exist!");
    }

    /**
     * Method to click on Venue summary page
     */
    async venueSummary() {
        await this.VenueSummaryClick.click();
        await this.page.waitForTimeout(3000);
        await this.venueSummaryId.isVisible();
        console.log(await this.venueSummaryId.textContent());
        await this.venueSummaryName.isVisible();
        console.log(await this.venueSummaryName.textContent());
        await this.venueSummaryLocation.isVisible();
        console.log(await this.venueSummaryLocation.textContent());
        await this.venueSummaryAvailableSeats.isVisible();
        console.log(await this.venueSummaryAvailableSeats.textContent());
        await this.venueSummaryBookedSeats.isVisible();
        console.log(await this.venueSummaryBookedSeats.textContent());
        await this.venueSummaryRemainingSeats.isVisible();
        console.log(await this.venueSummaryRemainingSeats.textContent());
        await this.page.waitForTimeout(3000);
        await this.ClickOnDropdown.click();
        await this.ClickOnAssignInv.click();
        await this.selectCandidates.click();
        await this.users.click();
        await this.page.waitForTimeout(5000);
        await this.invCheckBox.click();
        await this.page.waitForTimeout(5000);
        await this.selectCandidates.click();
        await this.saveButton.click();
    }

    /**
    * Method to click on live Dashboard page
    */
    async liveDashboard() {
        //205
        await this.liveDashboardClick.click();
        await this.liveDashboardLocationClick.click();
        await this.liveDashboardlocationselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveMonitorVenueselect.click();
        await this.liveDashboardvenueselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveDashboardSubmit.click();

        await this.liveDashboardExamSession.isVisible();
        console.log(await this.liveDashboardExamSession.textContent());
        await this.liveDashboardTotalRegCandidates.isVisible();
        console.log(await this.liveDashboardTotalRegCandidates.textContent());
        await this.liveDashboardQuestionDownload.isVisible();
        console.log(await this.liveDashboardQuestionDownload.textContent());
        await this.liveDashboardNotYetStarted.isVisible();
        console.log(await this.liveDashboardNotYetStarted.textContent());
        await this.liveDashboardCompleted.isVisible();
        console.log(await this.liveDashboardCompleted.textContent());

        //209
        await this.liveDashboradMoreOptions.click();
        await this.liveDashboardDisableCheck.isDisabled();
        await this.liveDashboradEnableCheck.isEnabled();

        //210
        await this.liveDashboardOne.isVisible();
        console.log(await this.liveDashboardOne.textContent());
        await expect(this.liveDashboardOne).toHaveCSS('background', 'rgb(251, 254, 214) none repeat scroll 0% 0% / auto padding-box border-box');
        await this.liveDashboardZero.isVisible();
        console.log(await this.liveDashboardZero.textContent());

        //211
        await this.liveDashboradAutoRefresh.isVisible();
        await this.page.waitForTimeout(61000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardOne.isVisible();
        console.log("Value after Auto Refresh:" + await this.liveDashboardOne.textContent());
        console.log('Autofreshed after 60secs')
    }

    /**
    * Method to Validate on live Monitor page
    */
    async liveMonitor() {
        await this.liveMonitorClick.click();
        await this.liveDashboardLocationClick.isVisible();
        await this.liveDashboardLocationClick.click();
        await this.liveDashboardlocationselect.click();
        await this.page.waitForTimeout(3000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardVenueClick.click();
        await this.liveMonitorVenueselect.click();
        await this.page.waitForTimeout(3000);

        await this.StartExam.isVisible();
        await this.PauseExam.isVisible();
        await this.ExtendExam.isVisible();
        await this.terminateExam.isVisible();
        await this.ResumeExam.isVisible();
        await this.ExtendExam.isVisible();

        await this.liveDashboradMoreOptions.click();
        await this.Attendance.isVisible();
        await this.Attendance.click();
        await this.page.waitForTimeout(2000);
        await this.Attendance.click();
        await this.clientId.isVisible();
        await this.firstName.isVisible();
        await this.LastName.isVisible();
        await this.candidateId.isVisible();
        await this.ExamVenue.isVisible();
        await this.Location.isVisible();
        await this.specialConsideration.isVisible();
        await this.ExamStatus.isVisible();
        await this.questionDownloadStatus.isVisible();
        await this.currentSection.isVisible();
        await this.examStatusandSection.isVisible();
        await this.TimeRemaining.isVisible();

        await this.DropDownToggle.click();
        await this.addNotes.isVisible();
        await this.specialConsiderationNotes.isVisible();
        await this.restoreExam.isVisible();
        await this.downloadCandResponsePdf.isVisible();
        await this.resetPasswordCand.isVisible();
        await this.page.waitForTimeout(5000);

        //213
        await this.liveDashboradAutoRefresh.isVisible();
        await this.page.waitForTimeout(61000);
        await this.liveDashboardVenueClick.isVisible();
        await this.liveDashboardOne.isVisible();
        console.log("Value after Auto Refresh:" + await this.liveDashboardOne.textContent());
        console.log('Autofreshed after 60secs')
    }

    /**
     * method to validate live monitor exam status
     */
    async liveMonitorExamStatus() {
        await this.liveMonitorClick.click();
        await this.liveMonitorExamStatusclick.click();
        await this.page.waitForSelector('//input[@class="open"]')
        const checks = await this.page.$$('//input[@class="open"]')
        for (let i = 0; i < 20; i++) {
            await checks[i].isVisible();
            let statusCheck = await checks[i];
            console.log('Live Monitor Exam status:' + statusCheck.textContent());
            await this.page.waitForTimeout(2000);
        }
    }

    /**
     * Method to edit user
     */
    async editUser() {
        await this.ClickOnDropdown2.click();
        await this.ClickOnEditUser.click();
        await this.closeXButton.isVisible();
        await this.page.waitForTimeout(2000);
        await this.ClickeditClientId.click();
        await this.ClickeditClientId.clear();
        await this.ClickeditClientId.type('Demo111')
        await this.clickeditUsername.click();
        await this.clickeditUsername.clear();
        await this.clickeditUsername.type('Demo')
        await this.clickeditFirstname.click();
        await this.clickeditFirstname.clear();
        await this.clickeditFirstname.type('Dem')
        await this.clickeditLastname.click();
        await this.clickeditLastname.clear();
        await this.clickeditLastname.type('sad')
        await this.clickeditemail.click();
        await this.clickeditemail.clear();
        await this.clickeditemail.type('demosad@yopmail.com');
        await this.clickeditphone.click();
        await this.clickeditphone.clear();
        await this.clickeditphone.type('987654321');
        await this.page.waitForTimeout(5000);
    }

    /**
     * Method to Assign Markers to candidate
     */
    async searchCandidateforMarker(): Promise<void> {
        await this.MarkingMenu.click();
        await this.ClickOnDropdown.click();
        await this.AssignMarkers.click();
        await this.selectAllQuestions.click();
        await this.page.waitForTimeout(5000);
        await this.selectMarker.click();
        await this.page.waitForTimeout(5000);
        await this.arrowClick.click();
        await this.page.waitForTimeout(5000);
        await this.closeButton.click();
        await this.page.waitForTimeout(5000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);

    }

    /**
     * Method to Validate Markers 
     */
    async ValidateMarker(): Promise<void> {
        await this.MarkingMenu.click();
        await this.ClickOnDropdown.click();
        await this.AssignMarkers.click();
        await this.assignMarkerExamName.isVisible();
        console.log(await this.assignMarkerExamName.textContent());
        await this.assignMarkerSession.isVisible();
        console.log(await this.assignMarkerSession.textContent());
        await this.assignMarkerCandidateName.isVisible();
        console.log(await this.assignMarkerCandidateName.textContent());
        await this.selectAllQuestions.isVisible();
        await this.page.waitForTimeout(5000);
        await this.selectMarker.isVisible();
        await this.page.waitForTimeout(5000);
        await this.arrowClick.isVisible();
        await this.nomarkersAvailable.isVisible();
        await expect(this.nomarkersAvailable).toHaveText("No markers available");
        await this.page.waitForTimeout(5000);
        await this.closeButton.isVisible();
        await this.closeButton.click();
        await this.page.waitForTimeout(5000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);

    }
}