import {getLoggedInUserName} from './utils/dataUtils.js';


window.onload = async () => {
    await displayPosts();
};

export async function displayPosts() {
    console.log('Loading posts...');
    const userName = getLoggedInUserName();
    const feedPosts = await fetch(`user/${userName}/feed`).then(res => res.json());
    feedPosts.forEach(createPost);
    console.log('Posts loaded successfully.');
}


function createPost(postView) {
    const newPost = document.getElementById('post').content.cloneNode(true);

    // Add users to post attendees list
    const attendeesList = newPost.querySelector('#attendees');
    postView.attendees.forEach(userView => {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerText = userView.userName;
        attendeesList.appendChild(listElement);
    });

    // Set post location
    const postLocationText = newPost.querySelector('#postLocationText');
    postLocationText.innerText = postView.location;

    // Set post start/end times
    const postStartTimeText = newPost.querySelector('#postStartTimeText');
    postStartTimeText.innerText = postView.timeInterval.start;
    const postEndTimeText = newPost.querySelector('#postEndTimeText');
    postEndTimeText.innerText = postView.timeInterval.end;

    document.getElementById('feed').appendChild(newPost);
}