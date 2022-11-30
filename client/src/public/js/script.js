import { getLoggedInUserName, jsonFetch } from './utils/dataUtils.js';


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

    // Set post date and start/end times
    const postMeetingDateField = newPost.querySelector('#postMeetingDate');
    postMeetingDateField.innerText = formatDayMonth(postView.timeInterval.start);
    const postTimeIntervalField = newPost.querySelector('#postTimeInterval');
    postTimeIntervalField.innerText = `${formatTime(postView.timeInterval.start)} - ${formatTime(postView.timeInterval.end)}`;

    // Attach handler for the post join button
    const postJoinButton = newPost.querySelector('#postJoinButton');
    postJoinButton.addEventListener('click', createPostJoinHandler(postView._id));

    document.getElementById('feed').appendChild(newPost);
}


function createPostJoinHandler(postId) {
    return async () => {
        const res = await jsonFetch(`post/${postId}/join`, 'PUT', {
            userName: getLoggedInUserName()
        });
        if (res.status === 200) {
            await displayPosts();
            alert('Successfully joined!');
        } else {
            alert('Join failed!');
        }
    };
}


function formatTime(date) {
    const d = new Date(date);
    let h = d.getHours();
    let p = 'AM';
    if (h > 12) {
        h = d.getHours() % 12;
        p = 'PM';
    } else if (d.getHours() === 0) {
        h = 12;  
    } 

    return `${h}:${d.getMinutes()} ${p}`;
}


function formatDayMonth(date) {
    const d = new Date(date);
    return `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}`;
}