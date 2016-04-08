// Using jQuery to handle form submit
// and for reading sessionStorage or localStorage
$(document).ready(function () {

    // regex
    const REGEX_ALPHANUMERIC = /^[a-zA-Z0-9 ]+$/i;
    const REGEX_NAME = /^[a-zA-Z ]+$/;
    const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const REGEX_PHONE = /\d/g;

    const NAME_MIN = 5;
    const NAME_MAX = 100;
    const EMAIL_MIN = 6;
    const EMAIL_MAX = 50;
    const NUMBER_MIN = 9;
    const NUMBER_MAX = 12;
    const COMPANY_NAME_MIN = 2;
    const COMPANY_NAME_MAX = 30;
    const SUBJECT_MIN = 15;
    const SUBJECT_MAX = 100;
    const MESSAGE_MIN = 50;
    const MESSAGE_MAX = 650;


    // form DOM elements
    var f_name = document.getElementById("c_name");
    var f_email = document.getElementById("c_email");
    var f_number = document.getElementById("c_number");
    var f_company_name = document.getElementById("c_company_name");
    var f_subject = document.getElementById("c_subject");
    var f_message = document.getElementById("c_message");

    // messages and errors elements
    var main_message = document.getElementById("user_message");
    var err_name = document.getElementById("err_name");
    var err_email = document.getElementById("err_email");
    var err_number = document.getElementById("err_number");
    var err_company_name = document.getElementById("err_company_name");
    var err_subject = document.getElementById("err_subject");
    var err_message = document.getElementById("err_message");

    // messages
    const MSG_ERR_STORAGE = "Session storage and Local storage not supported!";

    const MSG_FORM_SAVED_SENT = "Formularz zapisany";
    const MSG_INVALID_FIELDS = "Formularz zawiera niepoprawne dane";

    const MSG_ERR_NAME = "Niepoprawne imie i nazwisko";
    const MSG_ERR_EMAIL = "Niepoprawny email";
    const MSG_ERR_PHONE = "Niepoprawny numer telefonu";
    const MSG_ERR_COMPANY_NAME = "Niepoprawna nazwa firmy";
    const MSG_ERR_LENGTH = "Podana wartosc jest nieodpowiedniej dlugosci";

    // enable tooltips about length
    $('[data-toggle="tooltip"]').tooltip();

    // main functionality
    readStorageData();

    var form = $('#main-contact-form');
    var status_danger = $('<div class="alert text-center alert-danger"></div>');
    var status_success = $('<div class="alert text-center alert-success"></div>');
    var status_info = $('<div class="alert text-center alert-info"></div>');

    form.submit(function (event) {
        event.preventDefault();


        if (validate()) {
            saveFormData();
            form.prepend(status_success.html('<p><i class="fa fa-exclamation-circle">&nbsp;</i>' + MSG_FORM_SAVED_SENT + '</p>').fadeIn().delay(5000).fadeOut());
        } else {
            form.prepend(status_danger.html('<p><i class="fa fa-exclamation-circle">&nbsp;</i>' + MSG_INVALID_FIELDS + '</p>').fadeIn().delay(3000).fadeOut());
        }
    });


    // helper functions
    function readStorageData() {

        if (typeof(Storage) !== "undefined") {
            if (sessionStorage.length != 0) {
                f_name.value = sessionStorage.getItem("c_name");
                f_email.value = sessionStorage.getItem("c_email");
                f_number.value = sessionStorage.getItem("c_number");
                f_company_name.value = sessionStorage.getItem("c_company_name");
                f_subject.value = sessionStorage.getItem("c_subject");
                f_message.value = sessionStorage.getItem("c_message");

            } else if (localStorage.length != 0) {
                f_name.value = localStorage.getItem("c_name");
                f_email.value = localStorage.getItem("c_email");
                f_number.value = localStorage.getItem("c_number");
                f_company_name.value = localStorage.getItem("c_company_name");
                f_subject.value = localStorage.getItem("c_subject");
                f_message.value = localStorage.getItem("c_message");
            }
        } else {
            window.alert(MSG_ERR_STORAGE);
        }
    }

    function saveFormData() {
        sessionStorage.setItem("c_name", f_name.value);
        sessionStorage.setItem("c_email", f_email.value);
        sessionStorage.setItem("c_number", f_number.value);
        sessionStorage.setItem("c_company_name", f_company_name.value);
        sessionStorage.setItem("c_subject", f_subject.value);
        sessionStorage.setItem("c_message", f_message.value);

        localStorage.setItem("c_name", f_name.value);
        localStorage.setItem("c_email", f_email.value);
        localStorage.setItem("c_number", f_number.value);
        localStorage.setItem("c_company_name", f_company_name.value);
        localStorage.setItem("c_subject", f_subject.value);
        localStorage.setItem("c_message", f_message.value);
    }

    // global form validation
    function validate() {
        if (validateName() && validateEmail() && validatePhone() && validateCompanyName() && validateSubject() && validateMessage()) {
            return true;
        } else {
            return false;
        }
    }

    // partial validation functions
    function validateName() {
        if (f_name.value.match(REGEX_NAME)) {
            if (f_name.value.length >= NAME_MIN && f_name.value.length <= NAME_MAX) {
                return true;
            } else {
                showError(err_name, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_name, MSG_ERR_NAME);
        }
        return false;
    }

    function validateEmail() {
        if (f_email.value.match(REGEX_EMAIL)) {
            if (f_email.value.length >= EMAIL_MIN && f_email.value.length <= EMAIL_MAX) {
                return true;
            } else {
                showError(err_email, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_email, MSG_ERR_EMAIL);
            return false;
        }
    }

    function validatePhone() {
        if (f_number.value.match(REGEX_PHONE)) {
            if (f_number.value.length >= NUMBER_MIN && f_number.value.length <= NUMBER_MAX) {
                return true;
            } else {
                showError(err_number, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_number, MSG_ERR_PHONE);
            return false;
        }
    }

    function validateCompanyName() {
        if (f_company_name.value.match(REGEX_ALPHANUMERIC)) {
            if (f_company_name.value.length >= COMPANY_NAME_MIN && f_company_name.value.length <= COMPANY_NAME_MAX) {
                return true;
            } else {
                showError(err_company_name, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_company_name, MSG_ERR_COMPANY_NAME);
            return false;
        }
    }

    function validateSubject() {
        if (f_subject.value.match(REGEX_ALPHANUMERIC)) {
            if (f_subject.value.length >= SUBJECT_MIN && f_subject.value.length <= SUBJECT_MAX) {
                return true;
            } else {
                showError(err_subject, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_subject, MSG_ERR_COMPANY_NAME);
            return false;
        }
    }

    function validateMessage() {
        if (f_message.value.length > 100) {
            if (f_message.value.length >= MESSAGE_MIN && f_message.value.length <= MESSAGE_MAX) {
                return true;
            } else {
                showError(err_message, MSG_ERR_LENGTH);
            }
        } else {
            showError(err_message, MSG_ERR_LENGTH);
            return false;
        }
    }

    function showError(element, message) {
        $(element).prepend(status_info.html('<p>' + message + '</p>').fadeIn().delay(3500).fadeOut());
    }


});