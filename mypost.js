  // Function to delete a post
async function deletePost(documentId) {
    try {

      await database.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
       document.getElementById(documentId).remove()
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Failed to delete post:', error.message);
      alert('Failed to delete post. Check console for details.');
    }
  }
  
  // Attach event listener to delete buttons
//   function attachDeleteListeners() {
//     const deleteButtons = document.querySelectorAll('.deletePost');
//     deleteButtons.forEach((btn) => {
//       btn.addEventListener('click', () => {
//         const postId = btn.getAttribute('data-post-id');
//         if (confirm('Are you sure you want to delete this post?')) {
//           deletePost(postId);
//         }
//       });
//     });
//   }

function postMenu(elem) {
    const deleteBtn = elem.querySelector('.deletePost');
    if (deleteBtn.style.display === "none" || !deleteBtn.style.display) {
      deleteBtn.style.display = "block";
    } else {
      deleteBtn.style.display = "none";
    }
  }
  // Retrieve and display posts on page load
window.addEventListener("load", function () {
    
    database.listDocuments(
        DATABASE_ID,     // Replace with your Database ID
        COLLECTION_ID
    ).then(response => {
        response.documents.forEach(post => {
            if(post.ownerId === userData?.$id) document.querySelector(".posts").insertAdjacentHTML("afterbegin",
                `
                <div class="post" id="${post.$id}">
                    <div class="postby">
                        <div class="postnavleft item-centre flex">
                            <div class="post-profile">
                                <img src="${post.profilePhoto}" alt="">
                            </div>
                            <div class="profile_name">
                                <h3>${post.profileName}</h3>
                                <p>${post.location}, ${post.timeAgo} MINUTES AGO</p>
                            </div>
                        </div>
                        ${(post.ownerId === userData.$id) ? `<div class="right">
                            <div class="postmenu-wrapper" onclick="postMenu(this)">
                                    <i class="ri-more-2-line"></i>
                                    <button data-post-id="${post.$id}" onclick="deletePost('${post.$id}')" class="deletePost" style="display:none;">Delete</button>
                            </div>       
                        </div>` : ""}
                    </div>
                    <div class="postimage">
                        <img src="${post.image}" alt="Uploaded Image">
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
                            Liked by <b>Svetlana Blaz</b> and <b>${post.likes}</b> others
                        </p>
                    </div>
                    <div class="postdescription">
                        <p>${post.caption}</p>
                        <p style="color: grey;">View all 265 comments</p>
                    </div>
                </div>
            `
            );
        });
    }).catch(error => {
        console.error("Error fetching posts:", error);
    });
    let savedTheme = localStorage.getItem("themeColor")
    // changeBackground(savedTheme)

});
