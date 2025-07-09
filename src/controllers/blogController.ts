import { Request, Response } from "express";
import { Blog } from "../models/blogModel.js";
import { User } from "../models/userModel.js";

const getBlog = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        const article = await Blog.findById(id).exec();
        if (article === null){
            res.status(404).send("Resource Not Found");
            return;
        }
        res.status(200).json(article);
    }
    catch (e){
        res.status(400).send(e);
    }
}

const postBlog = async (req: Request, res: Response) => {
    try{
        const {title, content, tags} = req.body;
        const author = await User.findById(req.user, 'username').exec();
        const article = new Blog({
            author: author,
            title: title,
            content: content,
            tags: tags
        });
        await article.save();
        res.status(201).json();
    }
    catch (e){
        res.status(400).send(e);
    }
}

const updateBlog = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        const article = await Blog.findOneAndUpdate({_id:id}, req.body).exec();
        if (article === null){
            res.status(404).send("Resource Not Found");
            return;
        }
        res.status(201).json();
    }
    catch (e){
        res.status(400).send(e);
    }
}

const deleteBlog = async (req: Request, res: Response) => {
    try{
        const { id } = req.params; 
        const data = await Blog.deleteOne({_id: id});
        if (data.deletedCount === 0){
            res.status(404).send("Resource Not Found");
            return;
        }
        res.status(204).json();
    }
    catch (e){
        res.status(400).send(e);
    }
}

const getAllBlogs = async (req: Request, res: Response) => {
    try{
        const data = await Blog.find(req.body).exec();
        if (data.length === 0){
            res.status(404).send("Resource Not Found");
            return;
        }
        res.status(200).json(data);
    }
    catch (e){
        res.status(400).send(e);
    }
}
export {getBlog, postBlog, updateBlog, deleteBlog, getAllBlogs}