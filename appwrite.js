// Appwrite SDK initialization
const { Client, Account, ID } = Appwrite

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
