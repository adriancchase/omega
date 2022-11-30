import express from 'express';
import { ObjectId } from 'mongodb';
import { getDatabaseCollections } from '../services/database.service.js';


export const postRouter = express.Router();
postRouter.use(express.json());
const collections = await getDatabaseCollections();


// TODO: Make post insert and author update a single transaction
postRouter.post('/new', async (req, res) => {
    const post = req.body;
    post.timeInterval.start = new Date(post.timeInterval.start);
    post.timeInterval.end = new Date(post.timeInterval.end);
    post.timestamp = new Date();
    try {
        const postInsertResult = await collections.post.insertOne(post);
        if (postInsertResult) {
            const postIdString = postInsertResult.insertedId.toString();
            const authorUpdateResult = await collections.user.updateOne(
                { userName: post.author },
                { $push: { posts: postIdString, feed: postIdString, attending: postIdString } }
            );
            authorUpdateResult
                ? res.status(201).send(`Successfully created a new post with id '${postInsertResult.insertedId}'.`)
                : res.status(500).send('Failed to create a new post.');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});


postRouter.get('/:id', async (req, res) => {
    const id = new ObjectId(req?.params?.id);
    try {
        const query = {_id: id};
        const post = await collections.post.findOne(query);
        res.status(200).send(post);
    } catch (err) {
        res.status(404).send(`Unable to find post '${id}'.`);
    }
});


/**
 * Adds the userName in the request body to the list of attendees for the postId given in the URL.
 * 
 * Request Body: {userName: string}
 * Response Codes: 
 *      200 -- Username succesfully added to post attendees list.
 *      400 -- Request body contains no userName field.
 *      500 -- Update operation failed.
 * Response Body: None if response code is 200, else {error: string}.
 */
postRouter.put('/:id/join', async (req, res) => {
    const postId = new ObjectId(req?.params?.id);
    const userName = req?.body?.userName;

    if (userName) {
        try {
            const dbResponse = await collections.post.updateOne(
                { _id: postId }, 
                { $addToSet: { attendees: userName } }
            );
            if (dbResponse) {
                res.status(200).send();
            }
        } catch (err) {
            res.status(500).send({error: `Unable to add user '${userName}' to post '${postId}'.`});
        }
    } else {
        res.status(400).send({error: 'Request body contains no userName field.'});
    }
});