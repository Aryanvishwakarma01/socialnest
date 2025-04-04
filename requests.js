// to add friend requests in request list
let requests = document.querySelector(".request-list")

const req = [{ profile: "images/profile-5.jpg", name: "Deepika" },
{ profile: "images/profile-6.jpg", name: "Vandana" },
{ profile: "images/profile-7.jpg", name: "Priyanka" },
{ profile: "images/profile-8.jpg", name: "Alen" }
]

function addRequests() {
    let clutter = "";
    req.forEach(function (obj) {
        clutter += `<div class="request-item flex flex-col">
                <div class="request-info flex">
                <img src="${obj.profile}" alt="User 1">
                    <div class="request-name"><h4><b>${obj.name}</b> sent you a friend request.</h4>
                    <p>5 mutual friends</p> </div>
                </div>
                
                <div class="actions">
                    <button class="accept">Accept</button>
                    <button class="decline">Decline</button>
                </div>
            </div>`;
        requests.innerHTML = clutter;

    })
}
addRequests()

// Accept & Decline Button Functionality
document.querySelectorAll('.accept').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.request-item').remove();
        alert('Friend Request Accepted!');
    });
});

document.querySelectorAll('.decline').forEach(button => {
    button.addEventListener('click', function () {
        this.closest('.request-item').remove();
        alert('Friend Request Declined!');
    });
});
