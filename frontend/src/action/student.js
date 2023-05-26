import { END_LOADING, FETCH_ALL_DATA, FETCH_DATA, FILTER_DATA, SHOW_ALERT, START_LOADING, UPDATA_DATA } from "../constant";
import * as api from '../api/index';
import Cookies from "js-cookie";

export const get_students = ()=>async (dispatch)=>{
    try {
        const studentsData= await api.fetch_all_student_data();
        // console.log(studentsData);
        dispatch({type: FETCH_ALL_DATA, data:studentsData});
    } catch (error) {
        console.log(error);
    }
}

export const get_student= (navigate,id)=>async(dispatch)=>{
    try {
        // dispatch({type: START_LOADING});
        const studentData=await api.fetch_student_data(id);
        const authData= JSON.parse(Cookies.get("auth"));
        // console.log(studentData);
        dispatch({type: FETCH_DATA, data: studentData})
            // console.log("1");
             Cookies.set("currentStudentId", studentData._id);
            if(authData?.user==='admin'){
                Cookies.set("currentStudent", JSON.stringify(studentData), {expires: 3});
            }
            navigate("/profile")
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const update_student= (id, data)=>async(dispatch)=>{
    try {
        // dispatch({type: START_LOADING});
        const newData=await api.update_student_data(id, data);
        // console.log(newData);
        if(newData.message){
            dispatch({type: SHOW_ALERT, data: newData});
        }else{
            dispatch({type: SHOW_ALERT , data: {message: "Data Updated Successfully.", type: "success"}})
            dispatch({type: UPDATA_DATA, data: newData});
        }
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const delete_student= (id)=>async(dispatch)=>{
    try {
        // dispatch({type: START_LOADING});
        const newData=await api.delete_student_data(id);
        // console.log(newData);
        dispatch({type: SHOW_ALERT, data: newData});
        const newStudents= await api.fetch_all_student_data();
        dispatch({type: FETCH_ALL_DATA, data: newStudents});
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const filter_data= (data)=>async(dispatch)=>{
    try {
        const {name, admissionYear, ...others}= data;
        let dataToSend={...others};
        if(data?.name.length!==0){
            dataToSend= {...dataToSend, name: data.name}
        }
        if(data?.admissionYear.length!==0){
            dataToSend= {...dataToSend, admissionYear: data.admissionYear};
        }
        // console.log(dataToSend);
        const newData=await api.filter_student_data(dataToSend);
        // console.log(newData);
        if(newData.message){
            dispatch({type: SHOW_ALERT, data: newData});
            dispatch({type: FETCH_ALL_DATA, data: []})
        }else{
            dispatch({type: SHOW_ALERT, data: {message: "Filter Applied successfully", type: "success"}})
            dispatch({type: FETCH_ALL_DATA, data: newData})
        }
    } catch (error) {
        console.log(error);
    }
}