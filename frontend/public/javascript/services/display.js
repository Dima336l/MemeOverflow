const container = document.getElementById("imageContainer");
function createMemeContainer(
  tag,
  description,
  username,
  date,
  memeSrc,
  likes,
  comments,
  views,
  avatar
) {
  // Create the meme container div
  const memeContainer = document.createElement("div");
  memeContainer.className = "meme-container first-container";

  // Create the tag element
  const h1Tag = document.createElement("h1");
  h1Tag.className = "tag";
  h1Tag.textContent = tag;

  // Create the description element
  const h2Description = document.createElement("h2");
  h2Description.className = "description";
  h2Description.textContent = description;

  // Create the stats header div
  const statsHeader = document.createElement("div");
  statsHeader.className = "stats-header";

  // Create the avatar image element
  const imgAvatar = document.createElement("img");
  imgAvatar.src = "./Uploads/" + avatar;
  imgAvatar.className = "avIcon";

  // Create the username element
  const h2Username = document.createElement("h2");
  h2Username.className = "stats-text";
  h2Username.textContent = username;

  // Create the date element
  const h3Date = document.createElement("h3");
  h3Date.className = "stats-text";
  h3Date.textContent = date;

  // Create the image element for the meme
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  const imgMeme = document.createElement("img");
  imgMeme.src = memeSrc;
  imageContainer.appendChild(imgMeme);

  // Create the bottom stats div
  const bottomStats = document.createElement("div");
  bottomStats.className = "bottom-stats";

  // Create the like icon element
  const imgLike = document.createElement("img");
  imgLike.src = "./Images/like.png";

  // Create the likes count element
  const h2Likes = document.createElement("h2");
  h2Likes.className = "bottom-stats-text";
  h2Likes.textContent = likes;

  // Create the comment icon element
  const imgComment = document.createElement("img");
  imgComment.id = "comment";
  imgComment.src = "./Images/comment.png";

  // Create the comments count element
  const h2Comments = document.createElement("h2");
  h2Comments.className = "bottom-stats-text";
  h2Comments.textContent = comments;

  // Create the view icon element
  const imgEye = document.createElement("img");
  imgEye.id = "eye";
  imgEye.src = "./Images/eye.png";

  // Create the views count element
  const h2Views = document.createElement("h2");
  h2Views.className = "bottom-stats-text";
  h2Views.id = "view-count";
  h2Views.textContent = views;

  // Create the save icon element
  const imgSave = document.createElement("img");
  imgSave.src = "./Images/save.png";
  imgSave.className = "right-align";

  const hr = document.createElement("hr");
  hr.className = "rounded";

  // Append all elements to their respective parent containers
  statsHeader.appendChild(imgAvatar);
  statsHeader.appendChild(h2Username);
  statsHeader.appendChild(h3Date);

  bottomStats.appendChild(imgLike);
  bottomStats.appendChild(h2Likes);
  bottomStats.appendChild(imgComment);
  bottomStats.appendChild(h2Comments);
  bottomStats.appendChild(imgEye);
  bottomStats.appendChild(h2Views);
  bottomStats.appendChild(imgSave);

  memeContainer.appendChild(h1Tag);
  memeContainer.appendChild(h2Description);
  memeContainer.appendChild(statsHeader);
  memeContainer.appendChild(imageContainer);
  memeContainer.appendChild(bottomStats);
  memeContainer.appendChild(hr);

  // Return the created meme container
  container.appendChild(memeContainer);
}

fetch("/M00888146/uploads")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((image) => {
      if (image.title) {
        createMemeContainer(
          image.category,
          image.title,
          image.name,
          image.uploadDate,
          `../uploads/${image.fileName}`,
          image.likeCount,
          image.commentCount,
          image.viewCount,
          image.avatar
        );
      }
    });
  })

  .catch((error) => console.error("Error fetching images:", error));

const modalLogin = document.getElementById("id01");
const modalRegister = document.getElementById("id02");
const modalPost = document.getElementById("id03");
const modalProfile = document.getElementById("id04");

function isModalVisible(modal) {
  const computedStyle = window.getComputedStyle(modal);
  return computedStyle.display === "block";
}

function toggleMemeContainerVisibility(show) {
  const memeContainer = document.getElementById("imageContainer");
  if (show) {
    memeContainer.classList.remove("hidden");
  } else {
    memeContainer.classList.add("hidden");
  }
}

function toggleVisibility(modal) {
  if (!isModalVisible(modal)) {
    toggleMemeContainerVisibility(true);
  } else {
    toggleMemeContainerVisibility(false);
  }
}

const icon1 = document.getElementById("avatar-icon");
const icon2 = document.getElementById("post-btn");
const registerBtn = document.getElementById("registerBtn");
const anonymous = document.getElementById("anonymous");

icon1.addEventListener("click", function () {
  toggleVisibility(modalLogin);
});
icon2.addEventListener("click", function () {
  toggleVisibility(modalRegister);
});
registerBtn.addEventListener("click", function () {
  toggleVisibility(modalPost);
});

anonymous.addEventListener("click", function () {
  toggleVisibility(modalProfile);
});

document.addEventListener("click", function () {
  if (
    !isModalVisible(modalLogin) &&
    !isModalVisible(modalRegister) &&
    !isModalVisible(modalPost) &&
    !isModalVisible(modalProfile)
  ) {
    toggleMemeContainerVisibility(true);
  } else {
    toggleMemeContainerVisibility(false);
  }
});

fetch("/M00888146/checkLogin")
  .then((response) => response.json())
  .then((data) => {
    var avatarIcon = document.getElementById("avatar-icon");
    var postIcon = document.getElementById("post-btn");
    var feedIcon = document.getElementById("feed");
    var anonymousIcon = document.getElementById("anonymous");
    if (data.avatar) {
      anonymousIcon.setAttribute("src", "./uploads/" + data.avatar);
    }
    if (data.login) {
      avatarIcon.style.display = "none";
      postIcon.style.display = "block";
      feedIcon.style.display = "";
      anonymousIcon.style.display = "block";
    } else {
      avatarIcon.style.display = "block";
      postIcon.style.display = "none";
      feedIcon.style.display = "none";
      anonymousIcon.style.display = "none";
    }
  })
  .catch((error) => console.error("Error fetching images:", error));

const profileContainer = document.getElementById("profContainers");
function createProfileHeader(avatar, name, isFollowed) {
  const profileHeader = document.createElement("div");
  profileHeader.className = "profileHeader";

  const statsProfile = document.createElement("div");
  statsProfile.className = "statsProfile";

  const img = document.createElement("img");
  img.src = "./Uploads/" + avatar;

  // Create the tag element
  const textStats = document.createElement("div");
  textStats.className = "textStats";

  const h2Tag = document.createElement("h2");
  h2Tag.textContent = name;

  const hr = document.createElement("hr");
  hr.className = "rounded profileHr";

  const followIcon = document.createElement("img");
  followIcon.id = "followIcon";
  followIcon.src = "../Images/Follow.png";
  followIcon.className = "icon";
  followIcon.onclick = follow;
  followIcon.addEventListener("click", () => {
    followIcon.style.opacity = "0";
    setTimeout(() => {
      followIcon.style.display = "none";
    }, 500);
  });

  fetch("/M00888146/checkLogin")
    .then((response) => response.json())
    .then((data) => {
      if (data.login) {
        if (!isFollowed) {
          followIcon.style.display = "block";
          statsProfile.append(followIcon);
        }
      }
    });

  profileHeader.appendChild(statsProfile);
  statsProfile.appendChild(img);
  statsProfile.appendChild(textStats);
  textStats.appendChild(h2Tag);
  profileContainer.appendChild(profileHeader);
  profileContainer.appendChild(hr);
}

async function getFeedIndividual(name) {
  try {
    const response = await fetch("/M00888146/getFeed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const memes = await response.json();
    container.textContent = "";
    profileContainer.innerHTML = "";
    document.documentElement.scrollTop = 0;
    createProfileHeader(
      memes.memes[0].avatar,
      memes.memes[0].name,
      memes.isFollowed
    );
    for (i = 0; i < memes.memes.length; i++) {
      createMemeContainer(
        memes.memes[i].title,
        memes.memes[i].category,
        memes.memes[i].name,
        memes.memes[i].uploadDate,
        `../uploads/${memes.memes[i].fileName}`,
        memes.memes[i].likeCount,
        memes.memes[i].commentCount,
        memes.memes[i].viewCount,
        memes.memes[i].avatar
      );
    }
  } catch (error) {}
}

$(document).on("click", ".avIcon", function () {
  const h2Username = $(this).siblings(".stats-text").first();
  getFeedIndividual(h2Username.text());
});

const feed = document.getElementById("feed");
async function getFeedFromFollowers() {
  fetch("/M00888146/getFeedFromFollowers")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      document.documentElement.scrollTop = 0;
      for (i = 0; i < data.memes.length; i++) {
        createMemeContainer(
          data.memes[i].title,
          data.memes[i].category,
          data.memes[i].name,
          data.memes[i].uploadDate,
          `../uploads/${data.memes[i].fileName}`,
          data.memes[i].likeCount,
          data.memes[i].commentCount,
          data.memes[i].viewCount,
          data.memes[i].avatar
        );
      }
    })
    .catch((error) => console.error("Error fetching images:", error));
}

const imageElements = document.querySelectorAll(".vertical-menu .box");

imageElements.forEach((image) => {
  image.addEventListener("click", async () => {
    const category = image.textContent.trim();
    getFeed(category);
  });
});

async function getFeed(category) {
  try {
    const response = await fetch(
      `/M00888146/getFeedByCategory?category=${encodeURIComponent(category)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const memes = await response.json();
    container.innerHTML = "";
    document.documentElement.scrollTop = 0;
    for (i = 0; i < memes.length; i++) {
      createMemeContainer(
        memes[i].title,
        memes[i].category,
        memes[i].name,
        memes[i].uploadDate,
        `../uploads/${memes[i].fileName}`,
        memes[i].likeCount,
        memes[i].commentCount,
        memes[i].viewCount,
        memes[i].avatar
      );
    }
  } catch (error) {
    // Handle errors...
  }
}
