// Add event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formResponse = document.getElementById("formResponse");

    // Simple validation
    if (name === "" || email === "" || message === "") {
        formResponse.style.color = "red";
        formResponse.textContent = "Please fill in all fields.";
        formResponse.style.display = "block";
        return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    // Send data to PHP via Fetch API
    fetch("process_form.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
            formResponse.style.color = "green";
            formResponse.textContent = "Your message has been sent successfully!";
            formResponse.style.display = "block";

            // Clear the form fields
            document.getElementById("contactForm").reset();
            console.log("Server Response: ", data); // Debugging: Log the PHP response
        })
        .catch((error) => {
            console.error("Error:", error);
            formResponse.style.color = "red";
            formResponse.textContent = "Something went wrong. Please try again.";
            formResponse.style.display = "block";
        });
});