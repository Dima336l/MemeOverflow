async function uploadAvatar() {
  const modal = document.getElementById("id04");
  const errorElements = document.getElementsByClassName("error");
  const error = errorElements[3];
  const avatarInput = document.getElementById("avatarUpload");
  const fileAvatar = avatarInput.files[0];
  const formData = new FormData();
  formData.append("myFile", fileAvatar);

  try {
    const response = await fetch("/M00888146/uploads", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const text = await response.text(); // Get response as plain text
      console.error("Server error:", text);
      error.style.display = "block";
      error.textContent = text;
      setTimeout(() => {
        error.textContent = "";
        error.style.display = "none";
      }, 2000);
    } else {
      const data = await response.json();
      if (data.success) {
        console.log("Post uploaded successfully");
        error.style.display = "block";
        error.textContent = "Avatar changed successfully.";
        error.style.backgroundColor = "lightgreen";
        error.style.border = "1px solid green";
        error.style.color = "green";
        setTimeout(() => {
          modal.style.display = "none";
          window.location = "index.html";
        }, 2000);
      } else {
        console.error("Upload failed:", data.error);
        error.style.display = "block";
        error.textContent = data.error;
        setTimeout(() => {
          error.textContent = "";
          error.style.display = "none";
        }, 2000);
      }
    }
  } catch (err) {
    console.error("Error uploading file: ", err);
  }
}
