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