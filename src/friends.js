window.onload = () => {
  createFriendItem();
  createFriendItem();
  createFriendItem();
  createFriendItem();
  createFriendItem();
  createFriendItem();
};

function createFriendItem(attendees, start, end, location) {
  const newPost = document.getElementById("friend-item").content.cloneNode(true);
  document.getElementById("friends-list").appendChild(newPost);
}
