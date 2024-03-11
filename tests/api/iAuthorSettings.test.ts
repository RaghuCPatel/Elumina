//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { jsonObject } from 'pageFactory/pageRepository/Api_iAuthorPage';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';
import { Console } from 'winston/lib/winston/transports';



function makeid(length) {
    let result = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


let verifyResponse = new ValidationResponse;
//const apiActions = new APIActions();

const Ajv = require('ajv')
const avj = new Ajv()

export let token;
var jsonpath;
var jschemasonpath;
var BankId;
var TagId;
var LocationId;
var QuestionId;
var SpecialityId
let bankName = makeid(8);
var NotificationId;
jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
const baseURL = jsonpath.url

test("AL_001. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_333. @API Admin create the Bank-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_334. @API Admin add  the bank-list of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_335. @API Admin add the bank-list  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


/////////////////Create Bank///////////////////////

test("Admin_359. @API Admin add the Banks-Save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank',
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    const schema = jschemasonpath.BankCreate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_360. @API Admin add the  Banks-Save _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_361. @API Admin add the Banks-Save _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks/IGS',
        {
            data: jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Bank////////////////////

test("Admin_340. @API Admin add the Bank search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: {

                "freeText": [
                    bankName
                ]

            },
            //jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()
    BankId = res.banks.data[0].id
    console.log("BankId is" + BankId)


    //Schema validation
    const schema = jschemasonpath.BankSearch_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_341. @API Admin add the Bank search _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_342. @API Admin add the Bank search _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks/IGS',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


//////////////////Edit Bank////////////////////

test("Admin_373. @API Admin fetch the bank-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"mark\":\"1\",\"distractor_count\":\"2\",\"max_limit\":10,\"readonly\":\"\",\"tags\":[]}]"
            },
            //jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank updated successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_374. @API Admin add the bank-edit-update _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/bank/',
        {
            data: jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_375. @API Admin add the bank-edit-update _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank/58/IGS',
        {
            data: jsonObject.Admin_Bank_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


/////Create Question Type////////////


test("Admin_481. @API Admin create the question-type-save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type',
        {
            data: {
                "question_types": [
                    {
                        "id": 12,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName,
                    }
                ],
                "description": "<p>test description</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "A is more than B",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "B is more than C",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "C is more than D",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "D is more than A",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "D is more than B",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },
            // jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())


    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type added successfully")

    //Schema validation
    const schema = jschemasonpath.Question_Type_Create_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_482. @API Admin add  the question-type-save of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type',
        {
            data: jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_483. @API Admin add the question-type-save  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-typeIGS',
        {
            data: jsonObject.Admin_question_type_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Question-Type/////////////////

test("Admin_498. @API Admin create the question-types-search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: {
                "freeText": [
                    bankName
                ]
            },

            //jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    console.log(res)
    QuestionId = res.questiontypes.data[0].id
    console.log("QuestionId is" + QuestionId)

    //Schema validation
    const schema = jschemasonpath.Question_type_Search
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()


})


test("Admin_499. @API Admin add  the question-types-search  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_500. @API Admin add the question-types-search   of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Question_type_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Question Type////////////////////

test("Admin_488. @API Admin create the question-type-update information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            data: {
                "question_types": [
                    {
                        "id": 12,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName
                    }
                ],
                "description": "<p>testt</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "one",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "two",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "three",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "four",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "five",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },
            //jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type updated successfully")

    //Schema validation
    const schema = jschemasonpath.Question_type_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_489. @API Admin add  the question-type-update of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            data: jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_490. @API Admin add the question-type-update  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            data: jsonObject.Question_Type_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_517. @API Admin create the question-type-duplicate-save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-type?duplicate=true',
        {
            data: {
                "question_types": [
                    {
                        "id": 24,
                        "name": "Type B"
                    }
                ],
                "banks": [
                    {
                        "id": BankId,
                        "name": bankName
                    }
                ],
                "description": "<p>Test Bank&nbsp;</p>",
                "distractor": [
                    {
                        "enter_distrator_text": 1,
                        "values": [
                            {
                                "header": "Distractor 1",
                                "value": "statement is correct",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 2",
                                "value": "reason is correct",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 3",
                                "value": "statement is wrong",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 4",
                                "value": "reason is wrong",
                                "required": "required"
                            },
                            {
                                "header": "Distractor 5",
                                "value": "both statement and reason is correct",
                                "required": "required"
                            }
                        ]
                    }
                ]
            },

            //jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });


    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type duplicated successfully")


    //     //Schema validation
    const schema = jschemasonpath.Question_Type_Duplicate_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_518. @API Admin add  the question-type-duplicate-save  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type?duplicate=true',
        {
            data: jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_519. @API Admin add the question-type-duplicate-save  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/question-typeIGS?duplicate=true',
        {
            data: jsonObject.Admin_Question_type_duplicate.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



test("Admin_510. @API Admin fetch the Question type delete-role", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question type deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Question_Type_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("Admin_511. @API Endpoint validation for delete-question-type", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//get method for edit bank

test("Admin_369. @API Admin fetch the bank-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_370. @API Endpoint validation for bank-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/IGS/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_371. @API Access token validation for bank-edit-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})




//Get Method

test("Admin_365. @API Admin fetch the bank-duplicate -form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_duplicate_form_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_366. @API Endpoint validation for -bank-duplicate-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicateIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_367. @API Access token validation for bank-duplicate-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})


test("Admin_512. @API Admin delete-question-type_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/question-type/6',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("AL_001eah. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})




test("Admin_372. @API Admin bank-edit-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //console.log(res);


})

test("AL_001abcd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_368. @API Admin bank-duplicate-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank/' + BankId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001abc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

//get method

test("Admin_336. @API Admin fetch the bank-filter-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



    //Schema validation
    const schema = jschemasonpath.Bank_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_337. @API Endpoint validation for -bank-filter  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_338. @API Access token validation for bank-filter_information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_339. @API Admin bank-filter-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001a. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})


test("Admin_343. @API Admin add the Bank Pagination information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_344. @API Admin add the Bank Pagination _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_345. @API Admin add the Bank Pagination _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS?page=2',
        {
            data: jsonObject.Bank_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_346. @API Admin add the Banks-Filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: jsonObject.Banks_Filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

})



test("Admin_347. @API Admin add the  Banks-Filter-search _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_348. @API Admin add the  Banks-Filter-search _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_349. @API Admin add the Bank-custom-filter-public or private information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Bank_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_350. @API Admin add the  Bank-custom-filter-public or private _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_351. @API Admin add the  Bank-custom-filter-public or private  _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Bank_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_352. @API Admin add the Bank-show-column-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})



test("Admin_353. @API Admin add the  Bank-show-column-list _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/banks?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_354. @API Admin add the Bank-show-column-list_validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banksIGS?page=1',
        {
            data: jsonObject.Bank_show_column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_355. @API Admin fetch the bank-create-form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_356. @API Endpoint validation for -bank-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bankIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_357. @API Access token validation for bank-create-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_358. @API Admin bank-create-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/bank',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001ab. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

/////////create Bank////////////////

test("Admin_aaa. @API Admin add the Banks-Save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/bank',
        {
            data: {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            },
            //jsonObject.Admin_Bank_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    const schema = jschemasonpath.BankCreate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

/////////////Search Bank////////////////////

test("Admin_bbb. @API Admin add the Bank search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/banks',
        {
            data: {

                "freeText": [
                    bankName
                ]

            },
            //jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()
    BankId = res.banks.data[0].id
    console.log("BankId is" + BankId)


    //Schema validation
    const schema = jschemasonpath.BankSearch_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_362. @API Admin fetch the bank-Delete", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Bank deleted successfully")


    // //Schema validation
    const schema = jschemasonpath.Bank_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_363. @API Endpoint validation for bank-Delete", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_364. @API Admin bank-Delete -Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/bank/' + BankId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("AL_001amc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



//////////////////////////////Question Type////////////////////////////////


test("Admin_491. @API Admin create the question-types-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



    //     //Schema validation
    //     const schema = jschemasonpath.Question_Type_Create_Form
    //     const validate = avj.compile(schema)
    //     const isValid = validate(res)
    //     expect(isValid).toBeTruthy()

})


test("Admin_492. @API Admin add  the question-types-list  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_493. @API Admin add the question-types-list  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})




test("Admin_501. @API Admin create the question-types-filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Schema validation
    // const schema = jschemasonpath.Question_Type_Create_Form
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})


test("Admin_502. @API Admin add  the question-types-filter-search  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_503. @API Admin add the question-types-filter-search  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Admin_question_type_filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_504. @API Admin create the question-type custom-filter-save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")

    //Schema validation
    const schema = jschemasonpath.Question_Type_Custom_Filter_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_505. @API Admin add  the question-type custom-filter-save of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_506. @API Admin add the question-type custom-filter-save  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_question_type_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_507. @API Admin create the question-types-field-column-show-hide information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_508. @API Admin add  the question-types-field-column-show-hide  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/questiontypes',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_509. @API Admin add the question-types-field-column-show-hide  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/questiontypes/IGS',
        {
            data: jsonObject.Admin_Question_type_column_Show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})



//Get method

test("Admin_494. @API Admin fetch the question-type-filter -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    //  expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    // const schema = jschemasonpath.Bank_Filter_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("Admin_495. @API Endpoint validation for -question-type-filter  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypesIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_496. @API Access token validation for question-type-filter_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_497. @API Admin question-type-filter-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/questiontypes',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bgz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

//Get method

test("Admin_513. @API Admin fetch the question-type-duplicate-form -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_514. @API Endpoint validation for -question-type-duplicate-form   information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_515. @API Access token validation for question-type-duplicate-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_516. @API Admin question-type-duplicate-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bqj. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



//Get method

test("Admin_477. @API Admin fetch the question-type-create-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    //  expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    // const schema = jschemasonpath.Bank_Filter_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("Admin_478. @API Endpoint validation for -question-type-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-typeIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_479. @API Access token validation for question-type-create-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get method

test("Admin_484. @API Admin fetch the question-type-edit-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_485. @API Endpoint validation for -question-type-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_486. @API Access token validation for question-type-edit-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_487. @API Admin question-type-edit-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type/' + QuestionId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bqz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})




test("Admin_480. @API Admin question-type-create-formr-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/question-type',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bz. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})




///////////////TAG LIST INFORMATION////////////////////////////


/////Create tag////////////

test("Admin_402. @API Admin fetch the tag-save form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag created successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Create_Form
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_403. @API Admin add the tag-save _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/tag',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_404. @API Admin add the tag-save _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagIGS',
        {
            data: jsonObject.Admin_Tag_Create_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Tag/////////////////

test("Admin_379. @API Admin add the tags-search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    TagId = res.tags.data[0].id
    console.log("Tag id is ", TagId)


})

test("Admin_380. @API Admin add the tags-search _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_381. @API Admin add the tags-search_validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Admin_Bank_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Tag////////////////////

test("Admin_409. @API Admin fetch the tag-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag/' + TagId,
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag updated successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_410. @API Admin add the tag-edit-update _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/tag/' + TagId,
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_411. @API Admin add the tag-edit-update _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tag/3/IGS',
        {
            data: jsonObject.Tag_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method fot edit tag


test("Admin_405. @API Admin fetch the tag-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/' + TagId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

})



test("Admin_406. @API Endpoint validation for -tag-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/IGS/' + TagId,

        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_407. @API Access token validatio tag-edit-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get method

test("Admin_415. @API Admin fetch the tag-duplicate -form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Tag_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_416. @API Endpoint validation for tag-duplicate-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicateIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_417. @API Access token validation for tag-duplicate-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/6/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

test("Admin_412. @API Admin add the tag-delete  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/' + TagId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Tag deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Tag_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})


test("Admin_413. @API Endpoint validation for tag-Delete", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/6/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_414. @API Admin tag-Delete -Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/tags/3',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("AL_001ea. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_418. @API Admin tag-duplicate-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags/' + TagId + '/duplicate',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001e. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_408. @API Admin add the tag-edit-form information - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001de. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_376. @API Admin create the tag-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

})



test("Admin_377. @API Admin add  the tag-list of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_378. @API Admin add the tag-list  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_382. @API Admin add the Tags-Filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    // expect(await res.message).toEqual("Login Successful")

    //Schema validation
    // const schema = jschemasonpath.Bank_filterSearch_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})



test("Admin_383. @API Admin add the  Tags-Filter-search_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_384. @API Admin add the  Tags-Filter-search _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_385. @API Admin fetch the tags-filters-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    //  expect(await res.Response.Message).toEqual("Bank created successfully")

    //Schema validation
    // const schema = jschemasonpath.Bank_Filter_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})

test("Admin_386. @API Endpoint validation for tags-filters  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tagsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_387. @API Access token validation for tags-filters_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_388. @API Admin  tags-filters-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/tags',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bc. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_389. @API Admin add the tag-custom-filter-save public or privet information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})



test("Admin_390. @API Admin add the tag-custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_391. @API Admin add the  Tags-Filter-search _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS',
        {
            data: jsonObject.Tag_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_392. @API Admin add the tags-pagination information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_393. @API Admin add the tags-pagination_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_394. @API Admin add the tags-pagination _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_395. @API Admin add the tags-show-column information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tags?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_396. @API Admin add the tags-show-column _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tags?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_397. @API Admin add the  tags-show-column _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/tagsIGS?page=1',
        {
            data: jsonObject.Tag_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get method

test("Admin_398. @API Admin fetch the tag-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_399. @API Endpoint validation for -tag-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tagIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_400. @API Access token validatio tag-create-form for _information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_401. @API Admin   tag-create-form field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/tag',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001cd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



/////////////////Location Information/////////////////////////


///////Create Location//////////////


test("Admin_445. @API Admin fetch the location-save form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Location added successfully")

    //Schema validation
    const schema = jschemasonpath.Location_save_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_446. @API Admin add the location-save _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/location',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_447. @API Admin add the location-save _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationIGS',
        {
            data: jsonObject.Location_Save_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Location/////////////////


test("Admin_426. @API Admin add the Location-search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    LocationId = res.locations.data[0].id
    console.log("Location id is ", LocationId)



})

test("Admin_427. @API Admin add the Location-search _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_428. @API Admin add the Location-search_validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            data: jsonObject.Location_Search_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


////////////Edit Location////////////////////

test("Admin_452. @API Admin fetch the Location-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Location updated successfully")

    //Schema validation
    const schema = jschemasonpath.Location_Edit_schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_453. @API Admin add the location-edit-update _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/location/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_454. @API Admin add the location-edit-update _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationIGS/' + LocationId,
        {
            data: jsonObject.Location_Edit_Form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_419. @API Admin create the location-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_420. @API Admin add  the location-list of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_421. @API Admin add the location-list  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


test("Admin_429. @API Admin add the Locations-Filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})



test("Admin_430. @API Admin add the  Locations-Filter-search_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_431. @API Admin add the  Locations-Filter-search _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS',
        {
            data: jsonObject.Location_Filter_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_422. @API Admin fetch the location-filters-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})

test("Admin_423. @API Endpoint validation for locations-filters  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locationsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_424. @API Access token validation for locations-filters_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_425. @API Admin  locations-filters-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/locations',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001bcy. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_432. @API Admin add the location-custom-filter-save public or privet information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location-custom-filter',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_433. @API Admin add the location-custom-filter-save public or privet_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location-custom-filter',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_434. @API Admin add the  locations-Filter-search _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/location-custom-filterIGS',
        {
            data: jsonObject.Location_Filters_Search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_438. @API Admin add the locations-pagination information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_439. @API Admin add the locations-pagination_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_440. @API Admin add the locations-pagination _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locationsIGS?page=2',
        {
            data: jsonObject.Tag_Pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_435. @API Admin add the location-show-column information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_436. @API Admin add the locations-show-column _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locations',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_437. @API Admin add the  locations-show-column _validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/locations/IGS',
        {
            data: jsonObject.Location_Show_Column.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get method

test("Admin_441. @API Admin fetch the location-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_442. @API Endpoint validation for -location-create-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/locationIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_443. @API Access token validatio location-create-form for _information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_444. @API Admin   location-create-form field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})

test("AL_001dcd. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


//Get method

test("Admin_448. @API Admin fetch the location-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/' + LocationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()




})


test("Admin_449. @API Endpoint validation for -location-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/67/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_450. @API Access token validatio location-edit-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_451. @API Admin add the location-edit-form information - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/location/64',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001f. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


//Get method

test("Admin_455. @API Admin fetch the duplicate-location information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/6',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Location duplicated successfully")


    //Schema validation
    const schema = jschemasonpath.Location_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_456. @API Endpoint validation for -duplicate-location  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_457. @API Access token validation for duplicate-location _information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_458. @API Admin duplicate-location -Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatelocation/7',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //console.log(res);


})


test("AL_001ef. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


//Get method

test("Admin_459. @API Admin fetch the deactivate-location-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Location deactivated successfully")


    //Schema validation
    const schema = jschemasonpath.Location_Deactivate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_460. @API Endpoint validation for -deactivate-location  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_461. @API Access token validation for deactivate-location_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_462. @API Admin deactivate-location-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deactivate_location/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": " https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fq. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

////////////////////Checkout timings///////////////////////////



//Get method

test("Admin_463. @API Admin fetch the checkout-settings-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_464. @API Endpoint validation for -checkout-settings-form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settingsIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_465. @API Access token validation for checkout-settings-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_466. @API Admin checkout-settings-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-checkout-settings',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fa. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_467. @API Admin create the save-checkout-settings information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-checkout-settings',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    // Verify Response Payload
    expect(await res.Response.Message).toEqual("Checkout time updated successfully")

    //  Schema validation
    const schema = jschemasonpath.Save_Checkout_Settings_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_468. @API Admin add  the save-checkout-settings of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-checkout-settings',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_469. @API Admin add the save-checkout-settings  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-checkout-settingsIGS',
        {
            data: jsonObject.Save_Checkout.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


///////////////////////Proctoring/////////////////////////////////



//Get method

test("Admin_470. @API Admin fetch the proctoring-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    //console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_471. @API Endpoint validation for proctoring-form information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoringIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_472. @API Access token validation for proctoring-form_information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_473. @API Admin proctoring-form-Header field validation - invalid", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/proctoring',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    console.log(res);


})


test("AL_001fl. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

    //Schema validation
    const schema = jschemasonpath
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_474. @API Admin create the save-proctoring information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/proctoring',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //  Verify Response Payload
    expect(await res.Response.Message).toEqual("Proctoring Settings Updated  successfully")

    //  Schema validation
    const schema = jschemasonpath.Save_Proctoring_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_475. @API Admin add  the save-proctoring of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/proctoring',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_476. @API Admin add the save-proctoring  of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/proctoring/IGS',
        {
            data: jsonObject.Save_Proctoring.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




/////////////Specilaity ///////////////////////////


///////create Specilaity//////


test("Admin_626. @API Admin add the Specilaity-Save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty',
        {
            data: jsonObject.Admin_Create_Specilaity.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty created successfully")

    //Schema validation
    const schema = jschemasonpath.Create_Specilaity
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_627. @API Admin add the  Specilaity-Save _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/specialty',
        {
            data: jsonObject.Admin_Create_Specilaity.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_628. @API Admin add the Specilaity-Save _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialtyIGS',
        {
            data: jsonObject.Admin_Create_Specilaity.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search Specilaity////////////////////

test("Admin_647. @API Admin add the Specilaity search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()
    SpecialityId = res.getspecialty.data[0].id
    console.log("SpecialityId is" + SpecialityId)


    //Schema validation
    const schema = jschemasonpath.Specilaity_Search_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_648. @API Admin add the Specilaity search _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_649. @API Admin add the Specilaity search _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_Specilaity_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

//Get Method

test("Admin_662. @API Admin fetch the duplicate-specialty  -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty duplicated successfully")


    //Schema validation
    const schema = jschemasonpath.Specilaity_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_663. @API Endpoint validation for duplicate-specialty  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty/' + SpecialityId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_664. @API Access token validation for duplicate-specialty _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



//////////////////Edit Specilaity////////////////////

test("Admin_637. @API Admin fetch the Specilaity-edit-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty updated successfully")

    //Schema validation
    const schema = jschemasonpath.Specilaity_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_638. @API Admin add the Specilaity-edit-update _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_639. @API Admin add the Specilaity-edit-update _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/specialty/' + SpecialityId + '/IGS',
        {
            data: jsonObject.Admin_Specilaity_Edit_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

//delete_speciality

test("Admin_666. @API Admin fetch the delete-specialty-role", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Specialty deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Specilaity_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_667. @API Admin delete-specilaity_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_668. @API Endpoint validation for delete-specialty ", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletespecialty/' + SpecialityId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_629. @API Admin fetch the specialty-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_630. @API Endpoint validation for specialty-form   information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialtyIGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_631. @API Access token validation for specialty-form _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get Method

test("Admin_633. @API Admin fetch the specialty-edit-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_634. @API Endpoint validation for specialty-edit-form  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_635. @API Access token validation for specialty-edit-form_information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_636. @API Admin specialty-edit-form-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty/' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001an. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})



test("Admin_632. @API Admin specialty-form-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/specialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001az. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})

test("Admin_665. @API Admin duplicate-specialty-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicatespecialty' + SpecialityId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token

            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001aw. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})


test("Admin_640. @API Admin create the specialty-list  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_641. @API Admin add  the specialty-list  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_642. @API Admin add the specialty-list   of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_643. @API Admin fetch the specialty-filter -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Schema validation
    const schema = jschemasonpath.Specilaity_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_644. @API Endpoint validation for specialty-filter  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_645. @API Access token validation for specialty-filter_information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_646. @API Admin specialty-filter-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialtyfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ax. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})


test("Admin_650. @API Admin create the specialty-list-filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()

})



test("Admin_651. @API Admin add  the specialty-list-filter-search  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_652. @API Admin add the specialty-list-filter-search  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_653. @API Admin create the specialty-custom-filter-save  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_specialty_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")


    //Schema validation
    const schema = jschemasonpath.Specialty_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_654. @API Admin add  the specialty-custom-filter-save  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_655. @API Admin add the specialty-custom-filter-save  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_specialty_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);



    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_656. @API Admin create the specialty-list-field-cloumn-hide and show  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty',
        {
            data: jsonObject.Admin_specialty_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()


})



test("Admin_657. @API Admin add  the specialty-list-field-cloumn-hide and show  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_658. @API Admin add the specialty-list-field-cloumn-hide and show  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS',
        {
            data: jsonObject.Admin_specialty_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_659. @API Admin create the specialty-pagination  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty?page=1',
        {
            data: jsonObject.Admin_specialty_pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()


})



test("Admin_660. @API Admin add  the specialty-pagination  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getspecialty?page=1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_661. @API Admin add the specialty-pagination of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/getspecialty/IGS?page=1',
        {
            data: jsonObject.Admin_specialty_pagination.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


////////////WBA Settings/////////////////////

//////create WBA Settings////////


test("Admin_715. @API Admin add the notificationemail-save information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail',
        {
            data: jsonObject.Admin_Create_notificationemail.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email Id has been created successfully")

    //Schema validation
    const schema = jschemasonpath.Create_notificationemail
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})

test("Admin_716. @API Admin add the  notificationemail-save _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/notificationemail',
        {
            data: jsonObject.Admin_Create_notificationemail.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_717. @API Admin add the notificationemail-save_validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemailIGS',
        {
            data: jsonObject.Admin_Create_notificationemail.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})


/////////////Search WBA Settings////////////////////

test("Admin_732. @API Admin add the  notification_emails-search information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_emails_Search_form.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()
    NotificationId = res.notification_emails.data[0].id
    console.log("NotificationId is" + NotificationId)


    //Schema validation
    // const schema = jschemasonpath.Specilaity_Search_Schema
    // const validate = avj.compile(schema)
    // const isValid = validate(res)
    // expect(isValid).toBeTruthy()

})


test("Admin_733. @API Admin add the  notification_emails-search_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonObject.Admin_notification_emails_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_734 . @API Admin add the  notification_emails-search _validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_emails_Search_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()

})

//Get Method

test("Admin_744. @API Admin fetch the notification-email-list-status-update-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email status has been changed")


    //Schema validation
    const schema = jschemasonpath.Notification_Duplicate_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_745. @API Endpoint validation for notification-email-list-status-update  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_746. @API Access token validation for notification-email-list-status-update _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})


//////////////////Edit WBA Settings////////////////////

test("Admin_722. @API Admin fetch the notification-email-update  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            data: jsonObject.Admin_notification_email_update.body,

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email Id has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.notification_Edit_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_723. @API Admin add the notification-email-update _validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            data: jsonObject.Admin_notification_email_update.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_724. @API Admin add the notification-email-update_validation of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notificationemail/' + NotificationId + '/IGS',
        {
            data: jsonObject.Admin_notification_email_update.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//delete_notification

test("Admin_748. @API Admin fetch the delete-notification-emai-role", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Email deleted successfully")


    //Schema validation
    const schema = jschemasonpath.Notification_Email_Delete_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_749. @API Admin delete-notification-emai_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})

test("Admin_750. @API Endpoint validation for delete-notification-emai ", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deletenotificationemail/' + NotificationId + '/IGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get Method

test("Admin_711. @API Admin fetch the notificationemail-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_712. @API Endpoint validation for notificationemail-form  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemailIGS',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_713. @API Access token validation for notificationemail-form _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})

//Get Method

test("Admin_718. @API Admin fetch the notification-email-edit-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_719. @API Endpoint validation for notification-email-edit-form  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId + '/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_720. @API Access token validation for notification-email-edit-form_information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_721. @API Admin notification-email-edit-form-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/' + NotificationId,
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ac. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})



test("Admin_714. @API Admin notificationemail-form-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001av. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})


test("Admin_747. @API Admin notification-email-list-status-update-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notificationemail/status/' + NotificationId + '/1',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001as. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})

test("Admin_725. @API Admin create the notification_emails-list information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})



test("Admin_726. @API Admin add  the notification_emails-list  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_727. @API Admin add the notification_emails-list   of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


//Get Method

test("Admin_728. @API Admin fetch the notification-email-filter-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


    //Schema validation
    const schema = jschemasonpath.Specilaity_Filter_Schema
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_729. @API Endpoint validation for notification-email-filter  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_730. @API Access token validation for notification-email-filter_information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_731. @API Admin notification-email-filter-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getnotificationemailfilter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})


test("AL_001ak. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})


test("Admin_735. @API Admin create the  notification_emails-filter-search  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_emails_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()
    // notificationID = res.notification_emails.data[0].id
    //  console.log("notificationID is" +notificationID)

})



test("Admin_736. @API Admin add  the  notification_emails-filter-search  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_737. @API Admin add the  notification_emails-filter-search  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_emails_filter_search.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_738. @API Admin create the notification custom-filter-save public or private information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_notification_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Filter saved successfully")


    //Schema validation
    const schema = jschemasonpath.Specialty_custom_filter
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})



test("Admin_739. @API Admin add  the notification- custom-filter-save public or private  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_740. @API Admin add the notification- custom-filter-save public or private  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter/IGS',
        {
            data: jsonObject.Admin_notification_custom_filter.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);



    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_741. @API Admin create the notification-list-field-cloumn-hide and show  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails',
        {
            data: jsonObject.Admin_notification_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()


})



test("Admin_742. @API Admin add  the notification-list-field-cloumn-hide and show  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/notification_emails',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_743. @API Admin add the notification-list-field-cloumn-hide and show  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/notification_emails/IGS',
        {
            data: jsonObject.Admin_notification_field_cloumn_hide_show.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



/////////////////////Data Adminitration////////////////////




test("Admin_669. @API Admin verify  the xlsx file download  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template',
        {
            data: jsonObject.Xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.ms-excel')




})



test("Admin_670. @API  Admin verify  the xlsx file download  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1/import-statistics-template',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_671. @API Admin verify  the xlsx file download of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template/IGS',
        {
            data: jsonObject.Xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_672. @API Admin verify  the csv-file-download format  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template-csv',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/csv')


    //  var res = await response.json()


})



test("Admin_673. @API Admin verify  the csv-file-download   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1/import-statistics-template-csv',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_674. @API Admin verify  the csv-file-download  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/import-statistics-template-csv/IGS',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()   

})



test("Admin_675. @API Admin verify  the exam-statistics-form  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import/exam-statistics',
        {
            data: jsonObject.exam_statistics_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()


})



test("Admin_676. @API Admin verify  the exam-statistics-form   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/import/exam-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_677. @API Admin verify  the exam-statistics-form  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import/exam-statisticsIGS',
        {
            data: jsonObject.exam_statistics_form.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_678. @API Admin verify  the exam-import-statistics-save  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();

    const file = path.resolve("./utils/api/Import_statistics_template.xlsx");
    const image = fs.readFileSync(file);

    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statistics',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,

            },
            multipart: {
                file: {
                    name: "testFile.xlsx",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                },
                exams: '[{"id":3,"name":"Proctoring Exam 1"}]',
                version: '[{"id":2,"name":"2"}]'

            },

        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Exam statistics imported successfully")


    //Schema validation
    const schema = jschemasonpath.Exam_Statistics
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

});



test("Admin_679. @API Admin verify  the exam-import-statistics-save  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1/exam/import-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_680. @API Admin verify  the exam-import-statistics-save of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statisticsIGS',
        {
            // data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


///Question Import

test("Admin_681. @API Admin verify  the xlsx file download  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template',
        {
            data: jsonObject.xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.ms-excel')


})



test("Admin_682. @API Admin verify  the xlsx file download   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/import-question-template',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_683. @API Admin verify  the xlsx file download   of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-templateIGS',
        {
            data: jsonObject.xlsx_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_684. @API Admin verify  the csv-file-download format  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template-csv',
        {
            data: jsonObject.Question_csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/zip')





})



test("Admin_685. @API Admin verify  the csv-file-download   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/import-question-template-csv',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_686. @API Admin verify  the csv-file-download  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/import-question-template-csvIGS',
        {
            data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_687. @API Admin verify  the import-module-type-forms  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/import',
        {
            data: jsonObject.import_module_type.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')


    var res = await response.json()


})



test("Admin_688. @API Admin verify  the import-module-type-forms  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/import',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_689. @API Admin verify  the import-module-type-forms  of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/importIGS',
        {
            data: jsonObject.import_module_type.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



test("Admin_690. @API Admin verify  the Question-import-statistics-save  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();

    const file = path.resolve("./utils/api/Import_question_template.xlsx");
    const image = fs.readFileSync(file);

    const response = await request.post(baseURL + '/question-api/v1/import',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,

            },
            multipart: {
                file: {
                    name: "testFile.xlsx",
                    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    buffer: image
                },
                "bank_id": '[{"id":1,"name":"Practice Bank"}]',

            },


        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");


    var res = await response.json()

    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question import in progress.")


    //Schema validation
    const schema = jschemasonpath.Question_File_Import
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

});



test("Admin_691. @API Admin verify  the Question-import-statistics-save  of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/exam-api/v1/exam/import-statistics',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_692. @API Admin verify  the Question-import-statistics-save of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1/exam/import-statisticsIGS',
        {
            // data: jsonObject.csv_file_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})




test("Admin_697. @API Admin verify  the exam-export-download format  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/export',
        {
            data: jsonObject.exam_export_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/zip')





})



test("Admin_698. @API Admin verify  the exam-export-download   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/exam-api/v1.2/exam/export',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_699. @API Admin verify  the exam-export-download of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/exam-api/v1.2/exam/export/IGS',
        {
            data: jsonObject.exam_export_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_704. @API Admin verify  the export-questions-download  information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/export-questions',
        {
            data: jsonObject.export_questions_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token,
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    // var res = await response.json()


})



test("Admin_705. @API Admin verify  the export-questions-download   of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/export-questions',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(405);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')



})


test("Admin_706. @API Admin verify  the export-questions-download of invalid endpoint", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/export-questionsIGS',
        {
            data: jsonObject.export_questions_download.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})



//Get Method

test("Admin_693. @API Admin fetch the question_import-success -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Verify Response Payload
    expect(await res.Message).toEqual("Question imported successfully")


    //Schema validation
    const schema = jschemasonpath.Question_Import
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()

})


test("Admin_694. @API Endpoint validation for question_import-success  information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4/IGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_695. @API Access token validation for question_import-success _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})




//Get Method

test("Admin_700. @API Admin fetch the export-questions-form -information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()



})


test("Admin_701. @API Endpoint validation for export-questions-form   information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questionsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_702. @API Access token validation for export-questions-form _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



//Get Method

test("Admin_707 @API Admin fetch the export-exams-form-information", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    // console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()


})


test("Admin_708. @API Endpoint validation for export-exams-form    information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-examsIGS',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(404);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    // var res = await response.json()


})


test("Admin_709. @API Access token validation for export-exams-form   _information.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    // var res = await response.json()


})



test("Admin_710. @API Admin export-exams-form-Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-exams',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001aok. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})

test("Admin_703. @API Admin export-questions-form -Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/export-questions',
        {

            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



test("AL_001alk. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
        {
            data: jsonpath.adminLogin.body,
            headers: jsonpath.adminLogin.header
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);
    console.log(await response.json())

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    token = res.access_token
    //Verify Response Payload
    console.log("Access token is:", token)
    expect(await res.message).toEqual("Login Successful")

})



test("Admin_696. @API Admin question_import-success -Header field validation - invalid.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/iAuthorSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question_import_log/4',
        {
            // data: jsonpath.adminLogin.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);


    //Status code validation
    expect(response.status()).toBe(401);


    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

    var res = await response.json()
    //  console.log(res);


})



// test("AL_001ask. @API Admin Login Success with Mandatory Fields", async ({ request }) => {

//     jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
//     jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/adminSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/common/v3/authenticationservice/v3/login',
//         {
//             data: jsonpath.adminLogin.body,
//             headers: jsonpath.adminLogin.header
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath.responseDuration);
//     console.log(await response.json())

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     token = res.access_token
//     //Verify Response Payload
//     console.log("Access token is:", token)
//     expect(await res.message).toEqual("Login Successful")

// })
