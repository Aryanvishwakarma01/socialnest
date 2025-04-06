
// Appwrite SDK initialization
const { Client, Account, ID,Storage, Databases} = Appwrite

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67ed4d790016533e7d7c'); // Replace with your project ID

// Initialize Appwrite Account
const account = new Account(client);

const checkAuthStatus = async () => {
    try {
        const user = await account.get();
        // console.log('User is logged in:', user);
        // Handle logged in state (e.g., redirect to dashboard or show logged-in UI)
        // You can add your logic here
        
        return user;

    } catch (error) {
        console.log('User is not logged in');
        // User is not logged in, show login/register UI
    }
}
;
  
document.addEventListener("DOMContentLoaded",async () => {
    
    const userData = await checkAuthStatus();
    // console.log(userData)
    document.getElementById("avatar").src = userData?.prefs?.avatar
    document.getElementById("userpic").src = userData?.prefs?.avatar
    document.getElementById("username").innerText = userData?.name
    document.getElementById("userid").innerText = "@"+userData?.prefs.username
    document.getElementById("fullName").value = userData?.name
    document.getElementById("user-name").value = "@"+ userData?.prefs?.username
    document.getElementById("email").value = userData?.email
    document.getElementsByClassName("userAvatar").value = userData?.prefs?.avatar
    });
    

  // Handle the password update
  document.getElementById("updatePassword").addEventListener('click', async () => {
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
  
    if (!newPassword.value || !confirmPassword.value) {
      alert("Please fill all fields");
      return;
    }
  
    if (newPassword.value !== confirmPassword.value) {
      alert("New passwords do not match.");
      return;
    }
  
    try {
      await account.updatePassword(newPassword.value,currentPassword.value);
      alert("Password updated successfully!");
      currentPassword.value=""
      newPassword.value=""
      confirmPassword.value=""
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update password: " + error.message);
    }
  });
  
