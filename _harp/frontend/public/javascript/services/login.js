async function logIn() {
  const userEmail = document.querySelector("#emailLogin").value;
  const userPassword = document.querySelector("#passwordLogin").value;
  const errorElements = document.getElementsByClassName("error");
  const error = errorElements[0];
  const modal = document.getElementById("id01");

  if (
    !validateEmail(userEmail, error) ||
    !validatePassword(userPassword, error)
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
    const response = await fetch("/M00888146/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, userPassword }),
    });
    const data = await response.json();
    if (data.success) {
      const successMessage = { message: "Login successful." };
      const jsonString = JSON.stringify(successMessage);
      console.error(jsonString);
      error.style.display = "block";
      error.textContent = "Login successful.";
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
      setTimeout(() => {
        error.textContent = "";
        error.style.display = "none";
      }, 2000);
    }
  } catch (err) {}
}
