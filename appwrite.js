// Appwrite SDK initialization
const { Client, Account, ID } = Appwrite

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('67ea2e7d00180d6e4e3b'); // Replace with your project ID

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
