/*Name: Maria Liendo
  File: homework2.js
  Date Created: 2025-02-026
  Date Updated: 2025-02-028
  Purpose: Redisplay/validate data from a form*/

// Function to validate the first name
function validateName(input) {
    const regex = /^[a-zA-Z'-]+$/;  // Letters, apostrophes, dashes only
    if (!regex.test(input.value)) {
        showError(input, "Invalid name. Only letters, apostrophes, and dashes are allowed.");
    } else {
        removeError(input);
    }
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error");
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function removeError(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error")) {
        errorElement.remove();
    }
}

// Function to validate the middle name
function validateMiddleName(input) {
    const pattern = /^[A-Za-z]?$/; // Matches a single letter or empty string
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

// Function to validate the last name
function validateLastName(input) {
    const pattern = /^[A-Za-z'\-0-9]{1,30}$/; // Matches letters, apostrophes, dashes, and numbers
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

function validateDOB(input) {
    const today = new Date();
    const dob = new Date(input.value);
    const age = today.getFullYear() - dob.getFullYear();
    if (dob > today || age > 120) {
        showError(input, "Invalid date of birth. Must be within a valid range.");
    } else {
        removeError(input);
    }
}

// Function to validate the email
function validateEmail(input) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

// Function to validate the phone number
function validatePhone(input) {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/; // Matches (XXX) XXX-XXXX format
    if (pattern.test(input.value)) {
        input.style.borderColor = "green";
    } else {
        input.style.borderColor = "red";
    }
}

// Function to review the form and trigger real-time validation
function reviewForm() {
    // Trigger real-time validation for the name fields
    validateName(document.getElementById("first_name"));
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

    // Show the review section
    document.getElementById("review-section").style.display = 'block';
}

// Function to get the selected gender
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

// Function to update the review section
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

// Function to validate the form before submission
function validateForm() {
    let password = document.getElementById('password').value;
    let rePassword = document.getElementById('re-password').value;

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=<>.,`~]).{8,30}$/;

    if (!password.match(passwordRegex)) {
        alert("Password must be at least 8 characters long, contain an upper case letter, a digit, and a special character.");
        return false;
    }

    if (password !== rePassword) {
        alert("Passwords do not match.");
        return false;
    }

    // Trigger real-time validation before submitting the form
    validateName(document.getElementById("first_name"));
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

// Event listener to ensure passwords match before submission
document.getElementById('patient-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('re-password').value;

    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match. Please try again.");
    }
});

// Event listener for the health slider to show real-time updates
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("health");
    const output = document.getElementById("health-value");
    output.textContent = slider.value;

    slider.addEventListener("input", function() {
        output.textContent = slider.value;
    });
});
