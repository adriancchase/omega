## Data Types

### User

    {
        // Unique username
        userName: string;  
        // Real first name 
        firstName: string;
        // Real last name
        lastName: string;
        // Profile picture
        pictureUrl: string; 
        // Start/end times where user is available
        availability: TimeInterval[];   
        // Posts made by the user
        posts: string[];    
        // List of friends' usernames
        friends: string[]; 
        // IDs for posts displayed in user's feed 
        feed: string[];     
    }

### UserView

    {
        userName: string;
        firstName: string;
        lastName: string;
        pictureUrl: string;
        availability: TimeInterval[];
    }

Contains a subset of the fields in User, and is used to display a user's public profile information.

### Post

    {
        // Post ID
        id: string;
        // Username of author
        author: string; 
        // List of usernames for users attending the meal        
        attendees: string[];   
        // Name of restaurant 
        location: string;       
        // Meal start/end times
        timeInterval: TimeInterval;  
        // ID of chat created for attendees   
        chatId: string;     
        // Usernames of users who this post will be made visible to    
        visibleTo: string[];    
    }


### PostView

    {
        author: UserView;
        attendees: UserView[];
        location: string;
        timeInterval: TimeInterval;
    }

The fields used to display a post. Note that, compared to a regular Post object, the username strings are replaced with UserView objects.

### Chat

    {
        id: string;
        messages: Message[];
    }

### Message

    {
        // Username of sender
        sender: string;
        // Message text contents
        text: string;
    }

### TimeInterval

    {
        start: Date;
        end: Date;
    }

## API Endpoints

### User

    POST user/new

Creates a new user. Request body must conform to the User object schema.

    PUT user/{username}

Updates the User object with the given username. The request body must contain the subset of User object fields corresponding to the fields that should be updated.

    GET user/{username}/posts

Returns an array of all posts (Post objects) made by the user with the given username.

    GET user/{username}/friends

Returns an array of UserView objects for all users on the friends list of the user with the given username.

    GET user/{username}/feed

Returns the feed (array of PostView objects) for the user with the given username.

### Post

    POST post/new

Creates a new post. The request body must conform to the Post object schema, minus the 'id' field which will be automatically generated.

    GET post/{id}

Returns the Post object with the given ID.

    DELETE post/{id}

Deletes the existing post with the given ID.

    PUT post/{id}

Updates the Post object with the given ID. The request body must contain the subset of Post object fields corresponding to the fields that should be updated.

### Chat

    GET chat/{id}

Returns the Chat object with the given ID.

    PUT chat/{id}

Sends a message to the chat with the given ID. The request body must be a Message object.