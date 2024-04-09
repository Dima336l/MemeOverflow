const errorElements = document.getElementsByClassName("error");
const errorArr = Array.from(errorElements);

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

function validateConfirmPassowrd(password, confirmPassword, error) {
  if (confirmPassword.trim() === "") {
    displayError(error, "Password field is required.");
    return false;
  }
  if (password.trim() !== confirmPassword) {
    displayError(error, "Passwords do not match.");
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
