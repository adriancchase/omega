export function getUserView(user) {
    const {userName, firstName, lastName, pictureUrl, availability} = user;
    return {userName, firstName, lastName, pictureUrl, availability};
}

export function getPostView(post, USERS) {
    const {author, attendees, location, timeInterval} = post;
    const authorView = getUserView(USERS[author]);
    const attendeesView = attendees.map(userName => USERS[userName]);
    return {
        author: authorView, 
        attendees: attendeesView, 
        location, 
        timeInterval
    };
}