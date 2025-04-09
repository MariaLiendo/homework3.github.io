/*Name: Maria Liendo
  File: homework3.js
  Date Created: 2025-04-07
  Date Updated: 2025-04-0
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
    const value = input.value; // Get the value entered in the input field

    // Check if the value is not empty and contains non-letter characters
    if (value !== "" && /[^a-zA-Z]/.test(value)) {
        input.setCustomValidity("Middle name must contain only letters.");
    } 
    // Check if the value is too long (more than 30 characters)
    else if (value.length > 20) {
        input.setCustomValidity("Middle name cannot be longer than 20 characters.");
    } 
    // If the value is valid (only letters and <= 30 characters)
    else {
        input.setCustomValidity(""); // Clear any previous validation message
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


//Function to validate date of birth
window.addEventListener('DOMContentLoaded', function () {
    const dobInput = document.getElementById("dob");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // Set min and max attributes
    dobInput.setAttribute("min", "1900-01-01");
    dobInput.setAttribute("max", todayStr);
});

//Function to mask SSN
let fullSSN = ""; // Stores the unmasked SSN

function handleSSNInput(input) {
    const rawValue = input.value.replace(/\D/g, ""); // Remove non-digit characters

    if (rawValue.length === 9) {
        fullSSN = rawValue; // Store the real value
        const masked = "***-**-" + rawValue.slice(-4);
        input.value = masked;
        input.setCustomValidity(""); // Clear any errors
    } else {
        input.setCustomValidity("Please enter a valid 9-digit SSN.");
    }
}

function unmaskSSN(input) {
    if (fullSSN.length === 9) {
        // Show full SSN temporarily while editing
        input.value = formatSSN(fullSSN);
    }
}

function formatSSN(value) {
    return value.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
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

//Fuction for userID

function validateUserID(input) {
    const value = input.value;
    const errorSpan = document.getElementById("userIdError");
    let message = "";

    // Rule 1: Cannot start with a number
    if (/^[0-9]/.test(value)) {
        message = "Username cannot start with a number.";
    }
    // Rule 2: Length must be between 5 and 20 characters
    else if (value.length < 5) {
        message = "Username must be at least 5 characters.";
    } else if (value.length > 20) {
        message = "User ID cannot be more than 20 characters.";
    }
    // Rule 3: Only letters, numbers, dashes, and underscores
    else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        message = "Username can only include letters, numbers, dashes (-), and underscores (_).";
    }

    // Display or clear message
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

//Function to validate the Password
function validatePassword(input) {
    const password = input.value;
    const userId = document.getElementById("userId").value; // Get User ID
    const errorSpan = document.getElementById("passwordError");
    let message = "";

    // Rule 1: Password must be at least 8 characters long
    if (password.length < 8) {
        message = "Password must be at least 8 characters long.";
    }
    // Rule 2: Password must contain at least 1 uppercase letter
    else if (!/[A-Z]/.test(password)) {
        message = "Password must contain at least 1 uppercase letter.";
    }
    // Rule 3: Password must contain at least 1 lowercase letter
    else if (!/[a-z]/.test(password)) {
        message = "Password must contain at least 1 lowercase letter.";
    }
    // Rule 4: Password must contain at least 1 digit
    else if (!/\d/.test(password)) {
        message = "Password must contain at least 1 digit.";
    }
    // Rule 5: Password cannot be the same as User ID
    else if (password === userId) {
        message = "Password cannot be the same as the User ID.";
    }

    // Display or clear message
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

// Validate confirmation password
function validateRepassword(input) {
    const password = document.getElementById("password").value; // Get the original password
    const confirmPassword = input.value;
    const errorSpan = document.getElementById("repasswordError");
    let message = "";

    // Rule: Password and confirm password must match
    if (confirmPassword !== password) {
        message = "Password and confirmation password must match.";
    }

    // Display or clear message
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
//Validate form
   function validateForm() {
    let errors = [];

    // Get form field values
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value.toLowerCase();
    const phoneNumber = document.getElementById("Phone_Number").value;
    const ssn = document.getElementById("ssn").value;
    const userId = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;

    // Validate First Name (Only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        errors.push("First name should only contain letters and spaces.");
    }

    // Validate Last Name (Only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        errors.push("Last name should only contain letters and spaces.");
    }

    // Validate Email (Proper email format, converted to lowercase)
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // Validate Phone Number (Optional, but should only contain digits)
    if (phoneNumber && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
        errors.push("Phone number should be in the format (XXX) XXX-XXXX.");
    }

    // Validate SSN (Format xxx-xx-xxxx, only allow digits)
    if (ssn && !/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
        errors.push("SSN must be in the format xxx-xx-xxxx.");
    }

    // Validate User ID (Only alphanumeric, dashes, and underscores)
    if (!/^[a-zA-Z0-9_-]{5,30}$/.test(userId)) {
        errors.push("User ID should be between 5 and 30 characters and only contain letters, numbers, dashes, and underscores.");
    }

    // Validate Password (at least 8 characters, letters and numbers)
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        errors.push("Password must be at least 8 characters long and contain both letters and numbers.");
    }

    // Validate Re-entered Password
    if (password !== rePassword) {
        errors.push("Passwords do not match.");
    }

    // Display errors if any
    if (errors.length > 0) {
        alert(errors.join("\n"));
        document.getElementById("submitButton").style.display = "none"; // Hide Submit button
    } else {
        // Show the Submit button if no errors
        document.getElementById("submitButton").style.display = "inline-block";
    }
}

function submitForm() {
    // Redirect to a new page after successful form submission
    window.location.href = "./Thank-you.html";
}

// Function to review the form and trigger real-time validation
function reviewForm() {
    // Trigger real-time validation for the name fields
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

function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  const type = input.getAttribute("type");

  // Toggle the type between password and text
  input.setAttribute("type", type === "password" ? "text" : "password");
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

    // Set the max date to the current date
    const dobInput = document.getElementById("dob");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    // Format the date as YYYY-MM-DD
    const maxDate = `${year}-${month}-${day}`;

    // Set the max date attribute
    dobInput.setAttribute("max", maxDate);
});
