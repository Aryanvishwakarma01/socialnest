
// Appwrite SDK initialization
const { Client, Account, ID,Storage, Databases} = Appwrite

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67ed4d790016533e7d7c'); // Replace with your project ID

// Initialize Appwrite Account
const account = new Account(client);

const database = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);

const BUCKET_ID = '67f2604e0039bfba0d50';
const DATABASE_ID = '67f2615a000afd940198';
const COLLECTION_ID = '67f26177002a7afd7728';


const checkAuthStatus = async () => {
    try {
        const user = await account.get();
        // console.log('User is logged in:', user);
        // Handle logged in state (e.g., redirect to dashboard or show logged-in UI)
        // You can add your logic here
        // if(!user){ window.location.pathname = "/"
        //   return;
        // }
        return user;

    } catch (error) {
        console.log('User is not logged in');
        return false
        // User is not logged in, show login/register UI
    }
}
;
  let userData;
  document.addEventListener("DOMContentLoaded", async () => {
    userData = await checkAuthStatus();
    if (!userData) return;

    const avatar = document.getElementById("avatar");
    if (avatar) avatar.src = userData?.prefs?.avatar;

    const userpic = document.getElementById("userpic");
    if (userpic) userpic.src = userData?.prefs?.avatar;

    const username = document.getElementById("username");
    if (username) username.innerText = userData?.name;

    const userid = document.getElementById("userid");
    if (userid) userid.innerText = "@" + userData?.prefs?.username;

    const fullName = document.getElementById("fullName");
    if (fullName) fullName.value = userData?.name;

    const userNameField = document.getElementById("user-name");
    if (userNameField) userNameField.value = "@" + userData?.prefs?.username;

    const email = document.getElementById("email");
    if (email) email.value = userData?.email;

    const gender = document.getElementById("gender");
    if (gender) gender.value = userData?.prefs?.gender;

    document.querySelectorAll(".userAvatar").forEach(el => {
        el.src = userData?.prefs?.avatar;
    });
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
  



