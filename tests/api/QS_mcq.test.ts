//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
//import { token } from './adminToken.test';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';

let verifyResponse = new ValidationResponse;

//const apiActions = new APIActions();
const baseURL = "https://api.assessappglobal.com.au"

const Ajv = require('ajv')
const avj = new Ajv()

//var token;
var jsonpath;
var mcqID: any;
var schemajsonpath;


export let token;
var jschemasonpath;

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

test("QS_001. @API Validation of MCQ question successfull message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.mcq.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    mcqID = res.Response.QuestionID
    console.log("Question id is:", mcqID)
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question created successfully")

    //Schema validation
    const schema = schemajsonpath.createmcq
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_002. @API Validation of edit MCQ question successfull message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/editquestion/' + mcqID + '/?type=typea',
        {
            data: jsonpath.mcq.editmcqbody,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

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
    expect(await res.Response.Message).toEqual("Question updated successfully")

    //Schema validation
    const schema = schemajsonpath.editmcq
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_003. @API Validation of MCQ question Approved message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
        {
            data: jsonpath.mcq.approvequestion,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

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
    expect(await res.Response.Message).toEqual("Status has been updated successfully.")

    //Schema validation
    const schema = schemajsonpath.approve
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_005. @API Validation of MCQ question checkout message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question/workflow/checkout/' + mcqID,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

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
    expect(await res.Response.Message).toEqual("Question has been checked out")

    //Schema validation
    const schema = schemajsonpath.checkout
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_003A. @API Validation of MCQ question Approved message (again).", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
        {
            data: jsonpath.mcq.approvequestion,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

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
    expect(await res.Response.Message).toEqual("Status has been updated successfully.")
})

test("QS_004. @API Validation of create question page.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/createQuestion?type=1',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()

    //Schema validation
    const schema = schemajsonpath.fetchCreateQuestionPage
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("QS_006. @API endpoint validation", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/tttquestion-api/v1/question',
        {
            data: jsonpath.mcq.body,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);
    expect(response.statusText()).toBe("Not Found");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
})

test("QS_007. @API Method validation-  incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/question-api/v1/question',
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
    expect(response.statusText()).toBe("Method Not Allowed");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("QS_008. @API Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.mcq.body,
            headers: jsonpath.mcq.invalidheader,
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
})

test("QS_009. @API Validation of empty title field.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.mcq.emptyTitleBody,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Question topic is required.")
}) 
