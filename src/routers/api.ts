import { Router } from "express"
import { getBlog, postBlog, updateBlog, deleteBlog, getAllBlogs } from "../controllers/blogController.js";

const blogRouter = Router()

blogRouter.get("/:id", getBlog)

blogRouter.get("/", getAllBlogs)

blogRouter.post("/", postBlog)

blogRouter.patch("/:id", updateBlog)

blogRouter.delete("/:id", deleteBlog)

export {blogRouter}