import { Router } from "express"

const userRouter = Router()
userRouter.get("/:id", (req, res)=>{
    const {id} = req.params
    res.send(`get user by id: ${id}`)
})

export {userRouter}