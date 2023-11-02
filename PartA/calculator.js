$(document).ready(function () {
    function getLoggedInUserFromURL() {
      
        var urlParams = new URLSearchParams(window.location.search);

        
        return urlParams.get('username');
    }


    var loggedInUser = getLoggedInUserFromURL();

  
    $("#loggedInUser").text("Hello " + loggedInUser + "!");
    $("#loggedInUser").css({"color":"rgb(1, 100, 149)", "font-weight":"bold","margin-left": "100px"});


   
    function validateNumericInput(inputValue, fieldName) {
        if (inputValue === "") {
            displayError(fieldName, "Please enter a value.");
            return false;
        } else if (!$.isNumeric(inputValue)) {
            displayError(fieldName, "Please enter a valid number.");
            return false;
        } else if (!isFinite(inputValue)) {
            displayError(fieldName, "Infinite numbers are not allowed.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }
    
    function validateSpecialCharacters(inputValue, fieldName) {
        if (/[^a-zA-Z0-9]/.test(inputValue)) {
            displayError(fieldName, "Special characters are not allowed.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }
    
    

    
    function validateNull(inputValue, fieldName) {
        if (inputValue === "") {
            displayError(fieldName, "This field cannot be empty.");
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }

   
    $("#number1, #number2").on("input", function () {
        var fieldName = $(this).attr("id");
        var inputValue = $(this).val();

        validateNull(inputValue, fieldName);
        validateNumericInput(inputValue, fieldName);
        validateSpecialCharacters(inputValue, fieldName);
    });

  
    $(".operationBtn").on("click", function () {
        var num1 = parseFloat($("#number1").val());
        var num2 = parseFloat($("#number2").val());

        if (
            validateNull($("#number1").val(), "number1") &&
            validateNumericInput(num1, "number1") &&
            validateSpecialCharacters(num1.toString(), "number1") &&
            validateNull($("#number2").val(), "number2") &&
            validateNumericInput(num2, "number2") &&
            validateSpecialCharacters(num2.toString(), "number2")
        ) {
            
            var operation = $(this).attr("data-operation");
            var result = calculateResult(num1, num2, operation);
            $("#result").val(result);
        }
    });

    
    var calculateResult = (num1, num2, operation) => {
        switch (operation) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                return num1 / num2;
            default:
                return "Error";
        }
    };

    
    function getLoggedInUser() {
        
        return "John Doe";
    }

    // Display error message
    function displayError(field, message) {
        $("#" + field + "Error").text(message);
    }

    // Clear error message
    function clearError(field) {
        $("#" + field + "Error").text("");
    }
});
