import { END_LOADING, START_LOADING } from "../constant";

export const start_loading=()=>(dispatch)=>{
    try {
        dispatch({type: START_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const end_loading=()=>(dispatch)=>{
    try {
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}