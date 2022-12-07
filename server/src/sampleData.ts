import { faker } from '@faker-js/faker';
import {ObjectId, WithId} from 'mongodb';
import { Post } from './models/Post';
import { User } from './models/User';
import { getDatabaseCollections } from './services/database.service.js';

const collections = await getDatabaseCollections();

/** Map usernames to User objects. */
export const USERS: Record<string, User> = {};
/** Map post ID to Post objects. */
export const POSTS: Record<string, Post> = {};
/** All users will be set to have the same availability. */
const availability = [createSampleTimeInterval()];


export function createSampleData() {
  for (let i = 0; i < 10; i++) {
    const user = createSampleUser();
    USERS[user.userName] = user;
    const post = createSamplePost(user.userName);
    POSTS[post._id.toString()] = post;
  }
  const testUser = createSampleUser('nhansche');
  USERS[testUser.userName] = testUser;

  // Add all posts to every user's feed
  Object.values(USERS).forEach(user => user.feed = Object.keys(POSTS));

  collections.user.insertMany(Object.values(USERS));
  collections.post.insertMany(Object.values(POSTS));
}


//Returns all the posts done by a given user
export function getPostsByUser(username) {
  return USERS[username].posts;
}


export function createSampleUser(username: string = ''): User {
  return {
    userName: username.length > 0 ? username : faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    posts: [],
    availability,   // Set all users to have the same availability
    friends: Object.keys(USERS),
    pictureUrl: faker.image.avatar(),
    feed: [],
    attending: [],
    invitations: [],
  };
}


export function createSamplePost(author: string): WithId<Post> {
  return {
    _id: new ObjectId(faker.database.mongodbObjectId()),
    author: author,
    attendees: Object.keys(USERS).slice(Math.floor(Math.random() * Object.keys(USERS).length)),
    location: 'Berkshire Dining Commons',
    timeInterval: createSampleTimeInterval(),
    chatId: faker.datatype.uuid(),
    timestamp: faker.date.recent()
  };
}


/** Create a sample hour-long TimeInterval within the next day. */
export function createSampleTimeInterval() {
  const hourInMillis =  1000 * 60 * 60;
  const start = faker.date.soon(1);
  const end = new Date(start.getTime() + hourInMillis);

  return {start, end};
}