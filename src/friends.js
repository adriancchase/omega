window.onload = () => {
  createPost();
  createPost();
  createPost();
  createPost();
  createPost();
  createPost();
};

function createPost(attendees, start, end, location) {
  const newPost = document.getElementById("post").content.cloneNode(true);
  document.getElementById("feed").appendChild(newPost);
}
