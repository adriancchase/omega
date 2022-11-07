import express from 'express';
import {join} from 'path';


const app = express();
const port = 8080;

app.use(express.static(join(__dirname, '..')));
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../index.html'));
});


app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});