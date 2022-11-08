import * as types from './backend/types';
import {importHtml} from './utils/htmlUtils.js';

importHtml('createPostModal.html', 'importCreatePostModal').then(() => {
    document.getElementById('closeCreatePostModal')?.addEventListener('click', clearAvailableFriendsList);
    document.getElementById('selectTimeButton')?.addEventListener('click', selectTime);
});

async function selectTime(): Promise<void> {
    console.log('Running selectTime function...');
    clearAvailableFriendsList();
    const userName = 'nhansche'; // For testing
    const startTimeInput = (<HTMLInputElement>document.getElementById('startTimeInput')).value;
    const endTimeInput = (<HTMLInputElement>document.getElementById('endTimeInput')).value;
    
    if (startTimeInput.length !== 0 && endTimeInput.length !== 0) {
        // Note: response.json() parses Date objects into strings rather than Date objects, so this is not actually of type User
        const friends: types.UserView[] = await fetch(`user/${userName}/friends`).then(response => response.json());
        console.log(`Friends: ${JSON.stringify(friends)}`);
        const timeInterval = {
            start: new Date(startTimeInput),
            end: new Date(endTimeInput)
        };
        console.log(`Start: ${JSON.stringify(timeInterval.start)}`);
        console.log(`End: ${JSON.stringify(timeInterval.end)}`);
        const availableFriends = friends.filter(friend => isAvailableAtTime(friend, timeInterval));
        console.log(`Available Friends: ${JSON.stringify(availableFriends)}`);
        const availableFriendsList = document.getElementById('availableFriendsList');
        if (availableFriendsList) {
            availableFriends.forEach(friend => showAvailableFriend(friend, availableFriendsList));
        } else {
            console.error('selectTime() failed: availableFriendsList is null.');
        }
    }
    console.log('selectTime function finished executing.');
}


function isAvailableAtTime(user: types.UserView, timeInterval: types.TimeInterval): boolean {
    for (const {start, end} of user.availability) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate.getTime() < timeInterval.end.getTime() && endDate.getTime() > timeInterval.start.getTime()) {
            return true;
        }
    }

    return false;
}

function showAvailableFriend(friend: types.UserView, availableFriendsList: HTMLElement): void {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'available-friend');

    const friendName = document.createElement('span');
    friendName.innerText = `${friend.firstName} ${friend.lastName}`;

    const inviteButton = document.createElement('button');
    inviteButton.type = 'button';
    inviteButton.classList.add('btn', 'btn-primary', 'invite-friend-button');
    inviteButton.innerText = 'Invite';

    listItem.appendChild(friendName);
    listItem.appendChild(inviteButton);
    availableFriendsList.appendChild(listItem);
}

function clearAvailableFriendsList(): void {
    const availableFriendsList = document.getElementById('availableFriendsList');
    if (availableFriendsList) {
        availableFriendsList.innerHTML = '';
    }
}