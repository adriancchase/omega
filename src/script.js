import {getLoggedInUserName} from './utils/dataUtils.js';


window.onload = async () => {
    await displayPosts();
};


export async function displayPosts() {
    document.getElementById('feed').innerHTML = '';
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
    postStartTimeText.innerText = formatPostDate(postView.timeInterval.start);
    const postEndTimeText = newPost.querySelector('#postEndTimeText');
    postEndTimeText.innerText = formatPostDate(postView.timeInterval.end);

    document.getElementById('feed').appendChild(newPost);
}


function formatPostDate(date) {
    const d = new Date(date);
    let h = d.getHours();
    let p = 'AM';
    if (h > 12) {
        h = d.getHours() % 12;
        p = 'PM';
    } else if (d.getHours() === 0) {
        h = 12;  
    } 

    return `${d.getMonth() + 1}/${d.getDate()} ${h}:${d.getMinutes()} ${p}`;
}