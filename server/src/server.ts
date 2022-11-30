import express from "express";
import { join } from "path";
import { URL, fileURLToPath } from "url";
import { USERS, POSTS } from "./sampleData.js";
import * as sampleData from "./sampleData.js";
import { userRouter } from "./routes/user.router.js";
import { postRouter } from "./routes/post.router.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.static(join(__dirname, "../../client/src/public")));
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../client/src/public/html/index.html"));
});

//Returns all posts for listing in calendar
app.get("post/:userName", (req, res) => {
  const postsByUser = sampleData.getPostsByUser(req.params.userName);
  res.send(postsByUser);
});


app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
  console.log(JSON.stringify(USERS, null, 2));
  console.log(JSON.stringify(POSTS, null, 2));
});
