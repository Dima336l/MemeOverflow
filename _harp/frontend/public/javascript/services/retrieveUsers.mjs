async function getUsers() {
  try {
    //Call URL with GET
    const response = await fetch("/M00888146/Register");

    //Check status of response
    if (response.ok) {
      // if HTTP-status is 200-299
      // Get the response body as a JavaScript object
      let responseData = await response.json();

      //Log out response
      console.log(responseData);
    } else {
      //Log out error
      console.log("HTTP Error: " + response.status);
    }
  } catch (err) {
    console.error(`Error fetching cats: ${err}`);
  }
}
