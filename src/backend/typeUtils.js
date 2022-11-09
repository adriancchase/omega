export function getUserView(user) {
    const {userName, firstName, lastName, pictureUrl, availability} = user;
    return {userName, firstName, lastName, pictureUrl, availability};
}