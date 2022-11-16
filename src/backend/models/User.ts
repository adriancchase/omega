import { ObjectId, WithId } from 'mongodb';
import { TimeInterval, isTimeInterval } from './TimeInterval.js';


export interface User {
    /** Unique username */
    userName: string;  
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
    invited: string[];  
}

export type UserView = Pick<User, 
      'userName' 
    | 'firstName' 
    | 'lastName' 
    | 'pictureUrl' 
    | 'availability'
>;

export type UserDB = WithId<User>;

export function isUser(obj: Object): obj is User {
    const containsStringFields = [
        'userName', 
        'firstName', 
        'lastName', 
        'pictureUrl'
    ].reduce((acc, key) => acc && typeof obj[key] === 'string', true);

    if (containsStringFields) {
        const avKey = 'availability';
        const containsTimeIntervalField = avKey in obj 
            && typeof obj[avKey] === 'object' 
            && isTimeInterval(obj[avKey]);

        if (containsTimeIntervalField) {
            const containsStringArrayFields = [
                'posts',
                'friends',
                'feed',
                'attending',
                'invited'
            ].reduce(
                (acc, key) => acc 
                              && Array.isArray(obj[key]) 
                              && (!obj[key].length || typeof obj[key][0] === 'string'), 
                true
            );
            
            return containsStringArrayFields;
        }
    }
    
    return false;
}