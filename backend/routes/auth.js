import  express from "express";
import { login } from "../controller/auth.js";
import { add_student_data } from "../controller/student.js";

const Router= express.Router();

Router.post("/login", login);
Router.post("/register", add_student_data);

export default Router;