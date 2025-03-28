

// login
// document.getElementById("login-form").addEventListener("submit", function (event) {


document.getElementById("login-form").addEventListener("submit", function (e) {
    login(e); // This correctly passes the event object
});

    function login(e) {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim().toLowerCase(); // Normalize username
        const password = document.getElementById("login-password").value;
    
        const storedUser = localStorage.getItem(username);
        if (!storedUser) {
            alert("User not found. Please register.");
            return;
        }
    
        try {
            const userData = JSON.parse(storedUser);
            if (userData.password === password) {
                alert("Login successful!");
                window.location.href = `index.html?username=${encodeURIComponent(userData.username)}`;  // Redirect on success
            } else {
                alert("Incorrect password.");
            }
        } catch (error) {
            alert("Error processing user data. Please try again.");
            console.error("Parsing error:", error);
        }
    }
    
// });

