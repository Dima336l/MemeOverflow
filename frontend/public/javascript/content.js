const body = document.body;
var modal3 = document.getElementById("id03");
var loginForm = document.getElementById("id01");
var registrationForm = document.getElementById("id02");
var postForm = document.getElementById("id03");
var cancelButtons = document.querySelectorAll(".cancelbtn");
var toggleBtn = document.getElementById("toggle-btn");
var avatarIcon = document.getElementById("avatar-icon");
var contentDiv = document.querySelectorAll(".meme-container");
var postIcon = document.getElementById("post-btn");
var isModalOpen = false;
var isPostFormOpen = false;

window.onclick = function (event) {
  if (
    event.target == avatarIcon ||
    event.target == loginForm ||
    event.target == registrationForm ||
    event.target == postIcon ||
    event.target == postForm  
  ) {
    if (event.target == avatarIcon && !isModalOpen) {
      openLoginForm();
      isModalOpen = true;
    } else if (event.target == postIcon && !isPostFormOpen) {
      closeModals();
      showPost();
      isPostFormOpen = true;
      isModalOpen = false;
    } else if (event.target == postIcon && isModalOpen) {
      closeModals();
      showPost();
      isPostFormOpen = true;
      isModalOpen = false;
    } else {
      closeModals();
      isModalOpen = false;
      isPostFormOpen = false;
    }
  }
};

cancelButtons.forEach(function (cancelButton) {
  cancelButton.addEventListener("click", closeModals);
  isModalOpen = false;
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

function showPost() {
  loginForm.style.display = "none";
  registrationForm.style.display = "none";
  hideFeed();
  document.body.classList.add("modal-show");
  postForm.classList.add("animate");
  postForm.style.display = "block";
}

function showFeed() {
  contentDiv.forEach((div) => {
    div.classList.remove("hidden");
  });
}

function closeModals() {
  loginForm.style.display = "none";
  registrationForm.style.display = "none";
  postForm.style.display = "none";
  body.classList.remove("modal-show");
  showFeed();
}

function closeRegistrationForm() {
  clearErrorPopup();
  registrationForm.style.display = "none";
}

function closeRegAndDisplayLogin() {
  closeRegistrationForm();
  loginForm.style.display = "block";
}

function openLoginForm() {
  postForm.style.display = "none";
  hideFeed();
  clearErrorPopup();
  document.body.classList.add("modal-show");
  loginForm.classList.add("animate");
  loginForm.style.display = "block";
}

function closeLoginForm() {
  loginForm.style.display = "none";
  loginForm.classList.remove("animate");
}

function openRegistrationForm() {
  closeLoginForm();
  registrationForm.style.display = "block";
}
