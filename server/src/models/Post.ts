import {ObjectId, WithId} from 'mongodb';
import {UserView} from './User.js';
import {TimeInterval} from './TimeInterval.js';

export interface Post {
    /** Post creation timestamp. */
    timestamp: Date;
    /** Username of author */
    author: string; 
    /** List of usernames for users attending the meal */      
    attendees: string[];   
    /** Name of restaurant */
    location: string;       
    /** Meal start/end times */
    timeInterval: TimeInterval;  
    /** ID of chat created for attendees */   
    chatId: string;         
}

export interface PostView {
    author: UserView;
    attendees: UserView[];
    location: string;
    timeInterval: TimeInterval;
}

export type PostDB = WithId<Post>;

export type PostViewDB = WithId<PostView>;

export interface PostInvitation {
    from: UserView;
    location: string;
    timeInterval: TimeInterval;
    postId: ObjectId;
}