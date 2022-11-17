import {User, UserView} from './User.js';
import {TimeInterval} from './TimeInterval';

export interface Post {
    /** Post ID */
    id: string;
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
    /** Usernames of users who this post will be made visible to */
    visibleTo: string[];    
}

export interface PostView {
    author: UserView;
    attendees: UserView[];
    location: string;
    timeInterval: TimeInterval;
}