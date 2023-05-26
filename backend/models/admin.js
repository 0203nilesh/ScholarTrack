import mongoose from "mongoose";


const adminSchema= mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    user: {
        type: String,
    },
    password: {
        type: String,
    }
})

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;