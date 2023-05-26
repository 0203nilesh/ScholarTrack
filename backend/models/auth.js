import mongoose from "mongoose";


const authSchema= mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    }
})

const authModel= mongoose.model("Auth", authSchema);
export default authModel;