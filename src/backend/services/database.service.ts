import * as mongoDB from 'mongodb';
import {User} from '../models/User';

// TEST
process.env.MONGODB_URI = "mongodb+srv://admin:Shaggy5123@cluster-dev-0.hctxdwm.mongodb.net/?retryWrites=true&w=majority";


export interface Collections {
    user: mongoDB.Collection<User>;
    post: mongoDB.Collection;
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
    }
    
    return Promise.resolve(collections);
}