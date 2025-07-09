import { User } from "../models/userModel.js";
import crypto from "crypto";

async function verifyUser(username: String, password: String, done: Function) {
    User.findOne({username: username}).then(async (user) => {
        if (!user){
            return done(null, false);
        }
        console.log(username);
        console.log(password);
        console.log(user.hash, user.salt)
        if (await verifyPassword(password, user.hash, user.salt)){
            return done(null, user);
        }

        return done(null, false);
    })
    .catch((e) => {done(e)})
}

async function verifyPassword(password: String, hash: String, salt: String){
    //@ts-ignore
    const genHash =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString("hex")
    return (genHash === hash)
}

async function generatePasswordHash(password: String){
    const salt = crypto.randomBytes(32).toString('hex');
    //@ts-ignore
    const genHash =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString("hex")
    console.log(genHash)
    return {salt: salt,
            hash: genHash
            }
}

export {verifyUser, generatePasswordHash}