
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

let roleName = makeid(9)
export var jsonObject =
{
    //User related payload 
    "Admin_add_user_save": {
        "body": {
            "first_name": "admin",
            "last_name": "api",
            "username": (makeid(5) + Math.floor(Math.random() * 89 + 100)),
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "empty_username_body": {
            "first_name": "admin",
            "last_name": "api",
            "username": "",
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        },
        "Admin_user_edit_update": {
            "first_name": "admin",
            "last_name": "api",
            "username": (makeid(5) + Math.floor(Math.random() * 89 + 100)),
            "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
            "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
            "mobile": "",
            "dob": "",
            "startdate": "",
            "enddate": "",
            "generate_pwd": "j3r%wStFBP"
        }
    },

    //Role related payload
    "Admin_Role": {
        "Admin_role_save": {
            "name": roleName, "description": roleName, "product_id": "[{\"id\":2,\"name\":\"OE\",\"value\":\"\",\"displayName\":\"OE\"}]"
        },
        "Admin_roles_list_search": { "freeText": [roleName] },
        "Admin_roles_filter_search": {
            "filterArray": [
                {
                    "filterId": "Module",
                    "operator": "eq",
                    "displayText": "Module <span>is equal to</span> ",
                    "filterValue1": "OE",
                    "filterValue2": "Select one",
                    "operation": ""
                }
            ],
            "freeText": [
                ""
            ]
        },
        "Admin_role_custom_filter_save": {
            "filterArray": {
                "filterName": "OE Fiend" + makeid(2),
                "filterType": "public",
                "filterPage": "view-roles",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Module",
                    "operator": "eq",
                    "displayText": "Module <span>is equal to</span> ",
                    "filterValue1": "OE",
                    "filterValue2": "Select one",
                    "operation": ""
                }
            ]
        },
        "Admin_role_update": {
            "name": roleName,
            "description": "<p>Supervisor</p>",
            "product_id": "[{\"id\":7,\"name\":\"WBA\",\"value\":\"\",\"displayName\":\"WBA\"}]"
        }
    }

}