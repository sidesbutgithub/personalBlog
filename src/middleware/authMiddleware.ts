import { Request, Response } from "express";
import { User } from "../models/userModel.js";
import { Blog } from "../models/blogModel.js";
async function isAuthenticated(req: Request, res:Response, next:Function){
    if (req.isAuthenticated()){
        next()
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
        next()
    }
    else{
        res.status(401).send("you are not allowed to perform this action as you are not the owner of the article");
    }
}

export {isAuthenticated, isOwner}