async function register() {
  const userEmail = document.querySelector("#emailRegistration").value;
  const userName = document.querySelector("#usernameRegistration").value;
  const userPassword = document.querySelector("#passwordRegistration").value;
  const userConfirmPassword = document.querySelector(
    "#confirmRegistration"
  ).value;
  const errorElements = document.getElementsByClassName("error");
  const error = errorElements[1];
  const modal = document.getElementById("id02");

  if (
    !validateEmail(userEmail, error) ||
    !validateUsername(userName, error) ||
    !validatePassword(userPassword, error) ||
    !validateConfirmPassowrd(userPassword, userConfirmPassword, error)
  ) {
    const errorMessage = { error: error.textContent };
    const jsonString = JSON.stringify(errorMessage);
    console.error(jsonString);
    setTimeout(() => {
      error.textContent = "";
      error.style.display = "none";
    }, 2000);
    return; // Exit the function if any input is invalid
  }

  try {
    const response = await fetch("/M00888146/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, userEmail, userPassword }),
    });
    //
    const data = await response.json();
    if (data.success) {
      const successMessage = { message: "User Registered Successfully." };
      const jsonString = JSON.stringify(successMessage);
      console.error(jsonString);
      error.style.display = "block";
      error.textContent = "User Registered Successfully.";
      error.style.backgroundColor = "lightgreen";
      error.style.border = "1px solid green";
      error.style.color = "green";
      setTimeout(() => {
        modal.style.display = "none";
        window.location = "index.html";
      }, 2000);
    } else {
      const errorMessage = { error: data.message };
      const jsonString = JSON.stringify(errorMessage);
      console.error(jsonString);
      error.style.display = "block";
      error.textContent = data.message;
      error.style.backgroundColor = "#ffcccc";
      error.style.border = "1px solid red";
      error.style.color = "red";
    }
  } catch (err) {
  } finally {
    setTimeout(() => {
      error.textContent = "";
      error.style.display = "none";
    }, 2000);
  }
}
