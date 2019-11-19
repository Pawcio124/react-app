import {TASK_UPDATED} from "../actions/constants";

export default ( state ={
    task: null
}, action) =>{
    switch (action.type){
        case TASK_UPDATED:
            window.location.reload();
            return{
                ...state,
                task: action.task
            };
        default:
            return state;
    }
};