import {importHtml} from './utils/htmlUtils.js';
import {getLoggedInUserName, jsonFetch} from './utils/dataUtils.js';
import {displayPosts} from './script.js';


// Event listener on friend invite/uninvite button will add/remove friend on this set,
// which will be cleared on menu exit.
let invitedFriends = new Set();

await importHtml('createPostModal.html', 'importCreatePostModal').then(() => {
    document.getElementById('feedPostButton').addEventListener('click', reset);
    document.getElementById('selectTimeButton').addEventListener('click', selectTime);
    document.getElementById('createPostButton').addEventListener('click', createPost);
});

async function selectTime() {
    clearAvailableFriendsList();
    const userName = getLoggedInUserName();
    const startTimeInput = document.getElementById('startTimeInput').value;
    const endTimeInput = document.getElementById('endTimeInput').value;
    
    if (startTimeInput.length !== 0 && endTimeInput.length !== 0) {
        // Note: response.json() parses Date objects into strings rather than Date objects, so this is not actually of type User
        const friends = await fetch(`user/${userName}/friends`).then(response => response.json());
        console.log(`Friends: ${JSON.stringify(friends)}`);
        const timeInterval = {
            start: new Date(startTimeInput),
            end: new Date(endTimeInput)
        };
        const availableFriends = friends.filter(friend => isAvailableAtTime(friend, timeInterval));
        const availableFriendsList = document.getElementById('availableFriendsList');
        if (availableFriendsList) {
            availableFriends.forEach(friend => showAvailableFriend(friend, availableFriendsList));
        } else {
            console.error('selectTime() failed: availableFriendsList is null.');
        }
    }
    console.log('selectTime function finished executing.');
}

async function createPost() {
    const start = document.getElementById('startTimeInput').value;
    const end = document.getElementById('endTimeInput').value;
    const timeInterval = { start, end };
    const location = document.getElementById('locationInput').value;
    const userName = getLoggedInUserName();

    // Create new post.
    const newPostResponse = await fetch('post/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: userName,
            attendees: [userName],
            location,
            timeInterval,
            chatId: '',
            visibleTo: [userName],
        })
    });

    document.getElementById('createPostInfo').innerText = newPostResponse.ok ? 'Post created successfully!' 
                                                                             : 'Failed to create post.';

    // Invite friends.
    const newPostId = await newPostResponse.json().then(obj => obj.postId);
    const inviteResponse = await jsonFetch(`post/${newPostId}/invite`, 'PUT', {
        friendsToInvite: Array.from(invitedFriends),
        from: userName,
        location,
        timeInterval,
        postId: newPostId
    });

    await displayPosts();
}

function isAvailableAtTime(user, timeInterval) {
    for (const {start, end} of user.availability) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate.getTime() < timeInterval.end.getTime() && endDate.getTime() > timeInterval.start.getTime()) {
            return true;
        }
    }

    return false;
}

function showAvailableFriend(friend, availableFriendsList) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'available-friend');

    const friendName = document.createElement('span');
    friendName.innerText = `${friend.firstName} ${friend.lastName}`;

    const inviteButton = document.createElement('button');
    inviteButton.type = 'button';
    inviteButton.classList.add('btn', 'btn-primary', 'invite-friend-button');
    inviteButton.innerText = 'Invite';
    inviteButton.addEventListener('click', createFriendInviteHandler(friend.userName));

    listItem.appendChild(friendName);
    listItem.appendChild(inviteButton);
    availableFriendsList.appendChild(listItem);
}

function createFriendInviteHandler(friendUserName) {
    return () => invitedFriends.add(friendUserName);
}

function clearAvailableFriendsList() {
    const availableFriendsList = document.getElementById('availableFriendsList');
    if (availableFriendsList) {
        availableFriendsList.innerHTML = '';
    }
}

function clearInvitedFriends() {
    invitedFriends = new Set();
}

function reset() {
    clearAvailableFriendsList();
    clearInvitedFriends();
    document.getElementById('createPostInfo').innerText = '';
    document.getElementById('locationInput').value = '';
}