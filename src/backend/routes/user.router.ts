import express from 'express';
import {ObjectId} from 'mongodb';
import {getDatabaseCollections} from '../services/database.service.js';
import {User, UserDB, UserView, isUser} from '../models/User.js';
import {getUserView} from '../typeUtils.js';


export const userRouter = express.Router();
userRouter.use(express.json());
const userCollection = await getDatabaseCollections().then(collections => collections.user);

/**
 * POST endpoint for creating a new user.
 * Request: User object
 */
userRouter.post('/new', async (req, res) => {
    const user = req.body;
    try {
        const result = await userCollection.insertOne(user);
        result
            ? res.status(201).send(`Successfully created a new user '${user.userName}' with id '${result.insertedId}'.`)
            : res.status(500).send('Failed to create a new user.');
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});    


/**
 * Default GET endpoint returning all users.
 * Response: WithId<User>[]
 */
userRouter.get('/', async (req, res) => {
    try {
        const users = await userCollection.find({}).toArray();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message)
    }
});


/**
 * GET endpoint for fetching user by userName.
 * Response: WithId<User>
 */
userRouter.get('/:userName', async (req, res) => {
    const userName = req?.params?.userName;
    try {
        const query = {userName};
        const user = await userCollection.findOne(query);
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send(`Unable to find user '${userName}'.`);
    }
});


/**
 * TODO
 * GET endpoint for fetching .
 * Response: UserView[]
 */
 userRouter.get('/:userName/friends', async (req, res) => {
    const userName = req?.params?.userName;
    try {
        const query = {userName};
        const options = {projection: {_id: 0, friends: 1}}; // Select friends only
        const friends = await userCollection.findOne<{friends: string[]}>(query, options)
                                            .then(res => res?.friends);
        if (friends) {
            const query = {userName: {$in: friends}};
            const friendsView = await userCollection.find(query).toArray().then(arr => arr.map(getUserView));
            res.status(200).send(friendsView);
        } else {
            res.status(404).send(`Unable to find user '${userName}'.`);
        }
    } catch (err) {
        res.status(404).send(`Unable to find user '${userName}'.`);
    }
});


userRouter.put('/:userName', async (req, res) => {
    const userName = req?.params?.userName;
    try {
        const updatedPartialUser = req.body;
        const result = await userCollection.updateOne({userName}, {$set: updatedPartialUser});
        result
            ? res.status(200).send(`Successfully updated user '${userName}'.`)
            : res.status(304).send(`User '${userName}' not updated.`);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

userRouter.delete('/:userName', async (req, res) => {
    const userName = req?.params?.userName;
    try {
        const query = {userName};
        const result = await userCollection.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed user '${userName}'`);
        } else if (!result) {
            res.status(400).send(`Failed to remove user '${userName}'.`);
        } else if (!result.deletedCount) {
            res.status(404).send(`User '${userName}' does not exist.`);
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});