import { Router } from "express"
import { getBlog, postBlog, updateBlog, deleteBlog, getAllBlogs } from "../controllers/blogController.js";
import { isAuthenticated, isOwner } from "../middleware/authMiddleware.js";

const blogRouter = Router()

blogRouter.get("/:id", getBlog)

blogRouter.get("/", getAllBlogs)

blogRouter.post("/", isAuthenticated, postBlog)

blogRouter.patch("/:id", isAuthenticated, isOwner, updateBlog)

blogRouter.delete("/:id", isAuthenticated, isOwner, deleteBlog)

export {blogRouter}