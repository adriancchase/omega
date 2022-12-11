import { importHtml } from './utils/htmlUtils.js';
import { getLoggedInUserName, jsonFetch, formatTime, formatDayMonth } from './utils/dataUtils.js';


await importHtml('setAvailabilityModal.html', 'importAvailabilityModal').then(async () => {
    document.getElementById('addAvailabilityButton').addEventListener('click', updateAvailability);
    await displayAvailability();
});


async function updateAvailability() {
    const userName = getLoggedInUserName();
    const start = document.getElementById('start-time-availability').value;
    const end = document.getElementById('end-time-availability').value;
    const timeInterval = { start, end };

    const res = await jsonFetch(`/user/${userName}/availability`, 'PUT', timeInterval);
    if (res.status === 200) {
        await displayAvailability();
    } else {
        alert('Failed to update availability.');
    }
}

async function displayAvailability() {
    const availabilityTable = document.getElementById('availabilityTableBody');
    availabilityTable.innerHTML = '';
    const userName = getLoggedInUserName();
    const availability = await jsonFetch(`/user/${userName}/availability`, 'GET').then(res => res.json());
    if (availability.length) {
        availability.forEach(displayAvailabilityItem);
    }
}

function displayAvailabilityItem(timeInterval) {
    const newAvailabilityItem = document.getElementById('availabilityItemTemplate').content.cloneNode(true);
    const availabilityItemStartDate = newAvailabilityItem.querySelector('#availabilityItemStartDate');
    const availabilityItemStartTime = newAvailabilityItem.querySelector('#availabilityItemStartTime');
    const availabilityItemEndDate = newAvailabilityItem.querySelector('#availabilityItemEndDate');
    const availabilityItemEndTime = newAvailabilityItem.querySelector('#availabilityItemEndTime');
    availabilityItemStartDate.innerText = formatDayMonth(timeInterval.start);
    availabilityItemStartTime.innerText = formatTime(timeInterval.start);
    availabilityItemEndDate.innerText = formatDayMonth(timeInterval.end);
    availabilityItemEndTime.innerText = formatTime(timeInterval.end);
  
    const availabilityItemRemoveButton = newAvailabilityItem.querySelector('#availabilityItemRemoveButton');
    availabilityItemRemoveButton.addEventListener('click', createRemoveHandler(timeInterval));
    
    document.getElementById('availabilityTableBody').appendChild(newAvailabilityItem);
}


function createRemoveHandler(timeInterval) {
    return async () => {
        const userName = getLoggedInUserName();
        const result = await jsonFetch(`/user/${userName}/availability?start=${timeInterval.start}&end=${timeInterval.end}`, 'DELETE');
        if (result.status !== 200) {
            alert('Failed to update availability.');
        } else {
            await displayAvailability();
        }
    };
}
