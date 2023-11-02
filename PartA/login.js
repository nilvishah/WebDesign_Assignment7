$(document).ready(function () {
    // Disable login button initially
    $("#loginButton").prop("disabled", true);

    function updateLoginButton() {
        var isValid = validateForm();
        $("#loginButton").prop("disabled", !isValid);
    }

    function validateForm() {
        var isValid = true;

        isValid = isValid && validateEmail();
        isValid = isValid && validateUsername();
        isValid = isValid && validatePassword();
        isValid = isValid && validateConfirmPassword();

        return isValid;
    }

    function validateEmail() {
        var email = $("#email").val();
        var emailRegex = /^[a-zA-Z0-9._-]+@northeastern\.edu$/;

        if (!email) {
            displayError("email", "Please enter your email address.");
            return false;
        } else if (!emailRegex.test(email)) {
            displayError("email", "Please enter a valid Northeastern email address.");
            return false;
        } else {
            clearError("email");
            return true;
        }
    }

    function validateUsername() {
        var username = $("#username").val();
        var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (!username) {
            displayError("username", "Please enter your username.");
            return false;
        } else if (specialCharRegex.test(username)) {
            displayError("username", "Username should not contain special characters.");
            return false;
        } else if (username.length < 4 || username.length > 20) {
            displayError("username", "Username should be between 4 and 20 characters.");
            return false;
        } else {
            clearError("username");
            return true;
        }
    }

    function validatePassword() {
        var password = $("#password").val();

        if (!password) {
            displayError("password", "Please enter your password.");
            return false;
        } else if (password.length < 5 || password.length > 20) {
            displayError("password", "Password should be between 5 and 20 characters.");
            return false;
        } else {
            clearError("password");
            return true;
        }
    }

    function validateConfirmPassword() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();

        if (!confirmPassword) {
            displayError("confirmPassword", "Please confirm your password.");
            return false;
        } else if (password !== confirmPassword) {
            displayError("confirmPassword", "Passwords do not match.");
            return false;
        } else {
            clearError("confirmPassword");
            return true;
        }
    }

    function displayError(field, message) {
        $("#" + field + "Error").text(message);
    }

    function clearError(field) {
        $("#" + field + "Error").text("");
    }

    $("#email, #username, #password, #confirmPassword").on("input", function () {
        updateLoginButton();
    });

    $("#loginButton").on("click", function () {
        if (validateForm()) {
            var loggedInUser = $("#username").val();
            sessionStorage.setItem("loggedInUser", loggedInUser);
            console.log(loggedInUser);
    
            // Redirect to the second page with the username as a parameter
            window.location.href = "calculator.html?username=" + encodeURIComponent(loggedInUser);
        }
    });
    
    
});
