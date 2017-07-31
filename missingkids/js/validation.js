
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

    /* ===== ICAAN Form Starts Here ===== */

    $("#js-icaan-form").validate({
        rules: {
            name: "required", 
            firm: "required",
            address: "required",
            city: "required",
            state: "required",
            zip: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
            country_of_interest: "required",
            federal_courts: "required",
            language: "required"
        },
        messages: {
            name: "This field is required",
            firm: "This field is required",
            address: "This field is required",
            city: "This field is required",
            state: "This field is required",
            zip: "This field is required",
            phone: "This field is required",
            email: "This field is required",
            country_of_interest: "This field is required",
            federal_courts: "This field is required",
            language: "This field is required"
        }
    });

    /* ===== Donor Privacy Form Starts Here ===== */

    $("#js-donor-privacy").validate({
        rules: {
            name: "required", 
            email: {
                required: true,
                email: true
            },
            your_request: "required"
        },
        messages: {
            name: "This field is required",
            email: "This field is required",
            your_request: "This field is required"
        }
    });

    /* ===== Contact Us Form Starts Here ===== */

    $("#js-contact-us").validate({
        rules: {
            contact_name: "required", 
            contact_email: {
                required: true,
                email: true
            },
            comments: "required"
        },
        messages: {
            contact_name: "This field is required",
            contact_email: "This field is required",
            comments: "This field is required"
        }
    });

    /* ===== Enews Form Starts Here ===== */

    $("#js-enews").validate({
        rules: { 
            contact_email: {
                required: true,
                email: true
            }
        },
        messages: {
            contact_email: "This field is required"
        }
    });

    /* ===== Media Connect Form Starts Here ===== */

    $("#js-media-connect").validate({
        rules: { 
            email: {
                required: true,
                email: true
            },
            fullname: "required",
            city: "required",
            state: "required"
        },
        messages: {
            email: "This field is required",
            fullname: "This field is required",
            city: "This field is required",            
            state: "This field is required"
        }
    });
    
});