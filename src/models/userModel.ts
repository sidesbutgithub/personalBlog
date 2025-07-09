import { Schema, model } from "mongoose"
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)
export {User}