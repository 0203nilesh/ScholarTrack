import {  LOGIN, LOGOUT, RELOADING,SIGNUP } from "../constant";

export default ((state={ authData: null}, action)=>{
    switch(action.type){
        case LOGIN:
            return {...state, authData: action?.data};
        case SIGNUP:
            // console.log(action?.data);
             return {...state, authData: action?.data};
        case LOGOUT:
             return {...state, authData: null};
        case RELOADING:
             return {...state, authData: action?.data};
        default: 
            return {...state};
    }
})