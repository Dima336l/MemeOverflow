async function upload() {
  const fileInput = document.getElementById("imageUpload");
  const errorElements = document.getElementsByClassName("error");
  const category = document.querySelector("#categoryUpload").value;
  const title = document.querySelector("#titleUpload").value;
  const error = errorElements[2];
  const modal = document.getElementById("id03");
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("myFile", file);
  formData.append("title", title);
  formData.append("category", category);
  if (title.length === 0 || category.length === 0) {
    error.textContent =
      (title.length == 0 ? "Title" : "Category") + " cannot be empty.";
    error.style.display = "block";
    setTimeout(() => {
      error.textContent = "";
      error.style.display = "none";
    }, 2000);
    return; // Exit the function if any input is invalid
  }
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
        error.textContent = "Post uploaded successfully.";
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
