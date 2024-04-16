async function logout() {
    const errorElements = document.getElementsByClassName("error");
    const error = errorElements[3];
    const modal = document.getElementById("id04");
    try {
      const response = await fetch("/M00888146/logOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        console.log(modal);
        const successMessage = { message: "Log out successfull." };
        const jsonString = JSON.stringify(successMessage);
        console.log(error);
        error.style.display = "block";
        error.textContent = "Log out successful.";
        error.style.backgroundColor = "lightgreen";
        error.style.border = "1px solid green";
        error.style.color = "green";
        setTimeout(() => {
          modal.style.display = "none";
          window.location = "index.html";
        }, 2000);
      } else {
        const errorMessage = { error: "Log out failed" };
        const jsonString = JSON.stringify(errorMessage);
        console.error(jsonString);
        error.style.display = "block";
        error.textContent = "Log out failed";
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
  