import { combineReducers } from "redux";
import auth from "./auth";
import student from "./student";
import loader from "./loader";
import alert from "./alert";

export default combineReducers({
    auth,
    student,
    loader,
    alert
})