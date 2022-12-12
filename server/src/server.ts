import express from 'express';
import { join } from 'path';
import { URL, fileURLToPath } from 'url';
import { userRouter } from './routes/user.router.js';
import { postRouter } from './routes/post.router.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.static(join(__dirname, '../../client/src/public')));
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../../client/src/public/html/index.html'));
});


app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
