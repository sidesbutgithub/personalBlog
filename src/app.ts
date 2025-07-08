#!/usr/bin/env node

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { error } from "console";
import bodyParser from "body-parser";
import { blogRouter } from "./routers/blog.js";
import { userRouter } from "./routers/user.js";
import { Blog } from "./models/blogModel.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const uri = process.env.MDB_URI;
if (uri === undefined){
    throw new Error("db uri not provided");
}

mongoose
    .connect(uri)
    .then(() => console.log("database connection successful"))
    .catch((e) => console.log(e));

const article = new Blog({
  title: 'Awesome Post!',
  author: 'awesome-post',
  content: 'This is the best post ever',
  tags: ['featured', 'announcement']
});
// Insert the article in our MongoDB database
await article.save();

await Blog.deleteMany({ author: "awesome-post" })

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/blog", blogRouter)

app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("home test ok")
})

app.all("/*splat", (req, res) => {
    res.send("resource not found")
})

app.listen(port, async () => console.log(`listening on port ${port}`));