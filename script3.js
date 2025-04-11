/*Name: Maria Liendo
  File: Homework3.js
  Date Created: 2025-04-07
  Date Updated: 2025-04-11
  Purpose: Redisplay/validate data from a form*/

function validateFirstName(input) {
    const value = input.value;
    if (value === "") {
        input.setCustomValidity("First name cannot be empty.");
    } else if (/[^a-zA-Z]/.test(value)) {
        input.setCustomValidity("First name must contain only letters.");
    } else if (value.length < 2) {
        input.setCustomValidity("First name must be at least 2 characters long.");
    } else if (value.length > 30) {
        input.setCustomValidity("First name cannot be longer than 30 characters.");
    } else {
        input.setCustomValidity(""); 
    }
}

function validateMiddleName(input) {
    const value = input.value; 

    if (value !== "" && /[^a-zA-Z]/.test(value)) {
        input.setCustomValidity("Middle name must contain only letters.");
    } 
    else if (value.length > 20) {
        input.setCustomValidity("Middle name cannot be longer than 20 characters.");
    }
    else {
        input.setCustomValidity("");
}

function validateLastName(input) {
    const value = input.value;
    if (value === "") {
        input.setCustomValidity("Last name cannot be empty.");
    } else if (/[^a-zA-Z]/.test(value)) {
        input.setCustomValidity("Last name must contain only letters.");
    } else if (value.length < 2) {
        input.setCustomValidity("Last name must be at least 2 characters long.");
    } else if (value.length > 30) {
        input.setCustomValidity("Last name cannot be longer than 30 characters.");
    } else {
        input.setCustomValidity("");
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById("dob");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    dobInput.setAttribute("min", "1900-01-01");
    dobInput.setAttribute("max", todayStr);
});
  
let fullSSN = ""; 
function handleSSNInput(input) {
    const rawValue = input.value.replace(/\D/g, ""); 
    if (rawValue.length === 9) {
        fullSSN = rawValue; 
        const masked = "***-**-" + rawValue.slice(-4);
        input.value = masked;
        input.setCustomValidity("");
    } else {
        input.setCustomValidity("Please enter a valid 9-digit SSN.");
    }
}

function unmaskSSN(input) {
    if (fullSSN.length === 9) {
        input.value = formatSSN(fullSSN);
    }
}

function formatSSN(value) {
    return value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
}

function validateEmail(input) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

function validatePhone(input) {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/; 
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}
  
function validateUserID(input) {
    const value = input.value;
    const errorSpan = document.getElementById("userIdError");
    let message = "";

   
    if (/^[0-9]/.test(value)) {
        message = "Username cannot start with a number.";
    }
   
    else if (value.length < 5) {
        message = "Username must be at least 5 characters.";
    } else if (value.length > 20) {
        message = "User ID cannot be more than 20 characters.";
    }
  
    else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        message = "Username can only include letters, numbers, dashes (-), and underscores (_).";
    }
  
    if (message) {
        input.setCustomValidity(message);
        errorSpan.textContent = message;
        input.style.borderColor = "red";
    } else {
        input.setCustomValidity("");
        errorSpan.textContent = "";
        input.style.borderColor = "green";
    }
}

function validatePassword(input) {
    const password = input.value;
    const userId = document.getElementById("userId").value; 
    const errorSpan = document.getElementById("passwordError");
    let message = "";

   
    if (password.length < 8) {
        message = "Password must be at least 8 characters long.";
    }
    else if (!/[A-Z]/.test(password)) {
        message = "Password must contain at least 1 uppercase letter.";
    }
   
    else if (!/[a-z]/.test(password)) {
        message = "Password must contain at least 1 lowercase letter.";
    }
    
    else if (!/\d/.test(password)) {
        message = "Password must contain at least 1 digit.";
    }
   
    else if (password === userId) {
        message = "Password cannot be the same as the User ID.";
    }

    if (message) {
        input.setCustomValidity(message);
        errorSpan.textContent = message;
        input.style.borderColor = "red";
    } else {
        input.setCustomValidity("");
        errorSpan.textContent = "";
        input.style.borderColor = "green";
    }
}

function validateRepassword(input) {
    const password = document.getElementById("password").value;
    const confirmPassword = input.value;
    const errorSpan = document.getElementById("repasswordError");
    let message = "";

    if (confirmPassword !== password) {
        message = "Password and confirmation password must match.";
    }

    if (message) {
        input.setCustomValidity(message);
        errorSpan.textContent = message;
        input.style.borderColor = "red";
    } else {
        input.setCustomValidity("");
        errorSpan.textContent = "";
        input.style.borderColor = "green";
    }
}

   function validateForm() {
    let errors = [];

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value.toLowerCase();
    const phoneNumber = document.getElementById("Phone_Number").value;
    const ssn = document.getElementById("ssn").value;
    const userId = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;

    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        errors.push("First name should only contain letters and spaces.");
    }

    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        errors.push("Last name should only contain letters and spaces.");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    if (phoneNumber && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
        errors.push("Phone number should be in the format (XXX) XXX-XXXX.");
    }

    if (!ssn || !/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
        errors.push("SSN must be in the format xxx-xx-xxxx.");
    }
//(!ssn || !/^\d{3}-\d{2}-\d{4}$/.test(ssn))
    if (!/^[a-zA-Z0-9_-]{5,30}$/.test(userId)) {
        errors.push("User ID should be between 5 and 30 characters and only contain letters, numbers, dashes, and underscores.");
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        errors.push("Password must be at least 8 characters long and contain both letters and numbers.");
    }

    if (password !== rePassword) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        document.getElementById("submitButton").style.display = "none"; 
    } else {
        document.getElementById("submitButton").style.display = "inline-block";
    }
}

function submitForm() {
    window.location.href = "thankyou.html";
}
  
function reviewForm() {
    validateFirstName(document.getElementById("first_name"));
    validateMiddleName(document.getElementById("middle_name"));
    validateLastName(document.getElementById("last-name"));
    validateEmail(document.getElementById("email"));
    validatePhone(document.getElementById("Phone_Number"));

    const firstName = document.getElementById("first_name").value;
    const middleName = document.getElementById("middle_name").value;
    const lastName = document.getElementById("last-name").value;
    const dob = document.getElementById("dob").value;
    const ssn = document.getElementById("ssn").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("Phone_Number").value;
    const address1 = document.getElementById("address1").value;
    const address2 = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const symptoms = document.getElementById("symptoms").value;
    const healthLevel = document.getElementById("health").value;

    let gender = getSelectedGender();
    const fullAddress = `${address1}, ${address2}, ${city}, ${state} ${zip}`;
    updateReviewSection(firstName, lastName, dob, ssn, gender, fullAddress, email, phone_number, symptoms, healthLevel);

    document.getElementById("review-section").style.display = 'block';
}

function getSelectedGender() {
    if (document.getElementById("male").checked) {
        return "Male";
    } else if (document.getElementById("female").checked) {
        return "Female";
    } else if (document.getElementById("other").checked) {
        return "Other";
    }
    return "";
}
  
function updateReviewSection(firstName, lastName, dob, ssn, gender, address, email, phone, symptoms, healthLevel) {
    document.getElementById("review_name").textContent = `${firstName} ${lastName}`;
    document.getElementById("review_dob").textContent = dob;
    document.getElementById("review_ssn").textContent = ssn;
    document.getElementById("review_gender").textContent = gender;
    document.getElementById("review_address").textContent = address;
    document.getElementById("review_email").textContent = email;
    document.getElementById("review_phone_number").textContent = phone;
    document.getElementById("review_symptoms").textContent = symptoms;
    document.getElementById("review_health").textContent = healthLevel;
}

function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  const type = input.getAttribute("type");

  input.setAttribute("type", type === "password" ? "text" : "password");
}

document.getElementById('patient-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('re-password').value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match. Please try again.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("health");
    const output = document.getElementById("health-value");
    output.textContent = slider.value;

    slider.addEventListener("input", function() {
        output.textContent = slider.value;
    });

    const dobInput = document.getElementById("dob");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');

    const maxDate = `${year}-${month}-${day}`;

    dobInput.setAttribute("max", maxDate);
});
