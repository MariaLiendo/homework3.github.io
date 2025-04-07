/*Name: Maria Liendo
  File: homework2.js
  Date Created: 2025-02-026
  Date Updated: 2025-02-028
  Purpose: Redisplay/validate data from a form*/

// Function to validate the first name
function validateName(input) {
    const regex = /^[a-zA-Z'-]+$/;
    if (!regex.test(input.value)) {
        showError(input, "Invalid name. Only letters, apostrophes, and dashes are allowed.");
    } else {
        removeError(input);
    }
}

// Function to show an error message
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error");
        input.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Function to remove an error message
function removeError(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error")) {
        errorElement.remove();
    }
}

// Validate middle name (only 1 letter or blank)
function validateMiddleName(input) {
    const pattern = /^[A-Za-z]?$/;
    input.style.borderColor = pattern.test(input.value) ? "green" : "red";
}

// Validate last name
function validateLastName(input) {
    const pattern = /^[A-Za-z'\-0-9]{1,30}$/;
    input.style.borderColor = pattern.test(input.value) ? "green" : "red";
}

// Validate date of birth
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

// Validate email
function validateEmail(input) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    input.style.borderColor = pattern.test(input.value) ? "green" : "red";
}

// Validate phone number (XXX) XXX-XXXX
function validatePhone(input) {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    input.style.borderColor = pattern.test(input.value) ? "green" : "red";
}

// Validate password fields in real-time
function validatePassword() {
    const userId = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("re-password").value;

    const passwordError = document.getElementById("password-error");
    const confirmError = document.getElementById("confirm-password-error");

    let isValid = true;
    passwordError.textContent = "";
    confirmError.textContent = "";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=<>.,`~]).{8,30}$/;

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must be 8–30 characters, include uppercase, lowercase, number, and special character.";
        isValid = false;
    }

    if (password === userId) {
        passwordError.textContent += " Password cannot be the same as your Username.";
        isValid = false;
    }

    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match.";
        isValid = false;
    }

    return isValid;
}

// Review form and display info in a summary section
function reviewForm() {
    validateName(document.getElementById("first_name"));
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

// Get selected gender radio button
function getSelectedGender() {
    if (document.getElementById("male").checked) return "Male";
    if (document.getElementById("female").checked) return "Female";
    if (document.getElementById("other").checked) return "Other";
    return "";
}

// Update the review section with collected data
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

// Final form validation before submission
function validateForm() {
    let password = document.getElementById('password').value;
    let rePassword = document.getElementById('re-password').value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=<>.,`~]).{8,30}$/;

    if (!password.match(passwordRegex)) {
        alert("Password must meet security criteria.");
        return false;
    }

    if (password !== rePassword) {
        alert("Passwords do not match.");
        return false;
    }

    validateName(document.getElementById("first_name"));
    validateMiddleName(document.getElementById("middle_name"));
    validateLastName(document.getElementById("last-name"));
    validateEmail(document.getElementById("email"));
    validatePhone(document.getElementById("Phone_Number"));

    const invalidInputs = document.querySelectorAll('input:invalid');
    if (invalidInputs.length > 0) {
        alert("Please correct the highlighted fields before submitting.");
        return false;
    }

    return true;
}

// Real-time password validation on input
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("password").addEventListener("input", validatePassword);
    document.getElementById("re-password").addEventListener("input", validatePassword);
});


