import { faker } from "@faker-js/faker";
// import { faker } from '@faker-js/faker/locale/de';
//map username to the user object
export const USERS = {};
export const POSTS = {};
export const friend = [];
export const attendee = [];
export const visible = [];

for (let i = 0; i < 10; i++) {
  let fr = createRandomUser();
  let userName = fr.username;
  USERS[userName] = fr;
}

for (let i = 0; i < 10; i++) {
  let po = createRandomPost();
  let poID = po.id;
  POSTS[poID] = po;
}

Array.from({ length: 10 }).forEach(() => {
  friend.push(faker.internet.userName());
});
Array.from({ length: 10 }).forEach(() => {
  attendee.push(faker.internet.userName());
});
Array.from({ length: 10 }).forEach(() => {
  visible.push(faker.internet.userName());
});
export const feedArr = [];

const postsSize = Object.keys(POSTS).length;

for (const post in POSTS) {
  feedArr.push(post.id);
}

export function createRandomUser() {
  const startDate = faker.date.soon(10, "2020-01-01T00:00:00.000Z");
  const index = 12;
  const newHr = Number(startDate[index]) + Number("1");
  const endDate =
    startDate.substring(0, index) + newHr + startDate.substring(index + 1);

  return {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName,
    posts: [],
    availability: { start: startDate, end: endDate },
    friends: friend,
    pictureUrl: faker.image.avatar(),
    feed: feedArr,
  };
}

export function createRandomPost() {
  const startDate = faker.date.soon(10, "2020-01-01T00:00:00.000Z");
  const index = 12;
  const newHr = Number(startDate[index]) + Number("1");
  const endDate =
    startDate.substring(0, index) + newHr + startDate.substring(index + 1);
  return {
    id: faker.datatype.uuid(),
    author: faker.internet.userName(),
    attendees: attendee,
    location: "Amherst",
    timeInterval: { start: startDate, end: endDate },
    chatId: faker.datatype.uuid(),
    visibleTo: visible,
  };
}
