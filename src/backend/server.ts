import express from 'express';
import {join} from 'path';
import * as types from './types';
import * as typeUtils from './typeUtils';
import {USERS, POSTS} from '../sampleData/sampleData';


const app = express();
const port = process.env.port ?? 8080;

app.use(express.static(join(__dirname, '..')));
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../index.html'));
});

app.get('/user/:userName/friends', (req, res) => {
  const userName = req.params.userName;
  if (userName in USERS) {
    res.send(USERS[userName].friends.map(u => typeUtils.getUserView(USERS[u])));
  } else {
    res.sendStatus(404);
  }
});

app.post('/post/new', (req, res) => {
  const post: types.Post = req.body;
  POSTS[post.id] = post;
  res.sendStatus(200);
});

app.get('/post/:id', (req, res) => {
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