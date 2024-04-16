const followerName = document.getElementsByClassName("textStats");
async function follow () {
    try {
        const response = await fetch("/M00888146/followUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: followerName[0].textContent }),
        });
        const data = await response.json();
        console.log(data);  
      } catch (error) {}
}