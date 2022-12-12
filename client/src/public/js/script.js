import { getLoggedInUserName, jsonFetch, formatTime, formatDayMonth } from './utils/dataUtils.js';


window.onload = async () => {
    await displayPosts();
    await displayInvitations();
};


export async function displayPosts() {
    document.getElementById('feed').innerHTML = '';
    const userName = getLoggedInUserName();
    const feedPosts = await fetch(`/user/${userName}/feed`).then(res => res.json());
    if (feedPosts.length) {
        feedPosts.forEach(createPost);
    } else {
        // Display a message if user has received no invitations.
        const messageDiv = document.createElement('div');
        messageDiv.style.textAlign = 'center';
        messageDiv.innerText = 'You don\'t have any posts in your feed right now!';
        document.getElementById('feed').appendChild(messageDiv);
    }
}


function createPost(postView) {
    const newPost = document.getElementById('post').content.cloneNode(true);

    // Add users to post attendees list
    const attendeesList = newPost.querySelector('#attendees');
    postView.attendees.forEach(userView => {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerText = `${userView.firstName} ${userView.lastName}`;
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
        const res = await jsonFetch(`/post/${postId}/join`, 'PUT', {
            userName: getLoggedInUserName()
        });
        if (res.status === 200) {
            await Promise.all([displayPosts(), displayInvitations()])
                         .then(() => setTimeout(() => alert('Successfully joined!'), 0));
        } else {
            alert('Join failed!');
        }
    };
}


async function displayInvitations() {
    document.getElementById('invitationList').innerHTML = '';
    const userName = getLoggedInUserName();
    const user = await fetch(`/user/${userName}`).then(res => res.json());
    if (user.invitations.length) {
        user.invitations.forEach(createInvitation);
    } else {
        // Display a message if user has received no invitations.
        const messageDiv = document.createElement('div');
        messageDiv.style.textAlign = 'center';
        messageDiv.innerText = 'You don\'t have any invitations right now!';
        document.getElementById('invitationList').appendChild(messageDiv);
    }
}


function createInvitation(postInvitation) {
    const newInvitation = document.getElementById('invitation').content.cloneNode(true);
    newInvitation.querySelector('#invitationLocationText').innerText = postInvitation.location;
    newInvitation.querySelector('#invitationDateText').innerText = formatInvitationDateText(postInvitation);
    newInvitation.querySelector('#invitationFromText').innerText = formatInvitationFromText(postInvitation);
    newInvitation.querySelector('#invitationAcceptButton')
                 .addEventListener('click', createPostJoinHandler(postInvitation.postId));

    document.getElementById('invitationList').appendChild(newInvitation);
}


function formatInvitationDateText(postInvitation) {
    const startTime = postInvitation.timeInterval.start;
    const endTime = postInvitation.timeInterval.end;

    return `${formatDayMonth(startTime)} ${formatTime(startTime)} - ${formatTime(endTime)}`;
}


function formatInvitationFromText(postInvitation) {
    return `From: ${postInvitation.from.firstName} ${postInvitation.from.lastName}`;
}