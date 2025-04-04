function homepage() {
    window.location.href = "homepage.html"
}


// Search Functionality
document.getElementById('searchInput').addEventListener('keyup', function () {
    let filter = this.value.toLowerCase();
    let chats = document.querySelectorAll('.chat-item');

    chats.forEach(chat => {
        let name = chat.querySelector('h4').textContent.toLowerCase();
        chat.style.display = name.includes(filter) ? 'flex' : 'none';
    });
});

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Logic for filtering chats based on tab can be added here
    });
});

document.querySelectorAll('.menu_item').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.menu_item').forEach(t => t.classList.remove('focused-menu-item'));
        this.classList.add('focused-menu-item');

        // Logic for filtering chats based on tab can be added here
    });
});