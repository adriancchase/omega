import * as types from './backend/types';


fetch('createPostModal.html')
    .then(response => response.text())
    .then(addCreatePostModalToDom);


function addCreatePostModalToDom(htmlText: string): void {
    console.log('Adding createPostModal to DOM...');
    const scriptElement = document.querySelector('script#importCreatePostModal');
    
    if (scriptElement && scriptElement.parentNode) {
        const replacementElement = document.createElement('div');
        replacementElement.innerHTML = htmlText;
        scriptElement.parentNode.replaceChild(replacementElement, scriptElement);
    } else {
        console.error('addCreatePostModalToDom failed: scriptElement or scriptElement.parentNode is null.');
    }
    console.log('createPostModal succesfully added to DOM.');
}


async function selectTime(): Promise<void> {
    console.log('Running selectTime function...');
    const userName = 'nhansche';
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
            availableFriends.forEach(friend => {
                const listItem = document.createElement('li');
                listItem.innerText = friend.userName;
                listItem.classList.add('list-group-item');
                availableFriendsList.appendChild(listItem);
            });
        } else {
            console.error('selectTime() failed: availableFriendsList is null.');
        }
    }
    console.log('selectTime function finished executing.');
}


function isAvailableAtTime(user: types.UserView, timeInterval: types.TimeInterval) {
    for (const {start, end} of user.availability) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (startDate.getTime() < timeInterval.end.getTime() && endDate.getTime() > timeInterval.start.getTime()) {
            return true;
        }
    }

    return false;
}