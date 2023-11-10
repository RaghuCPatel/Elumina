//import { APIActions } from '@lib/APIActions';
import { test, expect } from '@playwright/test';

//const apiActions = new APIActions();

var token;

test("To verify if an admin can successfully log in to an Assess App", async ({ request }) => {
    const response = await request.post('https://api.assessappglobal.com.au/common/v3/authenticationservice/v3/login',
        {
            data: {
                "username": "igsuser@mailinator.com",
                "password": "G97$phJ&",
                "rememberMe": ""
            },
            headers: {
                "accept": "application/json",
                "webreferer": "https://sandbox-staging.assessappglobal.com.au/"
            }
        });
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
    expect(await res.message).toEqual("Login Successful")
})