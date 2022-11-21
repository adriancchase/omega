import * as mongoDB from 'mongodb';
import {User} from '../models/User';
import {Post} from '../models/Post';


export interface Collections {
    user: mongoDB.Collection<User>;
    post: mongoDB.Collection<Post>;
}


let collections: Collections | undefined = undefined;


export async function getDatabaseCollections(): Promise<Collections> {
    if (!collections) {
        const dbUri = process.env.MONGODB_URI as string;
        const client = await new mongoDB.MongoClient(dbUri).connect();
        const db = client.db();
        collections = {
            user: db.collection('users'),
            post: db.collection('posts'),
        };
        collections.user.createIndex({userName: 1}, {unique: true});
    }
    
    return Promise.resolve(collections);
}

export const userViewProjection = {
    _id: 0,
    userName: 1,
    firstName: 1,
    lastName: 1,
    pictureUrl: 1,
    availability: 1
};

export const postViewProjection = {
    _id: 0,
    author: 1,
    attendees: 1,
    location: 1,
    timeInterval: 1
};