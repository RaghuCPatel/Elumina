//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { jsonObject } from 'pageFactory/pageRepository/api_AdminPage';
//import { token } from './adminToken.test';
import { ValidationResponse } from '../../utils/validationUtiles/ResponseValidation';

let verifyResponse = new ValidationResponse;

//const apiActions = new APIActions();
const baseURL = "https://api.assessappglobal.com.au"

const Ajv = require('ajv')
const avj = new Ajv()

//var token;
var jsonpath1;
var jsonpath;
var mcqID: any;
var schemajsonpath;

export let token;
let UserId;
let roleId;
let user_activity_name;
var jschemasonpath;
jsonpath1 = JSON.parse(fs.readFileSync(path.resolve('utils/api/questionsData.json'), 'utf-8'))


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

test("Admin_017. @API Admin add the user and save", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.body,
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
    UserId = res.Response.userId
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("User created successfully and an email has been sent to their email.")

    //Schema validation
    const schema = jschemasonpath.Admin_add_user_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_001. @API Admin fetch the user-form-information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("Admin_002. @API Endpoint validation for user-form-information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_003. @API Access token validation for user_form_information", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_005. @API Admin fetch the user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("Admin_006. @API Endpoint validation for user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_007. @API Access token validation for user-address-location", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_009. @API Admin Admin fetch the user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("Admin_010. @API Endpoint validation for user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_011. @API Access token validation for user-setting", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_013. @API Admin fetch the user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });
    console.log(await response.json())

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy()
    expect(response.statusText()).toBe("OK");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')

})

test("Admin_014. @API Endpoint validation for user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/formIGS?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(404);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')

})

test("Admin_015. @API Access token validation for user-role", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": ""
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    //Verify Response Payload
    expect(await res.error_description).toEqual("The access token is missing")

})

test("Admin_019. @API Admin add the user-save_validation of incorrect HTTP method", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user',
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

test("Admin_020. @API Admin add the user-save_validation of invalid endpoint.", async ({ request }) => {

    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/userIGS',
        {
            data: jsonObject.Admin_add_user_save.body,
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
})

test("Admin_021. @API Admin add the user-address-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId,
        {
            data: jsonpath.Admin_add_user_address_save.body,
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
    expect(await res.Response.Message).toEqual("User contact created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_add_user_address_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_023. @API Admin add the user-address-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-contact/' + UserId,
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

test("Admin_024. @API Admin add the user-address-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/IGS',
        {
            data: jsonpath.Admin_add_user_address_save.body,
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
})

test("Admin_025. @API Admin fetch the user-setting-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId,
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
})

test("Admin_026. @API Endpoint validation for user-setting-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/IGS',
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
})

test("Admin_028. @API Admin_user-setting-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId,
        {
            data: jsonpath.Admin_user_setting_save.body,
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
    expect(await res.Response.Message).toEqual("User setting created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_setting_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_029. @API Admin user-setting-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-setting/' + UserId,
        {
            data: jsonpath.Admin_user_setting_save.body,
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

test("Admin_030. @API Admin user-setting-savee_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/IGS',
        {
            data: jsonpath.Admin_user_setting_save.body,
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
})

test("Admin_031. @API Admin fetch theUser-role-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId,
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
})

test("Admin_032. @API Endpoint validation for User-role-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/IGS',
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
})

test("Admin_034. @API Admin_user-role-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId,
        {
            data: jsonpath.Admin_user_role_save.body,
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
    expect(await res.Response.Message).toEqual("User roles created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_role_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_035. @API Admin user-role-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-role/' + UserId,
        {
            data: jsonpath.Admin_user_role_save.body,
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

test("Admin_036. @API Admin user-role-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/user-role/' + UserId + '/IGS',
        {
            data: jsonpath.Admin_user_role_save.body,
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
})

test("Admin_037. @API Admin fetch the user-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user',
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
})

test("Admin_038. @API Endpoint validation for user-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/userIGS',
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
})

test("Admin_040. @API Admin fetch the user-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId,
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
})

test("Admin_041. @API Endpoint validation for user-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/IGS',
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
})

test("Admin_043. @API Admin fetch the user-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-form',
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
})

test("Admin_044. @API Endpoint validation for user-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-formIGS',
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
})

test("Admin_046. @API Admin_user-edit-update", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user/' + UserId,
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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
    expect(await res.Response.Message).toEqual("User updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_047. @API Admin user-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.put(baseURL + '/admin-api/v1/user/' + UserId,
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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

test("Admin_048. @API Admin user-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user/' + UserId + '/IGS',
        {
            data: jsonObject.Admin_add_user_save.Admin_user_edit_update,
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
})

test("Admin_049. @API Admin fetch the user-address-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form',
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
})

test("Admin_050. @API Endpoint validation for user-address-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/formIGS',
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
})

test("Admin_052. @API Admin_user-address-edit-update", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/save',
        {
            data: jsonpath.Admin_user_address_edit_update_body,
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
    expect(await res.Response.Message).toEqual("User contact updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_address_edit_update_body
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_053. @API Admin user-address-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/save',
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

test("Admin_054. @API Admin user-address-edit-updatee_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId + '/saveIGS',
        {
            data: jsonpath.Admin_user_address_edit_update_body,
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
})

test("Admin_055. @API Admin fetch the user-setting-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form',
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
})

test("Admin_056. @API Endpoint validation for user-setting-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/formIGS',
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
})

test("Admin_058. @API Admin_user-setting-edit-update", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/save',
        {
            data: jsonpath.Admin_user_setting_edit_update,
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
    expect(await res.Response.Message).toEqual("User setting updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_setting_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_059. @API Admin user-setting-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/save',
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

test("Admin_060. @API Admin user-setting-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-setting/' + UserId + '/saveIGS',
        {
            data: jsonpath.Admin_user_setting_edit_update,
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
})

test("Admin_064. @API Admin_user-setting-edit-update", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId + '/save',
        {
            data: jsonpath.Admin_user_role_edit_update,
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
    expect(await res.Response.Message).toEqual("User roles updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_user_role_edit_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_065. @API Admin user-setting-edit-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/save',
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

test("Admin_066. @API Admin user-setting-edit-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-role/' + UserId + '/saveIGS',
        {
            data: jsonpath.Admin_user_role_edit_update,
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
})

test("Admin_067. @API Admin_users-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/users',
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
})

test("Admin_068. @API Admin users-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/users',
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

test("Admin_069. @API Admin users-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/usersIGS',
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
})

test("Admin_070. @API Admin_users-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/users',
        {
            data: jsonpath.Admin_user_edit_update,
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

test("Admin_071. @API Admin users-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/users',
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

test("Admin_072. @API Admin users-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/usersIGS',
        {
            data: jsonpath.Admin_user_edit_update,
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
})

test("Admin_076. @API Admin_Save-logout-settings", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-logout-settings',
        {
            data: jsonpath.Admin_Save_logout_settings,
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
    expect(await res.Response.Message).toEqual("Logout idle time updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_Save_logout_settings
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_077. @API Admin Save-logout-settings_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/save-logout-settings',
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

test("Admin_078. @API Admin Save-logout-settings_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/save-logout-settingsIGS',
        {
            data: jsonpath.Admin_Save_logout_settings,
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
})

test("Admin_079. @API Admin_save-rate-limit-login", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rate-limit-login',
        {
            data: jsonpath.Admin_save_rate_limit_login,
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
    expect(await res.Response.Message).toEqual("Rate Limit Login settings has been updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_save_rate_limit_login
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_080. @API Admin save-rate-limit-login_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/rate-limit-login',
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

test("Admin_081. @API Admin save-rate-limit-login_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rate-limit-loginIGS',
        {
            data: jsonpath.Admin_save_rate_limit_login,
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
})

test("Admin_061. @API Admin fetch the user-role-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form',
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
})

test("Admin_062. @API Endpoint validation for user-role-edit-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/formIGS',
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
})

test("Admin_073. @API Admin fetch the logout-settings-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settings',
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
})

test("Admin_074. @API Endpoint validation for logout-settings-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settingsIGS',
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
})

test("Admin_082. @API Admin fetch the rate-limit-login-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-login',
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
})

test("Admin_083. @API Endpoint validation for rate-limit-login-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-loginIGS',
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
})

test("Admin_098. @API Admin_role-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role',
        {
            data: jsonObject.Admin_Role.Admin_role_save,
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
    expect(await res.Response.Message).toEqual("Role created successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_role_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_099. @API Admin role-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/role',
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

test("Admin_100. @API Admin role-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roleIGS',
        {
            data: jsonObject.Admin_Role.Admin_role_save,
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
})

test("Admin_101. @API Admin fetch the role-create-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form',
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
})

test("Admin_102. @API Endpoint validation for role-create-form", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form/IGS',
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
})

test("Admin_104. @API Admin_Role list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
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
})

test("Admin_105. @API Admin Role list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_106. @API Admin Role list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
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
})

test("Admin_107. @API Admin fetch the role-filter-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilter',
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
})

test("Admin_108. @API Endpoint validation for role-filter-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilterIGS',
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
})

test("Admin_110. @API Admin_roles-list-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search,
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
    roleId = res.roles.data[0].id
    console.log("Rile id: ", roleId)
})

test("Admin_111. @API Admin roles-list-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_112. @API Admin roles-list-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
        {
            data: jsonObject.Admin_Role.Admin_roles_list_search,
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
})

test("Admin_113. @API Admin_roles-filter-search", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles',
        {
            data: jsonObject.Admin_Role.Admin_roles_filter_search,
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

test("Admin_114. @API Admin roles-filter-search_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles',
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

test("Admin_115. @API Admin roles-filter-search_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS',
        {
            data: jsonObject.Admin_Role.Admin_roles_filter_search,
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
})

test("Admin_116. @API Admin_role-custom-filter-save", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filter',
        {
            data: jsonObject.Admin_Role.Admin_role_custom_filter_save,
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
    const schema = jschemasonpath.Admin_role_custom_filter_save
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_117. @API Adminrole-custom-filter-save_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/custom-filter',
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

test("Admin_118. @API Admin role-custom-filter-save_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/custom-filterIGS',
        {
            data: jsonObject.Admin_Role.Admin_role_custom_filter_save,
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
})
test("Admin_119. @API Admin_role-list-pagination", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles?page=2',
        {
            data: jsonpath.Admin_role_list_pagination,
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

    var res = await response.json();
})

test("Admin_120. @API Adminrole-role-list-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles?page=2',
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

test("Admin_121. @API Admin role-list-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS?page=2',
        {
            data: jsonpath.Admin_role_list_pagination,
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
})

test("Admin_122. @API Admin_roles-list-column-hiden", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/roles?page=2',
        {
            data: jsonpath.Admin_roles_list_column_hiden,
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

    var res = await response.json();
})

test("Admin_123. @API Adminrole-roles-list-column-hiden_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/roles?page=2',
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

test("Admin_124. @API Admin roles-list-column-hiden_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/rolesIGS?page=2',
        {
            data: jsonpath.Admin_roles_list_column_hiden,
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
})

test("Admin_125. @API Admin_role-update", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role/' + roleId,
        {
            data: jsonObject.Admin_Role.Admin_role_update,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role updated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_role_update
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_126. @API Adminrole-role-update_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/role/' + roleId,
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

test("Admin_127. @API Admin role-update_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/role/' + roleId + '/IGS',
        {
            data: jsonObject.Admin_Role.Admin_role_update,
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
})

test("Admin_085. @API Admin fetch the role-duplicate", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role duplicated successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_fetch_the_role_duplicate
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_086. @API Endpoint validation for role-duplicate", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId + '/IGS',
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
})

test("Admin_088. @API Admin fetch the delete-role", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId,
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

    var res = await response.json();
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("Role deleted successfully")

    //Schema validation
    const schema = jschemasonpath.Admin_fetch_the_delete_role
    const validate = avj.compile(schema)
    const isValid = validate(res)
    expect(isValid).toBeTruthy()
})

test("Admin_089. @API Endpoint validation for delete-role", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId + '/IGS',
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
})

test("Admin_091. @API Admin delete-role_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/deleterole/' + roleId,
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

test("Admin_128. @API Admin fetch the user-activities-filter", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivities',
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
})

test("Admin_129. @API Endpoint validation for user-activities-filter", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivitiesIGS',
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
})

test("Admin_131. @API Admin_user-activities-list", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities',
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

    var res = await response.json();
})

test("Admin_132. @API Admin user-activities-list_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities',
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

test("Admin_133. @API Admin user-activities-list_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS',
        {
            data: jsonObject.Admin_Role.Admin_role_update,
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
})

test("Admin_134. @API Admin_user-activities-list-pagination", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivities?page=2',
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

    var res = await response.json();
    user_activity_name = res.useractivities.data[0]["user name"]
    console.log("User activity name:", user_activity_name)
})

test("Admin_135. @API Admin user-activities-list-pagination_validation of incorrect HTTP method", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/useractivities?page=2',
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

test("Admin_136. @API Admin user-activities-list-pagination_validation of invalid endpoint.", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/useractivitiesIGS?page=2',
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
})

test("Admin_0130. @API Admin user-activities-filter-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/filters/useractivities',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001T. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_090. @API Admin delete-role-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.delete(baseURL + '/admin-api/v1/deleterole/' + roleId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001S. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_087. @API Admin role-duplicate-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/duplicateRole/' + roleId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001R. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_109. @API Admin role-filter-list-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/getrolefilter',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001Q. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_103. @API Admin role-create-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/role/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001P. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_084. @API Admin rate-limit-login-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/rate-limit-login',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001O. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_075. @API Admin logout-settings-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/get-logout-settings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001N. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_063. @API Admin user-role-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001M. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_057. @API Admin user-setting-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001L. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_051. @API Admin user-address-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001K. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_045. @API Admin user-edit-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/edit-form',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001J. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_042. @API Admin user-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001I. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_039. @API Admin user-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001H. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_033. @API Admin User-role-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001G. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_027. @API Admin user-setting-form-Header field validation - invalid", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId,
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
})

test("AL_001F. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_022. @API Admin add theuser-address-save_empty state_id", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/commonSettingData.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user-contact/' + UserId,
        {
            data: jsonpath.Admin_add_user_address_save.empty_state_idbody,
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
                "authorization": token
            }
        });
    //Validation of response time
    verifyResponse.validateTime(jsonpath.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json')
})

test("AL_001E. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_016. @API user-role-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-role/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001D. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_018. @API Admin add the user-save_empty username", async ({ request }) => {
    jsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/api/adminCredential.json'), 'utf-8'))
    jschemasonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/settingAdminShema.json'), 'utf-8'))
    verifyResponse.fetchrequestTime();
    const response = await request.post(baseURL + '/admin-api/v1/user',
        {
            data: jsonObject.Admin_add_user_save.empty_username_body,
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
    expect(response.status()).toBe(401);

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

    var res = await response.json()
    UserId = res.Response.userId
    //Verify Response Payload
    expect(await res.Response.Message).toEqual("The username field is required.")

})

test("AL_001C. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_012. @API user-setting-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-setting/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001A. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_008. @API user address location-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user-contact/' + UserId + '/form?type=personalSettings',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            },
            params: {
                "type": "personalSettings"
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})

test("AL_001B. @API Admin Login Success with Mandatory Fields", async ({ request }) => {
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

test("Admin_004. @API Admin user information-Header field validation - invalid", async ({ request }) => {
    verifyResponse.fetchrequestTime();
    const response = await request.get(baseURL + '/admin-api/v1/user/' + UserId + '/formIGS',
        {
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.auIGS/",
                "authorization": token
            }
        });

    //Validation of response time
    verifyResponse.validateTime(jsonpath1.responseDuration);

    //Status code validation
    expect(response.status()).toBe(401);
    expect(response.statusText()).toBe("Unauthorized");

    //Verify Response Headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')
    var res = await response.json()
    console.log(res)
})





// test("QS_067. @API Validation of ISAWE-CASE question successfull message.", async ({ request }) => {
//     schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/question',
//         {
//             data: jsonpath1.isawe_case.body,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     mcqID = res.Response.QuestionID
//     console.log("Question id is:", mcqID)
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Question created successfully")

//     //Schema validation
//     const schema = schemajsonpath.createmcq
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })

// test("QS_068. @API Validation of edit ISAWE-CASE question successfull message.", async ({ request }) => {
//     schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/editquestion/' + mcqID + '/?type=typea',
//         {
//             data: jsonpath1.isawe_case.editisawe_casebody,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Question updated successfully")

//     //Schema validation
//     const schema = schemajsonpath.editmcq
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })

// test("QS_069. @API Validation of ISAWE-CASE question Approved message.", async ({ request }) => {
//     schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
//         {
//             data: jsonpath1.mcq.approvequestion,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Status has been updated successfully.")

//     //Schema validation
//     const schema = schemajsonpath.approve
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })


// test("QS_070. @API Validation of ISAWE-CASE question checkout message.", async ({ request }) => {
//     schemajsonpath = JSON.parse(fs.readFileSync(path.resolve('utils/schema/mcqSchema.json'), 'utf-8'))
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/question-api/v1/question/workflow/checkout/' + mcqID,
//         {
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Question has been checked out")

//     //Schema validation
//     const schema = schemajsonpath.checkout
//     const validate = avj.compile(schema)
//     const isValid = validate(res)
//     expect(isValid).toBeTruthy()
// })

// test("QS_069A. @API Validation of ISAWE-CASE question Approved message (again).", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/question/workflow/save/' + mcqID,
//         {
//             data: jsonpath1.mcq.approvequestion,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(200);
//     expect(response.ok()).toBeTruthy()
//     expect(response.statusText()).toBe("OK");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Status has been updated successfully.")
// })


// test("QS_071. @API ISAWE-CASE endpoint validation", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/tttquestion-api/v1/question',
//         {
//             data: jsonpath1.isawe_case.body,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(404);
//     expect(response.statusText()).toBe("Not Found");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

//     var res = await response.json()
// })

// test("QS_072. @API ISAWE-CASE Method validation-  incorrect HTTP method", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.get(baseURL + '/question-api/v1/question',
//         {
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(405);
//     expect(response.statusText()).toBe("Method Not Allowed");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('text/html; charset=UTF-8')
// })

// test("QS_073. @API ISAWE-CASE Header field validation - invalid", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/question',
//         {
//             data: jsonpath1.isawe_case.body,
//             headers: jsonpath1.mcq.invalidheader,
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status()).toBe(401);
//     expect(response.statusText()).toBe("Unauthorized");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

//     var res = await response.json()
// })

// test("QS_074. @API Validation of empty title field for ISAWE-CASE", async ({ request }) => {
//     verifyResponse.fetchrequestTime();
//     const response = await request.post(baseURL + '/question-api/v1/question',
//         {
//             data: jsonpath1.isawe_case.emptyTitleBody,
//             headers: {
//                 "accept": "application/json",
//                 "webreferer": "https://sandbox-staging.assessappglobal.com.au/",
//                 "authorization": token
//             }
//         });
//     console.log(await response.json())

//     //Validation of response time
//     verifyResponse.validateTime(jsonpath1.responseDuration);

//     //Status code validation
//     expect(response.status).toBe(401);
//     expect(response.statusText()).toBe("Unauthorized");

//     //Verify Response Headers
//     expect(response.headers()['content-type']).toBe('application/json')

//     var res = await response.json()
//     //Verify Response Payload
//     expect(await res.Response.Message).toEqual("Question topic is required.")
// })  
