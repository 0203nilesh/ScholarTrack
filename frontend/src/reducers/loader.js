import  { START_LOADING, END_LOADING } from '../constant/index';

export default ((state={isLoading: false}, action)=>{
        switch(action.type){
            case START_LOADING:
                return {...state, isLoading: true};
            case END_LOADING:
                return {...state, isLoading: false};
            default:
                return {...state}
        }
})