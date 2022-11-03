window.onload = () => {
    console.log('Loading posts...');
    createPost();
    createPost();
    createPost();
    createPost();
    createPost();
    createPost();
    console.log('Posts loaded successfully.');
}


function createPost(attendees, start, end, location) {
    const newPost = document.getElementById('post').content.cloneNode(true);
    document.getElementById('feed').appendChild(newPost);
}