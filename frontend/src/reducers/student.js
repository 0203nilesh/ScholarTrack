import { DELETE_DATA, END_LOADING, FETCH_ALL_DATA, FETCH_DATA, START_LOADING, UPDATA_DATA } from "../constant"


export default ((state={studentsData: [], studentData: null}, action)=>{
        switch(action.type){
            case FETCH_ALL_DATA: 
                return {...state, studentsData: action?.data}
            case FETCH_DATA:
                return {...state, studentData: action?.data}
            case UPDATA_DATA:
                return {...state, studentData: action?.data}
            case DELETE_DATA:
                return {...state, studentsData: action?.data}
            default:
                return {...state}
        }
})