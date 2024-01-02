//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { token } from './adminToken.test';
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

test("QS_059. @API Validation of Scenario question successfull message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.scenario.body,
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

test("QS_060. @API Validation of edit Scenario question successfull message.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/editquestion/' + mcqID + '/?type=typea',
        {
            data: jsonpath.scenario.editscenariobody,
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

test("QS_061. @API Validation of Scenario question Approved message.", async ({ request }) => {
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


test("QS_062. @API Validation of Scenario question checkout message.", async ({ request }) => {
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

test("QS_061A. @API Validation of Scenario question Approved message (again).", async ({ request }) => {
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


test("QS_039. @API Scenario question endpoint validation", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/tttquestion-api/v1/question',
        {
            data: jsonpath.scenario.body,
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

test("QS_040. @API Scenario question- Method validation-  incorrect HTTP method", async ({ request }) => {
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

test("QS_041. @API Scenario question- Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.scenario.body,
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

test("QS_042. @API Validation of empty title field for Scenario question", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/question-api/v1/question',
        {
            data: jsonpath.scenario.emptyTitleBody,
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
