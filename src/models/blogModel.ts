import { Schema, model } from "mongoose"
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        immutable: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: Array<String>,
        required: true,
        default: () => []
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now(),
        immutable: true
    }
})

const Blog = model('Blog', blogSchema)
export {Blog}