import * as types from './types';


export function getUserView(user: types.User): types.UserView {
    const {userName, firstName, lastName, pictureUrl, availability} = user;
    return {userName, firstName, lastName, pictureUrl, availability};
}