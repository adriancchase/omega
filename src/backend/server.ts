import express from 'express';
import {join} from 'path';
import {USERS, POSTS} from '../sampleData/sampleData';


const app = express();
const port = 8080;

app.use(express.static(join(__dirname, '..')));
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../index.html'));
});

app.get('/user/:userName/friends', (req, res) => {
  const userName = req.params.userName;
  if (userName in USERS) {
    res.send(USERS[userName]);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
  console.log(JSON.stringify(USERS));
});