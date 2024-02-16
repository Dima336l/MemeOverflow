const body = document.body;
var modal = document.getElementById("id01");
var modal2 = document.getElementById("id02");
var loginForm = document.getElementById("id01");
var registrationForm = document.getElementById("id02");
var cancelButtons = document.querySelectorAll(".cancelbtn");
var toggleBtn = document.getElementById("toggle-btn");
var avatarIcon = document.getElementById("avatar-icon");
const contentDiv = document.querySelectorAll(".meme-container");
var isModalOpen = false;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (
    event.target == modal ||
    event.target == modal2 ||
    event.target == avatarIcon
  ) {
    if (event.target == avatarIcon && !isModalOpen) {
      isModalOpen = true;
      openLoginForm();
    } else {
      closeModals();
      isModalOpen = false;
    }
  }
};

cancelButtons.forEach(function (cancelButton) {
  cancelButton.addEventListener("click", closeModals);
});

toggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

function hideFeed() {
  contentDiv.forEach((div) => {
    div.classList.add("hidden");
  });
}

function showFeed() {
  contentDiv.forEach((div) => {
    div.classList.remove("hidden");
  });
}

function closeModals() {
  modal.style.display = "none";
  modal2.style.display = "none";
  body.classList.remove("modal-show");
  clearForms();
  showFeed();
}

function closeRegistrationForm() {
  clearErrorPopup();
  clearRegistrationForm();
  registrationForm.style.display = "none";
}

function closeRegAndDisplayLogin() {
  closeRegistrationForm();
  loginForm.style.display = "block";
}

function openLoginForm() {
  hideFeed();
  clearErrorPopup();
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