document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(registrationForm);
        const requestData = Object.fromEntries(formData.entries()); // Convert FormData to object

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert("User registered successfully");
                // Optionally, close the modal or redirect the user
            } else {
                throw new Error("Failed to register user");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while registering user");
        }
    });
});