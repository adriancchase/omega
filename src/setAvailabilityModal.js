import {importHtml} from './utils/htmlUtils.js';
import {getLoggedInUserName} from './utils/dataUtils.js';
import {displayPosts} from './script.js';

importHtml('setAvailabilityModal.html', 'importAvailabilityModal').then(()=> {
    document.getElementById('closeAvailabilityModal').addEventListener('click', reset);
});

function reset() {

}