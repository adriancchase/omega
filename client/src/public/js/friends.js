import { getLoggedInUserName, jsonFetch } from './utils/dataUtils.js';


window.onload = async () => {
  document.getElementById('addFriendButton').addEventListener('click', addFriendFromSearch)
  await displayFriends();
};


async function displayFriends() {
  document.getElementById('friends-list').innerHTML = '';
  const userName = getLoggedInUserName();
  const friends = await fetch(`/user/${userName}/friends`).then(res => res.json());
  console.log(JSON.stringify(friends));
  if (friends.length) {
      friends.forEach(createFriendItem);
  } else {
      // Display a message if user has received no invitations.
      const messageDiv = document.createElement('div');
      messageDiv.style.textAlign = 'center';
      messageDiv.innerText = 'You have no friends!';
      document.getElementById('friends-list').appendChild(messageDiv);
  }
}

function createFriendItem(friendUserView) {
  const newFriend = document.getElementById('friend-item').content.cloneNode(true);
  const friendPictureUrl = newFriend.querySelector('#friendPic');
  if (friendUserView.pictureUrl.length) {
    friendPictureUrl.src = friendUserView.pictureUrl;
  } else {
    friendPictureUrl.src = '/images/default_profile_pic.png';
  }

  const friendName = newFriend.querySelector('#friendName');
  friendName.innerText = `${friendUserView.firstName} ${friendUserView.lastName}`;

  document.getElementById('friends-list').appendChild(newFriend);
}


async function addFriendFromSearch() {
  const friendUserName = document.getElementById('friendSearch').value;
  const userName = getLoggedInUserName();
  const res = await jsonFetch(`/user/${userName}/friends`, 'PUT', { friendUserName });
  if (res.status === 200) {
    await displayFriends().then(() => alert(`Added '${friendUserName}' to your friends list!`));
  } else {
    alert(`The user '${friendUserName}' does not exist`);
  }
}
