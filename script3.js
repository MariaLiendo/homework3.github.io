/*Name: Maria Liendo
  File: homework2.js
  Date Created: 2025-02-026
  Date Updated: 2025-02-028
  Purpose: Redisplay/validate data from a form*/

// Function to validate the password and confirm password fields
function reviewForm() {
    // Get input values
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

    // Get selected gender
    let gender = "";
    if (document.getElementById("male").checked) {
        gender = "Male";
    } else if (document.getElementById("female").checked) {
        gender = "Female";
    } else if (document.getElementById("other").checked) {
        gender = "Other";
    }

    // Format address
    const fullAddress = `${address1}, ${address2}, ${city}, ${state} ${zip}`;

    // Review the form data and show a preview
    document.getElementById("review_name").textContent = firstName + ' ' + lastName;
    document.getElementById("review_dob").textContent = dob;
    document.getElementById("review_ssn").textContent = ssn;
    document.getElementById("review_gender").textContent = gender;
    document.getElementById("review_address").textContent = fullAddress;
    document.getElementById("review_email").textContent = email;
    document.getElementById("review_phone_number").textContent = phone_number;
    document.getElementById("review_symptoms").textContent = symptoms;
    document.getElementById("review_health").textContent = healthLevel;

    // Display the review section
    document.getElementById("review-section").style.display = 'block';
}

function validateForm() {
    let password = document.getElementById('password').value;
    let rePassword = document.getElementById('re-password').value;

    // Password validation
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=<>.,`~]).{8,30}$/;
    if (!password.match(passwordRegex)) {
        alert("Password must be at least 8 characters long, contain an upper case letter, a digit, and a special character.");
        return false;
    }
    if (password !== rePassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

// Password check on form submit
document.getElementById('patient-form').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('re-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        // Prevent form submission
        event.preventDefault();
        alert("Passwords do not match. Please try again.");
    }
});
