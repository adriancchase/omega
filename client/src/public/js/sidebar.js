import {importHtml} from './utils/htmlUtils.js';
import {getLoggedInUserName, jsonFetch} from './utils/dataUtils.js';


importHtml('sidebar.html', 'createSidebar', ['col-2', 'p-3', 'bg-light']).then(async () => {
    const userName = getLoggedInUserName();
    document.getElementById('loggedInUserName').innerText = getLoggedInUserName();

    const user = await jsonFetch(`/user/${userName}`, 'GET').then(res => res.json());
    if (user && user.pictureUrl && user.pictureUrl.length) {
        document.getElementById('profilePic').src = user.pictureUrl;
    }
});
