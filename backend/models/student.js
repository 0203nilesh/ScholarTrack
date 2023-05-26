import mongoose from "mongoose"

const studentSchema= mongoose.Schema({
    name: String,
    dob: String,
    user: String,
    course: String,
    branch: String,
    admissionYear: String,
    cgpa: Number,
    mobile: Number,
    email: String,
    enrollment: String,
    username: String,
    password: String,
})

const studentModel= mongoose.model("Student", studentSchema);
export default studentModel;
