import express from "express";
import { join } from "path";
import { URL, fileURLToPath } from "url";
import * as typeUtils from "./typeUtils.js";
import { USERS, POSTS } from "../sampleData/sampleData.js";
import * as sampleData from "../sampleData/sampleData.js";
import { userRouter } from './routes/user.router.js';

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.static(join(__dirname, "../../src")));
app.use('/user', userRouter);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../src/index.html"));
});


app.get("/user/:userName/feed", (req, res) => {
  const userName = req.params.userName;
  if (userName in USERS) {
    res.send(
      USERS[userName].feed.map((postId) =>
        typeUtils.getPostView(POSTS[postId], USERS)
      )
    );
  } else {
    res.sendStatus(404);
  }
});

app.post("/post/new", (req, res) => {
  console.log(req);
  const post = req.body;
  post.id = Object.keys(POSTS).length;
  POSTS[post.id] = post;

  const authorUser = USERS[post.author];
  authorUser.feed.unshift(post.id);
  authorUser.posts.unshift(post.id);

  res.sendStatus(200);
});

//Returns all posts for listing in calendar
app.get("post/:userName", (req, res) => {
  const postsByUser = sampleData.getPostsByUser(req.params.userName);
  res.send(postsByUser);
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  if (postId in POSTS) {
    res.send(POSTS[postId]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
  console.log(JSON.stringify(USERS, null, 2));
  console.log(JSON.stringify(POSTS, null, 2));
});
