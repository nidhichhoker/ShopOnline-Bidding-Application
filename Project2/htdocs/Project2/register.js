var xhr = false;

// Check if the browser supports XMLHttpRequest
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

// Function to handle user registration
function registerUser() {
    // Get form elements
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");

    // Get error elements
    var firstNameError = document.getElementById("firstNameError");
    var lastNameError = document.getElementById("lastNameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    var messageDiv = document.getElementById("message");

    // Clear any previous messages
    messageDiv.innerHTML = "";
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    // Validation logic
    var valid = true;

    // Validate first name and last name using regular expressions
    if (!/^[A-Za-z]+$/.test(firstName.value)) {
        firstNameError.textContent = "Only alphabetic characters are allowed";
        valid = false;
    }

    if (!/^[A-Za-z]+$/.test(lastName.value)) {
        lastNameError.textContent = "Only alphabetic characters are allowed";
        valid = false;
    }

    // Validate email using a regular expression
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value)) {
        emailError.textContent = "Email is not valid";
        valid = false;
    }

    // You can add more validation rules for email and password here

    // Check if password and confirm password match
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        valid = false;
    }

    // Check if password and confirm password are not empty
    if (password.value === "") {
        passwordError.textContent = "Please enter a password";
        valid = false;
    }

    if (confirmPassword.value === "") {
        confirmPasswordError.textContent = "Please enter a confirm password";
        valid = false;
    }

    // If all validations passed, make an XMLHttpRequest
    if (valid) {
        xhr.open("GET", "register.php?firstName=" + firstName.value + "&lastName=" + lastName.value + "&email=" + email.value + "&password=" + password.value + "&confirmPassword=" + confirmPassword.value + "&id=" + Number(new Date), true);
        xhr.onreadystatechange = testInput;
        xhr.send(null);
    }
}

// Function to handle the response from the server
function testInput() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('message').innerHTML = "";
        document.getElementById('message').innerHTML = xhr.responseText;
    }
}

// Function to close the success alert and potentially redirect
function closeSuccessAlert() {
    const successAlert = document.querySelector('.alert.success');
    if (successAlert) {
        successAlert.style.display = 'none';

        // Redirect to another page (change 'listing.html' to the desired URL)
        window.location.href = 'listing.htm';
    } else {
        // Clear form fields and any messages
        document.getElementById('message').innerHTML = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }
}
