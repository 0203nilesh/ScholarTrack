import * as api from '../api/index';
import Cookies from 'js-cookie';
import { END_LOADING, RELOADING,FETCH_DATA, LOGIN, LOGOUT, SHOW_ALERT, SIGNUP, START_LOADING } from '../constant';

export const login= (data)=>async(dispatch)=>{
    try {
        // dispatch({type: START_LOADING});
        const authData=await api.login(data);
        // console.log(authData);
        if(authData.username){
            // console.log("2");
            Cookies.set("auth", JSON.stringify(authData), {expires: 3});
            dispatch({type: LOGIN, data: authData});
            dispatch({type: SHOW_ALERT, data: {message: "Successfully logged in", type: "success"} })
            setTimeout(()=>{
                document.getElementById('profile')?.click();
            },500)
        }else{
            // console.log("1");
            dispatch({type: SHOW_ALERT, data: authData })
        }
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const signup= (data)=>async(dispatch)=>{
    try {
        // dispatch({type: START_LOADING});
        const authData=await api.signup(data);
        // console.log(authData);
        if(authData.username!==undefined){
            dispatch({type: SIGNUP, data: authData});
            Cookies.set("auth", JSON.stringify(authData), {expires: 3});
            dispatch({type: SHOW_ALERT, data: {message : "Registration successfull", type: "success"}});
            if(authData.username === 'student'){
                dispatch({type: FETCH_DATA, data: authData});
            }
            setTimeout(()=>{
                document.getElementById('profile')?.click();
            },500)
        }else{
            dispatch({type: SHOW_ALERT, data: authData});
        }
        // dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const logout= ()=>async(dispatch)=>{
    try {
        dispatch({type: LOGOUT});
        Cookies.remove("auth");
        Cookies.remove("currentStudentId");
        Cookies.remove("currentStudent");
        dispatch({type: SHOW_ALERT, data: {message: "Logged out successfully ", type: "success"}});
    } catch (error) {
        console.log(error);
    }
}
export const reload_data= (currentStudentId)=>async(dispatch)=>{
    try {
        const data=await JSON.parse(Cookies.get("auth"));
        if(currentStudentId!==""){
            const studentData= await api.fetch_student_data(currentStudentId);
            // console.log(studentData);
            dispatch({type: FETCH_DATA, data: studentData});
        }
        dispatch({type: RELOADING, data: data})
    } catch (error) {
        console.log(error);
    }
}