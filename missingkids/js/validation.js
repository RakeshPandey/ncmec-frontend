
$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$().ready(function() {
    // validate the comment form when it is submitted
 //   $("#js-interview-form").validate();

    // validate signup form on keyup and submit

    // Interview Form Starts Here

    $("#js-interview-form").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            email: "Please enter a valid email address"
        }
    });

    // Online Application Form Starts Here

    $("#js-online-application").validate({
        rules: {
            prefix: "required", 
            fname: "required",
            lname: "required",
            agency_dept: "required",
            address: "required",
            city: "required",
            state: "required",
            zip: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            additional_info: "required"
        },
        messages: {
            prefix: "This field is required",
            fname: "This field is required",
            lname: "This field is required",
            agency_dept: "This field is required",
            address: "This field is required",
            city: "This field is required",
            state: "This field is required",
            zip: "This field is required",
            phone: "This field is required",
            email: "This field is required",
            additional_info: "This field is required"
        }
    });
    
});