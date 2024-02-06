var modal = document.getElementById("id01");
var modal2 = document.getElementById("id02");
var loginForm = document.getElementById("id01");
var registrationForm = document.getElementById("id02");
var cancelButtons = document.querySelectorAll(".cancelbtn");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
    document.body.classList.remove("modal-show");
  }
};

cancelButtons.forEach(function (cancelButton) {
  cancelButton.addEventListener("click", function () {
    modal.style.display = "none";
    modal2.style.display = "none";
    document.body.classList.remove("modal-show");
  });
});

function closeRegistrationForm() {
  registrationForm.style.display = "none";
}

function closeRegAndDisplayLogin() {
  closeRegistrationForm();
  loginForm.style.display = "block";
}

function showLoginForm() {
  document.body.classList.add("modal-show");
  modal.classList.add("animate");
  loginForm.style.display = "block";
}

function closeLoginForm() {
  loginForm.style.display = "none";
  modal.classList.remove("animate");
}

function openRegistrationForm() {
  closeLoginForm();
  registrationForm.style.display = "block";
}
