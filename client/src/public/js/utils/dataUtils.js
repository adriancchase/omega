export function getLoggedInUserName() {
    return 'nhansche';
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