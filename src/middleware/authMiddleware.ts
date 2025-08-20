import { Request, Response } from "express";
import { User } from "../models/userModel.js";
import { Blog } from "../models/blogModel.js";
async function isAuthenticated(req: Request, res:Response, next:Function){
    if (req.isAuthenticated()){
        next(req, res)
    }
    else{
        res.status(401).send("you are not allowed to perform this action while not logged in");
    }
}

async function isOwner(req: Request, res:Response, next:Function){
    const reqUsername = await User.findById(req.user, 'username').exec();
    const { id } = req.params; 
    const articleAuthor = await Blog.findById(id, 'author').exec();
    if (reqUsername === articleAuthor){
        next(req, res)
    }
    else{
        res.status(401).send("you are not allowed to perform this action as you are not the owner of the article");
    }
}


async function checkUser(req: Request, res:Response, next: Function){
    if (!req.hasOwnProperty('body') || !req.body.hasOwnProperty('username')){
        res.status(400).send()
    }
    User.findOne({username: req.body.username}).then(async (user) => {
        if (!user){
            next(req, res);
        }
        else{
            res.status(403).send("user with that username already registered");
        }
        
        return
    })
    .catch((e) => {
        res.status(500).send()
        console.log(e)
    })
}


export {isAuthenticated, isOwner, checkUser}