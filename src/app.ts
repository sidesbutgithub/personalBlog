#!/usr/bin/env node

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./models/userModel.js";
import { blogRouter } from "./routers/api.js";
import { checkUser } from "./middleware/authMiddleware.js"
import { verifyUser, generatePasswordHash } from "./utils/auth.util.js";

dotenv.config();
const port = process.env.PORT || 3000;

const uri = process.env.MDB_URI;
if (uri === undefined){
    throw new Error("db uri not provided");
}
const mySecret = process.env.SECRET;
if (mySecret === undefined){
    throw new Error("server secret not provided");
}



const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



mongoose
    .connect(uri)
    .then(() => console.log("database connection successful"))
    .catch((e) => console.log(e));



app.use(session({
  secret: mySecret,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({client: mongoose.connection.getClient(), collectionName: "sessions"}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 //one day in ms
  }
}));


passport.use(new Strategy(verifyUser))


passport.serializeUser(function(user, done) {
    //@ts-ignore
    done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
    User.findById(userId)
    .then((user)=>{
        done(null, user)
    })
    .catch(e=>done(e))
});



app.use(passport.initialize());
app.use(passport.session());



app.use("/api", blogRouter)

app.get("/login", passport.authenticate('local'), (req, res) => {
    res.status(200).send("successfully logged in");
});

app.get("/register", checkUser, async (req, res, next) => {
    const saltHash = await generatePasswordHash(req.body.password);
    console.log(saltHash)
    const { salt, hash } = saltHash;
    try{
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt
        });
        await newUser.save();
        res.redirect('/login')
    }
    catch (e){
        res.status(400).send(e);
    }
})

app.get("/logout", (req, res, next) => {
    req.logout((e) => {
        res.status(400).send(e)
    });
    res.status(200).send("successfully logged out");
});


app.get("/", (req, res) => {
    res.send("home test ok")
})

app.all("/*splat", (req, res) => {
    res.send("resource not found")
})

app.listen(port, async () => console.log(`listening on port ${port}`));