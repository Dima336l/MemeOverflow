const errorElements = document.getElementsByClassName("error");
const errorArr = Array.from(errorElements);

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id === "registrationForm") {
    event.preventDefault();
    const errorRegister = errorElements[1];
    const emailRegistration = event.target.querySelector("#emailRegistration");
    const usernameRegistration = event.target.querySelector(
      "#usernameRegistration"
    );
    const passwordRegistration = event.target.querySelector(
      "#passwordRegistration"
    );
    const confirmRegistration = event.target.querySelector(
      "#confirmRegistration"
    );
    const email = emailRegistration.value;
    const username = usernameRegistration.value;
    const password = passwordRegistration.value;
    const confirmPassword = confirmRegistration.value;
    if (!validateEmail(email, errorRegister)) {
      return;
    }
    if (!validateUsername(username, errorRegister)) {
      return;
    }
    if (!validatePasswordRegistration(password, errorRegister)) {
      return;
    }
    if (!validateConfirmPassword(password, confirmPassword, errorRegister)) {
      return;
    }
  }
});

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id === "loginForm") {
    event.preventDefault(); // Prevent the default form submission
    const error = errorElements[0];

    const usernameInput = event.target.querySelector("#usernameLogin");
    const passwordInput = event.target.querySelector("#passwordLogin");
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validation
    if (!validateUsername(username, error)) {
      return;
    }
    if (!validatePassword(password, error)) {
      return;
    }
  }
});

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

function validateEmail(email, errorRegister) {
  if (email.trim() === "") {
    displayError(errorRegister, "Email field is required.");
    return false;
  } else if (!isValidEmail(email)) {
    displayError(errorRegister, "Invalid email format.");
    return false; // Return early to prevent further processing
  } else {
    hideError(errorRegister);
    return true;
  }
}

function validateUsername(username, error) {
  if (username.trim() === "") {
    displayError(error, "Username field is required.");
    return false;
  } else {
    hideError(error);
    return true;
  }
}

function validatePassword(password, error) {
  if (password.trim() === "") {
    displayError(error, "Password field is required.");
    return false;
  } else {
    hideError(error);
    return true;
  }
}

function validatePasswordRegistration(password, errorRegister) {
  const errorMessage = isStrongPassword(password);
  if (errorMessage != "Password is strong.") {
    displayError(errorRegister, errorMessage);
    return false;
  } else {
    hideError(errorRegister);
    return true;
  }
}

function validateConfirmPassword(password, passwordConfirm, errorRegister) {
  const errorMessage = "Passwords must match.";
  if (!validatePassword(passwordConfirm, errorRegister)) {
    return false;
  } else if (password != passwordConfirm) {
    displayError(errorRegister, errorMessage);
    return false;
  } else {
    hideError(errorRegister);
    return true;
  }
}

function isStrongPassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return "Password must contain at least one digit.";
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  // If all complexity criteria are met
  return "Password is strong.";
}

function clearLoginForm() {
  document.getElementById("usernameLogin").value = "";
  document.getElementById("passwordLogin").value = "";
}

function clearRegistrationForm() {
  document.getElementById("emailRegistration").value = "";
  document.getElementById("usernameRegistration").value = "";
  document.getElementById("passwordRegistration").value = "";
  document.getElementById("confirmRegistration").value = "";
}

function clearForms() {
  clearErrorPopup();
  clearLoginForm();
  clearRegistrationForm();
}

function clearErrorPopup() {
  errorArr.forEach(function (element) {
    clearPopup(element);
  });
}

function clearPopup(element) {
  element.textContent = "";
  element.style.display = "none";
}

function isLettersOnly(value) {
  return /^[A-Za-z]+$/.test(value);
}

// Function to clear form inputs and error messages
function clearFormInputsAndErrors() {
  document.getElementById("email").value = "";
  document.querySelector('input[name="firstName"]').value = "";
  document.querySelector('input[name="lastName"]').value = "";
  document.querySelector('input[name="password"]').value = "";
}

// Function to display an error message
function displayError(error, message) {
  error.textContent = message;
  error.style.display = "block";
}

// Function to hide an error message
function hideError(error) {
  error.textContent = "";
  error.style.display = "none";
}

// Function to save user data in local storage as an array
/*function saveUserData() {
    const email = document.getElementById("email").value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const password = document.querySelector('input[name="password"]').value;

  
    // First name validation
    if (firstName.trim() === "") {
      document.getElementById("firstNameError").textContent =
        "First name is required";
      document.getElementById("firstNameError").style.display = "block";
      return;
    } else if (!isLettersOnly(firstName)) {
      document.getElementById("firstNameError").textContent =
        "First name can only contain letters";
      document.getElementById("firstNameError").style.display = "block";
      return;
    } else {
      document.getElementById("firstNameError").textContent = "";
      document.getElementById("firstNameError").style.display = "none";
    }
  
  
    // Password validation
    let errorText = isStrongPassword(password);
    if (errorText !== "Password is strong.") {
      document.getElementById("passwordError").textContent = errorText;
      document.getElementById("passwordError").style.display = "block";
      return;
    } else {
      document.getElementById("passwordError").textContent = "";
      document.getElementById("passwordError").style.display = "none";
    }};*/
