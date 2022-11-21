# Database Description

The database is a MongoDB instance stored on the MongoDB Atlas cloud platform.

## Collections

### Users

The 'users' collection contains User objects of the following type:

    {
        _id: mongodb.ObjectId
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
        // IDs of posts that the user is signed up to attend
        attending: string[];
        // IDs of posts that the user has been invited to, but the user has not accepted
        invited: string[];
    }

This collection has a unique index on the userName field.

### Posts

The 'posts' collection contains Post objects of the following type:

    {
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

# Other Information

## Division of Labor

### Nathaniel

- Set up MongoDB database
- Connected endpoints to database in src/backend/routes:
  - user.router.ts
    - POST /user/new
    - GET /user
    - GET /user/{userName}
    - GET /user/{userName}/feed
    - GET /user/{userName}/friends
    - PUT /user/{userName}
    - DELETE /user/{userName}
  - post.router.ts
    - POST /post/new
    - GET /post/{id}
- Implemented database aggregation pipelines for formatting post and user views
- Modified sample data generation to upload data to database
- Configured Heroku to connect to database

### Jawad

- Implemented Login page
- Implemented Sign-up page
- Endpoints for Login page
- Endpoints for Sign-up page
- Worked on Friends page with Nathaniel
