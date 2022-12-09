import { WithId } from 'mongodb';
import { TimeInterval } from './TimeInterval.js';
import { PostInvitation } from './Post.js';
import { MiniCrypt } from '../utils/miniCrypt.js';


export interface User {
    /** Unique username */
    userName: string;  
    /** Password encrypted using hash function with salt. */
    passwordHash: string;
    /** Salt used for computing encrypted password. */
    passwordSalt: string;
    /** Real first name */
    firstName: string;
    /** Real last name */
    lastName: string;
    /** Profile picture */
    pictureUrl: string; 
    /** Start/end times where user is available */
    availability: TimeInterval[];   
    /** Posts made by the user */
    posts: string[];    
    /** List of friends' usernames */
    friends: string[]; 
    /** IDs for posts displayed in user's feed */
    feed: string[];    
    /** IDs of posts that the user is signed up to attend */
    attending: string[];
    /** IDs of posts that the user has been invited to, but the user has not accepted */
    invitations: PostInvitation[];  
}

export type UserView = Pick<User, 
      'userName' 
    | 'firstName' 
    | 'lastName' 
    | 'pictureUrl' 
    | 'availability'
>;

export type UserDB = WithId<User>;


export interface NewUserParams {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}


export function createNewUser(newUserParams: NewUserParams): User {
    const { userName, password, firstName, lastName } = newUserParams;
    const mc = new MiniCrypt();
    const [salt, hash] = mc.hash(password);

    return {
        userName,
        passwordHash: hash,
        passwordSalt: salt,
        firstName,
        lastName,
        pictureUrl: '', 
        availability: [], 
        posts: [],   
        friends: [],
        feed: [],
        attending: [],
        invitations: []
    };
}