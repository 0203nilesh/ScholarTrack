import  express from "express";
import { add_student_data, delete_student, fetch_student_data, update_student } from "../controller/student.js";
import { login } from "../controller/auth.js";


const Router= express.Router();

Router.get("/get", fetch_student_data);
Router.patch("/update/:id", update_student);
Router.delete("/delete/:id", delete_student);

export default Router;