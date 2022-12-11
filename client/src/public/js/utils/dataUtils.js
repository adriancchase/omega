export function getLoggedInUserName() {
    return JSON.parse(window.localStorage.getItem('session')).userName;
}

export async function jsonFetch(url, method, body) {
    return fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

/**
 * 
 * @param {string | Date} date 
 * @returns Time from date object in h:mm format.
 */
 function formatTime(date) {
    const d = new Date(date);
    const m = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;
    let h = d.getHours();
    let p = 'AM';
    if (h > 12) {
        h = d.getHours() % 12;
        p = 'PM';
    } else if (d.getHours() === 0) {
        h = 12;  
    } 

    return `${h}:${m} ${p}`;
}


function formatDayMonth(date) {
    const d = new Date(date);
    return `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}`;
}