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
}

export interface UserView {
    userName: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
    availability: TimeInterval[];
}

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

export interface Chat {
    id: string;
    messages: Message[];
}

export interface Message {
    /** Username of sender */
    sender: string;
    /** Message text contents */
    text: string;
}

export interface TimeInterval {
    start: Date;
    end: Date;
}