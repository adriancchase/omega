## Data Types

### User

    {
        userName: string;
        firstName: string;
        lastName: string;
        posts: Post[];
        availability: TimeInterval[];
        friends: string[];
    }

Each user will have a unique userName, but the firstName and lastName fields need not be unique. 

The posts field is an array of posts made by the user. 

The availability field contains an array of time intervals where the user is available to get a meal. 

The friends field is an array of the usernames of the user's friends.

### Post

    {
        id: string;
        author: string;
        attendees: string[];
        location: string;
        timeInterval: TimeInterval;
    }

Contains the post ID, author username, the usernames of the users who have signed up to attend the meal, the location (name of restaurant), and the starting and ending times.

### TimeInterval

    TimeInterval {
        start: Date;
        end: Date;
    }

## API Endpoints

### User

    POST user/create

Creates a new user. Request body must conform to the User object schema.

    PUT user/{username}

Modify the User object with the given username. Should be a JSON object containing a subset of the fields contained in User.

    GET user/{username}/posts

Returns an array of all posts (Post objects) made by the user with the given username.

    GET user/{username}/friends

Returns an array of all usernames on the friends list of the user with the given username.

    GET user/{username}/fullname

Returns the string containing the user's full name (first and last).

### Post

    POST post/create

Creates a new post. The request body must conform to the Post object schema, minus the 'id' field which will be automatically generated.

    GET post/{id}

Returns the Post object with the given ID.

    DELETE post/{id}

Deletes the existing post with the given ID.

    PUT post/{id}/update

Updates the post with the given ID. The request body must contain the subset of Post object fields corresponding to the fields that should be updated.