import { HIDE_ALERT, SHOW_ALERT } from "../constant";

export default ((state={isAlert: false, alertMessage: null}, action)=>{
    switch(action.type){
        case SHOW_ALERT:
            // console.log(action.data);
            return {...state, isAlert: true, alertMessage: action?.data};
        case HIDE_ALERT:
            return {...state, isAlert: false, alertMessage: null};
        default:
            return {...state};
    }
})