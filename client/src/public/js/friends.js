window.onload = () => {
  for (let i = 0; i < 25; ++i) {
    createFriendItem();
  }
};

function createFriendItem(attendees, start, end, location) {
  const newPost = document
    .getElementById("friend-item")
    .content.cloneNode(true);
  document.getElementById("friends-list").appendChild(newPost);
}
