
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

    // Online Application Form 1 Starts Here

    $("#js-ncmec-univ-form").validate({
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

    // Online Application Form 2 Starts Here

     $("#js-ce-application").validate({
        rules: {
            prefix_1: "required", 
            fname_1: "required",
            lname_1: "required",
            first_choice_1: "required",
            second_choice_1: "required",
            agency_dept_1: "required",
            address_1: "required",
            city_1: "required",
            state_1: "required",
            zip_1: "required",
            phone_1: "required",
            email_1: {
                required: true,
                email: true
            },
            child_policy_1: "required",
            jurix_population: "required",
            sworn_officers: "required"
        },
        messages: {
            prefix_1: "This field is required",
            fname_1: "This field is required",
            lname_1: "This field is required",
            first_choice_1: "This field is required",
            second_choice_1: "This field is required",
            agency_dept_1: "This field is required",
            address_1: "This field is required",
            city_1: "This field is required",
            state_1: "This field is required",
            zip_1: "This field is required",
            phone_1: "This field is required",
            email_1: "This field is required",
            child_policy_1: "This field is required",
            jurix_population: "This field is required",
            sworn_officers: "This field is required"
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
            comments: {
                required: true,
                minlength: 8
            }
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