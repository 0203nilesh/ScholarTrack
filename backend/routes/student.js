import  express from "express";
import {fetch_student_data, add_student_data, delete_student, filter_student, update_student, get_student} from '../controller/student.js';

const  Router= express.Router();

Router.get("/get", fetch_student_data);
Router.post('/post', add_student_data);
Router.get("/get/:id", get_student);
Router.delete('/delete/:id', delete_student);
Router.patch("/update/:id", update_student);
Router.post("/filter", filter_student);

export default Router;