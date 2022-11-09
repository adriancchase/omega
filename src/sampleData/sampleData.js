import { faker } from '@faker-js/faker';

/** Map usernames to User objects. */
export const USERS = {};
/** Map post ID to Post objects. */
export const POSTS = {};
/** All users will be set to have the same availability. */
const availability = [createSampleTimeInterval()]


for (let i = 0; i < 10; i++) {
  const user = createSampleUser();
  USERS[user.userName] = user;
}
const testUser = createSampleUser('nhansche');
USERS[testUser.userName] = testUser;

for (let i = 0; i < 10; i++) {
  const post = createSamplePost();
  POSTS[post.id] = post;
}


export function createSampleUser(username = '') {
  return {
    userName: username.length > 0 ? username : faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    posts: [],
    availability,   // Set all users to have the same availability
    friends: Object.keys(USERS),
    pictureUrl: faker.image.avatar(),
    feed: Object.keys(POSTS),
    attending: [],
    invited: [],
  };
}


export function createSamplePost() {
  return {
    id: faker.datatype.uuid(),
    author: faker.internet.userName(),
    attendees: Object.keys(USERS).slice(Math.floor(Math.random() * Object.keys(USERS).length)),
    location: 'Berkshire Dining Commons',
    timeInterval: createSampleTimeInterval(),
    chatId: faker.datatype.uuid(),
    visibleTo: Object.keys(USERS),    // Visible to all users.
  };
}


/** Create a sample hour-long TimeInterval within the next day. */
export function createSampleTimeInterval() {
  const hourInMillis =  1000 * 60 * 60;
  const start = faker.date.soon(1);
  const end = new Date(start.getTime() + hourInMillis);

  return {start, end};
}