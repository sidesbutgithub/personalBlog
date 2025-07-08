import { Schema, model } from "mongoose"
const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    tags: String,
    createdAt: Date,
    updatedAt: Date
})

const Blog = model('Blog', blogSchema)
export {Blog}