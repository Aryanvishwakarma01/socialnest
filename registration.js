// registration
document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const userData = {
        username: document.getElementById("username").value,
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        password: document.getElementById("password").value
    };
    const fileInput = document.getElementById("profile-pic");
    const file = fileInput.files[0]; // Get selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const base64String = event.target.result; // Convert to Base64
            userData.profilePicture = base64String; // Store in localStorage
            alert("Profile picture saved!");

            // Preview the saved image
            document.getElementById("preview-image").src = base64String;
        };
        reader.readAsDataURL(file); // Read file as Base64
    }

    localStorage.setItem(userData.username, JSON.stringify(userData));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
});

