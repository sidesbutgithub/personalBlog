#!/usr/bin/env node

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { error } from "console";



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


app.use(express.json());

app.get("/", (req, res) => {
    res.send("ok")
})

app.listen(port, async () => console.log(`listening on port ${port}`));