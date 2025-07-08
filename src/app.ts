#!/usr/bin/env node

import express from "express"
import dotenv from "dotenv"
import {MongoClient} from "mongodb"


const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const uri = process.env.MDB_URI;
if (uri === undefined){
    throw new Error("db uri not provided");
}

const client = new MongoClient(uri);


try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
catch(e) {
    console.log(e);
}
finally {
// Ensures that the client will close when you finish/error
await client.close();
}

app.get("/", (req, res) => {
    res.send("ok")
})

app.listen(port, () => console.log(`listening on port ${port}`));