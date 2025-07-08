import { Router } from "express"

const userRouter = Router()
userRouter.get("/:id", ()=>console.log("get user by id"))