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
 
let bankName = makeid(8);
let tagName = makeid(8);
let locationname = makeid(8);
let questionType =(Math.floor(Math.random() * 89 + 100));

export var jsonObject =
{
    "Admin_Bank_Create_Form": {
        "body": 
            {
                "name": bankName,
                "description": "<p>bank</p>",
                "workflow": "No Workflow",
                "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
                "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"slug\":\"typea\",\"distractor_count\":\"2\",\"mark\":\"1\",\"readonly\":\"\",\"max_limit\":10}]"
            }
        // "empty_username_body": {
        //     "first_name": "admin",
        //     "last_name": "api",
        //     "username": "",
        //     "email": (makeid(7) + Math.floor(Math.random() * 899 + 100) + '@yopmail.com'),
        //     "phone": ('6' + Math.floor(Math.random() * 899999999 + 100)),
        //     "mobile": "",
        //     "dob": "",
        //     "startdate": "",
        //     "enddate": "",
        //     "generate_pwd": "j3r%wStFBP"
        // }
    },
    "Admin_Bank_Search_form": {
        "body":
        {
            
                "freeText": [
                    bankName
                ]
            
        }
    },
    "Bank_Pagination":{
      "body":{
        "freeText":
      ["Test"],
      "pagination":5
    }
    },
    "Banks_Filter_search":{
        "body":{
                "filterArray": [
                    {
                        "filterId": "Bank",
                        "operator": "like",
                        "displayText": "Bank <span>is like</span> ",
                        "filterValue1": "Qa",
                        "filterValue2": "",
                        "operation": ""
                    }
                ],
                "freeText": []
            
        }
    },
    "Bank_custom_filter":{
        "body":{
            "filterArray": {
                "filterName": bankName,
                "filterType": "public",
                "filterPage": "view-banks",
                "filter_id": ""
            },
            "customFilter": [
                {
                    "filterId": "Bank",
                    "operator": "like",
                    "displayText": "Bank <span>is like</span> ",
                    "filterValue1": "Qa",
                    "filterValue2": "",
                    "operation": ""
                }
            ]
        }
    },
    "Bank_show_column":{
          "body":{
            "freeText": [],
            "showColumns": [
                "BANK",
                "mappings"
            ]
        }
    },
    "Admin_Bank_Edit_form" :
    {
        "body":
        {
            "name": makeid(8),
            "description": "<p>bank</p>",
            "workflow": "No Workflow",
            "tags": "[{\"id\":9,\"name\":\"LIV Test\"}]",
            "question_types": "[{\"id\":1,\"name\":\"MCQ\",\"mark\":\"1\",\"distractor_count\":\"2\",\"max_limit\":10,\"readonly\":\"\",\"tags\":[]}]"
        }
            
        
    },
    "Admin_Tag_Create_Form": {
        "body": 
        {
        "tag": tagName,
        "control":{"control_id":"1",
        "control_value":"Text",
        "tag_value":[{"id":"",
        "value":"testapii"}],
        "removedTags":[]
    }
}
},
"Tag_Search_Form":{
    "body":{
        "freeText": [
            tagName
        ]
    }
},
"Tag_Edit_Form":{
    "body":{"tag":makeid(8),
    //"testapi (1) du update",
            "control":{"control_id":1,
            "control_value":"Text",
            "tag_value":[{"id":187,
            "value":"testapii update"}],
            "removedTags":[]}}
},
"Tag_Filter_Search":{
    "body":{"filterArray":[{"filterId":"Tag","operator":"like","displayText":"Tag <span>is like</span> ","filterValue1":"tree","filterValue2":"","operation":""}],"freeText":[]}
},
"Tag_Custom_filter":{
    "body":{
        "filterArray": {
            "filterName": "tagtree",
            "filterType": "public",
            "filterPage": "view-tags",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Tag",
                "operator": "like",
                "displayText": "Tag <span>is like</span> ",
                "filterValue1": "tree",
                "filterValue2": "",
                "operation": ""
            }
        ]
    }
},
"Tag_Pagination":{
    "body":{"freeText":[],
    "pagination":10}
},
"Tag_Show_Column":{
    "body":{
        "freeText": [],
        "showColumns": [
            "TAG",
            "mappings"
        ]
    }
},
"Location_Save_Form":{
    "body":{
        "name": locationname,
        "short_name": "loc",
        "time_zone": 69,
        "day_light_savings": true,
        "status": "1"
    }
},
"Location_Search_Form":{
    "body": {"freeText":[locationname]}
},
"Location_Edit_Form":{
    "body":{
        "name": locationname,
        //"test location2 update",
        "short_name": "loc",
        "time_zone": 69,
        "day_light_savings": true,
        "status": "1"
    }
},
"Location_Filter_Search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Name",
                "operator": "like",
                "displayText": "Name <span>is like</span> ",
                "filterValue1": "chennai",
                "filterValue2": "",
                "operation": ""
            }
        ],
        "freeText": [
            ""
        ]
    }
},
"Location_Filters_Search":{
    "body":{"filterArray":{"filterName":"chennai",
    "filterType":"public",
    "filterPage":"locations",
    "filter_id":""},
    "customFilter":[{"filterId":"Name",
    "operator":"like",
    "displayText":"Name <span>is like</span> ",
    "filterValue1":"chennai",
    "filterValue2":"",
    "operation":""}]}
},
"Location_Show_Column":{
    "body":{"freeText":[""],
    "showColumns":["NAME",
    "mappings"]}
},
"Save_Checkout":{
    "body":{
        "checkout_time": "1"
    }
},
"Save_Proctoring":{
    "body":{"video_recording":true,"audio_recording":true,"screenshot_enable":true,"video_fragment_size":[{"id":"5","name":"5 seconds"}],"face_recognition_match":[{"id":"70","name":"70%"}],"screenshot_capture_interval":[{"id":"30","name":"30 seconds"}],"enforce_hardware_check":false,"camera_link":"https://support.assessapp.com.au/portal/en/kb/articles/troubleshoot-webcam-28-7-2020","microphone_link":"https://support.assessapp.com.au/portal/en/kb/articles/troubleshoot-webcam-28-7-2020","browsercheck_link":"https://success.eluminaelearning.com.au/portal/en/kb/articles/troubleshoot-browser","termsandcondition":"<p>All the best!!!All the best!!!All the best!!!</p>","iproctor_extension":true,"internet_connection_check":true,"internet_upload_speed":[{"id":"2","name":"1mbps"}],"internet_download_speed":[{"id":"2","name":"1mbps"}],"prompt_candidate":"Your assessment is now being proctored - you can return to the exam","extension_version_message":"Please ensure that you are using the current version of the extension ($version)"}
},
"Admin_question_type_Create_Form":{
    "body":{
        "question_types": [
            {
                "id": 12,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id":questionType,
                "name": "api bank2 (1)"
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
    }
},

"Question_type_Search_Form":{
    "body":{
        "freeText": [
            "api bank2 (1)"
        ]
    }
},

"Question_Type_Edit_Form":{
    "body":{
        "question_types": [
            {
                "id": 12,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id": questionType,
                "name": "Elumina - Bank"
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
    }
},
"Admin_question_type_filter_Search":{
    "body":{
        "filterArray": [
            {
                "filterId": "Bank",
                "operator": "eq",
                "displayText": "Bank <span>is equal to</span> ",
                "filterValue1": "Practice Bank",
                "filterValue2": "Select one",
                "operation": ""
            }
        ],
        "freeText": [
            ""
        ]
    }
},
"Admin_question_type_custom_filter":{
    "body":{
        "filterArray": {
            "filterName": bankName,
            "filterType": "public",
            "filterPage": "view-question-types",
            "filter_id": ""
        },
        "customFilter": [
            {
                "filterId": "Bank",
                "operator": "eq",
                "displayText": "Bank <span>is equal to</span> ",
                "filterValue1": "Practice Bank",
                "filterValue2": "Select one",
                "operation": ""
            }
        ]
    }
},
"Admin_Question_type_column_Show":{
    "body":{
        "freeText": [
            ""
        ],
        "showColumns": [
            "LAST MODIFIED DATE",
            "mappings"
        ]
    }
},
"Admin_Question_type_duplicate":{
    "body":{
        "question_types": [
            {
                "id": 24,
                "name": "Type B"
            }
        ],
        "banks": [
            {
                "id": questionType,
                "name": "Practice Bank"
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
    }
}

}