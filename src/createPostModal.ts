import * as types from './backend/types';


fetch('createPostModal.html')
    .then(response => response.text())
    .then(addCreatePostModalToDom);


function addCreatePostModalToDom(htmlText: string): void {
    const scriptElement = document.querySelector('script#importCreatePostModal');
    if (scriptElement && scriptElement.parentNode) {
        const replacementElement = document.createElement('div');
        replacementElement.innerHTML = htmlText;
        scriptElement.parentNode.replaceChild(replacementElement, scriptElement);
    } else {
        console.error('addCreatePostModalToDom failed: scriptElement or scriptElement.parentNode is null.');
    }
}


async function selectTime(): Promise<void> {
    const userName = 'nhansche';
    const startTimeInput = (<HTMLInputElement>document.getElementById('startTimeInput')).value;
    const endTimeInput = (<HTMLInputElement>document.getElementById('endTimeInput')).value;
    if (startTimeInput.length !== 0 && endTimeInput.length !== 0) {
        const friends: types.User[] = await fetch(`user/${userName}/friends`).then(response => response.json());
        const timeInterval = {
            start: new Date(startTimeInput),
            end: new Date(endTimeInput)
        };
        const availableFriends = friends.filter(friend => isAvailableAtTime(friend, timeInterval));
        const availableFriendsList = document.getElementById('availableFriendsList');
        if (availableFriendsList) {
            availableFriends.forEach(friend => {
                const listItem = document.createElement('li');
                listItem.innerText = friend.userName;
                availableFriendsList.appendChild(listItem);
            });
        } else {
            console.error('selectTime() failed: availableFriendsList is null.');
        }
    }
}


function isAvailableAtTime(user: types.User, timeInterval: types.TimeInterval) {
    for (const {start, end} of user.availability) {
        if (start >= timeInterval.start && end <= timeInterval.end) {
            return true;
        }
    }

    return false;
}