import { faker } from "@faker-js/faker";
// import { faker } from '@faker-js/faker/locale/de';
//map username to the user object
export const USERS = {};
export const POSTS = {};
export const friend = [];
export const feed = [];

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
    friends: Array.from({ length: 10 }).forEach(() => {
      friend.push(faker.internet.userName());
    }),
    pictureUrl: faker.image.avatar(),
    feed: Array.from({ length: 10 }).forEach(() => {
      friend.push(faker.internet.userName());
    }),
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
    attendees: [],
    location: "Amherst",
    timeInterval: { start: startDate, end: endDate },
  };
}
