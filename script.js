// Retrieve and display posts on page load
window.addEventListener("load", function () {
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    savedPosts.forEach(post => {
        document.querySelector(".posts").insertAdjacentHTML("afterbegin", post);
    });
});

// function story_open() {
//     let img = document.getElementsByClassName("storypic");

//     // Add expanded class
//     img.classList.add("expanded");

//     // Remove expanded class after 5 seconds
//     setTimeout(() => {
//         img.classList.remove("expanded");
//     }, 2000);
// }




let stories = document.querySelector(".stories")

for (let i = 1; i <= 25; i++) {
    const foreignNames = [
        "Alejandro", "Sofia", "Matteo", "Isla", "Léon", "Freja", "Hugo", "Emilia", "Luca", "Anya",
        "Dmitri", "Yuki", "Hana", "Kai", "Amélie", "Sven", "Elina", "Felix", "Ines", "Rafaela",
        "Nikolai", "Ximena", "Thiago", "Mira", "Tobias", "Ivana", "Zoran", "Selma", "Otto", "Elio"
    ];
    stories.innerHTML += `
    <div class="story">
                        <img onclick="story_open()" class="storypic" src="https://images.pexels.com/photos/${415828 + i}/pexels-photo-${415828 + i}.jpeg?auto=compress&cs=tinysrgb&w=300" alt="">
                        <img class="storyprofile" src="images/profile-${i % 20 + 1}.jpg" alt="">
                        <p>${i == 1 ? "Your Story" : foreignNames[i]}</p>
         </div> `

}

function story_open() {

    document.querySelectorAll(".storypic").forEach(element => {
        element.addEventListener("click", (e) => {
            const imgSrc = e.target.src;


            // Create full-screen overlay
            let fullscreenDiv = document.createElement("div");
            fullscreenDiv.classList.add("fullscreen");

            // Create image inside overlay
            let fullScreenImg = document.createElement("img");
            fullScreenImg.src = imgSrc;

            // Append image to overlay
            fullscreenDiv.appendChild(fullScreenImg);
            document.body.appendChild(fullscreenDiv);

            // Close after 5 seconds
            setTimeout(() => {
                fullscreenDiv.remove();
            }, 2000);
        })
    });
}


document.querySelector(".stories-container button").addEventListener("click", () => {
    document.querySelector(".stories").scrollBy({
        left: 100,
        behavior: "smooth"
    })
})



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
                    <div class="request-name"><h4>${obj.name}</h4>
                    <p>5 mutual friends</p>
                </div>
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


let selectedImage = null;

// When an image is selected
document.getElementById("fileInput").addEventListener("change", function (event) {
    let file = event.target.files[0];

    document.querySelector("#uploadpostimg p").innerText = file.name;

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            selectedImage = e.target.result;
            document.getElementById("imagePreview").src = selectedImage;
            document.getElementById("imagePreview").style.display = "block";
            document.getElementById("postButton").disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

const handleFileInput = () => {
    document.getElementById('fileInput').click()
}

let profileElement = document.getElementById("profilephoto")
let imgSrc = profileElement.src

let profileNameElement = document.getElementById("profilename")
let profileName = profileNameElement.innerText


// When the post button is clicked
document.getElementById("newpost").addEventListener("click", function () {
    if (!selectedImage) return;

    const countries = [
        "India", "United States", "Canada", "United Kingdom", "Australia",
        "Germany", "France", "Italy", "Spain", "Brazil",
        "Japan", "China", "Russia", "Mexico", "South Africa",
        "Argentina", "Saudi Arabia", "South Korea", "Netherlands", "Sweden"
    ];

    const caption = document.getElementById("post-caption");
    let postHtml = `
        <div class="post">
            <div class="postby ">
                <div class="postnavleft item-centre flex">
                    <div class="post-profile ">
                        <img src="${imgSrc}" alt="">
                    </div>
                    <div class="profile_name">
                        <h3>${profileName}</h3>
                        <p>${countries[Math.floor(Math.random() * 20)]}, ${Math.floor(Math.random() * 60)} MINUTES AGO</p>
                    </div>
                </div>
                <div class="right">
                    <i class="ri-more-2-line"></i>
                </div>
            </div>
            <div class="postimage">
                <img src="${selectedImage}" alt="Uploaded Image">
            </div>
            <div class="postcaption flex space-between">
                <div class="leftcaption">
                    <i class="ri-heart-line"></i>
                    <i class="ri-chat-1-line"></i>
                    <i class="ri-share-line"></i>
                </div>
                <div class="rightcaption">
                    <i class="ri-bookmark-line"></i>
                </div>
            </div>
            <div class="postlikedby flex item-centre">
                <div class="likedusers relative">
                    <img src="images/profile-19.jpg" alt="">
                    <img src="images/profile-18.jpg" alt="">
                    <img src="images/profile-17.jpg" alt="">
                </div>
                <p>
                    Liked by <b>Svetlana Blaz</b> and <b>${Math.floor(Math.random() * (300 - 200 + 1)) + 200}</b> others
                </p>
            </div>
            <div class="postdescription">
                <p>${caption.value}</p>
                <p style="color: grey;">View all 265 comments</p>
            </div>
        </div>
    `;

    // Insert the post inside the `.posts` div
    document.querySelector(".posts").insertAdjacentHTML("afterbegin", postHtml);
    alert("Posted");

    // Store post in local storage
    let posts = JSON.parse(localStorage.getItem("posts")) || []; // Get existing posts
    posts.unshift(postHtml); // Add new post at the beginning
    localStorage.setItem("posts", JSON.stringify(posts)); // Save back to local storage

    // Reset selected image
    selectedImage = null;
    caption.value = null;
    document.querySelector("#uploadpostimg p").innerText = " ";

    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("fileInput").value = null;
    document.getElementById("postButton").disabled = true;

});





function closethemepanel() {
    document.querySelector(".themecontainer").innerHTML = ""
}
document.querySelectorAll(".menu_item").forEach((item) => {
    item.addEventListener("click", (e) => {
        closethemepanel()
    })
})
// selecting theme button
let themebutton = document.getElementById("themebutton")
themebutton.addEventListener('click', function () {
    document.querySelector(".themecontainer").insertAdjacentHTML("afterbegin", `<div class="themechange">
        <h2>Customize your view<i onclick="closethemepanel()" class="ri-close-circle-line" style="position: absolute; right:5px; top:5px; "></i></h2>
        <p>Manage your color and background</p>
        <div class="color-options">
            <div class="color" style="background:#6a5acd;" onclick="changeColor('#6a5acd','rgb(126, 114, 204)')"></div>
            <div class="color" style="background: #D833E7;" onclick="changeColor('#D833E7','rgb(227, 108, 238)')"></div>
            <div class="color" style="background:#e74c3c;" onclick="changeColor('#e74c3c','rgb(228, 111, 98)')"></div>
            <div class="color" style="background:#2ecc71;" onclick="changeColor('#2ecc71','rgb(81, 209, 135)')"></div>
            <div class="color" style="background:#3498db;" onclick="changeColor('#3498db','rgb(81, 163, 218)')"></div>
        </div>
        <h3>Background</h3>
        <div class="background-options">
            <div class="background-option light" onclick="changeBackground('light')">Light</div>
            <div class="background-option dark" onclick="changeBackground('dark')">Dark</div>
            <div class="background-option black" onclick="changeBackground('black')">Black</div>
        </div>
    </div>`
    );
})

// theme change settings
function changeColor(color, hovercolor) {
    document.documentElement.style.setProperty('--btn-color', color);
    document.documentElement.style.setProperty('--hover-btn-color', hovercolor);
}
function changeBackground(theme) {
    if (theme === 'light') {
        window.location.reload();
    } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--background-nav', '#2A2442');
        document.documentElement.style.setProperty('--background-body', '#1F1B32');
        document.documentElement.style.setProperty('--menu-item-hover', '#1F1B32');
        document.documentElement.style.setProperty('--main-text', '#FFFFFF');
        document.documentElement.style.setProperty('--chat-btn', '#000000');
        // document.documentElement.style.setProperty('--hover-btn-color', '#1F1B32');
    } else if (theme === 'black') {
        document.documentElement.style.setProperty('--background-nav', '#110E1B');
        document.documentElement.style.setProperty('--background-body', '#000000');
    }
}
function showMenu() {
    let left = document.querySelector(".left");
    left.classList.toggle("show")

    if (!left.classList.contains("show")) {
        left.style.left = "-105%"
    } else {
        left.style.left = "0%"
    }
}



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const username = getQueryParam("username")
    if (!username) {
        window.location.href = "login.html";
    }
    const storedUser = localStorage.getItem(username)
    const userData = JSON.parse(storedUser);

    document.getElementById("profilename").innerText = userData.firstName;
    document.querySelector(".text_muted").innerText = "@" + userData.username;
    // document.getElementById("userpic").src += userData.profilePic.src;
    // document.getElementById("profilephoto").src += userData.profilePic.src;

});

