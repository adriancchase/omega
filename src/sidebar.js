import {importHtml} from './utils/htmlUtils.js';
import {getLoggedInUserName} from './utils/dataUtils.js';


importHtml('sidebar.html', 'createSidebar', ['col-2', 'p-3', 'bg-light']);
document.getElementById('loggedInUserName').innerText = getLoggedInUserName();