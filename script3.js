/*Name: Maria Liendo
  File: homework2.js
  Date Created: 2025-02-026
  Date Updated: 2025-02-028
  Purpose: Redisplay/validate data from a form*/
// Validate First Name
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
        input.setCustomValidity(""); // Valid input
    }
}

// Validate Middle Name
function validateMiddleName(input) {
    const value = input.value;
    if (value !== "" && /[^a-zA-Z]/.test(value)) {
        input.setCustomValidity("Middle name must contain only letters.");
    } else if (value.length > 30) {
        input.setCustomValidity("Middle name cannot be longer than 30 characters.");
    } else {
        input.setCustomValidity(""); // Valid input
    }
}

// Validate Last Name
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
        input.setCustomValidity(""); // Valid input
    }
}

// Validate Email
function validateEmail(input) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

// Validate Phone Number
function validatePhone(input) {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/; // Matches (XXX) XXX-XXXX format
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

// Review the Form and Trigger Real-time Validation
function reviewForm() {
    // Trigger real-time validation for all fields
    validateFirstName(document.getElementById("first_name"));
    validateMiddleName(document.getElementById("middle_name"));
    validateLastName(document.getElementById("last-name"));
    validateEmail(document.getElementById("email"));
    validatePhone(document.getElementById("Phone_Number"));

    // Collect form values
    const firstName = document.getElementById("first_name").value;
    const middleName = document.getElementById("middle_name").value;
    const lastName = document.getElementById("last-name").value;
    const dob = document.getElementById("dob").value;
    const ssn = document.getElementById("ssn").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("Phone_Number").value;
    const address1 = document.getElementById("address1").value;
    const address2 = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const symptoms = document.getElementById("symptoms").value;
    const healthLevel = document.getElementById("health").value;
    const gender = getSelectedGender();

    const fullAddress = `${address1}, ${address2}, ${city}, ${state} ${zip}`;
    
    // Update the review section with collected data
    updateReviewSection(firstName, lastName, dob, ssn, gender, fullAddress, email, phoneNumber, symptoms, healthLevel);

    // Show the review section
    document.getElementById("review-section").style.display = 'block';
}

// Get Selected Gender
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

// Update the Review Section with Collected Data
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

// Validate the Form Before Submission
function validateForm() {
    let password = document.getElementById('password').value;
    let rePassword = document.getElementById('re-password').value;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=<>.,`~]).{8,30}$/;

    if (!password.match(passwordRegex)) {
        alert("Password must be at least 8 characters long, contain an uppercase letter, a digit, and a special character.");
        return false;
    }

    if (password !== rePassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Trigger real-time validation before form submission
    validateFirstName(document.getElementById("first_name"));
    validateMiddleName(document.getElementById("middle_name"));
    validateLastName(document.getElementById("last-name"));
    validateEmail(document.getElementById("email"));
    validatePhone(document.getElementById("Phone_Number"));

    // Check if any input is invalid
    const invalidInputs = document.querySelectorAll('input:invalid');
    if (invalidInputs.length > 0) {
        alert("Please correct the highlighted fields before submitting.");
        return false;
    }

    return true;
}

// Toggle Password Visibility
function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const type = input.getAttribute("type");

    // Toggle the input type between 'password' and 'text'
    input.setAttribute("type", type === "password" ? "text" : "password");
}

// Ensure Passwords Match Before Form Submission
document.getElementById('patient-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('re-password').value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match. Please try again.");
    }
});

// Event Listener for Health Slider
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("health");
    const output = document.getElementById("health-value");
    output.textContent = slider.value;

    slider.addEventListener("input", function() {
        output.textContent = slider.value;
    });
});
